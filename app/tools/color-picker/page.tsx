"use client"

import { useState } from "react"
import { Palette, Copy, Check } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { ToolLayout } from "@/components/tool-layout"
import { CommonCollapsible } from "@/components/common-collapsible"

export default function ColorPickerPage() {
  const [color, setColor] = useState("#8b5cf6")
  const [copied, setCopied] = useState<string | null>(null)

  const hexToRgb = (hex: string) => {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex)
    return result
      ? {
          r: Number.parseInt(result[1], 16),
          g: Number.parseInt(result[2], 16),
          b: Number.parseInt(result[3], 16),
        }
      : null
  }

  const hexToHsl = (hex: string) => {
    const rgb = hexToRgb(hex)
    if (!rgb) return null

    const r = rgb.r / 255
    const g = rgb.g / 255
    const b = rgb.b / 255

    const max = Math.max(r, g, b)
    const min = Math.min(r, g, b)
    let h = 0,
      s = 0,
      l = (max + min) / 2

    if (max !== min) {
      const d = max - min
      s = l > 0.5 ? d / (2 - max - min) : d / (max + min)

      switch (max) {
        case r:
          h = ((g - b) / d + (g < b ? 6 : 0)) / 6
          break
        case g:
          h = ((b - r) / d + 2) / 6
          break
        case b:
          h = ((r - g) / d + 4) / 6
          break
      }
    }

    return {
      h: Math.round(h * 360),
      s: Math.round(s * 100),
      l: Math.round(l * 100),
    }
  }

  const rgb = hexToRgb(color)
  const hsl = hexToHsl(color)

  const copyToClipboard = (text: string, type: string) => {
    navigator.clipboard.writeText(text)
    setCopied(type)
    setTimeout(() => setCopied(null), 2000)
  }

  const formats = [
    { label: "HEX", value: color.toUpperCase() },
    { label: "RGB", value: rgb ? `rgb(${rgb.r}, ${rgb.g}, ${rgb.b})` : "" },
    { label: "HSL", value: hsl ? `hsl(${hsl.h}, ${hsl.s}%, ${hsl.l}%)` : "" },
  ]

  return (
    <ToolLayout
      title="Color Picker"
      description="Pick colors and generate palettes"
      icon={Palette}
    >
      <div className="space-y-6">
          <Card className="border-2 overflow-hidden">
            <CommonCollapsible title="Learn about color" description="Models, contrast, and accessibility basics">
              <div className="space-y-4 text-sm leading-relaxed p-6">
                <div className="space-y-2">
                  <h3 className="font-semibold text-base">Color models</h3>
                  <ul className="list-disc space-y-1 text-muted-foreground pl-5">
                    <li><strong>HEX:</strong> Hexadecimal RGB shorthand for web colors (e.g. <span className="font-mono">#8B5CF6</span>).</li>
                    <li><strong>RGB:</strong> Additive color model using red, green, blue (0–255).</li>
                    <li><strong>HSL:</strong> Hue (0–360), Saturation %, Lightness % — great for tweaking UI palettes.</li>
                  </ul>
                </div>
                <div className="space-y-2">
                  <h3 className="font-semibold text-base">Contrast & accessibility</h3>
                  <p className="text-muted-foreground">
                    Aim for WCAG AA/AAA contrast ratios (4.5:1 or 7:1 for normal text). High contrast improves readability
                    across devices and lighting conditions.
                  </p>
                </div>
                <div className="space-y-2">
                  <h3 className="font-semibold text-base">Palette tips</h3>
                  <ul className="list-disc space-y-1 text-muted-foreground pl-5">
                    <li>Build a neutral gray scale first, then add semantic colors.</li>
                    <li>Use HSL to create consistent light/dark variants by adjusting lightness.</li>
                    <li>Test colors in both light and dark themes.</li>
                  </ul>
                </div>
              </div>
            </CommonCollapsible>
          </Card>
          <Card className="p-6 overflow-hidden">
            <div
              className="rounded-lg h-64 shadow-lg mb-6 w-full transition-colors"
              style={{ backgroundColor: color }}
            />

            <div className="space-y-4">
              <div>
                <Label htmlFor="color-picker" className="mb-2 block">
                  Pick a Color
                </Label>
                <Input
                  id="color-picker"
                  type="color"
                  value={color}
                  onChange={(e) => setColor(e.target.value)}
                  className="cursor-pointer h-12 w-full"
                />
              </div>

              <div>
                <Label htmlFor="color-input" className="mb-2 block">
                  Or Enter HEX Code
                </Label>
                <Input
                  id="color-input"
                  type="text"
                  value={color}
                  onChange={(e) => setColor(e.target.value)}
                  placeholder="#8b5cf6"
                  className="font-mono"
                />
              </div>
            </div>
          </Card>

          <Card className="p-6">
            <h2 className="font-semibold text-lg mb-4">Color Formats</h2>
            <div className="space-y-3">
              {formats.map((format) => (
                <div key={format.label} className="bg-muted rounded-lg flex p-4 gap-4 items-center justify-between">
                  <div className="flex-1">
                    <p className="font-medium text-xs text-muted-foreground mb-1">{format.label}</p>
                    <p className="font-mono text-sm">{format.value}</p>
                  </div>
                  <Button variant="outline" size="icon" onClick={() => copyToClipboard(format.value, format.label)}>
                    {copied === format.label ? (
                      <Check className="h-4 text-green-600 w-4" />
                    ) : (
                      <Copy className="h-4 w-4" />
                    )}
                  </Button>
                </div>
              ))}
            </div>
          </Card>
      </div>
    </ToolLayout>
  )
}
