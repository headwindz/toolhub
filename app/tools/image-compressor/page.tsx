"use client"

import type React from "react"

import { useState, useCallback } from "react"
import { Upload, Download, ImageIcon, Loader2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Slider } from "@/components/ui/slider"
import { ToolLayout } from "@/components/tool-layout"

export default function ImageCompressorPage() {
  const [originalImage, setOriginalImage] = useState<string | null>(null)
  const [compressedImage, setCompressedImage] = useState<string | null>(null)
  const [originalSize, setOriginalSize] = useState<number>(0)
  const [compressedSize, setCompressedSize] = useState<number>(0)
  const [quality, setQuality] = useState([80])
  const [isCompressing, setIsCompressing] = useState(false)
  const [fileName, setFileName] = useState("")

  const handleFileUpload = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file && file.type.startsWith("image/")) {
      setFileName(file.name)
      setOriginalSize(file.size)
      const reader = new FileReader()
      reader.onload = (event) => {
        setOriginalImage(event.target?.result as string)
        setCompressedImage(null)
      }
      reader.readAsDataURL(file)
    }
  }, [])

  const compressImage = useCallback(() => {
    if (!originalImage) return

    setIsCompressing(true)
    const img = new Image()
    img.onload = () => {
      const canvas = document.createElement("canvas")
      canvas.width = img.width
      canvas.height = img.height
      const ctx = canvas.getContext("2d")
      ctx?.drawImage(img, 0, 0)

      canvas.toBlob(
        (blob) => {
          if (blob) {
            setCompressedSize(blob.size)
            const reader = new FileReader()
            reader.onload = (e) => {
              setCompressedImage(e.target?.result as string)
              setIsCompressing(false)
            }
            reader.readAsDataURL(blob)
          }
        },
        "image/jpeg",
        quality[0] / 100,
      )
    }
    img.src = originalImage
  }, [originalImage, quality])

  const downloadImage = () => {
    if (!compressedImage) return
    const link = document.createElement("a")
    link.href = compressedImage
    link.download = `compressed-${fileName}`
    link.click()
  }

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return "0 Bytes"
    const k = 1024
    const sizes = ["Bytes", "KB", "MB", "GB"]
    const i = Math.floor(Math.log(bytes) / Math.log(k))
    return Math.round((bytes / Math.pow(k, i)) * 100) / 100 + " " + sizes[i]
  }

  const savings =
    originalSize > 0 && compressedSize > 0 ? Math.round(((originalSize - compressedSize) / originalSize) * 100) : 0

  return (
    <ToolLayout
      title="Image Compressor"
      description="Compress images without losing quality"
      icon={ImageIcon}
      category="Image"
    >
      <div className="grid gap-6 lg:grid-cols-2">
          <Card className="p-6">
            <h2 className="mb-4 text-lg font-semibold">Upload Image</h2>
            <div className="space-y-4">
              <div className="flex min-h-[300px] items-center justify-center rounded-lg border-2 border-dashed border-muted-foreground/25 bg-muted/5 p-8 transition-colors hover:border-muted-foreground/50">
                {originalImage ? (
                  <div className="space-y-4 text-center">
                    <img
                      src={originalImage || "/placeholder.svg"}
                      alt="Original"
                      className="mx-auto max-h-[250px] rounded-lg"
                    />
                    <p className="text-sm text-muted-foreground">
                      Original Size: <span className="font-semibold">{formatFileSize(originalSize)}</span>
                    </p>
                  </div>
                ) : (
                  <label className="cursor-pointer text-center">
                    <Upload className="mx-auto mb-4 h-12 w-12 text-muted-foreground" />
                    <p className="mb-2 text-sm font-medium">Click to upload an image</p>
                    <p className="text-xs text-muted-foreground">PNG, JPG, JPEG up to 10MB</p>
                    <input type="file" className="hidden" accept="image/*" onChange={handleFileUpload} />
                  </label>
                )}
              </div>

              {originalImage && (
                <>
                  <div className="space-y-2">
                    <Label>Quality: {quality[0]}%</Label>
                    <Slider value={quality} onValueChange={setQuality} min={1} max={100} step={1} />
                  </div>

                  <Button onClick={compressImage} disabled={isCompressing} className="w-full" size="lg">
                    {isCompressing ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Compressing...
                      </>
                    ) : (
                      "Compress Image"
                    )}
                  </Button>
                </>
              )}
            </div>
          </Card>

          <Card className="p-6">
            <h2 className="mb-4 text-lg font-semibold">Compressed Result</h2>
            <div className="space-y-4">
              <div className="flex min-h-[300px] items-center justify-center rounded-lg border-2 border-muted-foreground/25 bg-muted/5 p-8">
                {compressedImage ? (
                  <div className="space-y-4 text-center">
                    <img
                      src={compressedImage || "/placeholder.svg"}
                      alt="Compressed"
                      className="mx-auto max-h-[250px] rounded-lg"
                    />
                    <div className="space-y-1">
                      <p className="text-sm text-muted-foreground">
                        Compressed Size:{" "}
                        <span className="font-semibold text-green-600">{formatFileSize(compressedSize)}</span>
                      </p>
                      <p className="text-sm font-semibold text-green-600">Saved {savings}%</p>
                    </div>
                  </div>
                ) : (
                  <div className="text-center text-muted-foreground">
                    <ImageIcon className="mx-auto mb-4 h-12 w-12 opacity-50" />
                    <p className="text-sm">Compressed image will appear here</p>
                  </div>
                )}
              </div>

              {compressedImage && (
                <Button onClick={downloadImage} className="w-full" size="lg" variant="default">
                  <Download className="mr-2 h-4 w-4" />
                  Download Compressed Image
                </Button>
              )}
            </div>
          </Card>
        </div>
    </ToolLayout>
  )
}
