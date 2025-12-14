"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Textarea } from "@/components/ui/textarea"
import { Copy, Check, FileJson, Sparkles, Minimize2 } from "lucide-react"
import { CommonCollapsible } from "@/components/common-collapsible"
import { ToolLayout } from "@/components/tool-layout"

export default function JSONFormatterPage() {
  const [input, setInput] = useState("")
  const [output, setOutput] = useState("")
  const [error, setError] = useState("")
  const [copied, setCopied] = useState(false)

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
    <ToolLayout
      title="JSON Formatter"
      description="Format, validate, and beautify your JSON data instantly"
      icon={FileJson}
      category="Developer"
      badges={[
        { label: "Auto Validation", icon: Sparkles },
        { label: "Fast" },
      ]}
    >
      <Card className="border-2 overflow-hidden">
        <CommonCollapsible title="Learn About JSON" description="Understanding JSON data format">
          <div className="space-y-4 text-sm leading-relaxed p-6">
            <div>
              <h4 className="font-semibold text-base mb-2">What is JSON?</h4>
              <p className="text-muted-foreground">
                JSON (JavaScript Object Notation) is a lightweight data-interchange format that's easy for humans to
                read and write, and easy for machines to parse and generate. It's based on a subset of JavaScript
                but is language-independent.
              </p>
            </div>
            <div>
              <h4 className="font-semibold text-base mb-2">JSON Data Types</h4>
              <ul className="list-disc space-y-1 text-muted-foreground pl-5">
                <li>
                  <strong>Object:</strong> Unordered collection of key-value pairs enclosed in curly braces{" "}
                  <code className="bg-muted rounded px-1">{`{ }`}</code>
                </li>
                <li>
                  <strong>Array:</strong> Ordered list of values enclosed in square brackets{" "}
                  <code className="bg-muted rounded px-1">[ ]</code>
                </li>
                <li>
                  <strong>String:</strong> Text enclosed in double quotes{" "}
                  <code className="bg-muted rounded px-1">"text"</code>
                </li>
                <li>
                  <strong>Number:</strong> Integer or floating-point{" "}
                  <code className="bg-muted rounded px-1">42</code> or{" "}
                  <code className="bg-muted rounded px-1">3.14</code>
                </li>
                <li>
                  <strong>Boolean:</strong> True or false values <code className="bg-muted rounded px-1">true</code>{" "}
                  / <code className="bg-muted rounded px-1">false</code>
                </li>
                <li>
                  <strong>Null:</strong> Represents empty value <code className="bg-muted rounded px-1">null</code>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-base mb-2">Why Format JSON?</h4>
              <ul className="list-disc space-y-1 text-muted-foreground pl-5">
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
            <div className="border rounded-lg bg-muted/50 p-4">
              <h4 className="font-semibold text-base mb-2">Example JSON Structure</h4>
              <pre className="bg-background rounded text-xs p-3 overflow-x-auto">
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
        </CommonCollapsible>
      </Card>

      <div className="grid gap-6 lg:grid-cols-2">
        <Card className="border-2 shadow-xl transition-shadow overflow-hidden hover:shadow-2xl">
          <div className="bg-gradient-to-r to-transparent from-primary/10 via-primary/5 p-6">
            <h2 className="font-semibold text-xl">Input JSON</h2>
            <p className="text-sm text-muted-foreground">Paste or type your JSON data below</p>
          </div>
          <div className="p-6 pt-4">
            <Textarea
              placeholder='{"name": "John", "age": 30}'
              value={input}
              onChange={(e) => setInput(e.target.value)}
              className={`font-mono border-2 shadow-inner text-sm min-h-[450px] transition-colors ${
                error
                  ? "border-destructive focus:border-destructive focus:ring-2 focus:ring-destructive/40"
                  : "focus:border-primary"
              }`}
            />
            <div className="flex mt-4 gap-2">
              <Button onClick={formatJSON} size="lg" className="flex-1 shadow-lg">
                <Sparkles className="h-4 mr-2 w-4" />
                Format & Beautify
              </Button>
              <Button onClick={minifyJSON} variant="outline" size="lg" className="bg-transparent flex-1">
                <Minimize2 className="h-4 mr-2 w-4" />
                Minify
              </Button>
            </div>
            {error && (
              <div className="border rounded-lg bg-destructive/10 border-destructive/50 mt-3 p-3">
                <p className="font-medium text-sm text-destructive">{error}</p>
              </div>
            )}
          </div>
        </Card>

        <Card className="border-2 shadow-xl transition-shadow overflow-hidden hover:shadow-2xl">
          <div className="bg-gradient-to-r to-transparent flex from-primary/10 via-primary/5 p-6 items-center justify-between">
            <div>
              <h2 className="font-semibold text-xl">Formatted Output</h2>
              <p className="text-sm text-muted-foreground">Your beautified JSON result</p>
            </div>
            {output && (
              <Button variant="ghost" size="sm" onClick={copyToClipboard} className="shadow-md">
                {copied ? (
                  <>
                    <Check className="h-4 mr-2 w-4" />
                    Copied!
                  </>
                ) : (
                  <>
                    <Copy className="h-4 mr-2 w-4" />
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
              className="font-mono bg-muted/30 border-2 shadow-inner text-sm min-h-[450px]"
            />
          </div>
        </Card>
      </div>
    </ToolLayout>
  )
}
