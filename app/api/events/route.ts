import { NextResponse } from "next/server"
import { eventBus } from "@/lib/event-bus"
import { securityMiddleware } from "@/lib/security-middleware"

// Configure rate limiting
securityMiddleware.configureRateLimit("events", {
  windowMs: 60000, // 1 minute
  maxRequests: 30, // 30 requests per minute
  message: "Too many event requests, please try again later.",
})

export async function POST(request: Request) {
  try {
    // Check security middleware
    const securityCheck = await securityMiddleware.checkRequest(request, "events")
    if (!securityCheck.allowed) {
      return NextResponse.json({ error: securityCheck.message }, { status: securityCheck.status })
    }

    // Parse request body
    const body = await request.json()

    if (!body.type || !body.payload) {
      return NextResponse.json({ error: "Event type and payload are required" }, { status: 400 })
    }

    // Emit event
    const eventId = await eventBus.emit(body.type, body.payload, {
      priority: body.priority || "medium",
      delay: body.delay,
      retry: body.retry,
      idempotencyKey: body.idempotencyKey,
    })

    return NextResponse.json({ success: true, eventId })
  } catch (error) {
    console.error("Error processing event:", error)
    return NextResponse.json({ error: "An error occurred while processing your request" }, { status: 500 })
  }
}

export async function GET(request: Request) {
  try {
    // Check security middleware
    const securityCheck = await securityMiddleware.checkRequest(request, "events")
    if (!securityCheck.allowed) {
      return NextResponse.json({ error: securityCheck.message }, { status: securityCheck.status })
    }

    const url = new URL(request.url)
    const eventId = url.searchParams.get("id")

    if (eventId) {
      // Get specific event
      const event = eventBus.getEvent(eventId)

      if (!event) {
        return NextResponse.json({ error: "Event not found" }, { status: 404 })
      }

      return NextResponse.json(event)
    } else {
      // Get all events
      const events = eventBus.getAllEvents()
      return NextResponse.json(events)
    }
  } catch (error) {
    console.error("Error fetching events:", error)
    return NextResponse.json({ error: "An error occurred while processing your request" }, { status: 500 })
  }
}
