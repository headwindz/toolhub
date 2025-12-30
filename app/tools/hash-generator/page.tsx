'use client'

import { ToolLayout } from '@/components/tool-layout'
import { CopyButton } from '@/components/copy-button'
import { Card } from '@/components/ui/card'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Hash } from 'lucide-react'
import { useState } from 'react'
import { HashKnowledge } from './knowledge'
import { Button } from '@/components/ui/button'

export default function HashGeneratorPage() {
  const [input, setInput] = useState('')

  const generateHash = async (
    algorithm: string,
    text: string
  ): Promise<string> => {
    const encoder = new TextEncoder()
    const data = encoder.encode(text)
    const hashBuffer = await crypto.subtle.digest(algorithm, data)
    const hashArray = Array.from(new Uint8Array(hashBuffer))
    return hashArray.map((b) => b.toString(16).padStart(2, '0')).join('')
  }

  const [md5Hash, setMd5Hash] = useState('')
  const [sha1Hash, setSha1Hash] = useState('')
  const [sha256Hash, setSha256Hash] = useState('')
  const [sha512Hash, setSha512Hash] = useState('')

  const handleGenerate = async () => {
    if (!input) return

    // Note: crypto.subtle doesn't support MD5, so we'll use SHA-1 as a placeholder
    const sha1 = await generateHash('SHA-1', input)
    const sha256 = await generateHash('SHA-256', input)
    const sha512 = await generateHash('SHA-512', input)

    setMd5Hash('MD5 not supported in browser - use SHA-256')
    setSha1Hash(sha1)
    setSha256Hash(sha256)
    setSha512Hash(sha512)
  }

  const copyToClipboard = (text: string, type: string) => {
    navigator.clipboard.writeText(text)
    setTimeout(() => {}, 2000)
  }

  const hashes = [
    { type: 'MD5', value: md5Hash, color: 'from-orange-500 to-orange-600' },
    { type: 'SHA-1', value: sha1Hash, color: 'from-orange-500 to-orange-600' },
    {
      type: 'SHA-256',
      value: sha256Hash,
      color: 'from-orange-500 to-orange-600',
    },
    {
      type: 'SHA-512',
      value: sha512Hash,
      color: 'from-orange-500 to-orange-600',
    },
  ]

  const renderHashes = () => {
    if (!hashes.some((h) => h.value)) {
      return (
        <div className="text-sm text-muted-foreground">
          No hashes yet. Enter text on the left and click
          <span className="font-medium"> Generate Hashes</span>.
        </div>
      )
    }

    return (
      <div className="space-y-4">
        {hashes.map((hash) => hash.value && renderHash(hash))}
      </div>
    )
  }

  const renderHash = ({ type, value }: (typeof hashes)[0]) => {
    return (
      <Card key={type} className="p-4">
        <Label className="text-sm mb-1 mfont-semibold">{type}</Label>
        <div className="flex gap-2 items-center">
          <div className="bg-muted rounded-lg font-mono text-sm p-3 break-all">
            {value}
          </div>
          <CopyButton
            text={value}
            variant="outline"
            size="icon"
            showText={false}
            className="flex-shrink-0"
          />
        </div>
      </Card>
    )
  }

  return (
    <ToolLayout
      title="Hash Generator"
      description="Generate cryptographic hashes (SHA-1, SHA-256, SHA-512)"
      icon={Hash}
    >
      <HashKnowledge />
      <div className="grid gap-6 lg:grid-cols-2">
        <Card className="p-6">
          <Label htmlFor="input" className="mb-2 block">
            Enter Text
          </Label>
          <Textarea
            id="input"
            placeholder="Enter text to generate hash..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            className="font-mono text-sm min-h-[120px]"
          />
          <Button
            onClick={handleGenerate}
            className="mt-4 w-full"
            size="lg"
            disabled={!input}
          >
            Generate Hashes
          </Button>
        </Card>

        <div className="lg:top-20 lg:sticky">
          <Card className="p-6">
            <div className="mb-4">
              <Label className="font-semibold text-base">
                Generated Hashes
              </Label>
            </div>
            {renderHashes()}
          </Card>
        </div>
      </div>
    </ToolLayout>
  )
}
