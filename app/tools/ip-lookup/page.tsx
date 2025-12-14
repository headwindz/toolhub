"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { ArrowLeft, Globe, MapPin, Loader2 } from "lucide-react"
import Link from "next/link"

export default function IpLookupPage() {
  const [ipAddress, setIpAddress] = useState("")
  const [loading, setLoading] = useState(false)
  const [result, setResult] = useState<any>(null)
  const [error, setError] = useState("")

  const lookupIp = async () => {
    if (!ipAddress.trim()) {
      setError("Please enter an IP address")
      return
    }

    setLoading(true)
    setError("")
    setResult(null)

    try {
      const response = await fetch(`https://ipapi.co/${ipAddress}/json/`)
      const data = await response.json()

      if (data.error) {
        setError(data.reason || "Invalid IP address")
      } else {
        setResult(data)
      }
    } catch (err) {
      setError("Failed to lookup IP address")
    } finally {
      setLoading(false)
    }
  }

  const getCurrentIp = async () => {
    setLoading(true)
    setError("")
    setResult(null)

    try {
      const response = await fetch("https://ipapi.co/json/")
      const data = await response.json()
      setResult(data)
      setIpAddress(data.ip)
    } catch (err) {
      setError("Failed to get current IP")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-primary/5">
      <div className="container mx-auto p-6">
        <div className="mb-6">
          <Link href="/">
            <Button variant="ghost" size="sm">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Tools
            </Button>
          </Link>
        </div>

        <div className="mx-auto max-w-3xl space-y-6">
          <div className="flex items-center gap-4">
            <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-blue-500 to-cyan-500 shadow-lg">
              <Globe className="h-8 w-8 text-white" />
            </div>
            <div className="flex-1">
              <div className="flex items-center gap-2">
                <h1 className="text-3xl font-bold">IP Lookup</h1>
                <Badge variant="secondary">Network</Badge>
              </div>
              <p className="text-muted-foreground">Get geolocation information for any IP address</p>
            </div>
          </div>

          <Card className="overflow-hidden">
            <div className="bg-gradient-to-r from-blue-500/10 to-cyan-500/10 p-6">
              <div className="space-y-4">
                <div className="flex gap-2">
                  <Input
                    placeholder="Enter IP address (e.g., 8.8.8.8)"
                    value={ipAddress}
                    onChange={(e) => setIpAddress(e.target.value)}
                    onKeyDown={(e) => e.key === "Enter" && lookupIp()}
                    className="flex-1"
                  />
                  <Button onClick={lookupIp} disabled={loading}>
                    {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : "Lookup"}
                  </Button>
                </div>
                <Button variant="outline" onClick={getCurrentIp} disabled={loading} className="w-full bg-transparent">
                  <Globe className="mr-2 h-4 w-4" />
                  Get My IP
                </Button>
              </div>
            </div>

            {error && (
              <div className="border-t bg-red-500/10 p-4">
                <p className="text-sm text-red-600 dark:text-red-400">{error}</p>
              </div>
            )}

            {result && (
              <div className="border-t p-6">
                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <MapPin className="mt-1 h-5 w-5 text-primary" />
                    <div className="flex-1 space-y-3">
                      <div>
                        <div className="text-sm font-medium text-muted-foreground">IP Address</div>
                        <div className="text-lg font-semibold">{result.ip}</div>
                      </div>

                      <div className="grid gap-3 sm:grid-cols-2">
                        <div>
                          <div className="text-sm font-medium text-muted-foreground">Country</div>
                          <div className="font-medium">
                            {result.country_flag} {result.country_name}
                          </div>
                        </div>
                        <div>
                          <div className="text-sm font-medium text-muted-foreground">City</div>
                          <div className="font-medium">{result.city || "N/A"}</div>
                        </div>
                        <div>
                          <div className="text-sm font-medium text-muted-foreground">Region</div>
                          <div className="font-medium">{result.region || "N/A"}</div>
                        </div>
                        <div>
                          <div className="text-sm font-medium text-muted-foreground">Postal Code</div>
                          <div className="font-medium">{result.postal || "N/A"}</div>
                        </div>
                        <div>
                          <div className="text-sm font-medium text-muted-foreground">Coordinates</div>
                          <div className="font-medium">
                            {result.latitude}, {result.longitude}
                          </div>
                        </div>
                        <div>
                          <div className="text-sm font-medium text-muted-foreground">Timezone</div>
                          <div className="font-medium">{result.timezone || "N/A"}</div>
                        </div>
                        <div>
                          <div className="text-sm font-medium text-muted-foreground">ISP</div>
                          <div className="font-medium">{result.org || "N/A"}</div>
                        </div>
                        <div>
                          <div className="text-sm font-medium text-muted-foreground">ASN</div>
                          <div className="font-medium">{result.asn || "N/A"}</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </Card>
        </div>
      </div>
    </div>
  )
}
