import { KnowledgeSection } from '@/components/knowledge-section'

export function CORSKnowledge() {
  return (
    <KnowledgeSection
      title="Learn About CORS"
      description="Understanding Cross-Origin Resource Sharing and browser security"
    >
      <div className="space-y-2">
        <h4 className="font-semibold text-base">What is CORS?</h4>
        <p className="text-muted-foreground">
          CORS (Cross-Origin Resource Sharing) is a security feature implemented
          by browsers to control how web pages from one origin can access
          resources from a different origin. An origin consists of the protocol
          (http/https), domain, and port number.
        </p>
      </div>

      <div className="space-y-2">
        <h4 className="font-semibold text-base">Why Does CORS Exist?</h4>
        <p className="text-muted-foreground">
          CORS exists to protect users from malicious websites. Without CORS,
          any website could make requests to your bank&apos;s API while
          you&apos;re logged in, potentially stealing your data or performing
          unauthorized actions. CORS ensures that only trusted origins can
          access your API.
        </p>
      </div>

      <div className="space-y-2">
        <h4 className="font-semibold text-base">
          Simple vs Preflight Requests
        </h4>
        <div className="space-y-3">
          <div>
            <p className="font-semibold text-green-600 dark:text-green-400 text-sm">
              Simple Requests
            </p>
            <p className="text-sm text-muted-foreground">
              Simple requests don&apos;t trigger a preflight. They must use GET,
              HEAD, or POST methods, only simple headers, and specific
              Content-Types (application/x-www-form-urlencoded,
              multipart/form-data, or text/plain).
            </p>
          </div>
          <div>
            <p className="font-semibold text-amber-600 dark:text-amber-400 text-sm">
              Preflight Requests
            </p>
            <p className="text-sm text-muted-foreground">
              Preflight requests are automatically sent before the actual
              request if you use custom headers, methods like PUT/DELETE/PATCH,
              or Content-Type: application/json. The browser sends an OPTIONS
              request first to check if the actual request is allowed.
            </p>
          </div>
        </div>
      </div>

      <div className="space-y-2">
        <h4 className="font-semibold text-base">Common CORS Headers</h4>
        <ul className="space-y-2 text-sm">
          <li className="flex items-start gap-2">
            <code className="bg-muted rounded px-2 py-0.5 shrink-0 text-xs">
              Access-Control-Allow-Origin
            </code>
            <span className="text-muted-foreground">
              Specifies which origins can access the resource (e.g., * or
              https://myapp.com)
            </span>
          </li>
          <li className="flex items-start gap-2">
            <code className="bg-muted rounded px-2 py-0.5 shrink-0 text-xs">
              Access-Control-Allow-Methods
            </code>
            <span className="text-muted-foreground">
              Lists allowed HTTP methods (GET, POST, PUT, DELETE, etc.)
            </span>
          </li>
          <li className="flex items-start gap-2">
            <code className="bg-muted rounded px-2 py-0.5 shrink-0 text-xs">
              Access-Control-Allow-Headers
            </code>
            <span className="text-muted-foreground">
              Lists allowed custom headers (Authorization, Content-Type, etc.)
            </span>
          </li>
          <li className="flex items-start gap-2">
            <code className="bg-muted rounded px-2 py-0.5 shrink-0 text-xs">
              Access-Control-Allow-Credentials
            </code>
            <span className="text-muted-foreground">
              Must be true when sending cookies or authentication
            </span>
          </li>
          <li className="flex items-start gap-2">
            <code className="bg-muted rounded px-2 py-0.5 shrink-0 text-xs">
              Access-Control-Max-Age
            </code>
            <span className="text-muted-foreground">
              How long the preflight response can be cached (in seconds)
            </span>
          </li>
        </ul>
      </div>

      <div className="space-y-2">
        <h4 className="font-semibold text-base">Common CORS Issues</h4>
        <ul className="space-y-2 text-sm text-muted-foreground list-disc pl-5">
          <li>
            <strong>Missing Access-Control-Allow-Origin:</strong> The most
            common error. Server must explicitly allow your origin.
          </li>
          <li>
            <strong>Wildcard with credentials:</strong> Cannot use * for origin
            when credentials are included. Must specify exact origin.
          </li>
          <li>
            <strong>Preflight failure:</strong> OPTIONS request must return
            proper CORS headers and 2xx status code.
          </li>
          <li>
            <strong>Custom headers not allowed:</strong> Server must list custom
            headers in Access-Control-Allow-Headers.
          </li>
          <li>
            <strong>Method not allowed:</strong> Server must include your HTTP
            method in Access-Control-Allow-Methods.
          </li>
        </ul>
      </div>

      <div className="space-y-2">
        <h4 className="font-semibold text-base">Development Tips</h4>
        <ul className="space-y-2 text-sm text-muted-foreground list-disc pl-5">
          <li>
            CORS is a browser security feature. Tools like Postman or curl
            don&apos;t enforce CORS.
          </li>
          <li>
            Disabling CORS in your browser is not a solution for production
            applications.
          </li>
          <li>
            Use a proxy during development if you can&apos;t modify the server
            CORS settings.
          </li>
          <li>
            Always set up proper CORS headers on your server for production.
          </li>
          <li>
            Be specific with origins in production rather than using wildcard
            (*).
          </li>
        </ul>
      </div>
    </KnowledgeSection>
  )
}
