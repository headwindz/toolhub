'use client'

import { useMemo, useState } from 'react'
import { CopyButton } from '@/components/copy-button'
import { ToolLayout } from '@/components/tool-layout'
import { Badge } from '@/components/ui/badge'
import { Card } from '@/components/ui/card'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { CaseSensitive, Wand2 } from 'lucide-react'
import { CaseConverterKnowledge } from './knowledge'

type CaseStyle = {
  label: string
  value: string
}

const capitalize = (word: string) =>
  word.length === 0 ? '' : word[0].toUpperCase() + word.slice(1)

const splitWords = (input: string) => {
  const prepared = input
    .trim()
    .replace(/[_\-]+/g, ' ')
    .replace(/([a-z0-9])([A-Z])/g, '$1 $2')
    .replace(/([A-Z]+)([A-Z][a-z0-9]+)/g, '$1 $2')

  if (!prepared) return [] as string[]

  return prepared
    .split(/[^A-Za-z0-9]+/)
    .filter(Boolean)
    .map((word) => word.toLowerCase())
}

const buildCases = (words: string[]): CaseStyle[] => {
  if (words.length === 0) return []

  const camel = () => {
    const [first, ...rest] = words
    return first + rest.map(capitalize).join('')
  }

  const pascal = () => words.map(capitalize).join('')
  const snake = () => words.join('_')
  const screamingSnake = () => snake().toUpperCase()
  const kebab = () => words.join('-')
  const dot = () => words.join('.')
  const spaceLower = () => words.join(' ')

  return [
    { label: 'camelCase', value: camel() },
    { label: 'PascalCase', value: pascal() },
    { label: 'snake_case', value: snake() },
    { label: 'SCREAMING_SNAKE_CASE', value: screamingSnake() },
    { label: 'kebab-case', value: kebab() },
    { label: 'dot.case', value: dot() },
    { label: 'space separated', value: spaceLower() },
  ]
}

export default function CaseConverterPage() {
  const [text, setText] = useState('background color primary button')

  const words = useMemo(() => splitWords(text), [text])
  const cases = useMemo(() => buildCases(words), [words])
  const combined = cases
    .map((item) => `${item.label}: ${item.value}`)
    .join('\n')

  return (
    <ToolLayout
      title="Variable Case Converter"
      description="Transform any text into camelCase, snake_case, kebab-case, and more"
      icon={CaseSensitive}
      badges={[
        { label: 'Offline', icon: Wand2 },
        { label: 'Developer friendly' },
      ]}
    >
      <CaseConverterKnowledge />

      <Card className="space-y-4 p-6">
        <div className="space-y-2">
          <Label htmlFor="case-input" className="font-semibold">
            Input text
          </Label>
          <Textarea
            id="case-input"
            value={text}
            onChange={(event) => setText(event.target.value)}
            placeholder="Enter any variable, sentence, or slug"
            className="font-mono text-sm min-h-[120px]"
          />
          <p className="text-sm text-muted-foreground">
            We normalize spaces, dashes, underscores, and camelCase before
            converting.
          </p>
        </div>

        {words.length > 0 && (
          <div className="flex flex-wrap gap-2">
            {words.map((word, index) => (
              <Badge
                key={`${word}-${index}`}
                variant="outline"
                className="font-mono"
              >
                {word}
              </Badge>
            ))}
          </div>
        )}
      </Card>

      <Card className="space-y-4 p-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="font-semibold text-lg">Converted cases</h2>
            <p className="text-muted-foreground text-sm">
              Copy any style or grab them all at once.
            </p>
          </div>
          <CopyButton text={combined} disabled={cases.length === 0} />
        </div>

        {cases.length === 0 ? (
          <p className="text-muted-foreground text-sm">
            Enter text to see conversions.
          </p>
        ) : (
          <div className="grid gap-3">
            {cases.map((item) => (
              <div
                key={item.label}
                className="border rounded-lg flex bg-muted/50 p-3 gap-3 items-start justify-between"
              >
                <div className="space-y-1">
                  <p className="font-semibold text-sm">{item.label}</p>
                  <p className="font-mono text-sm leading-relaxed break-all">
                    {item.value}
                  </p>
                </div>
                <CopyButton text={item.value} showText={false} />
              </div>
            ))}
          </div>
        )}
      </Card>
    </ToolLayout>
  )
}
