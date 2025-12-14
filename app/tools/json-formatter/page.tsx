"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Textarea } from "@/components/ui/textarea"
import { ArrowLeft, Copy, Check, FileJson, Sparkles, Minimize2, ChevronDown, BookOpen } from "lucide-react"
import Link from "next/link"
import { Badge } from "@/components/ui/badge"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible"

export default function JSONFormatterPage() {
  const [input, setInput] = useState("")
  const [output, setOutput] = useState("")
  const [error, setError] = useState("")
  const [copied, setCopied] = useState(false)
  const [isLearnOpen, setIsLearnOpen] = useState(false)

  const formatJSON = () => {
    try {
      const parsed = JSON.parse(input)
      const formatted = JSON.stringify(parsed, null, 2)
      setOutput(formatted)
      setError("")
    } catch (e) {
      setError("Invalid JSON format")
      setOutput("")
    }
  }

  const minifyJSON = () => {
    try {
      const parsed = JSON.parse(input)
      const minified = JSON.stringify(parsed)
      setOutput(minified)
      setError("")
    } catch (e) {
      setError("Invalid JSON format")
      setOutput("")
    }
  }

  const copyToClipboard = () => {
    navigator.clipboard.writeText(output)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-primary/5 p-6">
      <div className="mx-auto max-w-7xl space-y-8">
        <div className="flex items-start justify-between">
          <div className="flex items-start gap-6">
            <Link href="/">
              <Button variant="ghost" size="icon" className="mt-1">
                <ArrowLeft className="h-5 w-5" />
              </Button>
            </Link>
            <div className="flex items-start gap-4">
              <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-primary to-primary/60 text-primary-foreground shadow-lg">
                <FileJson className="h-7 w-7" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h1 className="text-4xl font-bold tracking-tight">JSON Formatter</h1>
                  <Badge variant="secondary" className="mt-1">
                    Developer
                  </Badge>
                </div>
                <p className="mt-2 text-lg text-muted-foreground">
                  Format, validate, and beautify your JSON data instantly
                </p>
                <div className="mt-3 flex gap-2">
                  <Badge variant="outline" className="font-normal">
                    <Sparkles className="mr-1 h-3 w-3" />
                    Auto Validation
                  </Badge>
                  <Badge variant="outline" className="font-normal">
                    Fast
                  </Badge>
                  <Badge variant="outline" className="font-normal">
                    Free
                  </Badge>
                </div>
              </div>
            </div>
          </div>
        </div>

        <Card className="overflow-hidden border-2">
          <Collapsible open={isLearnOpen} onOpenChange={setIsLearnOpen}>
            <CollapsibleTrigger className="w-full">
              <div className="flex items-center justify-between bg-gradient-to-r from-blue-500/10 to-purple-500/10 p-4 hover:from-blue-500/15 hover:to-purple-500/15 transition-colors">
                <div className="flex items-center gap-3">
                  <BookOpen className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                  <div className="text-left">
                    <h3 className="font-semibold">Learn About JSON</h3>
                    <p className="text-xs text-muted-foreground">Understanding JSON data format</p>
                  </div>
                </div>
                <ChevronDown className={`h-5 w-5 transition-transform ${isLearnOpen ? "rotate-180" : ""}`} />
              </div>
            </CollapsibleTrigger>
            <CollapsibleContent>
              <div className="space-y-4 p-6 text-sm leading-relaxed">
                <div>
                  <h4 className="mb-2 font-semibold text-base">What is JSON?</h4>
                  <p className="text-muted-foreground">
                    JSON (JavaScript Object Notation) is a lightweight data-interchange format that's easy for humans to
                    read and write, and easy for machines to parse and generate. It's based on a subset of JavaScript
                    but is language-independent.
                  </p>
                </div>
                <div>
                  <h4 className="mb-2 font-semibold text-base">JSON Data Types</h4>
                  <ul className="list-disc space-y-1 pl-5 text-muted-foreground">
                    <li>
                      <strong>Object:</strong> Unordered collection of key-value pairs enclosed in curly braces{" "}
                      <code className="rounded bg-muted px-1">{`{ }`}</code>
                    </li>
                    <li>
                      <strong>Array:</strong> Ordered list of values enclosed in square brackets{" "}
                      <code className="rounded bg-muted px-1">[ ]</code>
                    </li>
                    <li>
                      <strong>String:</strong> Text enclosed in double quotes{" "}
                      <code className="rounded bg-muted px-1">"text"</code>
                    </li>
                    <li>
                      <strong>Number:</strong> Integer or floating-point{" "}
                      <code className="rounded bg-muted px-1">42</code> or{" "}
                      <code className="rounded bg-muted px-1">3.14</code>
                    </li>
                    <li>
                      <strong>Boolean:</strong> True or false values <code className="rounded bg-muted px-1">true</code>{" "}
                      / <code className="rounded bg-muted px-1">false</code>
                    </li>
                    <li>
                      <strong>Null:</strong> Represents empty value <code className="rounded bg-muted px-1">null</code>
                    </li>
                  </ul>
                </div>
                <div>
                  <h4 className="mb-2 font-semibold text-base">Why Format JSON?</h4>
                  <ul className="list-disc space-y-1 pl-5 text-muted-foreground">
                    <li>
                      <strong>Readability:</strong> Properly indented JSON is much easier to read and understand
                    </li>
                    <li>
                      <strong>Debugging:</strong> Formatted JSON helps identify structure issues quickly
                    </li>
                    <li>
                      <strong>Validation:</strong> Formatting tools can detect syntax errors
                    </li>
                    <li>
                      <strong>Minification:</strong> Removing whitespace reduces file size for production
                    </li>
                  </ul>
                </div>
                <div className="rounded-lg border bg-muted/50 p-4">
                  <h4 className="mb-2 font-semibold text-base">Example JSON Structure</h4>
                  <pre className="overflow-x-auto rounded bg-background p-3 text-xs">
                    <code>{`{
  "user": {
    "name": "John Doe",
    "age": 30,
    "email": "john@example.com",
    "hobbies": ["reading", "coding", "hiking"],
    "active": true
  }
}`}</code>
                  </pre>
                </div>
              </div>
            </CollapsibleContent>
          </Collapsible>
        </Card>

        <div className="grid gap-6 lg:grid-cols-2">
          <Card className="overflow-hidden border-2 shadow-xl transition-shadow hover:shadow-2xl">
            <div className="bg-gradient-to-r from-primary/10 via-primary/5 to-transparent p-6">
              <h2 className="text-xl font-semibold">Input JSON</h2>
              <p className="text-sm text-muted-foreground">Paste or type your JSON data below</p>
            </div>
            <div className="p-6 pt-4">
              <Textarea
                placeholder='{"name": "John", "age": 30}'
                value={input}
                onChange={(e) => setInput(e.target.value)}
                className="min-h-[450px] border-2 font-mono text-sm shadow-inner transition-colors focus:border-primary"
              />
              <div className="mt-4 flex gap-2">
                <Button onClick={formatJSON} size="lg" className="flex-1 shadow-lg">
                  <Sparkles className="mr-2 h-4 w-4" />
                  Format & Beautify
                </Button>
                <Button onClick={minifyJSON} variant="outline" size="lg" className="flex-1 bg-transparent">
                  <Minimize2 className="mr-2 h-4 w-4" />
                  Minify
                </Button>
              </div>
              {error && (
                <div className="mt-3 rounded-lg border border-destructive/50 bg-destructive/10 p-3">
                  <p className="text-sm font-medium text-destructive">{error}</p>
                </div>
              )}
            </div>
          </Card>

          <Card className="overflow-hidden border-2 shadow-xl transition-shadow hover:shadow-2xl">
            <div className="flex items-center justify-between bg-gradient-to-r from-primary/10 via-primary/5 to-transparent p-6">
              <div>
                <h2 className="text-xl font-semibold">Formatted Output</h2>
                <p className="text-sm text-muted-foreground">Your beautified JSON result</p>
              </div>
              {output && (
                <Button variant="ghost" size="sm" onClick={copyToClipboard} className="shadow-md">
                  {copied ? (
                    <>
                      <Check className="mr-2 h-4 w-4" />
                      Copied!
                    </>
                  ) : (
                    <>
                      <Copy className="mr-2 h-4 w-4" />
                      Copy
                    </>
                  )}
                </Button>
              )}
            </div>
            <div className="p-6 pt-4">
              <Textarea
                value={output}
                readOnly
                placeholder="Formatted JSON will appear here..."
                className="min-h-[450px] border-2 bg-muted/30 font-mono text-sm shadow-inner"
              />
            </div>
          </Card>
        </div>
      </div>
    </div>
  )
}
