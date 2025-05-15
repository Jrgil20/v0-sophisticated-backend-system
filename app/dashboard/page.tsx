import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { BackendMetrics } from "@/components/backend-metrics"
import { Activity, AlertTriangle, Clock, Database, Gauge, Lock, Server, Zap } from "lucide-react"

export default function DashboardPage() {
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="space-y-6">
        <div className="space-y-2">
          <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl">System Dashboard</h1>
          <p className="text-gray-500 md:text-xl/relaxed">
            Comprehensive monitoring and management of the advanced backend system
          </p>
        </div>

        <BackendMetrics />

        <Tabs defaultValue="overview">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="overview">System Overview</TabsTrigger>
            <TabsTrigger value="events">Event Processing</TabsTrigger>
            <TabsTrigger value="cache">Cache Management</TabsTrigger>
            <TabsTrigger value="security">Security Monitoring</TabsTrigger>
          </TabsList>
          
          <TabsContent value="overview" className="space-y-6">
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">System Load</CardTitle>
                  <Gauge className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">24%</div>
                  <p className="text-xs text-muted-foreground">+5.2% from last hour</p>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">API Requests</CardTitle>
                  <Activity className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">2,345</div>
                  <p className="text-xs text-muted-foreground">+12% from last hour</p>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Cache Hit Rate</CardTitle>
                  <Database className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">87.3%</div>
                  <p className="text-xs text-muted-foreground">+2.1% from last hour</p>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Security Alerts</CardTitle>
                  <AlertTriangle className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">3</div>
                  <p className="text-xs text-muted-foreground">-2 from last hour</p>
                </CardContent>
              </Card>
            </div>
            
            <div className="grid gap-6 md:grid-cols-2">
              <Card>
                <CardHeader>
                  <CardTitle>System Health</CardTitle>
                  <CardDescription>Overall system status and health metrics</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <Server className="h-5 w-5 text-primary" />
                        <span>API Services</span>
                      </div>
                      <span className="flex items-center rounded-full bg-green-100 px-2 py-1 text-xs font-medium text-green-800">
                        Operational
                      </span>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <Database className="h-5 w-5 text-primary" />
                        <span>Database Services</span>
                      </div>
                      <span className="flex items-center rounded-full bg-green-100 px-2 py-1 text-xs font-medium text-green-800">
                        Operational
                      </span>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <Zap className="h-5 w-5 text-primary" />
                        <span>Event Processing</span>
                      </div>
                      <span className="flex items-center rounded-full bg-green-100 px-2 py-1 text-xs font-medium text-green-800">
                        Operational
                      </span>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <Lock className="h-5 w-5 text-primary" />
                        <span>Security Services</span>
                      </div>
                      <span className="flex items-center rounded-full bg-yellow-100 px-2 py-1 text-xs font-medium text-yellow-800">
                        Degraded
                      </span>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <Clock className="h-5 w-5 text-primary" />
                        <span>Background Jobs</span>
                      </div>
                      <span className="flex items-center rounded-full bg-green-100 px-2 py-1 text-xs font-medium text-green-800">
                        Operational
                      </span>
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle>Recent Activity</CardTitle>
                  <CardDescription>Latest system events and activities</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="border-l-4 border-blue-500 pl-4">
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-medium">Cache Optimization</span>
                        <span className="text-xs text-gray-500">2 minutes ago</span>
                      </div>
                      <p className="text-sm text-gray-600">
                        Memory cache automatically optimized to improve hit rate.
                      </p>
                    </div>
                    
                    <div className="border-l-4 border-yellow-500 pl-4">
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-medium">Security Alert</span>
                        <span className="text-xs text-gray-500">15 minutes ago</span>
                      </div>
                      <p className="text-sm text-gray-600">
                        Unusual request pattern detected from IP 203.0.113.42.
                      </p>
                    </div>
                    
                    <div className="border-l-4 border-green-500 pl-4">
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-medium">Event Processing</span>
                        <span className="text-xs text-gray-500">32 minutes ago</span>
                      </div>
                      <p className="text-sm text-gray-600">
                        Batch of 250 events processed successfully.
                      </p>
                    </div>
                    
                    <div className="border-l-4 border-purple-500 pl-4">
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-medium">Query Optimization</span>
                        <span className="text-xs text-gray-500">1 hour ago</span>
                      </div>
                      <p className="text-sm text-gray-600">
                        Slow query detected and optimization suggestions generated.
                      </p>
                    </div>
                    
                    <div className="border-l-4 border-red-500 pl-4">
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-medium">System Alert</span>
                        <span className="text-xs text-gray-500">2 hours ago</span>
                      </div>
                      <p className="text-sm text-gray-600">
                        Memory usage spike detected and automatically resolved.
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
          
          <TabsContent value="events" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Event Processing Status</CardTitle>
                <CardDescription>Current event queue and processing metrics</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div className="grid gap-4 md:grid-cols-3">
                    <div className="rounded-lg border p-4">
                      <div className="text-2xl font-bold">42</div>
                      <div className="text-sm text-gray-500">Pending Events</div>
                    </div>
                    
                    <div className="rounded-lg border p-4">
                      <div className="text-2xl font-bold">8</div>
                      <div className="text-sm text-gray-500">Processing Events</div>
                    </div>
                    
                    <div className="rounded-lg border p-4">
                      <div className="text-2xl font-bold">1,245</div>
                      <div className="text-sm text-gray-500">Completed Events (24h)</div>
                    </div>
                  </div>
                  
                  <div>
                    <h3 className="text-lg font-medium mb-2">Event Type Distribution</h3>
                    <div className="space-y-2">
                      <div>
                        <div className="flex items-center justify-between mb-1">
                          <span className="text-sm">data.sync</span>
                          <span className="text-sm font-medium">42%</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div className="bg-primary h-2 rounded-full" style={{ width: '42%' }}></div>
                        </div>
                      </div>
                      
                      <div>
                        <div className="flex items-center justify-between mb-1">
                          <span className="text-sm">user.activity</span>
                          <span className="text-sm font-medium">28%</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div className="bg-primary h-2 rounded-full" style={{ width: '28%' }}></div>
                        </div>
                      </div>
                      
                      <div>
                        <div className="flex items-center justify-between mb-1">
                          <span className="text-sm">notification</span>
                          <span className="text-sm font-medium">15%</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div className="bg-primary h-2 rounded-full" style={{ width: '15%' }}></div>
                        </div>
                      </div>
                      
                      <div>
                        <div className="flex items-center justify-between mb-1">
                          <span className="text-sm">system.maintenance</span>
                          <span className="text-sm font-medium">10%</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div className="bg-primary h-2 rounded-full" style={{ width: '10%' }}></div>
                        </div>
                      </div>
                      
                      <div>
                        <div className="flex items-center justify-between mb-1">
                          <span className="text-sm">other</span>
                          <span className="text-sm font-medium">5%</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div className="bg-primary h-2 rounded-full" style={{ width: '5%' }}></div>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div>
                    <h3 className="text-lg font-medium mb-2">Recent Failed Events</h3>
                    <div className="space-y-2">
                      <div className="rounded-lg border p-3">
                        <div className="flex items-center justify-between">
                          <span className="font-medium">data.sync.users</span>
                          <span className="text-xs text-gray-500">3 attempts</span>
                        </div>
                        <p className="text-sm text-gray-600 mt-1">
                          Error: Connection timeout during database operation
                        </p>
                        <div className="flex justify-end mt-2">
                          <button className="text-xs text-primary">Retry Now</button>
                        </div>
                      </div>
                      
                      <div className="rounded-lg border p-3">
                        <div className="flex items-center justify-between">
                          <span className="font-medium">notification.email</span>
                          <span className="text-xs text-gray-500">2 attempts</span>
                        </div>
                        <p className="text-sm text-gray-600 mt-1">
                          Error: SMTP server rejected connection
                        </p>
                        <div className="flex justify-end mt-2">
                          <button className="text-xs text-primary">Retry Now</button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="cache" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Cache Performance</CardTitle>
                <CardDescription>Multi-level cache statistics and management</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div className="grid gap-4 md:grid-cols-3">
                    <div className="rounded-lg border p-4">
                      <div className="flex items-center justify-between mb-2">
                        <span className="font-medium">Memory Cache</span>
                        <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded-full">
                          87.3% Hit Rate
                        </span>
                      </div>
                      <div className="text-sm text-gray-600">
                        <div className="flex justify-between mb-1">
                          <span>Size:</span>
                          <span>42.8 MB / 100 MB</span>
                        </div>
                        <div className="flex justify-between mb-1">
                          <span>Items:</span>
                          <span>12,453</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Avg. Access Time:</span>
                          <span>0.2 ms</span>
                        </div>
                      </div>
                    </div>
                    
                    <div className="rounded-lg border p-4">
                      <div className="flex items-center justify-between mb-2">
                        <span className="font-medium">Disk Cache</span>
                        <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded-full">
                          72.1% Hit Rate
                        </span>
                      </div>
                      <div className="text-sm text-gray-600">
                        <div className="flex justify-between mb-1">
                          <span>Size:</span>
                          <span>1.2 GB / 10 GB</span>
                        </div>
                        <div className="flex justify-between mb-1">
                          <span>Items:</span>
                          <span>45,872</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Avg. Access Time:</span>
                          <span>12 ms</span>
                        </div>
                      </div>
                    </div>
                    
                    <div className="rounded-lg border p-4">
                      <div className="flex items-center justify-between mb-2">
                        <span className="font-medium">Distributed Cache</span>
                        <span className="text-xs bg-yellow-100 text-yellow-800 px-2 py-1 rounded-full">
                          65.4% Hit Rate
                        </span>
                      </div>
                      <div className="text-sm text-gray-600">
                        <div className="flex justify-between mb-1">
                          <span>Size:</span>
                          <span>4.5 GB / 50 GB</span>
                        </div>
                        <div className="flex justify-between mb-1">
                          <span>Items:</span>
                          <span>128,745</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Avg. Access Time:</span>
                          <span>45 ms</span>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div>
                    <h3 className="text-lg font-medium mb-2">Most Accessed Cache Keys</h3>
                    <div className="overflow-x-auto">
                      <table className="w-full text-sm">
                        <thead>
                          <tr className="border-b">
                            <th className="text-left py-2 font-medium">Cache Key</th>
                            <th className="text-left py-2 font-medium">Hit Count</th>
                            <th className="text-left py-2 font-medium">Size</th>
                            <th className="text-left py-2 font-medium">Last Accessed</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr className="border-b">
                            <td className="py-2">user_profile:1001</td>
                            <td className="py-2">12,453</td>
                            <td className="py-2">2.3 KB</td>
                            <td className="py-2">2 minutes ago</td>
                          </tr>
                          <tr className="border-b">
                            <td className="py-2">product_list:electronics</td>
                            <td className="py-2">8,721</td>
                            <td className="py-2">45.7 KB</td>
                            <td className="py-2">5 minutes ago</td>
                          </tr>
                          <tr className="border-b">
                            <td className="py-2">app_config:global</td>
                            <td className="py-2">7,845</td>
                            <td className="py-2">12.1 KB</td>
                            <td className="py-2">1 minute ago</td>
                          </tr>
                          <tr className="border-b">
                            <td className="py-2">menu:main</td>
                            <td className="py-2">6,932</td>
                            <td className="py-2">8.5 KB</td>
                            <td className="py-2">3 minutes ago</td>
                          </tr>
                \
