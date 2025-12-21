export function UserAgentKnowledge() {
  return (
    <div className="space-y-4 text-sm leading-relaxed p-6">
      <div>
        <h4 className="font-semibold text-base mb-2">What is a User Agent?</h4>
        <p className="text-muted-foreground">
          A User Agent is a text string that web browsers send to web servers to
          identify themselves. It contains information about the browser type,
          version, operating system, device, and rendering engine. Web servers
          use this information to serve appropriate content, optimize
          experiences, and gather analytics.
        </p>
      </div>
      <div>
        <h4 className="font-semibold text-base mb-2">
          User Agent String Components
        </h4>
        <ul className="list-disc space-y-1 text-muted-foreground pl-5">
          <li>
            <strong>Browser Name & Version:</strong> Chrome, Firefox, Safari,
            Edge, etc.
          </li>
          <li>
            <strong>Operating System:</strong> Windows, macOS, Linux, iOS,
            Android
          </li>
          <li>
            <strong>Device Type:</strong> Desktop, Mobile, Tablet
          </li>
          <li>
            <strong>Rendering Engine:</strong> Blink, Gecko, WebKit, Trident
          </li>
          <li>
            <strong>Platform Details:</strong> CPU architecture, language
            preferences
          </li>
        </ul>
      </div>
      <div>
        <h4 className="font-semibold text-base mb-2">Common Use Cases</h4>
        <ul className="list-disc space-y-1 text-muted-foreground pl-5">
          <li>
            <strong>Responsive Design:</strong> Serve mobile-optimized content
            to mobile devices
          </li>
          <li>
            <strong>Browser Compatibility:</strong> Detect browser features and
            apply polyfills
          </li>
          <li>
            <strong>Analytics:</strong> Track visitor demographics and device
            preferences
          </li>
          <li>
            <strong>Security:</strong> Detect bots, scrapers, and suspicious
            patterns
          </li>
          <li>
            <strong>Feature Detection:</strong> Determine browser capabilities
            before loading features
          </li>
        </ul>
      </div>
      <div>
        <h4 className="font-semibold text-base mb-2">Privacy Considerations</h4>
        <p className="text-muted-foreground">
          User agent strings can be used for browser fingerprinting, raising
          privacy concerns. Modern browsers are moving toward User-Agent Client
          Hints (UA-CH), which provide more privacy-friendly ways to share
          necessary information. Some users modify their user agent strings
          using extensions for enhanced privacy.
        </p>
      </div>
      <div className="border rounded-lg bg-cyan-500/10 border-cyan-500/50 p-4">
        <h4 className="font-semibold text-base mb-2 text-cyan-900 dark:text-cyan-100">
          💡 Developer Tips
        </h4>
        <ul className="list-disc space-y-1 text-sm pl-5 text-cyan-900/80 dark:text-cyan-100/80">
          <li>
            Use feature detection instead of user agent sniffing when possible
          </li>
          <li>Don't rely solely on user agents - they can be easily spoofed</li>
          <li>Consider progressive enhancement over device-specific code</li>
          <li>Test across real devices, not just user agent spoofing tools</li>
        </ul>
      </div>
    </div>
  );
}
