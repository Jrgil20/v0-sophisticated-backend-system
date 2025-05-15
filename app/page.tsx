import Link from "next/link"
import { ArrowRight, Database, Gauge, Lock, Zap } from "lucide-react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { BackendMetrics } from "@/components/backend-metrics"

export default function Home() {
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="space-y-6">
        <div className="space-y-2 text-center">
          <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">Advanced Backend System</h1>
          <p className="mx-auto max-w-[700px] text-gray-500 md:text-xl/relaxed">
            A sophisticated backend architecture with multi-level caching, event-driven processing, and optimized data
            handling
          </p>
        </div>

        <BackendMetrics />

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          <Card>
            <CardHeader className="space-y-1">
              <CardTitle className="text-2xl flex items-center gap-2">
                <Database className="h-5 w-5" />
                Multi-level Caching
              </CardTitle>
              <CardDescription>
                Intelligent data caching system with memory, disk, and distributed layers
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-gray-500">
                Optimizes data access patterns with adaptive caching strategies based on access frequency and data
                volatility.
              </p>
            </CardContent>
            <CardFooter>
              <Link href="/features/caching" className="inline-flex items-center text-sm font-medium text-primary">
                Explore Caching System <ArrowRight className="ml-1 h-4 w-4" />
              </Link>
            </CardFooter>
          </Card>

          <Card>
            <CardHeader className="space-y-1">
              <CardTitle className="text-2xl flex items-center gap-2">
                <Zap className="h-5 w-5" />
                Event Processing
              </CardTitle>
              <CardDescription>Real-time event processing pipeline with custom event bus</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-gray-500">
                Processes events asynchronously with prioritization, batching, and parallel execution capabilities.
              </p>
            </CardContent>
            <CardFooter>
              <Link href="/features/events" className="inline-flex items-center text-sm font-medium text-primary">
                Explore Event System <ArrowRight className="ml-1 h-4 w-4" />
              </Link>
            </CardFooter>
          </Card>

          <Card>
            <CardHeader className="space-y-1">
              <CardTitle className="text-2xl flex items-center gap-2">
                <Lock className="h-5 w-5" />
                Advanced Security
              </CardTitle>
              <CardDescription>Sophisticated rate limiting and security middleware</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-gray-500">
                Implements adaptive rate limiting, request validation, and anomaly detection to protect against attacks.
              </p>
            </CardContent>
            <CardFooter>
              <Link href="/features/security" className="inline-flex items-center text-sm font-medium text-primary">
                Explore Security Features <ArrowRight className="ml-1 h-4 w-4" />
              </Link>
            </CardFooter>
          </Card>

          <Card>
            <CardHeader className="space-y-1">
              <CardTitle className="text-2xl flex items-center gap-2">
                <Gauge className="h-5 w-5" />
                Performance Optimization
              </CardTitle>
              <CardDescription>Query optimization and performance monitoring</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-gray-500">
                Automatically optimizes database queries and provides real-time performance metrics and insights.
              </p>
            </CardContent>
            <CardFooter>
              <Link href="/features/performance" className="inline-flex items-center text-sm font-medium text-primary">
                Explore Performance Tools <ArrowRight className="ml-1 h-4 w-4" />
              </Link>
            </CardFooter>
          </Card>
        </div>

        <div className="flex justify-center">
          <Link
            href="/dashboard"
            className="inline-flex h-10 items-center justify-center rounded-md bg-primary px-8 text-sm font-medium text-primary-foreground shadow transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
          >
            Open System Dashboard
          </Link>
        </div>
      </div>
    </div>
  )
}
