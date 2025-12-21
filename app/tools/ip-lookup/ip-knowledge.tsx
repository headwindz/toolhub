export function IpKnowledge() {
  return (
    <div className="space-y-4 text-sm leading-relaxed p-6">
      <div>
        <h4 className="font-semibold text-base mb-2">What is an IP Address?</h4>
        <p className="text-muted-foreground">
          An Internet Protocol (IP) address is a unique numerical label assigned
          to each device connected to a network. It serves two main functions:
          host identification and location addressing. There are two main
          versions: IPv4 (e.g., 192.168.1.1) and IPv6 (e.g., 2001:0db8::1).
        </p>
      </div>
      <div>
        <h4 className="font-semibold text-base mb-2">IP Geolocation</h4>
        <p className="text-muted-foreground">
          IP geolocation is the process of identifying the physical location of
          a device using its IP address. Databases map IP address ranges to
          geographic locations based on information from Regional Internet
          Registries (RIRs) and ISP records. This data includes country, region,
          city, coordinates, and ISP information.
        </p>
      </div>
      <div>
        <h4 className="font-semibold text-base mb-2">Common Uses</h4>
        <ul className="list-disc space-y-1 text-muted-foreground pl-5">
          <li>
            <strong>Content Localization:</strong> Serve content in the user's
            language and region.
          </li>
          <li>
            <strong>Security:</strong> Detect and prevent fraud, DDoS attacks,
            and unauthorized access.
          </li>
          <li>
            <strong>Analytics:</strong> Track visitor demographics and traffic
            patterns.
          </li>
          <li>
            <strong>Legal Compliance:</strong> Ensure adherence to regional data
            protection laws like GDPR.
          </li>
        </ul>
      </div>
      <div>
        <h4 className="font-semibold text-base mb-2">
          Important Considerations
        </h4>
        <p className="text-muted-foreground">
          IP geolocation is not 100% accurate, especially for mobile devices and
          VPN/proxy users. VPNs and proxies mask the actual IP, showing only the
          exit server's location. Accuracy varies by region—developed countries
          typically have better data coverage than remote areas.
        </p>
      </div>
    </div>
  );
}
