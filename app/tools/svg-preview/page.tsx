'use client'

import type React from 'react'

import { CopyButton } from '@/components/copy-button'
import { ToolLayout } from '@/components/tool-layout'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Slider } from '@/components/ui/slider'
import {
  FileCode,
  Upload,
  X,
  Download,
  RefreshCw,
  ZoomIn,
  ZoomOut,
  Maximize2,
} from 'lucide-react'
import { useState, useCallback, useEffect } from 'react'
import { SvgPreviewKnowledge } from './knowledge'

export default function SvgPreviewPage() {
  const [svgCode, setSvgCode] = useState<string>('')
  const [error, setError] = useState<string>('')
  const [fileName, setFileName] = useState<string>('')
  const [scale, setScale] = useState<number>(100)
  const [backgroundColor, setBackgroundColor] = useState<string>('#ffffff')
  const [svgDimensions, setSvgDimensions] = useState<{
    width: string
    height: string
  } | null>(null)

  useEffect(() => {
    if (svgCode) {
      validateSvg(svgCode)
      extractDimensions(svgCode)
    }
  }, [svgCode])

  const validateSvg = (code: string) => {
    try {
      const parser = new DOMParser()
      const doc = parser.parseFromString(code, 'image/svg+xml')
      const parseError = doc.querySelector('parsererror')

      if (parseError) {
        setError('Invalid SVG: ' + parseError.textContent)
        return false
      }

      const svgElement = doc.querySelector('svg')
      if (!svgElement) {
        setError('No SVG element found in the code')
        return false
      }

      setError('')
      return true
    } catch (err) {
      setError('Failed to parse SVG: ' + (err as Error).message)
      return false
    }
  }

  const extractDimensions = (code: string) => {
    const parser = new DOMParser()
    const doc = parser.parseFromString(code, 'image/svg+xml')
    const svgElement = doc.querySelector('svg')

    if (svgElement) {
      const width = svgElement.getAttribute('width') || 'auto'
      const height = svgElement.getAttribute('height') || 'auto'
      const viewBox = svgElement.getAttribute('viewBox')

      if (viewBox && (width === 'auto' || height === 'auto')) {
        const [, , vbWidth, vbHeight] = viewBox.split(' ')
        setSvgDimensions({
          width: width === 'auto' ? vbWidth + 'px' : width,
          height: height === 'auto' ? vbHeight + 'px' : height,
        })
      } else {
        setSvgDimensions({ width, height })
      }
    }
  }

  const getEnhancedSvgCode = () => {
    if (!svgCode) return ''

    const parser = new DOMParser()
    const doc = parser.parseFromString(svgCode, 'image/svg+xml')
    const svgElement = doc.querySelector('svg')

    if (!svgElement) return svgCode

    const width = svgElement.getAttribute('width')
    const height = svgElement.getAttribute('height')
    const viewBox = svgElement.getAttribute('viewBox')

    // If SVG has no width/height but has viewBox, set dimensions from viewBox
    if ((!width || !height) && viewBox) {
      const [, , vbWidth, vbHeight] = viewBox.split(' ')
      if (!width) svgElement.setAttribute('width', vbWidth)
      if (!height) svgElement.setAttribute('height', vbHeight)
    }

    // If SVG has no dimensions at all, set default size
    if (!width && !height && !viewBox) {
      svgElement.setAttribute('width', '300')
      svgElement.setAttribute('height', '300')
    }

    return svgElement.outerHTML
  }

  const handleFileUpload = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0]
      if (file) {
        if (!file.name.endsWith('.svg')) {
          setError('Please select an SVG file')
          return
        }

        setFileName(file.name)
        setError('')

        const reader = new FileReader()
        reader.onload = (event) => {
          const content = event.target?.result as string
          setSvgCode(content)
        }
        reader.readAsText(file)
      }
    },
    []
  )

  const clearSvg = () => {
    setSvgCode('')
    setError('')
    setFileName('')
    setScale(100)
    setSvgDimensions(null)
  }

  const downloadSvg = () => {
    if (!svgCode) return

    const blob = new Blob([svgCode], { type: 'image/svg+xml' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = fileName || 'image.svg'
    a.click()
    URL.revokeObjectURL(url)
  }

  const exportAsPng = async () => {
    if (!svgCode) return

    try {
      const canvas = document.createElement('canvas')
      const ctx = canvas.getContext('2d')
      if (!ctx) return

      const img = new Image()
      const svgBlob = new Blob([svgCode], {
        type: 'image/svg+xml;charset=utf-8',
      })
      const url = URL.createObjectURL(svgBlob)

      img.onload = () => {
        canvas.width = img.width
        canvas.height = img.height

        // Fill background
        ctx.fillStyle = backgroundColor
        ctx.fillRect(0, 0, canvas.width, canvas.height)

        ctx.drawImage(img, 0, 0)
        URL.revokeObjectURL(url)

        canvas.toBlob((blob) => {
          if (!blob) return
          const pngUrl = URL.createObjectURL(blob)
          const a = document.createElement('a')
          a.href = pngUrl
          a.download = (fileName || 'image').replace('.svg', '') + '.png'
          a.click()
          URL.revokeObjectURL(pngUrl)
        })
      }

      img.src = url
    } catch (err) {
      setError('Failed to export PNG: ' + (err as Error).message)
    }
  }

  const resetZoom = () => setScale(100)
  const zoomIn = () => setScale((prev) => Math.min(prev + 25, 400))
  const zoomOut = () => setScale((prev) => Math.max(prev - 25, 25))

  return (
    <ToolLayout
      title="SVG Preview"
      description="Preview, edit, and export SVG files"
      icon={FileCode}
      badges={[{ label: 'Design' }, { label: 'Developer' }]}
    >
      <SvgPreviewKnowledge />

      <div className="grid gap-6 lg:grid-cols-2">
        {/* Editor Panel */}
        <Card className="border-2 overflow-hidden">
          <div className="space-y-4 p-6">
            <div className="flex items-center justify-between">
              <Label className="font-semibold">SVG Code</Label>
              <div className="flex gap-2">
                <label>
                  <Button variant="outline" size="sm" asChild>
                    <span>
                      <Upload className="h-4 mr-2 w-4" />
                      Upload
                    </span>
                  </Button>
                  <input
                    type="file"
                    className="hidden"
                    accept=".svg"
                    onChange={handleFileUpload}
                  />
                </label>
                {svgCode && (
                  <Button onClick={clearSvg} variant="outline" size="sm">
                    <X className="h-4 w-4" />
                  </Button>
                )}
              </div>
            </div>

            {fileName && (
              <div className="border rounded-lg bg-blue-500/10 border-blue-500/50 p-2">
                <p className="font-medium text-sm text-blue-900 dark:text-blue-100">
                  📄 {fileName}
                </p>
              </div>
            )}

            <Textarea
              value={svgCode}
              onChange={(e) => setSvgCode(e.target.value)}
              className="font-mono text-sm min-h-[400px]"
              placeholder="Paste your SVG code here or upload an SVG file..."
            />

            {error && (
              <div className="border rounded-lg bg-red-500/10 border-red-500/50 p-3">
                <p className="font-medium text-sm text-red-600 dark:text-red-400">
                  {error}
                </p>
              </div>
            )}

            {svgCode && !error && svgDimensions && (
              <div className="flex items-center justify-between text-xs text-muted-foreground">
                <span>
                  Dimensions: {svgDimensions.width} × {svgDimensions.height}
                </span>
                <CopyButton text={svgCode} />
              </div>
            )}
          </div>
        </Card>

        {/* Preview Panel */}
        <Card className="border-2 overflow-hidden">
          <div className="space-y-4 p-6">
            <div className="flex items-center justify-between">
              <Label className="font-semibold">Preview</Label>
              {svgCode && !error && (
                <div className="flex gap-2">
                  <Button onClick={downloadSvg} variant="outline" size="sm">
                    <Download className="h-4 mr-2 w-4" />
                    SVG
                  </Button>
                  <Button onClick={exportAsPng} variant="outline" size="sm">
                    <Download className="h-4 mr-2 w-4" />
                    PNG
                  </Button>
                </div>
              )}
            </div>

            {/* Zoom Controls */}
            {svgCode && !error && (
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <Button onClick={zoomOut} variant="outline" size="sm">
                    <ZoomOut className="h-4 w-4" />
                  </Button>
                  <div className="flex-1">
                    <Slider
                      value={[scale]}
                      onValueChange={(value) => setScale(value[0])}
                      min={25}
                      max={400}
                      step={25}
                      className="w-full"
                    />
                  </div>
                  <Button onClick={zoomIn} variant="outline" size="sm">
                    <ZoomIn className="h-4 w-4" />
                  </Button>
                  <Button onClick={resetZoom} variant="outline" size="sm">
                    <Maximize2 className="h-4 w-4" />
                  </Button>
                  <span className="text-sm font-medium min-w-[50px] text-right">
                    {scale}%
                  </span>
                </div>

                <div className="flex items-center gap-3">
                  <Label className="text-sm">Background:</Label>
                  <input
                    type="color"
                    value={backgroundColor}
                    onChange={(e) => setBackgroundColor(e.target.value)}
                    className="h-8 w-16 rounded cursor-pointer"
                  />
                  <Button
                    onClick={() => setBackgroundColor('#ffffff')}
                    variant="ghost"
                    size="sm"
                  >
                    <RefreshCw className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            )}

            {/* Preview Area */}
            <div
              className="rounded-lg flex border-2 border-muted-foreground/25 min-h-[400px] overflow-auto transition-colors items-center justify-center"
              style={{ backgroundColor }}
            >
              {svgCode && !error ? (
                <div
                  className="flex items-center justify-center"
                  style={{
                    transform: `scale(${scale / 100})`,
                    transformOrigin: 'center',
                    padding: '20px',
                  }}
                >
                  <div
                    dangerouslySetInnerHTML={{ __html: getEnhancedSvgCode() }}
                  />
                </div>
              ) : (
                <div className="text-center text-muted-foreground p-8">
                  <FileCode className="mx-auto h-12 mb-4 opacity-50 w-12" />
                  <p className="text-sm">
                    {error
                      ? 'Fix errors to see preview'
                      : 'Paste or upload SVG code to preview'}
                  </p>
                </div>
              )}
            </div>
          </div>
        </Card>
      </div>
    </ToolLayout>
  )
}
