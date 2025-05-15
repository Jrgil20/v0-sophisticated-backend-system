// Advanced security middleware with rate limiting and request validation

interface RateLimitConfig {
  windowMs: number
  maxRequests: number
  message?: string
  statusCode?: number
  keyGenerator?: (req: Request) => string
  skip?: (req: Request) => boolean
}

interface RequestValidationRule {
  path: string | RegExp
  method: string | string[]
  validate: (req: Request) => Promise<boolean | { valid: boolean; reason?: string }>
}

class SecurityMiddleware {
  private rateLimits: Map<string, RateLimitConfig> = new Map()
  private rateLimitCounters: Map<string, { count: number; resetAt: number }> = new Map()
  private validationRules: RequestValidationRule[] = []
  private blockedIPs: Set<string> = new Set()
  private suspiciousActivityThreshold = 5
  private suspiciousActivityCounters: Map<string, number> = new Map()

  // Configure rate limiting for a specific endpoint or globally
  configureRateLimit(name: string, config: RateLimitConfig): void {
    this.rateLimits.set(name, {
      windowMs: config.windowMs || 60000, // Default: 1 minute
      maxRequests: config.maxRequests || 100, // Default: 100 requests per minute
      message: config.message || "Too many requests, please try again later.",
      statusCode: config.statusCode || 429,
      keyGenerator: config.keyGenerator || ((req) => this.getIPFromRequest(req)),
      skip: config.skip || (() => false),
    })
  }

  // Add a request validation rule
  addValidationRule(rule: RequestValidationRule): void {
    this.validationRules.push(rule)
  }

  // Block an IP address
  blockIP(ip: string, duration?: number): void {
    this.blockedIPs.add(ip)

    if (duration) {
      setTimeout(() => {
        this.blockedIPs.delete(ip)
      }, duration)
    }
  }

  // Check if a request is allowed based on rate limits and validation rules
  async checkRequest(
    req: Request,
    rateLimitName = "default",
  ): Promise<{ allowed: boolean; status?: number; message?: string }> {
    const ip = this.getIPFromRequest(req)

    // Check if IP is blocked
    if (this.blockedIPs.has(ip)) {
      return {
        allowed: false,
        status: 403,
        message: "Your access has been blocked due to suspicious activity.",
      }
    }

    // Check rate limit
    const rateLimitResult = await this.checkRateLimit(req, rateLimitName)
    if (!rateLimitResult.allowed) {
      return rateLimitResult
    }

    // Check validation rules
    const validationResult = await this.validateRequest(req)
    if (!validationResult.allowed) {
      // Increment suspicious activity counter
      this.incrementSuspiciousActivity(ip)
      return validationResult
    }

    return { allowed: true }
  }

  // Get all security metrics
  getMetrics() {
    return {
      blockedIPs: Array.from(this.blockedIPs),
      rateLimitCounters: Object.fromEntries(this.rateLimitCounters),
      suspiciousActivityCounters: Object.fromEntries(this.suspiciousActivityCounters),
    }
  }

  // Private helper methods
  private getIPFromRequest(req: Request): string {
    // In a real implementation, this would extract the IP from headers or connection info
    // For this example, we'll use a placeholder
    return "client-ip"
  }

  private async checkRateLimit(
    req: Request,
    name: string,
  ): Promise<{ allowed: boolean; status?: number; message?: string }> {
    const config = this.rateLimits.get(name)
    if (!config) {
      // No rate limit configured for this name
      return { allowed: true }
    }

    // Check if this request should skip rate limiting
    if (config.skip && config.skip(req)) {
      return { allowed: true }
    }

    const key = config.keyGenerator ? config.keyGenerator(req) : this.getIPFromRequest(req)
    const now = Date.now()

    // Get or initialize counter
    let counter = this.rateLimitCounters.get(key)
    if (!counter || counter.resetAt <= now) {
      counter = { count: 0, resetAt: now + config.windowMs }
      this.rateLimitCounters.set(key, counter)
    }

    // Increment counter
    counter.count++

    // Check if limit exceeded
    if (counter.count > config.maxRequests) {
      return {
        allowed: false,
        status: config.statusCode,
        message: config.message,
      }
    }

    return { allowed: true }
  }

  private async validateRequest(req: Request): Promise<{ allowed: boolean; status?: number; message?: string }> {
    const url = new URL(req.url)
    const path = url.pathname
    const method = req.method

    // Find matching rules
    const matchingRules = this.validationRules.filter((rule) => {
      // Match path
      const pathMatches = typeof rule.path === "string" ? path === rule.path : rule.path.test(path)

      // Match method
      const methodMatches = typeof rule.method === "string" ? method === rule.method : rule.method.includes(method)

      return pathMatches && methodMatches
    })

    // If no rules match, allow the request
    if (matchingRules.length === 0) {
      return { allowed: true }
    }

    // Validate against all matching rules
    for (const rule of matchingRules) {
      const result = await rule.validate(req)

      if (typeof result === "boolean") {
        if (!result) {
          return {
            allowed: false,
            status: 400,
            message: "Request validation failed.",
          }
        }
      } else {
        if (!result.valid) {
          return {
            allowed: false,
            status: 400,
            message: result.reason || "Request validation failed.",
          }
        }
      }
    }

    return { allowed: true }
  }

  private incrementSuspiciousActivity(ip: string): void {
    const count = (this.suspiciousActivityCounters.get(ip) || 0) + 1
    this.suspiciousActivityCounters.set(ip, count)

    // Block IP if threshold exceeded
    if (count >= this.suspiciousActivityThreshold) {
      this.blockIP(ip, 24 * 60 * 60 * 1000) // Block for 24 hours
    }
  }
}

// Export singleton instance
export const securityMiddleware = new SecurityMiddleware()
