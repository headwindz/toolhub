import { KnowledgeSection } from '@/components/knowledge-section'

export function QRKnowledge() {
  return (
    <KnowledgeSection
      title="Learn about QR codes"
      description="Understanding QR code technology and applications"
    >
      <div className="space-y-2">
        <h4 className="font-semibold text-base">What is a QR code?</h4>
        <p className="text-muted-foreground">
          QR (Quick Response) code is a two-dimensional barcode invented in 1994
          by Denso Wave. It can store up to 4,296 alphanumeric characters or
          7,089 numeric characters, making it perfect for encoding URLs, contact
          information, WiFi credentials, and more. QR codes are designed to be
          quickly scanned by smartphones and dedicated readers.
        </p>
      </div>
      <div className="space-y-2">
        <h4 className="font-semibold text-base">How QR codes work</h4>
        <p className="text-muted-foreground">
          QR codes encode data in a grid of black and white squares. The pattern
          includes position markers (large squares in corners), alignment
          patterns, timing patterns, and the actual data. Error correction is
          built-in, allowing QR codes to remain readable even if up to 30% of
          the code is damaged or obscured.
        </p>
      </div>
      <div className="space-y-2">
        <h4 className="font-semibold text-base">Common use cases</h4>
        <ul className="list-disc space-y-1 text-muted-foreground pl-5">
          <li>
            <strong>Marketing:</strong> Direct customers to websites, product
            pages, or promotional offers
          </li>
          <li>
            <strong>Payments:</strong> Enable quick mobile payments and
            cryptocurrency transactions
          </li>
          <li>
            <strong>Authentication:</strong> Two-factor authentication (2FA)
            setup and login verification
          </li>
          <li>
            <strong>Information sharing:</strong> Share WiFi passwords, contact
            details (vCards), or event information
          </li>
          <li>
            <strong>Asset tracking:</strong> Inventory management and equipment
            identification
          </li>
        </ul>
      </div>
      <div className="space-y-2">
        <h4 className="font-semibold text-base">QR code types</h4>
        <ul className="list-disc space-y-1 text-muted-foreground pl-5">
          <li>
            <strong>URL:</strong> Direct links to websites (most common)
          </li>
          <li>
            <strong>vCard:</strong> Contact information for easy saving
          </li>
          <li>
            <strong>WiFi:</strong> Automatic network connection
          </li>
          <li>
            <strong>Email:</strong> Pre-filled email composition
          </li>
          <li>
            <strong>SMS/Phone:</strong> Initiate calls or text messages
          </li>
          <li>
            <strong>Plain Text:</strong> Any alphanumeric content
          </li>
        </ul>
      </div>
      <div className="border rounded-lg bg-green-500/10 border-green-500/50 p-4">
        <h4 className="font-semibold text-base mb-2 text-green-900 dark:text-green-100">
          💡 Best practices
        </h4>
        <ul className="list-disc space-y-1 text-sm pl-5 text-green-900/80 dark:text-green-100/80">
          <li>Use high resolution (at least 300x300px) for print materials</li>
          <li>Ensure sufficient contrast between code and background</li>
          <li>Test QR codes with multiple devices before distributing</li>
          <li>Keep URLs short to create simpler, more scannable codes</li>
          <li>Add a margin of at least 4 modules around the QR code</li>
        </ul>
      </div>
    </KnowledgeSection>
  )
}
