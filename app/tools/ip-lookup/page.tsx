'use client'

import { ToolLayout } from '@/components/tool-layout'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Building2, Clock, Globe, Loader2, MapPin, Network } from 'lucide-react'
import { useEffect, useState } from 'react'
import { InfoCard } from './info-card'
import { IpKnowledge } from './knowledge'

export default function IpLookupPage() {
  const [ipAddress, setIpAddress] = useState('')
  const [loading, setLoading] = useState(false)
  const [result, setResult] = useState<any>(null)
  const [error, setError] = useState('')
  const [currentTime, setCurrentTime] = useState('')

  const lookupIp = async () => {
    if (!ipAddress.trim()) {
      setError('Please enter an IP address')
      return
    }

    setLoading(true)
    setError('')
    setResult(null)

    try {
      const response = await fetch(`https://ipapi.co/${ipAddress}/json/`)
      const data = await response.json()

      if (data.error) {
        setError(data.reason || 'Invalid IP address')
      } else {
        setResult(data)
      }
    } catch (err) {
      setError('Failed to lookup IP address')
    } finally {
      setLoading(false)
    }
  }

  const getCurrentIp = async () => {
    setLoading(true)
    setError('')
    setResult(null)

    try {
      const response = await fetch('https://ipapi.co/json/')
      const data = await response.json()
      setResult(data)
      setIpAddress(data.ip)
    } catch (err) {
      setError('Failed to get current IP')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    if (result?.timezone) {
      const updateTime = () => {
        const time = new Date().toLocaleString('en-US', {
          timeZone: result.timezone,
          hour: '2-digit',
          minute: '2-digit',
          second: '2-digit',
          hour12: true,
        })
        setCurrentTime(time)
      }

      updateTime()
      const interval = setInterval(updateTime, 1000)
      return () => clearInterval(interval)
    }
  }, [result?.timezone])

  return (
    <ToolLayout
      title="IP Lookup"
      description="Get geolocation information for any IP address"
      icon={Globe}
      badges={[{ label: 'Real-time' }, { label: 'Accurate' }]}
    >
      <IpKnowledge />

      <Card className="border-2 overflow-hidden">
        <div className="space-y-4 p-6">
          <div>
            <Label htmlFor="ip-input" className="font-semibold mb-2 block">
              IP Address to Lookup
            </Label>
            <div className="flex gap-2">
              <Input
                id="ip-input"
                placeholder="Enter IP address (e.g., 8.8.8.8)"
                value={ipAddress}
                onChange={(e) => setIpAddress(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && lookupIp()}
                className="flex-1"
              />
              <Button onClick={lookupIp} disabled={loading} className="gap-2">
                {loading && <Loader2 className="h-4 animate-spin w-4" />}
                {loading ? 'Looking up...' : 'Lookup'}
              </Button>
            </div>
          </div>
          <Button
            variant="outline"
            onClick={getCurrentIp}
            disabled={loading}
            className="w-full gap-2"
          >
            <Globe className="h-4 w-4" />
            Detect My IP
          </Button>
        </div>

        {error && (
          <div className="border-t bg-red-500/10 p-4">
            <p className="font-medium text-sm text-red-600 dark:text-red-400">
              {error}
            </p>
          </div>
        )}

        {result && (
          <div className="border-t space-y-6 p-6">
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              <InfoCard
                icon={Globe}
                label="Location"
                value={result.country_name}
                subtitle={
                  result.city &&
                  `${result.city}${result.region ? `, ${result.region}` : ''}`
                }
              />

              <InfoCard
                icon={MapPin}
                label="Coordinates"
                value={`${result.latitude}, ${result.longitude}`}
                valueClassName="font-mono"
                subtitle={result.postal && `Postal: ${result.postal}`}
              />

              <InfoCard
                icon={Clock}
                label="Timezone"
                value={result.timezone || 'N/A'}
                subtitle={
                  currentTime && (
                    <span className="font-mono">{currentTime}</span>
                  )
                }
              />

              <InfoCard
                icon={Building2}
                label="ISP"
                value={result.org || 'N/A'}
                valueClassName="break-words"
              />

              <InfoCard
                icon={Network}
                label="ASN"
                value={result.asn || 'N/A'}
                valueClassName="font-mono"
              />
            </div>

            <Card className="bg-secondary/50 border-0 p-4 overflow-hidden">
              <div className="flex mb-3 gap-3 items-start">
                <MapPin className="h-5 text-primary w-5" />
                <div className="font-semibold text-sm">Location Map</div>
              </div>
              <div className="border rounded-lg overflow-hidden">
                <iframe
                  width="100%"
                  height="300"
                  style={{ border: 0 }}
                  src={`https://www.openstreetmap.org/export/embed.html?bbox=${result.longitude - 0.1},${result.latitude - 0.1},${result.longitude + 0.1},${result.latitude + 0.1}&layer=mapnik&marker=${result.latitude},${result.longitude}`}
                  allowFullScreen
                />
              </div>
            </Card>
          </div>
        )}
      </Card>
    </ToolLayout>
  )
}
