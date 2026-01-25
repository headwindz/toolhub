'use client'

import { ToolLayout } from '@/components/tool-layout'
import { Card } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Select } from '@/components/ui/select'
import { Shield, AlertCircle, CheckCircle2, XCircle, Info } from 'lucide-react'
import { useState } from 'react'
import { CORSKnowledge } from './knowledge'
import { CodeSamples } from './code-sample'
import { Solutions } from './solutions'

type CORSResult = {
  willCORS: boolean
  needsPreflight: boolean
  issues: string[]
  solutions: string[]
  preflightHeaders: string[]
  responseHeaders: string[]
}

const SIMPLE_METHODS = ['GET', 'HEAD', 'POST']
const SIMPLE_CONTENT_TYPES = [
  'application/x-www-form-urlencoded',
  'multipart/form-data',
  'text/plain',
]
const SIMPLE_HEADERS = [
  'accept',
  'accept-language',
  'content-language',
  'content-type',
]

export default function WillItCORSPage() {
  const [sourceURL, setSourceURL] = useState('')
  const [targetURL, setTargetURL] = useState('')
  const [method, setMethod] = useState('GET')
  const [contentType, setContentType] = useState('')
  const [customHeaders, setCustomHeaders] = useState('')
  const [credentials, setCredentials] = useState('omit')
  const [result, setResult] = useState<CORSResult | null>(null)

  const renderResult = () => {
    if (!result) {
      return null
    }

    const {
      willCORS,
      needsPreflight,
      issues,
      solutions,
      preflightHeaders,
      responseHeaders,
    } = result

    return (
      <div className="space-y-6">
        {/* Summary Card */}
        <Card
          className={`border-2 shadow-xl p-6 ${
            willCORS
              ? needsPreflight
                ? 'border-amber-500/30 bg-amber-500/5'
                : 'border-blue-500/30 bg-blue-500/5'
              : 'border-green-500/30 bg-green-500/5'
          }`}
        >
          <div className="flex items-start gap-4">
            {willCORS ? (
              needsPreflight ? (
                <AlertCircle className="h-8 w-8 text-amber-500 shrink-0" />
              ) : (
                <Info className="h-8 w-8 text-blue-500 shrink-0" />
              )
            ) : (
              <CheckCircle2 className="h-8 w-8 text-green-500 shrink-0" />
            )}
            <div className="flex-1">
              <h3 className="text-xl font-bold mb-2">
                {willCORS
                  ? needsPreflight
                    ? 'Preflight Required'
                    : 'Simple CORS Request'
                  : 'No CORS Required'}
              </h3>
              <p className="text-muted-foreground">
                {willCORS
                  ? needsPreflight
                    ? 'This is a cross-origin request that requires a preflight OPTIONS request.'
                    : 'This is a simple cross-origin request. No preflight needed.'
                  : 'This is a same-origin request. CORS policies do not apply.'}
              </p>
            </div>
          </div>
        </Card>

        {/* Issues */}
        {issues.length > 0 && (
          <Card className="border-2 shadow-xl overflow-hidden">
            <div className="bg-gradient-to-r from-amber-500/10 via-amber-500/5 to-transparent p-5">
              <h3 className="font-semibold text-lg flex items-center gap-2">
                <XCircle className="h-5 w-5 text-amber-500" />
                CORS Considerations
              </h3>
            </div>
            <div className="p-6 pt-4">
              <ul className="space-y-2">
                {issues.map((issue, index) => (
                  <li key={index} className="flex items-center gap-2 text-sm">
                    <span className="text-amber-500 shrink-0">•</span>
                    <span>{issue}</span>
                  </li>
                ))}
              </ul>
            </div>
          </Card>
        )}

        {/* Preflight Headers */}
        {preflightHeaders.length > 0 && (
          <Card className="border-2 shadow-xl overflow-hidden">
            <div className="bg-gradient-to-r from-blue-500/10 via-blue-500/5 to-transparent p-5">
              <h3 className="font-semibold text-lg">Preflight Request</h3>
            </div>
            <div className="p-6 pt-4">
              <Badge className="mb-3 bg-blue-500/10 text-blue-600 dark:text-blue-400 border-blue-500/20 border">
                OPTIONS Request
              </Badge>
              <pre className="bg-muted p-4 rounded-lg text-sm overflow-x-auto">
                {preflightHeaders.join('\n')}
              </pre>
            </div>
          </Card>
        )}

        <Solutions solutions={solutions} responseHeaders={responseHeaders} />

        <CodeSamples
          sourceURL={sourceURL}
          credentials={credentials}
          method={method}
          needsPreflight={needsPreflight}
        />
      </div>
    )
  }

  const analyzeCORS = () => {
    try {
      const sourceOrigin = new URL(sourceURL.trim() || 'http://localhost:3000')
        .origin
      const targetOrigin = new URL(targetURL.trim() || 'http://api.example.com')
        .origin

      const issues: string[] = []
      const solutions: string[] = []
      const preflightHeaders: string[] = []
      const responseHeaders: string[] = []

      // Check if same origin
      const isSameOrigin = sourceOrigin === targetOrigin

      if (isSameOrigin) {
        setResult({
          willCORS: false,
          needsPreflight: false,
          issues: [],
          solutions: ['This is a same-origin request. CORS is not required.'],
          preflightHeaders: [],
          responseHeaders: [],
        })
        return
      }

      // Different origin - CORS applies
      let needsPreflight = false

      // Check method
      if (!SIMPLE_METHODS.includes(method.toUpperCase())) {
        needsPreflight = true
        issues.push(`Method "${method}" requires a preflight request`)
      }

      // Check Content-Type
      if (
        contentType &&
        !SIMPLE_CONTENT_TYPES.includes(contentType.toLowerCase())
      ) {
        needsPreflight = true
        issues.push(
          `Content-Type "${contentType}" requires a preflight request`
        )
      }

      // Check custom headers
      const headers = customHeaders
        .split('\n')
        .map((h) => h.trim())
        .filter((h) => h)
      const customHeadersList = headers.map((h) =>
        h.split(':')[0].toLowerCase()
      )
      const hasCustomHeaders = customHeadersList.some(
        (h) => !SIMPLE_HEADERS.includes(h)
      )

      if (hasCustomHeaders) {
        needsPreflight = true
        const nonSimple = customHeadersList.filter(
          (h) => !SIMPLE_HEADERS.includes(h)
        )
        issues.push(`Custom headers require preflight: ${nonSimple.join(', ')}`)
      }

      // Check credentials
      if (credentials === 'include') {
        issues.push(
          'Credentials mode is "include" - requires specific CORS headers'
        )
        solutions.push(
          'Server must include "Access-Control-Allow-Credentials: true"'
        )
        solutions.push(
          'Server cannot use wildcard (*) for Access-Control-Allow-Origin when credentials are included'
        )
        responseHeaders.push('Access-Control-Allow-Credentials: true')
        responseHeaders.push(`Access-Control-Allow-Origin: ${sourceOrigin}`)
      } else {
        responseHeaders.push(`Access-Control-Allow-Origin: ${sourceOrigin}`)
        responseHeaders.push('# OR')
        responseHeaders.push('Access-Control-Allow-Origin: *')
      }

      // Build preflight requirements
      if (needsPreflight) {
        issues.push(
          'A preflight OPTIONS request will be sent before the actual request'
        )

        preflightHeaders.push('# Preflight Request Headers:')
        preflightHeaders.push(`Origin: ${sourceOrigin}`)
        preflightHeaders.push(`Access-Control-Request-Method: ${method}`)

        if (hasCustomHeaders) {
          const nonSimple = customHeadersList.filter(
            (h) => !SIMPLE_HEADERS.includes(h)
          )
          preflightHeaders.push(
            `Access-Control-Request-Headers: ${nonSimple.join(', ')}`
          )
        }

        solutions.push('Server must respond to OPTIONS preflight request with:')
        solutions.push(
          `Access-Control-Allow-Methods: ${method} (or include ${method} in allowed methods)`
        )

        if (hasCustomHeaders) {
          const nonSimple = customHeadersList.filter(
            (h) => !SIMPLE_HEADERS.includes(h)
          )
          solutions.push(
            `Access-Control-Allow-Headers: ${nonSimple.join(', ')}`
          )
        }

        solutions.push(
          'Optionally: Access-Control-Max-Age: 86400 (cache preflight for 24 hours)'
        )
      }

      // General CORS requirements
      if (method === 'GET' && !hasCustomHeaders && !contentType) {
        solutions.push(
          'This is a simple CORS request. Server only needs to include:'
        )
      }

      setResult({
        willCORS: true,
        needsPreflight,
        issues,
        solutions,
        preflightHeaders,
        responseHeaders,
      })
    } catch (error) {
      setResult({
        willCORS: false,
        needsPreflight: false,
        issues: ['Invalid URL format. Please enter valid URLs.'],
        solutions: [],
        preflightHeaders: [],
        responseHeaders: [],
      })
    }
  }

  return (
    <ToolLayout
      title="Will it CORS?"
      description="Analyze cross-origin requests and get solutions for CORS issues"
      icon={Shield}
      badges={[{ label: 'CORS Analyzer' }]}
    >
      <CORSKnowledge />

      <Card className="border-2 shadow-xl p-6 mb-6">
        <h2 className="text-xl font-semibold mb-4">Request Configuration</h2>

        <div className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="source-url">Source URL (Your Website)</Label>
              <Input
                id="source-url"
                type="url"
                placeholder="https://myapp.com"
                value={sourceURL}
                onChange={(e) => setSourceURL(e.target.value)}
                className="border-2"
              />
              <p className="text-xs text-muted-foreground">
                The origin making the request
              </p>
            </div>

            <div className="space-y-2">
              <Label htmlFor="target-url">Target URL (API/Resource)</Label>
              <Input
                id="target-url"
                type="url"
                placeholder="https://api.example.com/data"
                value={targetURL}
                onChange={(e) => setTargetURL(e.target.value)}
                className="border-2"
              />
              <p className="text-xs text-muted-foreground">
                The API or resource you&apos;re requesting
              </p>
            </div>
          </div>

          <div className="grid gap-4 md:grid-cols-3">
            <div className="space-y-2">
              <Label htmlFor="method">HTTP Method</Label>
              <Select
                id="method"
                value={method}
                onChange={(e) => setMethod(e.target.value)}
                className="border-2"
              >
                <option value="GET">GET</option>
                <option value="POST">POST</option>
                <option value="PUT">PUT</option>
                <option value="PATCH">PATCH</option>
                <option value="DELETE">DELETE</option>
                <option value="HEAD">HEAD</option>
                <option value="OPTIONS">OPTIONS</option>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="content-type">Content-Type</Label>
              <Input
                id="content-type"
                placeholder="application/json"
                value={contentType}
                onChange={(e) => setContentType(e.target.value)}
                className="border-2"
              />
              <p className="text-xs text-muted-foreground">Optional</p>
            </div>

            <div className="space-y-2">
              <Label htmlFor="credentials">Credentials Mode</Label>
              <Select
                id="credentials"
                value={credentials}
                onChange={(e) => setCredentials(e.target.value)}
                className="border-2"
              >
                <option value="omit">Omit</option>
                <option value="same-origin">Same Origin</option>
                <option value="include">Include</option>
              </Select>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="headers">Custom Headers (one per line)</Label>
            <textarea
              id="headers"
              placeholder="Authorization: Bearer token&#10;X-Custom-Header: value"
              value={customHeaders}
              onChange={(e) => setCustomHeaders(e.target.value)}
              className="w-full min-h-[100px] border-2 rounded-md p-3 text-sm font-mono"
            />
            <p className="text-xs text-muted-foreground">
              Format: Header-Name: value (one per line)
            </p>
          </div>

          <Button onClick={analyzeCORS} size="lg" className="w-full">
            <Shield className="mr-2 h-5 w-5" />
            Analyze CORS
          </Button>
        </div>
      </Card>

      {renderResult()}
    </ToolLayout>
  )
}
