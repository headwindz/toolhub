import { Card } from '@/components/ui/card'

export function Empty() {
  return (
    <Card className="border-dashed bg-muted/30 border-2 p-6">
      <h3 className="font-semibold mb-3">💡 Quick Tips</h3>
      <ul className="space-y-2 text-sm text-muted-foreground">
        <li>
          • Perfect for sharing website links, WiFi passwords, or contact info
        </li>
        <li>• Generated QR codes work with any standard QR code scanner</li>
        <li>
          • Download in high resolution for printing on business cards or
          posters
        </li>
      </ul>
    </Card>
  )
}
