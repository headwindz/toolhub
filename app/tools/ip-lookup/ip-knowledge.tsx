import { KnowledgeSection } from "@/components/knowledge-section";

export function IpKnowledge() {
  return (
    <KnowledgeSection
      title="Learn about IP addresses"
      description="Understand IP geolocation and internet addresses"
    >
      <div className="space-y-2">
        <h4 className="font-semibold text-base">What is an IP Address?</h4>
        <p className="text-muted-foreground">
          An Internet Protocol (IP) address is a unique numerical label assigned
          to each device connected to a network. It serves two main functions:
          host identification and location addressing. There are two main
          versions: IPv4 (e.g., 192.168.1.1) and IPv6 (e.g., 2001:0db8::1).
        </p>
      </div>
      <div className="space-y-2">
        <h4 className="font-semibold text-base">IP Geolocation</h4>
        <p className="text-muted-foreground">
          IP geolocation is the process of identifying the physical location of
          a device using its IP address. Databases map IP address ranges to
          geographic locations based on information from Regional Internet
          Registries (RIRs) and ISP records. This data includes country, region,
          city, coordinates, and ISP information.
        </p>
      </div>
      <div className="space-y-2">
        <h4 className="font-semibold text-base">Common Uses</h4>
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
      <div className="space-y-2">
        <h4 className="font-semibold text-base">Important Considerations</h4>
        <p className="text-muted-foreground">
          IP geolocation is not 100% accurate, especially for mobile devices and
          VPN/proxy users. VPNs and proxies mask the actual IP, showing only the
          exit server's location. Accuracy varies by region—developed countries
          typically have better data coverage than remote areas.
        </p>
      </div>
    </KnowledgeSection>
  );
}
