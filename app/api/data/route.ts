import { NextResponse } from "next/server"
import { cacheManager } from "@/lib/cache-manager"
import { securityMiddleware } from "@/lib/security-middleware"
import { queryOptimizer } from "@/lib/query-optimizer"

// Configure rate limiting
securityMiddleware.configureRateLimit("data", {
  windowMs: 60000, // 1 minute
  maxRequests: 50, // 50 requests per minute
  message: "Too many requests to the data API, please try again later.",
})

// Add validation rule
securityMiddleware.addValidationRule({
  path: /^\/api\/data/,
  method: "GET",
  validate: async (req) => {
    const url = new URL(req.url)
    const id = url.searchParams.get("id")

    // Validate id parameter if present
    if (id && !/^\d+$/.test(id)) {
      return { valid: false, reason: "Invalid ID parameter. Must be a number." }
    }

    return true
  },
})

export async function GET(request: Request) {
  try {
    // Check security middleware
    const securityCheck = await securityMiddleware.checkRequest(request, "data")
    if (!securityCheck.allowed) {
      return NextResponse.json({ error: securityCheck.message }, { status: securityCheck.status })
    }

    const url = new URL(request.url)
    const id = url.searchParams.get("id")

    // Try to get from cache first
    const cacheKey = `data_${id || "all"}`
    const cachedData = await cacheManager.get(cacheKey)

    if (cachedData) {
      return NextResponse.json(cachedData)
    }

    // Simulate database query
    let query = "SELECT * FROM items"
    if (id) {
      query += ` WHERE id = ${id}`
    }

    // Execute optimized query
    const data = await queryOptimizer.executeQuery(query)

    // Store in cache
    await cacheManager.set(cacheKey, data, {
      ttl: 300, // Cache for 5 minutes
      level: ["memory", "disk"], // Store in memory and disk cache
    })

    return NextResponse.json(data)
  } catch (error) {
    console.error("Error fetching data:", error)
    return NextResponse.json({ error: "An error occurred while processing your request" }, { status: 500 })
  }
}
