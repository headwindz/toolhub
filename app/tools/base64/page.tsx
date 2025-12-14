"use client"

import { useState } from "react"
import { ArrowLeft, Code } from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function Base64Page() {
  const [input, setInput] = useState("")
  const [output, setOutput] = useState("")

  const encode = () => {
    try {
      const encoded = btoa(input)
      setOutput(encoded)
    } catch (error) {
      setOutput("Error: Invalid input for encoding")
    }
  }

  const decode = () => {
    try {
      const decoded = atob(input)
      setOutput(decoded)
    } catch (error) {
      setOutput("Error: Invalid Base64 string")
    }
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
          <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-indigo-500 to-indigo-600 shadow-lg">
            <Code className="h-8 w-8 text-white" />
          </div>
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Base64 Encoder/Decoder</h1>
            <p className="text-muted-foreground">Encode and decode Base64 strings</p>
          </div>
        </div>

        <Tabs defaultValue="encode" className="space-y-6">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="encode">Encode</TabsTrigger>
            <TabsTrigger value="decode">Decode</TabsTrigger>
          </TabsList>

          <TabsContent value="encode" className="space-y-4">
            <Card className="p-6">
              <Label htmlFor="encode-input" className="mb-2 block">
                Text to Encode
              </Label>
              <Textarea
                id="encode-input"
                placeholder="Enter text to encode..."
                value={input}
                onChange={(e) => setInput(e.target.value)}
                className="min-h-[150px] font-mono text-sm"
              />
              <Button onClick={encode} className="mt-4 w-full" size="lg">
                Encode to Base64
              </Button>
            </Card>

            {output && (
              <Card className="p-6">
                <Label className="mb-2 block">Encoded Result</Label>
                <Textarea value={output} readOnly className="min-h-[150px] font-mono text-sm" />
              </Card>
            )}
          </TabsContent>

          <TabsContent value="decode" className="space-y-4">
            <Card className="p-6">
              <Label htmlFor="decode-input" className="mb-2 block">
                Base64 to Decode
              </Label>
              <Textarea
                id="decode-input"
                placeholder="Enter Base64 string to decode..."
                value={input}
                onChange={(e) => setInput(e.target.value)}
                className="min-h-[150px] font-mono text-sm"
              />
              <Button onClick={decode} className="mt-4 w-full" size="lg">
                Decode from Base64
              </Button>
            </Card>

            {output && (
              <Card className="p-6">
                <Label className="mb-2 block">Decoded Result</Label>
                <Textarea value={output} readOnly className="min-h-[150px] font-mono text-sm" />
              </Card>
            )}
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
