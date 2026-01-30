'use client'

import { CopyButton } from '@/components/copy-button'
import { ToolLayout } from '@/components/tool-layout'
import { Card } from '@/components/ui/card'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Shield } from 'lucide-react'
import { useState } from 'react'
import { JwtKnowledge } from './knowledge'

interface DecodedJWT {
  header: Record<string, any>
  payload: Record<string, any>
  signature: string
  headerRaw: string
  payloadRaw: string
}

export default function JwtDecoderPage() {
  const [token, setToken] = useState('')
  const [decoded, setDecoded] = useState<DecodedJWT | null>(null)
  const [error, setError] = useState('')

  const decodeJWT = (jwt: string) => {
    setError('')
    setDecoded(null)

    const trimmedJwt = jwt.trim()
    if (!trimmedJwt) {
      return
    }

    try {
      const parts = trimmedJwt.split('.')
      if (parts.length !== 3) {
        setError(
          'Invalid JWT format. JWT should have 3 parts separated by dots.'
        )
        return
      }

      const [headerB64, payloadB64, signature] = parts

      // Decode header
      const headerRaw = base64UrlDecode(headerB64)
      const header = JSON.parse(headerRaw)

      // Decode payload
      const payloadRaw = base64UrlDecode(payloadB64)
      const payload = JSON.parse(payloadRaw)

      setDecoded({
        header,
        payload,
        signature,
        headerRaw,
        payloadRaw,
      })
    } catch (err) {
      setError(
        'Error decoding JWT: ' +
          (err instanceof Error ? err.message : 'Invalid JWT')
      )
    }
  }

  const base64UrlDecode = (str: string): string => {
    // Replace URL-safe characters
    let base64 = str.replace(/-/g, '+').replace(/_/g, '/')

    // Add padding if needed
    const padding = base64.length % 4
    if (padding) {
      base64 += '='.repeat(4 - padding)
    }

    try {
      // Decode base64
      const decoded = atob(base64)
      // Convert to UTF-8
      return decodeURIComponent(
        decoded
          .split('')
          .map((c) => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2))
          .join('')
      )
    } catch (e) {
      throw new Error('Invalid Base64 encoding')
    }
  }

  const formatTimestamp = (timestamp: number) => {
    return new Date(timestamp * 1000).toLocaleString()
  }

  const handleTokenChange = (value: string) => {
    setToken(value)
    decodeJWT(value)
  }

  return (
    <ToolLayout
      title="JWT Decoder"
      description="Decode and analyze JSON Web Tokens"
      icon={Shield}
      badges={[{ label: 'Instant' }, { label: 'Secure' }]}
    >
      <JwtKnowledge />

      <Card className="border-2 overflow-hidden">
        <div className="space-y-4 p-6">
          <div>
            <Label htmlFor="jwt-input" className="font-semibold mb-2 block">
              Enter JWT Token
            </Label>
            <Textarea
              id="jwt-input"
              placeholder="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
              value={token}
              onChange={(e) => handleTokenChange(e.target.value)}
              className="font-mono text-sm min-h-[120px]"
            />
          </div>

          {error && (
            <div className="border rounded-lg bg-destructive/10 border-destructive/20 text-destructive p-4">
              <p className="font-medium text-sm">{error}</p>
            </div>
          )}
        </div>
      </Card>

      {decoded && (
        <>
          <Card className="border-2 overflow-hidden">
            <div className="bg-gradient-to-r border-b from-blue-500/10 to-purple-500/10 p-4">
              <div className="flex items-center justify-between">
                <h3 className="font-semibold">Header</h3>
                <CopyButton text={decoded.headerRaw} className="h-8" />
              </div>
            </div>
            <div className="p-6">
              <pre className="rounded-lg bg-secondary/30 p-4 overflow-x-auto">
                <code className="text-sm">
                  {JSON.stringify(decoded.header, null, 2)}
                </code>
              </pre>

              {decoded.header.alg && (
                <div className="space-y-2 mt-4">
                  <div className="flex gap-2">
                    <span className="text-muted-foreground text-sm">
                      Algorithm:
                    </span>
                    <span className="font-mono text-sm">
                      {decoded.header.alg as string}
                    </span>
                  </div>
                  {decoded.header.typ && (
                    <div className="flex gap-2">
                      <span className="text-muted-foreground text-sm">
                        Type:
                      </span>
                      <span className="font-mono text-sm">
                        {decoded.header.typ as string}
                      </span>
                    </div>
                  )}
                </div>
              )}
            </div>
          </Card>

          <Card className="border-2 overflow-hidden">
            <div className="bg-gradient-to-r border-b from-blue-500/10 to-purple-500/10 p-4">
              <div className="flex items-center justify-between">
                <h3 className="font-semibold">Payload</h3>
                <CopyButton text={decoded.payloadRaw} className="h-8" />
              </div>
            </div>
            <div className="p-6">
              <pre className="rounded-lg bg-secondary/30 p-4 overflow-x-auto">
                <code className="text-sm">
                  {JSON.stringify(decoded.payload, null, 2)}
                </code>
              </pre>

              {Object.keys(decoded.payload).length > 0 && (
                <div className="space-y-2 mt-4">
                  {decoded.payload.iss && (
                    <div className="flex gap-2">
                      <span className="text-muted-foreground text-sm">
                        Issuer (iss):
                      </span>
                      <span className="font-mono text-sm">
                        {decoded.payload.iss as string}
                      </span>
                    </div>
                  )}
                  {decoded.payload.sub && (
                    <div className="flex gap-2">
                      <span className="text-muted-foreground text-sm">
                        Subject (sub):
                      </span>
                      <span className="font-mono text-sm">
                        {decoded.payload.sub as string}
                      </span>
                    </div>
                  )}
                  {decoded.payload.aud && (
                    <div className="flex gap-2">
                      <span className="text-muted-foreground text-sm">
                        Audience (aud):
                      </span>
                      <span className="font-mono text-sm">
                        {Array.isArray(decoded.payload.aud)
                          ? decoded.payload.aud.join(', ')
                          : (decoded.payload.aud as string)}
                      </span>
                    </div>
                  )}
                  {decoded.payload.exp && (
                    <div className="flex gap-2">
                      <span className="text-muted-foreground text-sm">
                        Expires (exp):
                      </span>
                      <span className="font-mono text-sm">
                        {formatTimestamp(decoded.payload.exp as number)}
                      </span>
                    </div>
                  )}
                  {decoded.payload.iat && (
                    <div className="flex gap-2">
                      <span className="text-muted-foreground text-sm">
                        Issued At (iat):
                      </span>
                      <span className="font-mono text-sm">
                        {formatTimestamp(decoded.payload.iat as number)}
                      </span>
                    </div>
                  )}
                  {decoded.payload.nbf && (
                    <div className="flex gap-2">
                      <span className="text-muted-foreground text-sm">
                        Not Before (nbf):
                      </span>
                      <span className="font-mono text-sm">
                        {formatTimestamp(decoded.payload.nbf as number)}
                      </span>
                    </div>
                  )}
                </div>
              )}
            </div>
          </Card>

          <Card className="border-2 overflow-hidden">
            <div className="bg-gradient-to-r border-b from-blue-500/10 to-purple-500/10 p-4">
              <div className="flex items-center justify-between">
                <h3 className="font-semibold">Signature</h3>
                <CopyButton text={decoded.signature} className="h-8" />
              </div>
            </div>
            <div className="p-6">
              <div className="rounded-lg bg-secondary/30 p-4">
                <code className="font-mono text-sm break-all">
                  {decoded.signature}
                </code>
              </div>
              <p className="mt-4 text-muted-foreground text-sm">
                ⚠️ The signature is not verified. To verify the signature, you
                need the secret key or public key used to sign the token.
              </p>
            </div>
          </Card>
        </>
      )}
    </ToolLayout>
  )
}
