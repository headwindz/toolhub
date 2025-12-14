"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Download, QrCode, Sparkles, LinkIcon } from "lucide-react"
import { ToolLayout } from "@/components/tool-layout"

export default function QRGeneratorPage() {
  const [text, setText] = useState("")

  return (
    <ToolLayout
      title="QR Code Generator"
      description="Transform any text or URL into a scannable QR code"
      icon={QrCode}
      category="Image"
      badges={[
        { label: "Instant Generation", icon: Sparkles },
        { label: "High Quality" },
        { label: "Free Download" },
      ]}
    >
      <Card className="overflow-hidden border-2 shadow-xl">
          <div className="bg-gradient-to-r from-primary/10 via-primary/5 to-transparent p-6">
            <h2 className="text-xl font-semibold">Create Your QR Code</h2>
            <p className="text-sm text-muted-foreground">Enter text or URL to generate</p>
          </div>

          <div className="p-6 pt-4">
            <div className="space-y-6">
              <div className="space-y-2">
                <Label className="text-base">Text or URL</Label>
                <div className="relative">
                  <LinkIcon className="absolute left-3 top-3.5 h-5 w-5 text-muted-foreground" />
                  <Input
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                    placeholder="https://example.com or any text..."
                    className="border-2 pl-10 text-base shadow-inner transition-colors focus:border-primary"
                  />
                </div>
              </div>

              {text && (
                <Card className="overflow-hidden border-2 bg-gradient-to-br from-muted/50 to-muted/30 shadow-inner">
                  <div className="flex flex-col items-center gap-6 p-10">
                    <div className="relative">
                      <div className="absolute inset-0 -z-10 animate-pulse rounded-2xl bg-gradient-to-br from-primary/30 to-primary/10 blur-xl" />
                      <div className="rounded-2xl border-4 border-background bg-white p-6 shadow-2xl">
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
                          <Download className="mr-2 h-5 w-5" />
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

              {!text && (
                <Card className="border-2 border-dashed bg-muted/30 p-6">
                  <h3 className="mb-3 font-semibold">💡 Quick Tips</h3>
                  <ul className="space-y-2 text-sm text-muted-foreground">
                    <li>• Perfect for sharing website links, WiFi passwords, or contact info</li>
                    <li>• Generated QR codes work with any standard QR code scanner</li>
                    <li>• Download in high resolution for printing on business cards or posters</li>
                  </ul>
                </Card>
              )}
            </div>
          </div>
        </Card>
    </ToolLayout>
  )
}
