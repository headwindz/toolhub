'use client'

import { ToolLayout } from '@/components/tool-layout'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Label } from '@/components/ui/label'
import { Scan, ExternalLink } from 'lucide-react'
import { useRef, useState } from 'react'
import jsQR from 'jsqr'
import { Info } from './info'
import { Options } from './options'
import { QRParserKnowledge } from './knowledge'
import { CopyButton } from '@/components/copy-button'

export default function QRParserPage() {
  const [parsedText, setParsedText] = useState('')
  const [uploadedImage, setUploadedImage] = useState<string | null>(null)
  const [parseError, setParseError] = useState('')
  const [isProcessing, setIsProcessing] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)
  const parseCanvasRef = useRef<HTMLCanvasElement>(null)

  const parseQRCode = (imageData: ImageData) => {
    setIsProcessing(true)
    try {
      const code = jsQR(imageData.data, imageData.width, imageData.height, {
        inversionAttempts: 'dontInvert',
      })

      if (code) {
        setParsedText(code.data)
        setParseError('')
      } else {
        setParsedText('')
        setParseError(
          'No QR code found in the image. Please try another image.'
        )
      }
    } catch (error) {
      setParsedText('')
      setParseError('Failed to parse the image. Please try again.')
    } finally {
      setIsProcessing(false)
    }
  }

  const processImage = (imageUrl: string) => {
    const img = new Image()
    img.onload = () => {
      const canvas = parseCanvasRef.current
      if (!canvas) return

      canvas.width = img.width
      canvas.height = img.height
      const ctx = canvas.getContext('2d')
      if (!ctx) return

      ctx.drawImage(img, 0, 0)
      const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height)
      parseQRCode(imageData)
      setUploadedImage(imageUrl)
    }
    img.onerror = () => {
      setParseError('Failed to load the image. Please try again.')
      setIsProcessing(false)
    }
    img.src = imageUrl
  }

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    if (!file.type.startsWith('image/')) {
      setParseError('Please upload a valid image file.')
      return
    }

    const reader = new FileReader()
    reader.onload = (event) => {
      const result = event.target?.result as string
      if (result) {
        processImage(result)
      }
    }
    reader.onerror = () => {
      setParseError('Failed to read the file. Please try again.')
    }
    reader.readAsDataURL(file)
  }

  const handlePaste = (e: React.ClipboardEvent) => {
    const items = e.clipboardData?.items
    if (!items) return

    for (let i = 0; i < items.length; i++) {
      if (items[i].type.indexOf('image') !== -1) {
        const file = items[i].getAsFile()
        if (!file) continue

        const reader = new FileReader()
        reader.onload = (event) => {
          const result = event.target?.result as string
          if (result) {
            processImage(result)
          }
        }
        reader.onerror = () => {
          setParseError('Failed to read the pasted image. Please try again.')
        }
        reader.readAsDataURL(file)
        break
      }
    }
  }

  const clearAll = () => {
    setUploadedImage(null)
    setParsedText('')
    setParseError('')
    if (fileInputRef.current) {
      fileInputRef.current.value = ''
    }
  }

  const isUrl = (text: string) => {
    try {
      new URL(text)
      return text.startsWith('http://') || text.startsWith('https://')
    } catch {
      return false
    }
  }

  return (
    <ToolLayout
      title="QR Code Parser"
      description="Extract text and URLs from QR code images"
      icon={Scan}
      badges={[{ label: 'Client-side parsing' }, { label: 'Privacy-first' }]}
    >
      <QRParserKnowledge />

      <Card className="border-2 shadow-xl overflow-hidden">
        <div className="bg-gradient-to-r to-transparent from-purple-500/10 via-purple-500/5 px-6 py-3">
          <h2 className="font-semibold text-xl">Upload or paste QR code</h2>
          <p className="text-sm text-muted-foreground">
            Extract text, URLs, or any data from your QR code
          </p>
        </div>

        <div className="space-y-6 px-6 pb-6 pt-3">
          <Options
            fileInputRef={fileInputRef as any}
            isProcessing={isProcessing}
            handleFileUpload={handleFileUpload}
            handlePaste={handlePaste}
          />

          {/* Hidden canvas for parsing */}
          <canvas ref={parseCanvasRef} className="hidden" />

          {/* Results Section */}
          {uploadedImage && (
            <Card className="bg-gradient-to-br from-muted/50 to-muted/30 border-2 shadow-inner overflow-hidden">
              <div className="p-6 space-y-4">
                <div className="flex justify-between items-center">
                  <h3 className="font-semibold text-lg">Scanned image</h3>
                  <Button variant="outline" size="sm" onClick={clearAll}>
                    Clear
                  </Button>
                </div>

                <div className="flex justify-center bg-white rounded-lg p-4 border-2">
                  <img
                    src={uploadedImage}
                    alt="Uploaded QR Code"
                    className="max-w-full max-h-64 object-contain"
                  />
                </div>

                {parsedText && (
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <Label className="font-semibold text-base">
                        Extracted content
                      </Label>
                      <CopyButton text={parsedText} />
                    </div>
                    <Card className="bg-background border-2 p-4">
                      <p className="text-sm break-all whitespace-pre-wrap font-mono">
                        {parsedText}
                      </p>
                    </Card>

                    {isUrl(parsedText) && (
                      <Button className="w-full" size="lg" asChild>
                        <a
                          href={parsedText}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          <ExternalLink className="h-5 mr-2 w-5" />
                          Open link in new tab
                        </a>
                      </Button>
                    )}
                  </div>
                )}

                {parseError && (
                  <Card className="bg-destructive/10 border-destructive/20 border-2 p-4">
                    <p className="text-sm text-destructive font-medium">
                      {parseError}
                    </p>
                  </Card>
                )}
              </div>
            </Card>
          )}

          {/* Info Card when nothing uploaded */}
          {!uploadedImage && <Info />}
        </div>
      </Card>
    </ToolLayout>
  )
}
