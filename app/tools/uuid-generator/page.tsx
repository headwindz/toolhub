"use client"

import { useState } from "react"
import { ArrowLeft, Key, Copy, Check, RefreshCw } from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

export default function UUIDGeneratorPage() {
  const [uuids, setUuids] = useState<string[]>([])
  const [count, setCount] = useState(5)
  const [copied, setCopied] = useState<number | null>(null)

  const generateUUID = () => {
    return crypto.randomUUID()
  }

  const generateUUIDs = () => {
    const newUuids = Array.from({ length: count }, generateUUID)
    setUuids(newUuids)
  }

  const copyToClipboard = (text: string, index: number) => {
    navigator.clipboard.writeText(text)
    setCopied(index)
    setTimeout(() => setCopied(null), 2000)
  }

  const copyAll = () => {
    navigator.clipboard.writeText(uuids.join("\n"))
    setCopied(-1)
    setTimeout(() => setCopied(null), 2000)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/20">
      <div className="container mx-auto max-w-4xl px-4 py-8">
        <Link href="/">
          <Button variant="ghost" size="sm" className="mb-6">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back
          </Button>
        </Link>

        <div className="mb-8 flex items-center gap-4">
          <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-cyan-500 to-cyan-600 shadow-lg">
            <Key className="h-8 w-8 text-white" />
          </div>
          <div>
            <h1 className="text-3xl font-bold tracking-tight">UUID Generator</h1>
            <p className="text-muted-foreground">Generate unique identifiers</p>
          </div>
        </div>

        <div className="space-y-6">
          <Card className="p-6">
            <div className="space-y-4">
              <div>
                <Label htmlFor="count">Number of UUIDs</Label>
                <Input
                  id="count"
                  type="number"
                  min={1}
                  max={100}
                  value={count}
                  onChange={(e) => setCount(Number.parseInt(e.target.value) || 1)}
                  className="mt-2"
                />
              </div>

              <Button onClick={generateUUIDs} className="w-full" size="lg">
                <RefreshCw className="mr-2 h-4 w-4" />
                Generate UUIDs
              </Button>
            </div>
          </Card>

          {uuids.length > 0 && (
            <Card className="p-6">
              <div className="mb-4 flex items-center justify-between">
                <Label className="text-base font-semibold">Generated UUIDs</Label>
                <Button variant="outline" size="sm" onClick={copyAll}>
                  {copied === -1 ? (
                    <>
                      <Check className="mr-2 h-4 w-4 text-green-600" />
                      Copied All
                    </>
                  ) : (
                    <>
                      <Copy className="mr-2 h-4 w-4" />
                      Copy All
                    </>
                  )}
                </Button>
              </div>

              <div className="space-y-2">
                {uuids.map((uuid, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between gap-2 rounded-lg bg-muted p-3 font-mono text-sm"
                  >
                    <span className="flex-1">{uuid}</span>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-8 w-8"
                      onClick={() => copyToClipboard(uuid, index)}
                    >
                      {copied === index ? <Check className="h-4 w-4 text-green-600" /> : <Copy className="h-4 w-4" />}
                    </Button>
                  </div>
                ))}
              </div>
            </Card>
          )}
        </div>
      </div>
    </div>
  )
}
