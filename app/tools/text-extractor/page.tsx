'use client'

import type React from 'react'

import { CopyButton } from '@/components/copy-button'
import { ToolLayout } from '@/components/tool-layout'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { FileImage, Loader2, ScanText, Upload, X } from 'lucide-react'
import { useCallback, useState } from 'react'
import { TextExtractorKnowledge } from './knowledge'

export default function TextExtractorPage() {
  const [image, setImage] = useState<string | null>(null)
  const [extractedText, setExtractedText] = useState('')
  const [isProcessing, setIsProcessing] = useState(false)
  const [fileName, setFileName] = useState('')
  const [error, setError] = useState('')

  const handleFileUpload = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0]
      if (file && file.type.startsWith('image/')) {
        setFileName(file.name)
        setError('')
        const reader = new FileReader()
        reader.onload = (event) => {
          setImage(event.target?.result as string)
          setExtractedText('')
        }
        reader.readAsDataURL(file)
      } else {
        setError('Please select a valid image file')
      }
    },
    []
  )

  const extractText = async () => {
    if (!image) return

    setIsProcessing(true)
    setError('')

    try {
      // Preprocess image for better OCR accuracy
      const processedImage = await preprocessImage(image)

      const { createWorker } = await import('tesseract.js')
      const worker = await createWorker('eng', 1, {
        logger: (m) => {
          if (m.status === 'recognizing text') {
            console.log(`Progress: ${Math.round(m.progress * 100)}%`)
          }
        },
      })

      // Configure Tesseract for better accuracy
      await worker.setParameters({
        tessedit_char_whitelist: '', // Allow all characters
        preserve_interword_spaces: '1',
      })

      const {
        data: { text },
      } = await worker.recognize(processedImage)
      await worker.terminate()

      setExtractedText(text.trim())
    } catch (err) {
      setError('Failed to extract text from image. Please try again.')
      console.error(err)
    } finally {
      setIsProcessing(false)
    }
  }

  // Preprocess image to improve OCR accuracy
  const preprocessImage = async (imageData: string): Promise<string> => {
    return new Promise((resolve) => {
      const img = new Image()
      img.onload = () => {
        const canvas = document.createElement('canvas')
        const ctx = canvas.getContext('2d')
        if (!ctx) {
          // @ts-ignore
          resolve(imageData)
          return
        }

        // Set canvas size to image size (upscale if needed)
        const scaleFactor = img.width < 1000 ? 2 : 1
        canvas.width = img.width * scaleFactor
        canvas.height = img.height * scaleFactor

        // Draw image with better rendering
        ctx.imageSmoothingEnabled = true
        ctx.imageSmoothingQuality = 'high'
        ctx.drawImage(img, 0, 0, canvas.width, canvas.height)

        // Get image data for processing
        const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height)
        const data = imageData.data

        // Convert to grayscale and increase contrast
        for (let i = 0; i < data.length; i += 4) {
          // Grayscale conversion
          const gray =
            0.299 * data[i] + 0.587 * data[i + 1] + 0.114 * data[i + 2]

          // Increase contrast (simple threshold)
          const threshold = 128
          const contrast = gray > threshold ? 255 : 0

          data[i] = contrast // R
          data[i + 1] = contrast // G
          data[i + 2] = contrast // B
        }

        ctx.putImageData(imageData, 0, 0)
        resolve(canvas.toDataURL('image/png'))
      }
      img.src = imageData
    })
  }

  const clearImage = () => {
    setImage(null)
    setExtractedText('')
    setFileName('')
    setError('')
  }

  return (
    <ToolLayout
      title="Text Extractor (OCR)"
      description="Extract text from images using OCR technology"
      icon={ScanText}
      badges={[{ label: 'AI-Powered' }, { label: 'Offline' }]}
    >
      <TextExtractorKnowledge />

      <div className="grid gap-6 lg:grid-cols-2">
        <Card className="border-2 overflow-hidden">
          <div className="space-y-4 p-6">
            <div>
              <Label className="font-semibold mb-2 block">Upload Image</Label>
              <div className="border-dashed rounded-lg flex bg-muted/5 border-2 border-muted-foreground/25 min-h-[300px] p-8 transition-colors items-center justify-center hover:border-muted-foreground/50">
                {image ? (
                  <div className="space-y-4 text-center w-full">
                    <img
                      src={image}
                      alt="Uploaded"
                      className="rounded-lg mx-auto object-contain max-h-[250px]"
                    />
                    <p className="font-medium text-sm text-muted-foreground">
                      {fileName}
                    </p>
                  </div>
                ) : (
                  <label className="cursor-pointer text-center">
                    <Upload className="mx-auto h-12 text-muted-foreground mb-4 w-12" />
                    <p className="font-medium text-sm mb-2">
                      Click to upload an image
                    </p>
                    <p className="text-xs text-muted-foreground">
                      PNG, JPG, JPEG - Images with clear text work best
                    </p>
                    <input
                      type="file"
                      className="hidden"
                      accept="image/*"
                      onChange={handleFileUpload}
                    />
                  </label>
                )}
              </div>
            </div>

            {image && (
              <div className="flex gap-2">
                <Button
                  onClick={extractText}
                  disabled={isProcessing}
                  className="flex-1"
                  size="lg"
                >
                  {isProcessing ? (
                    <>
                      <Loader2 className="h-4 mr-2 animate-spin w-4" />
                      Extracting Text...
                    </>
                  ) : (
                    <>
                      <ScanText className="h-4 mr-2 w-4" />
                      Extract Text
                    </>
                  )}
                </Button>

                <Button onClick={clearImage} variant="outline" size="lg">
                  <X className="h-4 w-4" />
                </Button>
              </div>
            )}

            {error && (
              <div className="border rounded-lg bg-red-500/10 border-red-500/50 p-3">
                <p className="font-medium text-sm text-red-600 dark:text-red-400">
                  {error}
                </p>
              </div>
            )}
          </div>
        </Card>

        <Card className="border-2 overflow-hidden">
          <div className="space-y-4 p-6">
            <div className="flex items-center justify-between">
              <Label className="font-semibold">Extracted Text</Label>
              {extractedText && <CopyButton text={extractedText} />}
            </div>
            <div className="rounded-lg flex bg-muted/5 border-2 border-muted-foreground/25 min-h-[300px] transition-colors">
              {extractedText ? (
                <Textarea
                  value={extractedText}
                  onChange={(e) => setExtractedText(e.target.value)}
                  className="bg-transparent font-mono border-0 text-sm min-h-[300px]"
                  placeholder="Extracted text will appear here..."
                />
              ) : (
                <div className="flex flex-1 text-center text-muted-foreground p-8 items-center justify-center">
                  <div>
                    <FileImage className="mx-auto h-12 mb-4 opacity-50 w-12" />
                    <p className="text-sm">
                      Upload an image and click Extract Text
                    </p>
                  </div>
                </div>
              )}
            </div>
            {extractedText && (
              <p className="text-xs text-muted-foreground">
                {extractedText.split(/\s+/).length} words •{' '}
                {extractedText.length} characters
              </p>
            )}
          </div>
        </Card>
      </div>
    </ToolLayout>
  )
}
