import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ArrowDownUp, Clock, Zap } from "lucide-react"

export default function EventsPage() {
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="space-y-6">
        <div className="space-y-2">
          <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">Event Processing System</h1>
          <p className="text-gray-500 md:text-xl/relaxed">Real-time event processing pipeline with custom event bus</p>
        </div>

        <Tabs defaultValue="architecture">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="architecture">Architecture</TabsTrigger>
            <TabsTrigger value="features">Key Features</TabsTrigger>
            <TabsTrigger value="examples">Usage Examples</TabsTrigger>
          </TabsList>

          <TabsContent value="architecture" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Event-Driven Architecture</CardTitle>
                <CardDescription>A sophisticated event processing system for asynchronous operations</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <p>
                    Our event-driven architecture decouples system components through an advanced event bus, allowing
                    for highly scalable and resilient operations. The system processes events asynchronously with
                    prioritization, batching, and parallel execution capabilities.
                  </p>

                  <div className="grid gap-4 md:grid-cols-3">
                    <div className="rounded-lg border p-4">
                      <div className="flex items-center gap-2 mb-2">
                        <Zap className="h-5 w-5 text-primary" />
                        <h3 className="font-medium">Event Emission</h3>
                      </div>
                      <p className="text-sm text-gray-500">
                        Components emit events with payloads and optional metadata like priority and idempotency keys.
                      </p>
                    </div>

                    <div className="rounded-lg border p-4">
                      <div className="flex items-center gap-2 mb-2">
                        <ArrowDownUp className="h-5 w-5 text-primary" />
                        <h3 className="font-medium">Event Bus</h3>
                      </div>
                      <p className="text-sm text-gray-500">
                        Central event management with intelligent routing, prioritization, and delivery guarantees.
                      </p>
                    </div>

                    <div className="rounded-lg border p-4">
                      <div className="flex items-center gap-2 mb-2">
                        <Clock className="h-5 w-5 text-primary" />
                        <h3 className="font-medium">Event Handlers</h3>
                      </div>
                      <p className="text-sm text-gray-500">
                        Registered handlers process events with automatic retries and error handling.
                      </p>
                    </div>
                  </div>

                  <h3 className="text-lg font-medium mt-6">System Flow</h3>
                  <ol className="list-decimal pl-6 space-y-2">
                    <li>
                      <span className="font-medium">Event Creation</span>: Components create events with a type,
                      payload, and optional metadata.
                    </li>
                    <li>
                      <span className="font-medium">Event Emission</span>: Events are emitted to the event bus with
                      configurable options.
                    </li>
                    <li>
                      <span className="font-medium">Prioritization & Scheduling</span>: The event bus sorts and
                      schedules events based on priority and other factors.
                    </li>
                    <li>
                      <span className="font-medium">Handler Execution</span>: Registered handlers for the event type are
                      executed in sequence or parallel.
                    </li>
                    <li>
                      <span className="font-medium">Result Tracking</span>: Event processing results are tracked for
                      monitoring and debugging.
                    </li>
                  </ol>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="features" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Advanced Event Processing Features</CardTitle>
                <CardDescription>Sophisticated capabilities for reliable event processing</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <h3 className="text-lg font-medium">Priority-based Processing</h3>
                  <p>
                    Events can be assigned priority levels (high, medium, low) to ensure critical operations are
                    processed before less important ones. The event bus automatically sorts the event queue based on
                    priority and timestamp.
                  </p>

                  <h3 className="text-lg font-medium mt-6">Automatic Retries</h3>
                  <p>Failed event processing is automatically retried with configurable retry policies:</p>
                  <ul className="list-disc pl-6 space-y-2">
                    <li>
                      <span className="font-medium">Configurable Attempts</span>: Set maximum retry attempts per event
                      type.
                    </li>
                    <li>
                      <span className="font-medium">Backoff Strategies</span>: Support for fixed, exponential, or custom
                      backoff algorithms.
                    </li>
                    <li>
                      <span className="font-medium">Failure Handling</span>: Dedicated error handlers for persistent
                      failures.
                    </li>
                  </ul>

                  <h3 className="text-lg font-medium mt-6">Idempotency</h3>
                  <p>
                    Events can be processed idempotently using unique idempotency keys, ensuring that duplicate events
                    (e.g., due to retries or client errors) are handled correctly without causing duplicate side
                    effects.
                  </p>

                  <h3 className="text-lg font-medium mt-6">Delayed Processing</h3>
                  <p>Events can be scheduled for future processing with precise timing control:</p>
                  <ul className="list-disc pl-6 space-y-2">
                    <li>
                      <span className="font-medium">Absolute Timing</span>: Schedule events for specific timestamps.
                    </li>
                    <li>
                      <span className="font-medium">Relative Delays</span>: Delay processing by a specified duration.
                    </li>
                    <li>
                      <span className="font-medium">Recurring Events</span>: Support for periodic event scheduling.
                    </li>
                  </ul>

                  <h3 className="text-lg font-medium mt-6">Concurrency Control</h3>
                  <p>
                    The event bus intelligently manages concurrent event processing to maximize throughput while
                    preventing system overload:
                  </p>
                  <ul className="list-disc pl-6 space-y-2">
                    <li>
                      <span className="font-medium">Parallel Processing</span>: Multiple events processed
                      simultaneously.
                    </li>
                    <li>
                      <span className="font-medium">Concurrency Limits</span>: Configurable maximum concurrent events.
                    </li>
                    <li>
                      <span className="font-medium">Resource Awareness</span>: Adaptive concurrency based on system
                      load.
                    </li>
                  </ul>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="examples" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Event System Usage Examples</CardTitle>
                <CardDescription>Practical examples of the event system in action</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div>
                    <h3 className="text-lg font-medium">Basic Event Emission</h3>
                    <p className="mb-2">Emitting a simple event with default options:</p>
                    <pre className="bg-gray-100 p-4 rounded-md overflow-x-auto">
                      <code>{`// Emit a user registration event
await eventBus.emit('user.registered', {
  userId: 'user123',
  email: 'user@example.com',
  registeredAt: new Date().toISOString()
});`}</code>
                    </pre>
                  </div>

                  <div>
                    <h3 className="text-lg font-medium">High-Priority Event</h3>
                    <p className="mb-2">Emitting a critical event that needs immediate processing:</p>
                    <pre className="bg-gray-100 p-4 rounded-md overflow-x-auto">
                      <code>{`// Emit a payment failure event with high priority
await eventBus.emit('payment.failed', {
  orderId: 'order456',
  customerId: 'cust789',
  amount: 99.99,
  reason: 'insufficient_funds'
}, {
  priority: 'high'
});`}</code>
                    </pre>
                  </div>

                  <div>
                    <h3 className="text-lg font-medium">Delayed Event Processing</h3>
                    <p className="mb-2">Scheduling an event for future processing:</p>
                    <pre className="bg-gray-100 p-4 rounded-md overflow-x-auto">
                      <code>{`// Schedule a reminder email to be sent in 24 hours
await eventBus.emit('email.reminder', {
  userId: 'user123',
  templateId: 'abandoned-cart',
  data: { items: ['product1', 'product2'] }
}, {
  delay: 24 * 60 * 60 * 1000 // 24 hours in milliseconds
});`}</code>
                    </pre>
                  </div>

                  <div>
                    <h3 className="text-lg font-medium">Idempotent Event Processing</h3>
                    <p className="mb-2">Ensuring an event is processed exactly once:</p>
                    <pre className="bg-gray-100 p-4 rounded-md overflow-x-auto">
                      <code>{`// Process an order with idempotency key to prevent duplicates
await eventBus.emit('order.created', {
  orderId: 'order456',
  items: [{ id: 'item1', quantity: 2 }],
  total: 129.99
}, {
  idempotencyKey: 'order-creation-order456',
  retry: {
    attempts: 5,
    backoff: 'exponential',
    interval: 1000 // Start with 1 second, then 2s, 4s, 8s, etc.
  }
});`}</code>
                    </pre>
                  </div>

                  <div>
                    <h3 className="text-lg font-medium">Event Handler Registration</h3>
                    <p className="mb-2">Registering handlers for specific event types:</p>
                    <pre className="bg-gray-100 p-4 rounded-md overflow-x-auto">
                      <code>{`// Register a handler for user registration events
eventBus.on('user.registered', async (event) => {
  // Send welcome email
  await sendEmail({
    to: event.payload.email,
    template: 'welcome',
    data: {
      userId: event.payload.userId
    }
  });
  
  // Log the activity
  console.log(\`Welcome email sent to \${event.payload.email}\`);
});`}</code>
                    </pre>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
