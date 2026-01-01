import { KnowledgeSection } from '@/components/knowledge-section'

export function UrlKnowledge() {
  return (
    <KnowledgeSection
      title="Understanding URLs and URL Components"
      description="Learn about URL structure and how to work with web addresses"
    >
      <div className="space-y-2">
        <h4 className="font-semibold text-base">What is a URL?</h4>
        <p className="text-muted-foreground">
          A URL (Uniform Resource Locator) is the address of a resource on the
          web. It tells your browser where to find a webpage, image, or any
          other resource online. URLs follow a specific structure that helps
          identify and locate resources.
        </p>
      </div>

      <div className="space-y-2">
        <h4 className="font-semibold text-base">URL Components</h4>
        <div className="space-y-2 text-sm">
          <div className="bg-muted/50 p-3 rounded">
            <div className="font-mono text-blue-600 mb-2">
              https://user:pass@example.com:8080/path/to/page?param=value#section
            </div>
            <div className="space-y-1">
              <div>
                <strong>Protocol:</strong> <code>https://</code> - How to
                communicate (http, https, ftp, etc.)
              </div>
              <div>
                <strong>Authentication:</strong> <code>user:pass@</code> -
                Username and password (optional)
              </div>
              <div>
                <strong>Host:</strong> <code>example.com</code> - The domain
                name or IP address
              </div>
              <div>
                <strong>Port:</strong> <code>:8080</code> - The port number
                (optional, defaults vary by protocol)
              </div>
              <div>
                <strong>Path:</strong> <code>/path/to/page</code> - The specific
                resource location
              </div>
              <div>
                <strong>Query:</strong> <code>?param=value</code> - Parameters
                sent to the server
              </div>
              <div>
                <strong>Fragment:</strong> <code>#section</code> - Anchor link
                within the page
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="space-y-2">
        <h4 className="font-semibold text-base">Common Protocols</h4>
        <ul className="space-y-1 text-muted-foreground text-sm">
          <li>
            <strong>http://</strong> - Hypertext Transfer Protocol (unsecured)
          </li>
          <li>
            <strong>https://</strong> - HTTP Secure (encrypted with SSL/TLS)
          </li>
          <li>
            <strong>ftp://</strong> - File Transfer Protocol
          </li>
          <li>
            <strong>mailto:</strong> - Email addresses
          </li>
          <li>
            <strong>file://</strong> - Local files
          </li>
        </ul>
      </div>

      <div className="space-y-2">
        <h4 className="font-semibold text-base">Default Ports</h4>
        <div className="grid grid-cols-2 gap-2 text-sm">
          <div className="bg-muted/50 p-2 rounded text-center">
            <div className="font-semibold">HTTP</div>
            <div className="text-muted-foreground">Port 80</div>
          </div>
          <div className="bg-muted/50 p-2 rounded text-center">
            <div className="font-semibold">HTTPS</div>
            <div className="text-muted-foreground">Port 443</div>
          </div>
          <div className="bg-muted/50 p-2 rounded text-center">
            <div className="font-semibold">FTP</div>
            <div className="text-muted-foreground">Port 21</div>
          </div>
          <div className="bg-muted/50 p-2 rounded text-center">
            <div className="font-semibold">SSH</div>
            <div className="text-muted-foreground">Port 22</div>
          </div>
        </div>
      </div>

      <div className="space-y-2">
        <h4 className="font-semibold text-base">Query Parameters</h4>
        <p className="text-muted-foreground">
          Query parameters (or query strings) are used to send additional data
          to the server.
        </p>
        <ul className="space-y-1 text-muted-foreground text-sm">
          <li>
            Start with a question mark <code>?</code>
          </li>
          <li>
            Format: <code>key=value</code>
          </li>
          <li>
            Multiple parameters separated by <code>&amp;</code>
          </li>
          <li>
            Example: <code>?search=javascript&amp;page=2&amp;sort=date</code>
          </li>
        </ul>
      </div>

      <div className="space-y-2">
        <h4 className="font-semibold text-base">URL Encoding</h4>
        <p className="text-muted-foreground">
          Special characters in URLs must be encoded to ensure proper
          transmission:
        </p>
        <div className="space-y-1 text-sm">
          <div className="flex justify-between bg-muted/50 p-2 rounded">
            <span>Space</span>
            <code>%20</code>
          </div>
          <div className="flex justify-between bg-muted/50 p-2 rounded">
            <span>&amp;</span>
            <code>%26</code>
          </div>
          <div className="flex justify-between bg-muted/50 p-2 rounded">
            <span>=</span>
            <code>%3D</code>
          </div>
          <div className="flex justify-between bg-muted/50 p-2 rounded">
            <span>?</span>
            <code>%3F</code>
          </div>
        </div>
      </div>

      <div className="space-y-2">
        <h4 className="font-semibold text-base">Best Practices</h4>
        <ul className="space-y-1 text-muted-foreground">
          <li>Always use HTTPS for secure communication</li>
          <li>Keep URLs readable and descriptive</li>
          <li>Avoid exposing sensitive information in URLs</li>
          <li>Use proper URL encoding for special characters</li>
          <li>Be consistent with trailing slashes</li>
          <li>Use hyphens instead of underscores in URLs</li>
        </ul>
      </div>

      <div className="space-y-2">
        <h4 className="font-semibold text-base">Common Use Cases</h4>
        <ul className="space-y-1 text-muted-foreground">
          <li>
            <strong>Web Development:</strong> Building and testing API endpoints
          </li>
          <li>
            <strong>SEO:</strong> Analyzing and optimizing URL structures
          </li>
          <li>
            <strong>Debugging:</strong> Understanding request parameters and
            paths
          </li>
          <li>
            <strong>Integration:</strong> Constructing URLs for external
            services
          </li>
          <li>
            <strong>Analytics:</strong> Parsing URLs from web traffic logs
          </li>
        </ul>
      </div>
    </KnowledgeSection>
  )
}
