'use client'

import { CopyButton } from '@/components/copy-button'
import { ToolLayout } from '@/components/tool-layout'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Textarea } from '@/components/ui/textarea'
import { FileJson, Minimize2, Sparkles } from 'lucide-react'
import { useState } from 'react'
import { JSONKnowledge } from './knowledge'

export default function JSONFormatterPage() {
  const [input, setInput] = useState('')
  const [output, setOutput] = useState('')
  const [error, setError] = useState('')

  const formatJSON = () => {
    try {
      const parsed = JSON.parse(input)
      const formatted = JSON.stringify(parsed, null, 2)
      setOutput(formatted)
      setError('')
    } catch (e) {
      setError('Invalid JSON format')
      setOutput('')
    }
  }

  const minifyJSON = () => {
    try {
      const parsed = JSON.parse(input)
      const minified = JSON.stringify(parsed)
      setOutput(minified)
      setError('')
    } catch (e) {
      setError('Invalid JSON format')
      setOutput('')
    }
  }

  return (
    <ToolLayout
      title="JSON Formatter"
      description="Format, validate, and beautify your JSON data instantly"
      icon={FileJson}
      badges={[{ label: 'Auto Validation', icon: Sparkles }, { label: 'Fast' }]}
    >
      <JSONKnowledge />

      <div className="grid gap-6 lg:grid-cols-2">
        <Card className="border-2 shadow-xl transition-shadow overflow-hidden hover:shadow-2xl">
          <div className="bg-gradient-to-r to-transparent from-primary/10 via-primary/5 p-6">
            <h2 className="font-semibold text-xl">Input JSON</h2>
            <p className="text-sm text-muted-foreground">
              Paste or type your JSON data below
            </p>
          </div>
          <div className="p-6 pt-4">
            <Textarea
              placeholder='{"name": "John", "age": 30}'
              value={input}
              onChange={(e) => setInput(e.target.value)}
              className={`font-mono border-2 shadow-inner text-sm min-h-[450px] transition-colors ${
                error
                  ? 'border-destructive focus:border-destructive focus:ring-2 focus:ring-destructive/40'
                  : 'focus:border-primary'
              }`}
            />
            <div className="flex mt-4 gap-2">
              <Button
                onClick={formatJSON}
                size="lg"
                className="flex-1 shadow-lg"
              >
                <Sparkles className="h-4 mr-2 w-4" />
                Format & Beautify
              </Button>
              <Button
                onClick={minifyJSON}
                variant="outline"
                size="lg"
                className="bg-transparent flex-1"
              >
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
              <p className="text-sm text-muted-foreground">
                Your beautified JSON result
              </p>
            </div>
            {output && <CopyButton text={output} className="shadow-md" />}
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
