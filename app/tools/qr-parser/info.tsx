import { Card } from '@/components/ui/card'

export function Info() {
  return (
    <Card className="border-dashed bg-muted/30 border-2 p-6">
      <h3 className="font-semibold mb-3">📱 How to Use</h3>
      <ul className="space-y-2 text-sm text-muted-foreground">
        <li>• Click "Upload" to select a QR code image from your device</li>
        <li>• Or paste an image directly using Ctrl+V / Cmd+V</li>
        <li>• Screenshot QR codes work great too!</li>
        <li>• All processing happens locally in your browser</li>
      </ul>
    </Card>
  )
}
