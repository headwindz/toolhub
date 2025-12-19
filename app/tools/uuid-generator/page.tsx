"use client"

import { useState } from "react"
import { Key, Copy, Check, RefreshCw } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { CommonCollapsible } from "@/components/common-collapsible"
import { ToolLayout } from "@/components/tool-layout"
import { CategoryId } from "@/constants/categories"

const category = CategoryId.Developer;

export default function UUIDGeneratorPage() {
  const [uuids, setUuids] = useState<string[]>([])
  const [count, setCount] = useState(2)
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
    <ToolLayout
      title="UUID Generator"
      description="Generate universally unique identifiers (UUIDs)"
      icon={Key}
    >
      <div className="space-y-6">
        <Card className="border-2 overflow-hidden">
          <CommonCollapsible title="Learn about UUIDs" description="What they are and when to use them">
            <div className="space-y-4 text-sm leading-relaxed p-6">
              <div className="space-y-2">
                <h3 className="font-semibold text-base">Format</h3>
                <p className="text-muted-foreground">
                  UUIDs are 128-bit identifiers, commonly shown as 36 characters with hyphens
                  (8-4-4-4-12), e.g. <span className="font-mono">123e4567-e89b-12d3-a456-426614174000</span>.
                </p>
              </div>
              <div className="space-y-2">
                <h3 className="font-semibold text-base">Versions</h3>
                <ul className="list-disc space-y-1 text-muted-foreground pl-5">
                  <li><strong>v1:</strong> time-based + MAC address (can leak host info).</li>
                  <li><strong>v2:</strong> DCE Security (rare, embeds POSIX UID/GID; mostly legacy).</li>
                  <li><strong>v3:</strong> data-based using MD5 hash (deterministic).</li>
                  <li><strong>v4:</strong> random-based (most common, good default).
                  </li>
                  <li><strong>v5:</strong> data-based using SHA-1 hash (deterministic, preferred over v3).</li>
                  <li><strong>v6:</strong> reordered time-based for better sorting (draft/spec evolution).</li>
                  <li><strong>v7:</strong> Unix-time plus randomness; great for ordered storage.</li>
                  <li><strong>v8:</strong> custom format for app-specific structured randomness.</li>
                </ul>
              </div>
              <div className="space-y-2">
                <h3 className="font-semibold text-base">Best practices</h3>
                <ul className="list-disc space-y-1 text-muted-foreground pl-5">
                  <li>Use v4 for general randomness; v7 for write-heavy ordered storage.</li>
                  <li>Avoid v1 if you need to hide host/time details.</li>
                  <li>Do not treat UUIDs as secrets; they are unique, not random tokens.</li>
                </ul>
              </div>
            </div>
          </CommonCollapsible>
        </Card>

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
              <RefreshCw className="h-4 mr-2 w-4" />
              Generate UUIDs
            </Button>
          </div>
        </Card>

        {uuids.length > 0 && (
          <Card className="p-6">
            <div className="flex mb-4 items-center justify-between">
              <Label className="font-semibold text-base">Generated UUIDs</Label>
              <Button variant="outline" size="sm" onClick={copyAll}>
                {copied === -1 ? (
                  <>
                    <Check className="h-4 mr-2 text-green-600 w-4" />
                    Copied All
                  </>
                ) : (
                  <>
                    <Copy className="h-4 mr-2 w-4" />
                    Copy All
                  </>
                )}
              </Button>
            </div>

            <div className="space-y-2">
              {uuids.map((uuid, index) => (
                <div
                  key={index}
                  className="bg-muted rounded-lg flex font-mono text-sm p-3 gap-2 items-center justify-between"
                >
                  <span className="flex-1">{uuid}</span>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-8 w-8"
                    onClick={() => copyToClipboard(uuid, index)}
                  >
                    {copied === index ? <Check className="h-4 text-green-600 w-4" /> : <Copy className="h-4 w-4" />}
                  </Button>
                </div>
              ))}
            </div>
          </Card>
        )}
      </div>
    </ToolLayout>
  )
}
