import { CopyButton } from '@/components/copy-button'
import { Card } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Globe } from 'lucide-react'
import { useState } from 'react'
import { UrlParts } from './url-parts'
import { UrlParts as UrlPartsType } from './types'

type UrlParserGeneratorProps = {
  url: string
  setUrl: (url: string) => void
  urlParts: UrlPartsType
  updateUrlPart: (key: string, value: string) => void
}

export function UrlParserGenerator({
  url,
  setUrl,
  urlParts,
  updateUrlPart,
}: UrlParserGeneratorProps) {
  const [isValidUrl, setIsValidUrl] = useState(true)

  const handleUrlChange = (value: string) => {
    setUrl(value)
    try {
      new URL(value)
      setIsValidUrl(true)
    } catch {
      setIsValidUrl(false)
    }
  }

  return (
    <Card className="p-6 space-y-2">
      <div className="flex items-center gap-2">
        <Globe className="h-5 w-5 text-blue-600" />
        <h3 className="text-lg font-semibold">URL Parser & Builder</h3>
      </div>

      {/* URL Input */}
      <div className="space-y-2">
        <Label htmlFor="url-input">URL</Label>
        <div className="relative flex gap-2 items-center">
          <Input
            id="url-input"
            value={url}
            onChange={(e) => handleUrlChange(e.target.value)}
            placeholder="https://example.com/path?param=value#section"
            className={`flex-1 ${!isValidUrl ? 'border-red-300 focus:border-red-500' : ''}`}
          />
          <CopyButton text={url} />
        </div>
        {!isValidUrl && (
          <p className="text-sm text-red-600">Please enter a valid URL</p>
        )}
      </div>

      {isValidUrl && (
        <UrlParts urlParts={urlParts} updateUrlPart={updateUrlPart} />
      )}
    </Card>
  )
}
