"use client"

import { useEffect, useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts"

// Simulated metrics data
const generateMetricsData = (points: number, base: number, variance: number) => {
  return Array.from({ length: points }, (_, i) => ({
    time: `${i}m ago`,
    value: Math.max(0, base + Math.random() * variance - variance / 2),
  })).reverse()
}

export function BackendMetrics() {
  const [metrics, setMetrics] = useState({
    responseTime: generateMetricsData(10, 120, 40),
    throughput: generateMetricsData(10, 850, 200),
    cacheHitRate: generateMetricsData(10, 85, 15),
    errorRate: generateMetricsData(10, 0.5, 0.5),
  })

  // Simulate real-time metrics updates
  useEffect(() => {
    const interval = setInterval(() => {
      setMetrics({
        responseTime: [
          ...metrics.responseTime.slice(1),
          { time: "now", value: Math.max(0, 120 + Math.random() * 40 - 20) },
        ],
        throughput: [
          ...metrics.throughput.slice(1),
          { time: "now", value: Math.max(0, 850 + Math.random() * 200 - 100) },
        ],
        cacheHitRate: [
          ...metrics.cacheHitRate.slice(1),
          { time: "now", value: Math.min(100, Math.max(0, 85 + Math.random() * 15 - 7.5)) },
        ],
        errorRate: [
          ...metrics.errorRate.slice(1),
          { time: "now", value: Math.max(0, 0.5 + Math.random() * 0.5 - 0.25) },
        ],
      })
    }, 5000)

    return () => clearInterval(interval)
  }, [metrics])

  return (
    <Card>
      <CardHeader>
        <CardTitle>Backend Performance Metrics</CardTitle>
        <CardDescription>Real-time system performance monitoring</CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="responseTime">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="responseTime">Response Time</TabsTrigger>
            <TabsTrigger value="throughput">Throughput</TabsTrigger>
            <TabsTrigger value="cacheHitRate">Cache Hit Rate</TabsTrigger>
            <TabsTrigger value="errorRate">Error Rate</TabsTrigger>
          </TabsList>
          <TabsContent value="responseTime" className="h-[300px] mt-4">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={metrics.responseTime}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="time" />
                <YAxis label={{ value: "ms", angle: -90, position: "insideLeft" }} />
                <Tooltip />
                <Line type="monotone" dataKey="value" stroke="#8884d8" strokeWidth={2} />
              </LineChart>
            </ResponsiveContainer>
          </TabsContent>
          <TabsContent value="throughput" className="h-[300px] mt-4">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={metrics.throughput}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="time" />
                <YAxis label={{ value: "req/s", angle: -90, position: "insideLeft" }} />
                <Tooltip />
                <Line type="monotone" dataKey="value" stroke="#82ca9d" strokeWidth={2} />
              </LineChart>
            </ResponsiveContainer>
          </TabsContent>
          <TabsContent value="cacheHitRate" className="h-[300px] mt-4">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={metrics.cacheHitRate}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="time" />
                <YAxis label={{ value: "%", angle: -90, position: "insideLeft" }} />
                <Tooltip />
                <Line type="monotone" dataKey="value" stroke="#ffc658" strokeWidth={2} />
              </LineChart>
            </ResponsiveContainer>
          </TabsContent>
          <TabsContent value="errorRate" className="h-[300px] mt-4">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={metrics.errorRate}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="time" />
                <YAxis label={{ value: "%", angle: -90, position: "insideLeft" }} />
                <Tooltip />
                <Line type="monotone" dataKey="value" stroke="#ff8042" strokeWidth={2} />
              </LineChart>
            </ResponsiveContainer>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  )
}
