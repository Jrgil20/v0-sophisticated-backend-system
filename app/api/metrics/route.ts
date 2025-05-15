import { NextResponse } from "next/server"
import { cacheManager } from "@/lib/cache-manager"
import { eventBus } from "@/lib/event-bus"
import { securityMiddleware } from "@/lib/security-middleware"
import { queryOptimizer } from "@/lib/query-optimizer"

export async function GET(request: Request) {
  try {
    // Check security middleware
    const securityCheck = await securityMiddleware.checkRequest(request, "metrics")
    if (!securityCheck.allowed) {
      return NextResponse.json({ error: securityCheck.message }, { status: securityCheck.status })
    }

    // Gather metrics from all systems
    const metrics = {
      cache: cacheManager.getStats(),
      events: {
        total: eventBus.getAllEvents().length,
        pending: eventBus.getAllEvents().filter((e) => e.status === "pending").length,
        processing: eventBus.getAllEvents().filter((e) => e.status === "processing").length,
        completed: eventBus.getAllEvents().filter((e) => e.status === "completed").length,
        failed: eventBus.getAllEvents().filter((e) => e.status === "failed").length,
      },
      security: securityMiddleware.getMetrics(),
      queries: {
        stats: queryOptimizer.getAllQueryStats(),
        slowQueries: queryOptimizer.getAllQueryStats().filter((s) => s.averageExecutionTime > 500),
      },
      system: {
        uptime: process.uptime(),
        memory: process.memoryUsage(),
        timestamp: Date.now(),
      },
    }

    return NextResponse.json(metrics)
  } catch (error) {
    console.error("Error fetching metrics:", error)
    return NextResponse.json({ error: "An error occurred while processing your request" }, { status: 500 })
  }
}
