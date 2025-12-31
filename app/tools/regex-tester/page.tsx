'use client'

import { useState, useMemo } from 'react'
import { ToolLayout } from '@/components/tool-layout'
import { Card } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { FileCode, AlertCircle, CheckCircle2, Wand2 } from 'lucide-react'
import { RegexTesterKnowledge } from './knowledge'
import { GlobalPatternFlags } from './global-pattern-flags'
import { Match, IMatch } from './match'

export default function RegexpTester() {
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
      const matches: IMatch[] = []

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
              <span className="text-muted-foreground text-2xl">/</span>
              <Input
                id="regex-pattern"
                value={pattern}
                onChange={(e) => setPattern(e.target.value)}
                placeholder="Enter regex pattern"
                className="font-mono flex-1"
              />
              <span className="text-muted-foreground text-2xl">/</span>
            </div>
            {regexResult.valid ? (
              <div className="flex text-sm text-green-600 gap-2 items-center dark:text-green-400">
                <CheckCircle2 className="h-4 w-4" />
                Valid regex: {regexResult.regex}
              </div>
            ) : (
              <div className="flex text-sm text-red-600 gap-2 items-center dark:text-red-400">
                <AlertCircle className="h-4 w-4" />
                {regexResult.error}
              </div>
            )}
          </div>

          <GlobalPatternFlags flags={flags} toggleFlag={toggleFlag} />
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
            <div className="border rounded-lg font-mono bg-muted/30 text-sm min-h-[150px] p-4 whitespace-pre-wrap break-all">
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
              <Match key={`${match.index}-${idx}`} match={match} idx={idx} />
            ))}
          </div>
        </Card>
      )}
    </ToolLayout>
  )
}
