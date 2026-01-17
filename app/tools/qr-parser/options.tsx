import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Upload, Copy } from 'lucide-react'

interface OptionsProps {
  fileInputRef: React.RefObject<HTMLInputElement>
  isProcessing: boolean
  handleFileUpload: (e: React.ChangeEvent<HTMLInputElement>) => void
  handlePaste: (e: React.ClipboardEvent) => void
}

export function Options({
  fileInputRef,
  isProcessing,
  handleFileUpload,
  handlePaste,
}: OptionsProps) {
  return (
    <Tabs defaultValue="upload" className="w-full">
      <TabsList className="grid w-full grid-cols-2">
        <TabsTrigger value="upload">
          <Upload className="h-4 w-4 mr-2" />
          Upload image
        </TabsTrigger>
        <TabsTrigger value="paste">
          <Copy className="h-4 w-4 mr-2" />
          Paste image
        </TabsTrigger>
      </TabsList>

      <TabsContent value="upload" className="space-y-3 mt-6">
        <Label className="font-semibold text-base">Choose QR code image</Label>
        <Button
          variant="outline"
          className="w-full border-2 h-14 text-base"
          onClick={() => fileInputRef.current?.click()}
          disabled={isProcessing}
        >
          <Upload className="h-5 mr-2 w-5" />
          {isProcessing ? 'Processing...' : 'Select file from device'}
        </Button>
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          onChange={handleFileUpload}
          className="hidden"
        />
        <p className="text-xs text-muted-foreground">
          Supports JPG, PNG, GIF, and other image formats
        </p>
      </TabsContent>

      <TabsContent value="paste" className="space-y-3 mt-6">
        <Label className="font-semibold text-base">Paste from clipboard</Label>
        <div
          onPaste={handlePaste}
          tabIndex={0}
          className="border-2 border-dashed rounded-lg p-10 text-center bg-muted/30 focus:border-primary focus:bg-muted/50 focus:outline-none cursor-text transition-all hover:border-primary/50"
        >
          <Copy className="h-12 w-12 mx-auto mb-3 text-muted-foreground" />
          <p className="text-base font-medium mb-1">Click here and paste</p>
          <p className="text-sm text-muted-foreground">
            Use Ctrl+V (Windows/Linux) or Cmd+V (Mac) to paste an image
          </p>
        </div>
      </TabsContent>
    </Tabs>
  )
}
