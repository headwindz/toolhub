"use client"

import { useState } from "react"
import { Hash, Copy, Check } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { ToolLayout } from "@/components/tool-layout"

export default function HashGeneratorPage() {
  const [input, setInput] = useState("")
  const [copiedHash, setCopiedHash] = useState<string | null>(null)

  const generateHash = async (algorithm: string, text: string): Promise<string> => {
    const encoder = new TextEncoder()
    const data = encoder.encode(text)
    const hashBuffer = await crypto.subtle.digest(algorithm, data)
    const hashArray = Array.from(new Uint8Array(hashBuffer))
    return hashArray.map((b) => b.toString(16).padStart(2, "0")).join("")
  }

  const [md5Hash, setMd5Hash] = useState("")
  const [sha1Hash, setSha1Hash] = useState("")
  const [sha256Hash, setSha256Hash] = useState("")
  const [sha512Hash, setSha512Hash] = useState("")

  const handleGenerate = async () => {
    if (!input) return

    // Note: crypto.subtle doesn't support MD5, so we'll use SHA-1 as a placeholder
    const sha1 = await generateHash("SHA-1", input)
    const sha256 = await generateHash("SHA-256", input)
    const sha512 = await generateHash("SHA-512", input)

    setMd5Hash("MD5 not supported in browser - use SHA-256")
    setSha1Hash(sha1)
    setSha256Hash(sha256)
    setSha512Hash(sha512)
  }

  const copyToClipboard = (text: string, type: string) => {
    navigator.clipboard.writeText(text)
    setCopiedHash(type)
    setTimeout(() => setCopiedHash(null), 2000)
  }

  const hashes = [
    { type: "MD5", value: md5Hash, color: "from-orange-500 to-orange-600" },
    { type: "SHA-1", value: sha1Hash, color: "from-orange-500 to-orange-600" },
    { type: "SHA-256", value: sha256Hash, color: "from-orange-500 to-orange-600" },
    { type: "SHA-512", value: sha512Hash, color: "from-orange-500 to-orange-600" },
  ]

  return (
    <ToolLayout
      title="Hash Generator"
      description="Generate cryptographic hashes (SHA-1, SHA-256, SHA-512)"
      icon={Hash}
      category="Security"
    >

      <div className="space-y-6">
        <Card className="p-6">
          <Label htmlFor="input" className="mb-2 block">
            Enter Text
          </Label>
          <Textarea
            id="input"
            placeholder="Enter text to generate hash..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            className="min-h-[120px] font-mono text-sm"
          />
          <Button onClick={handleGenerate} className="mt-4 w-full" size="lg" disabled={!input}>
            Generate Hashes
          </Button>
        </Card>

        {hashes.some((h) => h.value) && (
          <div className="space-y-4">
            {hashes.map(
              (hash) =>
                hash.value && (
                  <Card key={hash.type} className="p-6">
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex-1 space-y-2">
                        <Label className="text-base font-semibold">{hash.type}</Label>
                        <div className="break-all rounded-lg bg-muted p-3 font-mono text-sm">{hash.value}</div>
                      </div>
                      <Button variant="outline" size="icon" onClick={() => copyToClipboard(hash.value, hash.type)}>
                        {copiedHash === hash.type ? (
                          <Check className="h-4 w-4 text-green-600" />
                        ) : (
                          <Copy className="h-4 w-4" />
                        )}
                      </Button>
                    </div>
                  </Card>
                ),
            )}
          </div>
        )}
      </div>
    </ToolLayout>
  )
}
