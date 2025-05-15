import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { AlertTriangle, Lock, Shield } from "lucide-react"

export default function SecurityPage() {
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="space-y-6">
        <div className="space-y-2">
          <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">Advanced Security System</h1>
          <p className="text-gray-500 md:text-xl/relaxed">Sophisticated rate limiting and security middleware</p>
        </div>

        <Tabs defaultValue="overview">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="ratelimiting">Rate Limiting</TabsTrigger>
            <TabsTrigger value="validation">Request Validation</TabsTrigger>
            <TabsTrigger value="anomaly">Anomaly Detection</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Security Middleware Architecture</CardTitle>
                <CardDescription>A comprehensive security system to protect your application</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <p>
                    Our advanced security middleware provides multiple layers of protection for your application,
                    combining rate limiting, request validation, and anomaly detection to prevent abuse and ensure
                    system integrity.
                  </p>

                  <div className="grid gap-4 md:grid-cols-3">
                    <div className="rounded-lg border p-4">
                      <div className="flex items-center gap-2 mb-2">
                        <Shield className="h-5 w-5 text-primary" />
                        <h3 className="font-medium">Rate Limiting</h3>
                      </div>
                      <p className="text-sm text-gray-500">
                        Prevents abuse by limiting request frequency from individual clients.
                      </p>
                    </div>

                    <div className="rounded-lg border p-4">
                      <div className="flex items-center gap-2 mb-2">
                        <Lock className="h-5 w-5 text-primary" />
                        <h3 className="font-medium">Request Validation</h3>
                      </div>
                      <p className="text-sm text-gray-500">
                        Ensures all incoming requests meet security and format requirements.
                      </p>
                    </div>

                    <div className="rounded-lg border p-4">
                      <div className="flex items-center gap-2 mb-2">
                        <AlertTriangle className="h-5 w-5 text-primary" />
                        <h3 className="font-medium">Anomaly Detection</h3>
                      </div>
                      <p className="text-sm text-gray-500">
                        Identifies and blocks suspicious activity patterns automatically.
                      </p>
                    </div>
                  </div>

                  <h3 className="text-lg font-medium mt-6">Security Flow</h3>
                  <ol className="list-decimal pl-6 space-y-2">
                    <li>
                      <span className="font-medium">Request Interception</span>: All incoming requests are intercepted
                      by the security middleware.
                    </li>
                    <li>
                      <span className="font-medium">IP & Client Identification</span>: The system identifies the client
                      through IP, headers, or tokens.
                    </li>
                    <li>
                      <span className="font-medium">Rate Limit Check</span>: Requests are checked against configured
                      rate limits for the endpoint.
                    </li>
                    <li>
                      <span className="font-medium">Request Validation</span>: Request content is validated against
                      security rules and schemas.
                    </li>
                    <li>
                      <span className="font-medium">Anomaly Scoring</span>: Requests are scored for suspicious patterns
                      or behaviors.
                    </li>
                    <li>
                      <span className="font-medium">Decision & Enforcement</span>: Based on all checks, the request is
                      allowed, blocked, or challenged.
                    </li>
                  </ol>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="ratelimiting" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Advanced Rate Limiting</CardTitle>
                <CardDescription>Sophisticated traffic control to prevent abuse</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <p>
                    Our rate limiting system goes beyond simple request counting to provide intelligent traffic
                    management that adapts to different endpoints, clients, and traffic patterns.
                  </p>

                  <h3 className="text-lg font-medium">Key Features</h3>
                  <ul className="list-disc pl-6 space-y-2">
                    <li>
                      <span className="font-medium">Endpoint-Specific Limits</span>: Different rate limits for different
                      API endpoints based on sensitivity and resource requirements.
                    </li>
                    <li>
                      <span className="font-medium">Multiple Time Windows</span>: Concurrent rate limits over different
                      time periods (e.g., per second, minute, hour, day).
                    </li>
                    <li>
                      <span className="font-medium">Custom Client Identification</span>: Flexible client identification
                      beyond IP address, including API keys, user IDs, or custom tokens.
                    </li>
                    <li>
                      <span className="font-medium">Graduated Response</span>: Progressive actions for rate limit
                      violations, from throttling to temporary blocks.
                    </li>
                    <li>
                      <span className="font-medium">Bypass Rules</span>: Configurable exceptions for trusted clients or
                      critical operations.
                    </li>
                  </ul>

                  <h3 className="text-lg font-medium mt-6">Implementation Example</h3>
                  <pre className="bg-gray-100 p-4 rounded-md overflow-x-auto">
                    <code>{`// Configure rate limiting for authentication endpoints
securityMiddleware.configureRateLimit("auth", {
  windowMs: 60000, // 1 minute
  maxRequests: 5, // 5 login attempts per minute
  message: "Too many login attempts, please try again later.",
  statusCode: 429,
  // Custom key generator to use both IP and username
  keyGenerator: (req) => {
    const body = JSON.parse(req.body);
    return \`\${getClientIP(req)}:\${body.username}\`;
  }
});

// Configure rate limiting for API endpoints
securityMiddleware.configureRateLimit("api", {
  windowMs: 60000, // 1 minute
  maxRequests: 100, // 100 requests per minute
  // Skip rate limiting for authenticated admin users
  skip: (req) => {
    const user = getUserFromRequest(req);
    return user && user.role === 'admin';
  }
});`}</code>
                  </pre>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="validation" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Request Validation</CardTitle>
                <CardDescription>Comprehensive request validation for security and data integrity</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <p>
                    Our request validation system ensures that all incoming requests meet security requirements and data
                    format specifications before they reach your application logic.
                  </p>

                  <h3 className="text-lg font-medium">Validation Capabilities</h3>
                  <ul className="list-disc pl-6 space-y-2">
                    <li>
                      <span className="font-medium">Schema Validation</span>: Enforce strict data schemas for request
                      bodies, parameters, and headers.
                    </li>
                    <li>
                      <span className="font-medium">Content Security</span>: Scan for malicious content, injection
                      attempts, and other security threats.
                    </li>
                    <li>
                      <span className="font-medium">Authentication Verification</span>: Validate authentication tokens,
                      signatures, and credentials.
                    </li>
                    <li>
                      <span className="font-medium">Authorization Checks</span>: Verify that the client has appropriate
                      permissions for the requested operation.
                    </li>
                    <li>
                      <span className="font-medium">Custom Validation Logic</span>: Support for complex,
                      business-specific validation rules.
                    </li>
                  </ul>

                  <h3 className="text-lg font-medium mt-6">Implementation Example</h3>
                  <pre className="bg-gray-100 p-4 rounded-md overflow-x-auto">
                    <code>{`// Add validation rule for user creation endpoint
securityMiddleware.addValidationRule({
  path: "/api/users",
  method: "POST",
  validate: async (req) => {
    const body = await req.json();
    
    // Check required fields
    if (!body.username || !body.email || !body.password) {
      return { 
        valid: false, 
        reason: "Missing required fields" 
      };
    }
    
    // Validate email format
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}$/;
    if (!emailRegex.test(body.email)) {
      return { 
        valid: false, 
        reason: "Invalid email format" 
      };
    }
    
    // Check password strength
    if (body.password.length < 8) {
      return { 
        valid: false, 
        reason: "Password must be at least 8 characters" 
      };
    }
    
    // Check for existing user (example)
    const existingUser = await checkUserExists(body.username, body.email);
    if (existingUser) {
      return { 
        valid: false, 
        reason: "Username or email already exists" 
      };
    }
    
    return { valid: true };
  }
});`}</code>
                  </pre>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="anomaly" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Anomaly Detection</CardTitle>
                <CardDescription>Intelligent threat detection and automated response</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <p>
                    Our anomaly detection system identifies suspicious patterns and behaviors, automatically responding
                    to potential security threats before they can impact your application.
                  </p>

                  <h3 className="text-lg font-medium">Detection Capabilities</h3>
                  <ul className="list-disc pl-6 space-y-2">
                    <li>
                      <span className="font-medium">Behavioral Analysis</span>: Monitor client behavior patterns to
                      detect anomalies.
                    </li>
                    <li>
                      <span className="font-medium">Request Pattern Monitoring</span>: Identify unusual request patterns
                      like scanning or brute force attempts.
                    </li>
                    <li>
                      <span className="font-medium">Velocity Checks</span>: Detect rapid changes in request frequency or
                      patterns.
                    </li>
                    <li>
                      <span className="font-medium">Geographic Anomalies</span>: Flag suspicious access from unexpected
                      locations.
                    </li>
                    <li>
                      <span className="font-medium">Content Analysis</span>: Identify potentially malicious payloads or
                      injection attempts.
                    </li>
                  </ul>

                  <h3 className="text-lg font-medium mt-6">Automated Responses</h3>
                  <p>When suspicious activity is detected, the system can automatically take action:</p>
                  <ul className="list-disc pl-6 space-y-2">
                    <li>
                      <span className="font-medium">Temporary IP Blocking</span>: Block suspicious IPs for a
                      configurable duration.
                    </li>
                    <li>
                      <span className="font-medium">Challenge Requests</span>: Present CAPTCHA or other challenges to
                      verify human users.
                    </li>
                    <li>
                      <span className="font-medium">Account Lockouts</span>: Temporarily lock accounts showing
                      suspicious activity.
                    </li>
                    <li>
                      <span className="font-medium">Enhanced Logging</span>: Increase logging detail for suspicious
                      clients.
                    </li>
                    <li>
                      <span className="font-medium">Alert Generation</span>: Send notifications to security personnel
                      for manual review.
                    </li>
                  </ul>

                  <h3 className="text-lg font-medium mt-6">Implementation Example</h3>
                  <pre className="bg-gray-100 p-4 rounded-md overflow-x-auto">
                    <code>{`// Example of how the system tracks and responds to suspicious activity
// This happens automatically within the security middleware

// When a validation failure occurs
if (!validationResult.allowed) {
  // Increment suspicious activity counter for this IP
  const currentCount = incrementSuspiciousActivity(clientIP);
  
  // If threshold exceeded, block the IP
  if (currentCount >= suspiciousActivityThreshold) {
    // Block for 24 hours
    securityMiddleware.blockIP(clientIP, 24 * 60 * 60 * 1000);
    
    // Log the blocking event
    console.log(\`Blocked IP \${clientIP} for suspicious activity\`);
    
    // Send alert to security team
    await sendSecurityAlert({
      type: 'ip_blocked',
      ip: clientIP,
      reason: 'Exceeded suspicious activity threshold',
      activityCount: currentCount,
      timestamp: new Date().toISOString()
    });
  }
}`}</code>
                  </pre>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
