// Advanced event-driven architecture with custom event bus

type EventPriority = "high" | "medium" | "low"
type EventStatus = "pending" | "processing" | "completed" | "failed"

interface EventOptions {
  priority?: EventPriority
  delay?: number // Delay in milliseconds
  retry?: {
    attempts: number
    backoff: "fixed" | "exponential"
    interval: number // Base interval in milliseconds
  }
  idempotencyKey?: string
}

interface EventData {
  id: string
  type: string
  payload: any
  timestamp: number
  priority: EventPriority
  status: EventStatus
  attempts: number
  maxAttempts: number
  nextAttempt?: number
  error?: string
  idempotencyKey?: string
}

type EventHandler = (event: EventData) => Promise<void>

class EventBus {
  private handlers: Map<string, EventHandler[]> = new Map()
  private events: EventData[] = []
  private processingEvents: Set<string> = new Set()
  private processedIdempotencyKeys: Set<string> = new Set()
  private isProcessing = false
  private maxConcurrentEvents = 5
  private retentionPeriod: number = 7 * 24 * 60 * 60 * 1000 // 7 days in milliseconds

  // Register an event handler
  on(eventType: string, handler: EventHandler): void {
    if (!this.handlers.has(eventType)) {
      this.handlers.set(eventType, [])
    }
    this.handlers.get(eventType)!.push(handler)
  }

  // Emit an event
  async emit(eventType: string, payload: any, options: EventOptions = {}): Promise<string> {
    const eventId = this.generateId()

    // Check idempotency
    if (options.idempotencyKey && this.processedIdempotencyKeys.has(options.idempotencyKey)) {
      console.log(`Event with idempotency key ${options.idempotencyKey} already processed`)
      return eventId
    }

    const event: EventData = {
      id: eventId,
      type: eventType,
      payload,
      timestamp: Date.now(),
      priority: options.priority || "medium",
      status: "pending",
      attempts: 0,
      maxAttempts: options.retry?.attempts || 3,
      idempotencyKey: options.idempotencyKey,
    }

    // Add delay if specified
    if (options.delay && options.delay > 0) {
      event.nextAttempt = Date.now() + options.delay
    }

    this.events.push(event)

    // Sort events by priority and timestamp
    this.sortEvents()

    // Start processing events if not already processing
    if (!this.isProcessing) {
      this.processEvents()
    }

    return eventId
  }

  // Get event by ID
  getEvent(eventId: string): EventData | undefined {
    return this.events.find((event) => event.id === eventId)
  }

  // Get all events
  getAllEvents(): EventData[] {
    return [...this.events]
  }

  // Clear completed and failed events older than retention period
  clearOldEvents(): void {
    const now = Date.now()
    this.events = this.events.filter((event) => {
      if ((event.status === "completed" || event.status === "failed") && now - event.timestamp > this.retentionPeriod) {
        return false
      }
      return true
    })
  }

  // Private helper methods
  private generateId(): string {
    return Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15)
  }

  private sortEvents(): void {
    // Sort by priority (high > medium > low) and then by timestamp (oldest first)
    const priorityWeight: Record<EventPriority, number> = {
      high: 3,
      medium: 2,
      low: 1,
    }

    this.events.sort((a, b) => {
      // First sort by status (pending first)
      if (a.status === "pending" && b.status !== "pending") return -1
      if (a.status !== "pending" && b.status === "pending") return 1

      // Then by nextAttempt time if present
      if (a.nextAttempt && b.nextAttempt) {
        return a.nextAttempt - b.nextAttempt
      }
      if (a.nextAttempt) return 1
      if (b.nextAttempt) return -1

      // Then by priority
      const priorityDiff = priorityWeight[b.priority] - priorityWeight[a.priority]
      if (priorityDiff !== 0) return priorityDiff

      // Finally by timestamp
      return a.timestamp - b.timestamp
    })
  }

  private async processEvents(): Promise<void> {
    this.isProcessing = true

    try {
      // Process events in batches based on maxConcurrentEvents
      while (true) {
        // Get pending events that are ready to process
        const now = Date.now()
        const pendingEvents = this.events.filter(
          (event) =>
            event.status === "pending" &&
            (!event.nextAttempt || event.nextAttempt <= now) &&
            !this.processingEvents.has(event.id),
        )

        if (pendingEvents.length === 0) {
          // No more pending events to process
          break
        }

        // Take up to maxConcurrentEvents
        const eventsToProcess = pendingEvents.slice(0, this.maxConcurrentEvents - this.processingEvents.size)
        if (eventsToProcess.length === 0) {
          // Wait for some events to complete
          await new Promise((resolve) => setTimeout(resolve, 100))
          continue
        }

        // Process events in parallel
        await Promise.all(eventsToProcess.map((event) => this.processEvent(event)))
      }
    } finally {
      this.isProcessing = false

      // Clean up old events
      this.clearOldEvents()
    }
  }

  private async processEvent(event: EventData): Promise<void> {
    // Mark event as processing
    event.status = "processing"
    this.processingEvents.add(event.id)

    try {
      const handlers = this.handlers.get(event.type) || []
      if (handlers.length === 0) {
        console.warn(`No handlers registered for event type: ${event.type}`)
        event.status = "completed" // Mark as completed even if no handlers
        return
      }

      // Execute all handlers in sequence
      for (const handler of handlers) {
        await handler(event)
      }

      // Mark event as completed
      event.status = "completed"

      // Record idempotency key if present
      if (event.idempotencyKey) {
        this.processedIdempotencyKeys.add(event.idempotencyKey)
      }
    } catch (error) {
      // Handle failure
      event.attempts++
      event.error = error instanceof Error ? error.message : String(error)

      if (event.attempts >= event.maxAttempts) {
        // Max attempts reached, mark as failed
        event.status = "failed"
      } else {
        // Schedule retry
        event.status = "pending"

        // Calculate backoff time
        const backoffTime = this.calculateBackoff(event)
        event.nextAttempt = Date.now() + backoffTime
      }
    } finally {
      // Remove from processing set
      this.processingEvents.delete(event.id)

      // Continue processing events
      if (this.events.some((e) => e.status === "pending")) {
        this.sortEvents()
        this.processEvents()
      }
    }
  }

  private calculateBackoff(event: EventData): number {
    // Default to exponential backoff
    const baseInterval = 1000 // 1 second

    if (event.attempts <= 1) {
      return baseInterval
    }

    // Exponential backoff: baseInterval * 2^(attempts-1)
    return baseInterval * Math.pow(2, event.attempts - 1)
  }
}

// Export singleton instance
export const eventBus = new EventBus()
