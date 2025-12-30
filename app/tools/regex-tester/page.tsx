'use client'

import { useState, useMemo } from 'react'
import { CopyButton } from '@/components/copy-button'
import { ToolLayout } from '@/components/tool-layout'
import { Badge } from '@/components/ui/badge'
import { Card } from '@/components/ui/card'
import { Checkbox } from '@/components/ui/checkbox'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { FileCode, AlertCircle, CheckCircle2, Wand2 } from 'lucide-react'
import { RegexTesterKnowledge } from './regex-knowledge'

type Match = {
  text: string
  index: number
  groups: string[]
}

export default function RegexTesterPage() {
  const [pattern, setPattern] = useState(
    '\\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\\.[A-Z|a-z]{2,}\\b'
  )
  const [flags, setFlags] = useState({
    g: true,
    i: false,
    m: false,
    s: false,
    u: false,
    y: false,
  })
  const [testString, setTestString] = useState(`Contact us at:
support@example.com
sales@company.org
info@website.net`)

  const regexResult = useMemo(() => {
    if (!pattern) {
      return { valid: false, error: 'Pattern is empty', matches: [] }
    }

    try {
      const flagString = Object.entries(flags)
        .filter(([_, enabled]) => enabled)
        .map(([flag]) => flag)
        .join('')

      const regex = new RegExp(pattern, flagString)
      const matches: Match[] = []

      if (flags.g) {
        // Global flag: find all matches
        let match
        const globalRegex = new RegExp(pattern, flagString)
        while ((match = globalRegex.exec(testString)) !== null) {
          matches.push({
            text: match[0],
            index: match.index,
            groups: match.slice(1),
          })
          // Prevent infinite loop on zero-length matches
          if (match.index === globalRegex.lastIndex) {
            globalRegex.lastIndex++
          }
        }
      } else {
        // No global flag: find first match only
        const match = regex.exec(testString)
        if (match) {
          matches.push({
            text: match[0],
            index: match.index,
            groups: match.slice(1),
          })
        }
      }

      return {
        valid: true,
        matches,
        regex: regex.toString(),
      }
    } catch (error) {
      return {
        valid: false,
        error: error instanceof Error ? error.message : 'Invalid regex',
        matches: [],
      }
    }
  }, [pattern, flags, testString])

  const toggleFlag = (flag: keyof typeof flags) => {
    setFlags((prev) => ({ ...prev, [flag]: !prev[flag] }))
  }

  const highlightedText = useMemo(() => {
    if (!regexResult.valid || regexResult.matches.length === 0) {
      return testString
    }

    const sortedMatches = [...regexResult.matches].sort(
      (a, b) => a.index - b.index
    )
    const segments: { text: string; isMatch: boolean }[] = []
    let lastIndex = 0

    sortedMatches.forEach((match) => {
      // Add text before match
      if (match.index > lastIndex) {
        segments.push({
          text: testString.slice(lastIndex, match.index),
          isMatch: false,
        })
      }
      // Add match
      segments.push({
        text: match.text,
        isMatch: true,
      })
      lastIndex = match.index + match.text.length
    })

    // Add remaining text
    if (lastIndex < testString.length) {
      segments.push({
        text: testString.slice(lastIndex),
        isMatch: false,
      })
    }

    return segments
  }, [testString, regexResult])

  const flagsDescriptions = {
    g: 'Global - Find all matches',
    i: 'Case insensitive - Ignore case',
    m: 'Multiline - ^ and $ match line breaks',
    s: 'Dot all - . matches newlines',
    u: 'Unicode - Treat pattern as Unicode',
    y: 'Sticky - Match from lastIndex only',
  }

  return (
    <ToolLayout
      title="Regular Expression Tester"
      description="Test and debug regular expressions with live matching and detailed results"
      icon={FileCode}
      badges={[
        { label: 'Offline', icon: Wand2 },
        { label: 'Developer friendly' },
      ]}
    >
      <RegexTesterKnowledge />

      <Card className="space-y-6 p-6">
        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="regex-pattern" className="font-semibold">
              Regular Expression Pattern
            </Label>
            <div className="flex gap-2">
              <span className="text-2xl text-muted-foreground">/</span>
              <Input
                id="regex-pattern"
                value={pattern}
                onChange={(e) => setPattern(e.target.value)}
                placeholder="Enter regex pattern"
                className="font-mono flex-1"
              />
              <span className="text-2xl text-muted-foreground">/</span>
            </div>
            {regexResult.valid ? (
              <div className="flex items-center gap-2 text-sm text-green-600 dark:text-green-400">
                <CheckCircle2 className="h-4 w-4" />
                Valid regex: {regexResult.regex}
              </div>
            ) : (
              <div className="flex items-center gap-2 text-sm text-red-600 dark:text-red-400">
                <AlertCircle className="h-4 w-4" />
                {regexResult.error}
              </div>
            )}
          </div>

          <div className="space-y-2">
            <Label className="font-semibold">Flags</Label>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
              {Object.entries(flagsDescriptions).map(([flag, description]) => (
                <div key={flag} className="flex items-start space-x-2">
                  <Checkbox
                    id={`flag-${flag}`}
                    checked={flags[flag as keyof typeof flags]}
                    onCheckedChange={() =>
                      toggleFlag(flag as keyof typeof flags)
                    }
                  />
                  <div className="grid gap-0.5 leading-none">
                    <label
                      htmlFor={`flag-${flag}`}
                      className="text-sm font-mono font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 cursor-pointer"
                    >
                      {flag}
                    </label>
                    <p className="text-xs text-muted-foreground">
                      {description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </Card>

      <Card className="space-y-4 p-6">
        <div className="space-y-2">
          <Label htmlFor="test-string" className="font-semibold">
            Test String
          </Label>
          <Textarea
            id="test-string"
            value={testString}
            onChange={(e) => setTestString(e.target.value)}
            placeholder="Enter text to test against the regex"
            className="font-mono text-sm min-h-[150px]"
          />
        </div>

        {regexResult.valid && (
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <Label className="font-semibold">
                Highlighted Matches ({regexResult.matches.length})
              </Label>
            </div>
            <div className="border rounded-lg p-4 bg-muted/30 font-mono text-sm whitespace-pre-wrap break-all min-h-[150px]">
              {Array.isArray(highlightedText)
                ? highlightedText.map((segment, i) => (
                    <span
                      key={i}
                      className={
                        segment.isMatch
                          ? 'bg-yellow-300 dark:bg-yellow-600 font-semibold'
                          : ''
                      }
                    >
                      {segment.text}
                    </span>
                  ))
                : highlightedText}
            </div>
          </div>
        )}
      </Card>

      {regexResult.valid && regexResult.matches.length > 0 && (
        <Card className="space-y-4 p-6">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="font-semibold text-lg">
                Match Details ({regexResult.matches.length})
              </h2>
              <p className="text-muted-foreground text-sm">
                Detailed information about each match
              </p>
            </div>
          </div>

          <div className="space-y-3">
            {regexResult.matches.map((match, idx) => (
              <div
                key={`${match.index}-${idx}`}
                className="border rounded-lg p-4 bg-muted/50 space-y-2"
              >
                <div className="flex items-start justify-between gap-2">
                  <div className="space-y-1 flex-1">
                    <div className="flex items-center gap-2">
                      <Badge variant="secondary">Match {idx + 1}</Badge>
                      <span className="text-xs text-muted-foreground">
                        Position: {match.index}
                      </span>
                    </div>
                    <p className="font-mono text-sm bg-background p-2 rounded border break-all">
                      {match.text}
                    </p>
                  </div>
                  <CopyButton text={match.text} showText={false} />
                </div>

                {match.groups.length > 0 && (
                  <div className="space-y-2 pt-2 border-t">
                    <p className="text-xs font-semibold text-muted-foreground">
                      Captured Groups ({match.groups.length})
                    </p>
                    <div className="space-y-1">
                      {match.groups.map((group, groupIdx) => (
                        <div
                          key={groupIdx}
                          className="flex items-center gap-2 text-sm"
                        >
                          <Badge variant="outline" className="font-mono">
                            ${groupIdx + 1}
                          </Badge>
                          <code className="font-mono bg-background px-2 py-0.5 rounded border flex-1">
                            {group || '(empty)'}
                          </code>
                          {group && (
                            <CopyButton
                              text={group}
                              showText={false}
                              size="sm"
                            />
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </Card>
      )}
    </ToolLayout>
  )
}
