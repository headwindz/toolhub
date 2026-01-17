'use client'

import { ToolLayout } from '@/components/tool-layout'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Download, QrCode, Sparkles } from 'lucide-react'
import { useEffect, useRef, useState } from 'react'
import QRCodeLib from 'qrcode'
import { Empty } from './empty'
import { QRKnowledge } from './knowledge'

export default function QRGeneratorPage() {
  const [text, setText] = useState('')
  const [debouncedText, setDebouncedText] = useState('')
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedText(text)
    }, 300)

    return () => clearTimeout(timer)
  }, [text])

  useEffect(() => {
    if (debouncedText && canvasRef.current) {
      QRCodeLib.toCanvas(
        canvasRef.current,
        debouncedText,
        {
          width: 300,
          margin: 2,
          color: {
            dark: '#000000',
            light: '#FFFFFF',
          },
        },
        (error) => {
          if (error) console.error(error)
        }
      )
    }
  }, [debouncedText])

  const handleDownload = async () => {
    if (!debouncedText) return

    try {
      // Generate high-quality QR code
      const url = await QRCodeLib.toDataURL(debouncedText, {
        width: 1000,
        margin: 2,
        errorCorrectionLevel: 'H',
      })

      // Create download link
      const link = document.createElement('a')
      link.href = url
      link.download = 'qrcode.png'
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)
    } catch (error) {
      console.error('Error generating QR code:', error)
    }
  }

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

          {debouncedText && (
            <Card className="bg-gradient-to-br from-muted/50 to-muted/30 border-2 shadow-inner overflow-hidden">
              <div className="flex flex-col p-10 gap-6 items-center">
                <div className="relative">
                  <div className="bg-gradient-to-br from-primary/30 to-primary/10 rounded-2xl inset-0 animate-pulse -z-10 absolute blur-xl" />
                  <div className="bg-white border-background border-4 rounded-2xl p-6 shadow-2xl">
                    <canvas
                      ref={canvasRef}
                      className="h-64 w-64"
                      style={{ imageRendering: 'pixelated' }}
                    />
                  </div>
                </div>
                <div className="flex gap-3">
                  <Button
                    size="lg"
                    className="shadow-lg cursor-pointer"
                    onClick={handleDownload}
                  >
                    <Download className="h-5 mr-2 w-5" />
                    Download High Quality
                  </Button>
                </div>
              </div>
            </Card>
          )}

          {!debouncedText && <Empty />}
        </div>
      </Card>
    </ToolLayout>
  )
}
