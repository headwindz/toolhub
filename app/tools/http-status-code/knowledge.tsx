import { KnowledgeSection } from '@/components/knowledge-section'

export function HTTPKnowledge() {
  return (
    <KnowledgeSection
      title="Learn About HTTP Status Codes"
      description="Understanding HTTP response status codes and their meanings"
    >
      <div className="space-y-2">
        <h4 className="font-semibold text-base">What are HTTP Status Codes?</h4>
        <p className="text-muted-foreground">
          HTTP status codes are three-digit numbers returned by a server in
          response to a client&apos;s request. They indicate whether the request
          was successful, failed, or requires further action. These codes are
          grouped into five categories based on their first digit.
        </p>
      </div>

      <div className="space-y-2">
        <h4 className="font-semibold text-base">Status Code Categories</h4>
        <div className="space-y-3">
          <div>
            <p className="font-semibold text-blue-600 dark:text-blue-400">
              1xx - Informational
            </p>
            <p className="text-sm text-muted-foreground">
              Indicates that the request was received and the process is
              continuing. These are interim responses.
            </p>
          </div>
          <div>
            <p className="font-semibold text-green-600 dark:text-green-400">
              2xx - Success
            </p>
            <p className="text-sm text-muted-foreground">
              The action was successfully received, understood, and accepted by
              the server.
            </p>
          </div>
          <div>
            <p className="font-semibold text-amber-600 dark:text-amber-400">
              3xx - Redirection
            </p>
            <p className="text-sm text-muted-foreground">
              Further action needs to be taken to complete the request, usually
              involving redirection.
            </p>
          </div>
          <div>
            <p className="font-semibold text-red-600 dark:text-red-400">
              4xx - Client Error
            </p>
            <p className="text-sm text-muted-foreground">
              The request contains bad syntax or cannot be fulfilled by the
              server. The error is on the client side.
            </p>
          </div>
          <div>
            <p className="font-semibold text-purple-600 dark:text-purple-400">
              5xx - Server Error
            </p>
            <p className="text-sm text-muted-foreground">
              The server failed to fulfill a valid request. The error is on the
              server side.
            </p>
          </div>
        </div>
      </div>

      <div className="space-y-2">
        <h4 className="font-semibold text-base">Most Common Status Codes</h4>
        <ul className="space-y-2 text-sm">
          <li className="flex items-start gap-2">
            <span className="font-mono font-semibold text-green-600 dark:text-green-400 shrink-0">
              200
            </span>
            <span className="text-muted-foreground">
              OK - The request succeeded
            </span>
          </li>
          <li className="flex items-start gap-2">
            <span className="font-mono font-semibold text-green-600 dark:text-green-400 shrink-0">
              201
            </span>
            <span className="text-muted-foreground">
              Created - A new resource was created
            </span>
          </li>
          <li className="flex items-start gap-2">
            <span className="font-mono font-semibold text-amber-600 dark:text-amber-400 shrink-0">
              301
            </span>
            <span className="text-muted-foreground">
              Moved Permanently - URL changed permanently
            </span>
          </li>
          <li className="flex items-start gap-2">
            <span className="font-mono font-semibold text-amber-600 dark:text-amber-400 shrink-0">
              302
            </span>
            <span className="text-muted-foreground">
              Found - Temporary redirect
            </span>
          </li>
          <li className="flex items-start gap-2">
            <span className="font-mono font-semibold text-red-600 dark:text-red-400 shrink-0">
              400
            </span>
            <span className="text-muted-foreground">
              Bad Request - Invalid request syntax
            </span>
          </li>
          <li className="flex items-start gap-2">
            <span className="font-mono font-semibold text-red-600 dark:text-red-400 shrink-0">
              401
            </span>
            <span className="text-muted-foreground">
              Unauthorized - Authentication required
            </span>
          </li>
          <li className="flex items-start gap-2">
            <span className="font-mono font-semibold text-red-600 dark:text-red-400 shrink-0">
              403
            </span>
            <span className="text-muted-foreground">
              Forbidden - Insufficient permissions
            </span>
          </li>
          <li className="flex items-start gap-2">
            <span className="font-mono font-semibold text-red-600 dark:text-red-400 shrink-0">
              404
            </span>
            <span className="text-muted-foreground">
              Not Found - Resource doesn&apos;t exist
            </span>
          </li>
          <li className="flex items-start gap-2">
            <span className="font-mono font-semibold text-purple-600 dark:text-purple-400 shrink-0">
              500
            </span>
            <span className="text-muted-foreground">
              Internal Server Error - Server-side error
            </span>
          </li>
          <li className="flex items-start gap-2">
            <span className="font-mono font-semibold text-purple-600 dark:text-purple-400 shrink-0">
              503
            </span>
            <span className="text-muted-foreground">
              Service Unavailable - Server overloaded or down
            </span>
          </li>
        </ul>
      </div>

      <div className="space-y-2">
        <h4 className="font-semibold text-base">
          When to Use Different Status Codes
        </h4>
        <p className="text-sm text-muted-foreground mb-2">
          <strong>RESTful APIs:</strong> Use appropriate status codes to
          communicate the result of operations:
        </p>
        <ul className="space-y-2 text-sm text-muted-foreground list-disc pl-5">
          <li>Use 201 when creating resources, include Location header</li>
          <li>Use 204 for successful DELETE operations</li>
          <li>Use 422 for validation errors instead of 400</li>
          <li>Use 429 with Retry-After header for rate limiting</li>
          <li>Use 503 during maintenance with Retry-After header</li>
        </ul>
      </div>
    </KnowledgeSection>
  )
}
