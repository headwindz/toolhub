import { KnowledgeSection } from '@/components/knowledge-section'

export function QRParserKnowledge() {
  return (
    <KnowledgeSection
      title="About QR Code Parser"
      description="Extract text and URLs from QR code images using this client-side parser."
    >
      <div className="space-y-4">
        <div>
          <h3 className="font-semibold mb-2">What is a QR code parser?</h3>
          <p className="text-sm text-muted-foreground">
            A QR code parser is a tool that reads and extracts information from
            QR (Quick Response) code images. It decodes the patterns in the
            image to reveal the text, URL, or data encoded within.
          </p>
        </div>

        <div>
          <h3 className="font-semibold mb-2">Common Use Cases</h3>
          <ul className="text-sm text-muted-foreground space-y-1 ml-4">
            <li>• Extract URLs from QR codes in screenshots</li>
            <li>• Read contact information from business cards</li>
            <li>• Retrieve WiFi passwords from QR codes</li>
            <li>• Decode promotional codes and coupons</li>
            <li>• Extract event details from tickets</li>
          </ul>
        </div>

        <div>
          <h3 className="font-semibold mb-2">Privacy & Security</h3>
          <p className="text-sm text-muted-foreground">
            This tool processes all images locally in your browser. No data is
            sent to any server, ensuring your privacy and security. Your QR code
            images and their contents never leave your device.
          </p>
        </div>
      </div>
    </KnowledgeSection>
  )
}
