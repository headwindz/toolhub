'use client'

import { ToolLayout } from '@/components/tool-layout'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Download, QrCode, Sparkles } from 'lucide-react'
import { useState } from 'react'
import { Empty } from './empty'
import { QRKnowledge } from './knowledge'

export default function QRGeneratorPage() {
  const [text, setText] = useState('')

  return (
    <ToolLayout
      title="QR Code Generator"
      description="Transform any text or URL into a scannable QR code"
      icon={QrCode}
      badges={[
        { label: 'Instant generation', icon: Sparkles },
        { label: 'High quality' },
      ]}
    >
      <QRKnowledge />

      <Card className="border-2 shadow-xl overflow-hidden">
        <div className="bg-gradient-to-r to-transparent from-primary/10 via-primary/5 px-6 py-3">
          <h2 className="font-semibold text-xl">Create Your QR Code</h2>
          <p className="text-sm text-muted-foreground">
            Enter text or URL to generate
          </p>
        </div>

        <div className="space-y-6 px-6 pb-6">
          <div className="space-y-2">
            <Label htmlFor="qr-input" className="font-semibold text-base">
              Text or URL
            </Label>
            <Input
              id="qr-input"
              value={text}
              onChange={(e) => setText(e.target.value)}
              placeholder="https://example.com or any text..."
              className="border-2 shadow-inner text-base transition-colors focus:border-primary"
            />
          </div>

          {text && (
            <Card className="bg-gradient-to-br from-muted/50 to-muted/30 border-2 shadow-inner overflow-hidden">
              <div className="flex flex-col p-10 gap-6 items-center">
                <div className="relative">
                  <div className="bg-gradient-to-br from-primary/30 to-primary/10 rounded-2xl inset-0 animate-pulse -z-10 absolute blur-xl" />
                  <div className="bg-white border-background border-4 rounded-2xl p-6 shadow-2xl">
                    <img
                      src={`https://api.qrserver.com/v1/create-qr-code/?size=300x300&data=${encodeURIComponent(text)}`}
                      alt="QR Code"
                      className="h-64 w-64"
                    />
                  </div>
                </div>
                <div className="flex gap-3">
                  <Button asChild size="lg" className="shadow-lg">
                    <a
                      href={`https://api.qrserver.com/v1/create-qr-code/?size=1000x1000&data=${encodeURIComponent(text)}`}
                      download="qrcode.png"
                    >
                      <Download className="h-5 mr-2 w-5" />
                      Download High Quality
                    </a>
                  </Button>
                </div>
                <p className="text-center text-sm text-muted-foreground">
                  1000x1000px PNG format - Perfect for print and digital use
                </p>
              </div>
            </Card>
          )}

          {!text && <Empty />}
        </div>
      </Card>
    </ToolLayout>
  )
}
