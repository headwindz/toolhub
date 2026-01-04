'use client'

import { ToolLayout } from '@/components/tool-layout'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Contrast, RefreshCcw } from 'lucide-react'
import { useMemo, useState } from 'react'
import { CardHeader } from './card-header'
import { ColorInput } from './color-input'
import { ContrastKnowledge } from './knowledge'
import { StatusSection } from './status-section'

const defaultFg = '#111827' // slate-900
const defaultBg = '#ffffff' // white

// Normalize hex color to uppercase format for consistent rendering
const normalizeHex = (hex: string): string => {
  const trimmed = hex.trim()
  if (!trimmed.startsWith('#')) return `#${trimmed}`.toUpperCase()
  return trimmed.toUpperCase()
}

type ContrastResult = {
  ratio: number | null
  aaNormal: boolean
  aaaNormal: boolean
  aaLarge: boolean
  aaaLarge: boolean
}

const parseHex = (hex: string) => {
  const normalized = hex.trim().replace('#', '')
  if (!/^([0-9a-fA-F]{3}|[0-9a-fA-F]{6})$/.test(normalized)) return null
  const value =
    normalized.length === 3
      ? normalized
          .split('')
          .map((c) => c + c)
          .join('')
      : normalized
  const r = Number.parseInt(value.slice(0, 2), 16)
  const g = Number.parseInt(value.slice(2, 4), 16)
  const b = Number.parseInt(value.slice(4, 6), 16)
  return { r, g, b }
}

const toLuminance = (channel: number) => {
  const c = channel / 255
  return c <= 0.03928 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4)
}

const getContrastRatio = (fg: string, bg: string): ContrastResult => {
  const fgRgb = parseHex(fg)
  const bgRgb = parseHex(bg)
  if (!fgRgb || !bgRgb)
    return {
      ratio: null,
      aaNormal: false,
      aaaNormal: false,
      aaLarge: false,
      aaaLarge: false,
    }

  const l1 =
    0.2126 * toLuminance(fgRgb.r) +
    0.7152 * toLuminance(fgRgb.g) +
    0.0722 * toLuminance(fgRgb.b)
  const l2 =
    0.2126 * toLuminance(bgRgb.r) +
    0.7152 * toLuminance(bgRgb.g) +
    0.0722 * toLuminance(bgRgb.b)
  const lighter = Math.max(l1, l2)
  const darker = Math.min(l1, l2)
  const ratio = (lighter + 0.05) / (darker + 0.05)

  return {
    ratio,
    aaNormal: ratio >= 4.5,
    aaaNormal: ratio >= 7,
    aaLarge: ratio >= 3,
    aaaLarge: ratio >= 4.5,
  }
}

export default function ColorContrastPage() {
  const [foreground, setForeground] = useState(defaultFg)
  const [background, setBackground] = useState(defaultBg)
  const [sampleText, setSampleText] = useState(
    'Accessible contrast preview text'
  )

  const normalizedFg = normalizeHex(foreground)
  const normalizedBg = normalizeHex(background)

  const contrast = useMemo(
    () => getContrastRatio(normalizedFg, normalizedBg),
    [normalizedFg, normalizedBg]
  )

  const swapColors = () => {
    setForeground(background)
    setBackground(foreground)
  }

  return (
    <ToolLayout
      title="Color Contrast"
      description="Calculate WCAG contrast ratios and see pass/fail for AA/AAA"
      icon={Contrast}
      badges={[{ label: 'WCAG' }, { label: 'AA/AAA' }]}
    >
      <ContrastKnowledge />

      <div className="grid gap-6 lg:grid-cols-2">
        <Card className="space-y-4 p-6">
          <CardHeader
            title="Colors"
            description="Foreground and background inputs"
            action={
              <Button
                variant="outline"
                size="sm"
                onClick={swapColors}
                className="gap-2"
              >
                <RefreshCcw className="h-4 w-4" /> Swap
              </Button>
            }
          />

          <div className="space-y-4">
            <div className="grid gap-4 grid-cols-1 sm:grid-cols-2">
              <ColorInput
                id="foreground"
                label="Foreground"
                value={normalizedFg}
                onChange={(value) => setForeground(normalizeHex(value))}
              />

              <ColorInput
                id="background"
                label="Background"
                value={normalizedBg}
                onChange={(value) => setBackground(normalizeHex(value))}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="sample">Sample text</Label>
              <Input
                id="sample"
                value={sampleText}
                onChange={(e) => setSampleText(e.target.value)}
                placeholder="Accessible contrast preview text"
              />
            </div>
          </div>
        </Card>

        <Card className="space-y-4 p-6">
          <CardHeader
            title="Results"
            description="WCAG pass/fail for normal and large text"
            action={
              contrast.ratio !== null ? (
                <Badge className="font-semibold text-base">
                  {contrast.ratio.toFixed(2)} : 1
                </Badge>
              ) : undefined
            }
          />

          <div
            className="border rounded-lg overflow-hidden"
            style={{ backgroundColor: normalizedBg, color: normalizedFg }}
          >
            <div className="space-y-3 p-6">
              <p className="font-semibold text-lg">{sampleText || 'Sample'}</p>
              <p className="text-sm opacity-80">Normal text preview</p>
              <p className="font-semibold text-xl">Large text preview</p>
            </div>
          </div>

          <div className="grid gap-3 grid-cols-2">
            <StatusSection
              label="Normal text"
              badges={[
                {
                  passed: !!contrast.ratio && contrast.aaNormal,
                  label: 'AA',
                },
                {
                  passed: !!contrast.ratio && contrast.aaaNormal,
                  label: 'AAA',
                },
              ]}
            />
            <StatusSection
              label="Large text"
              badges={[
                {
                  passed: !!contrast.ratio && contrast.aaLarge,
                  label: 'AA',
                },
                {
                  passed: !!contrast.ratio && contrast.aaaLarge,
                  label: 'AAA',
                },
              ]}
            />
          </div>

          {contrast.ratio === null && (
            <p className="text-sm text-muted-foreground">
              Enter valid HEX colors (e.g., #111827 and #ffffff).
            </p>
          )}
        </Card>
      </div>
    </ToolLayout>
  )
}
