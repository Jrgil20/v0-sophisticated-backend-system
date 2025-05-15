// Advanced multi-level caching system

type CacheLevel = "memory" | "disk" | "distributed"
type CachePolicy = "lru" | "lfu" | "fifo" | "adaptive"

interface CacheOptions {
  ttl?: number // Time to live in seconds
  level?: CacheLevel | CacheLevel[]
  policy?: CachePolicy
  staleWhileRevalidate?: boolean
}

interface CacheStats {
  hits: number
  misses: number
  size: number
  hitRate: number
}

interface CacheEntry<T> {
  value: T
  expiry: number
  accessCount: number
  lastAccessed: number
  size: number
}

class CacheManager {
  private memoryCache: Map<string, CacheEntry<any>> = new Map()
  private diskCache: Map<string, string> = new Map() // Simulated disk cache
  private distributedCache: Map<string, string> = new Map() // Simulated distributed cache
  private stats: Record<CacheLevel, CacheStats> = {
    memory: { hits: 0, misses: 0, size: 0, hitRate: 0 },
    disk: { hits: 0, misses: 0, size: 0, hitRate: 0 },
    distributed: { hits: 0, misses: 0, size: 0, hitRate: 0 },
  }
  private maxMemoryCacheSize: number = 100 * 1024 * 1024 // 100MB
  private currentMemoryCacheSize = 0

  // Get item from cache with multi-level fallback
  async get<T>(key: string): Promise<T | null> {
    // Try memory cache first
    const memoryItem = this.memoryCache.get(key)
    if (memoryItem) {
      if (Date.now() < memoryItem.expiry) {
        this.stats.memory.hits++
        memoryItem.accessCount++
        memoryItem.lastAccessed = Date.now()
        this.updateHitRate("memory")
        return memoryItem.value as T
      } else {
        // Expired
        this.memoryCache.delete(key)
        this.currentMemoryCacheSize -= memoryItem.size
      }
    } else {
      this.stats.memory.misses++
      this.updateHitRate("memory")
    }

    // Try disk cache
    const diskItem = this.diskCache.get(key)
    if (diskItem) {
      this.stats.disk.hits++
      this.updateHitRate("disk")

      // Parse the serialized item
      const parsedItem = JSON.parse(diskItem)
      if (Date.now() < parsedItem.expiry) {
        // Promote to memory cache
        this.setInMemoryCache(key, parsedItem.value, {
          ttl: Math.floor((parsedItem.expiry - Date.now()) / 1000),
        })
        return parsedItem.value as T
      } else {
        // Expired
        this.diskCache.delete(key)
      }
    } else {
      this.stats.disk.misses++
      this.updateHitRate("disk")
    }

    // Try distributed cache
    const distributedItem = this.distributedCache.get(key)
    if (distributedItem) {
      this.stats.distributed.hits++
      this.updateHitRate("distributed")

      // Parse the serialized item
      const parsedItem = JSON.parse(distributedItem)
      if (Date.now() < parsedItem.expiry) {
        // Promote to memory and disk cache
        this.setInMemoryCache(key, parsedItem.value, {
          ttl: Math.floor((parsedItem.expiry - Date.now()) / 1000),
        })
        this.setInDiskCache(key, parsedItem.value, {
          ttl: Math.floor((parsedItem.expiry - Date.now()) / 1000),
        })
        return parsedItem.value as T
      } else {
        // Expired
        this.distributedCache.delete(key)
      }
    } else {
      this.stats.distributed.misses++
      this.updateHitRate("distributed")
    }

    return null
  }

  // Set item in cache with options
  async set<T>(key: string, value: T, options: CacheOptions = {}): Promise<void> {
    const levels = options.level
      ? Array.isArray(options.level)
        ? options.level
        : [options.level]
      : ["memory", "disk", "distributed"]

    if (levels.includes("memory")) {
      this.setInMemoryCache(key, value, options)
    }

    if (levels.includes("disk")) {
      this.setInDiskCache(key, value, options)
    }

    if (levels.includes("distributed")) {
      this.setInDistributedCache(key, value, options)
    }
  }

  // Delete item from all cache levels
  async delete(key: string): Promise<void> {
    if (this.memoryCache.has(key)) {
      const item = this.memoryCache.get(key)!
      this.currentMemoryCacheSize -= item.size
      this.memoryCache.delete(key)
    }

    this.diskCache.delete(key)
    this.distributedCache.delete(key)
  }

  // Clear all caches
  async clear(): Promise<void> {
    this.memoryCache.clear()
    this.currentMemoryCacheSize = 0
    this.diskCache.clear()
    this.distributedCache.clear()

    // Reset stats
    Object.keys(this.stats).forEach((level) => {
      const cacheLevel = level as CacheLevel
      this.stats[cacheLevel] = { hits: 0, misses: 0, size: 0, hitRate: 0 }
    })
  }

  // Get cache statistics
  getStats(): Record<CacheLevel, CacheStats> {
    return this.stats
  }

  // Private helper methods
  private setInMemoryCache<T>(key: string, value: T, options: CacheOptions): void {
    const ttl = options.ttl || 3600 // Default 1 hour
    const serializedValue = JSON.stringify(value)
    const size = serializedValue.length * 2 // Rough estimate of string size in bytes

    // Check if we need to make room in the cache
    if (this.currentMemoryCacheSize + size > this.maxMemoryCacheSize) {
      this.evictFromMemoryCache(size)
    }

    const entry: CacheEntry<T> = {
      value,
      expiry: Date.now() + ttl * 1000,
      accessCount: 0,
      lastAccessed: Date.now(),
      size,
    }

    this.memoryCache.set(key, entry)
    this.currentMemoryCacheSize += size
    this.stats.memory.size = this.currentMemoryCacheSize
  }

  private setInDiskCache<T>(key: string, value: T, options: CacheOptions): void {
    const ttl = options.ttl || 86400 // Default 24 hours

    const entry = {
      value,
      expiry: Date.now() + ttl * 1000,
    }

    this.diskCache.set(key, JSON.stringify(entry))
    this.stats.disk.size = this.diskCache.size
  }

  private setInDistributedCache<T>(key: string, value: T, options: CacheOptions): void {
    const ttl = options.ttl || 604800 // Default 7 days

    const entry = {
      value,
      expiry: Date.now() + ttl * 1000,
    }

    this.distributedCache.set(key, JSON.stringify(entry))
    this.stats.distributed.size = this.distributedCache.size
  }

  private evictFromMemoryCache(sizeNeeded: number): void {
    // Use the configured policy to evict items
    const policy = "lru" // Default to LRU

    if (policy === "lru") {
      // Least Recently Used
      let evictedSize = 0
      const entries = Array.from(this.memoryCache.entries()).sort((a, b) => a[1].lastAccessed - b[1].lastAccessed)

      for (const [key, entry] of entries) {
        this.memoryCache.delete(key)
        evictedSize += entry.size
        this.currentMemoryCacheSize -= entry.size

        if (evictedSize >= sizeNeeded) {
          break
        }
      }
    } else if (policy === "lfu") {
      // Least Frequently Used
      let evictedSize = 0
      const entries = Array.from(this.memoryCache.entries()).sort((a, b) => a[1].accessCount - b[1].accessCount)

      for (const [key, entry] of entries) {
        this.memoryCache.delete(key)
        evictedSize += entry.size
        this.currentMemoryCacheSize -= entry.size

        if (evictedSize >= sizeNeeded) {
          break
        }
      }
    }
  }

  private updateHitRate(level: CacheLevel): void {
    const { hits, misses } = this.stats[level]
    const total = hits + misses
    this.stats[level].hitRate = total > 0 ? (hits / total) * 100 : 0
  }
}

// Export singleton instance
export const cacheManager = new CacheManager()
