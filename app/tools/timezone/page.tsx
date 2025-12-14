"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Clock, Globe2, Plus, Trash2, Calendar } from "lucide-react"
import { ToolLayout } from "@/components/tool-layout"

const popularTimezones = [
  { name: "America/New_York", label: "New York", region: "Americas" },
  { name: "America/Los_Angeles", label: "Los Angeles", region: "Americas" },
  { name: "America/Chicago", label: "Chicago", region: "Americas" },
  { name: "America/Toronto", label: "Toronto", region: "Americas" },
  { name: "America/Mexico_City", label: "Mexico City", region: "Americas" },
  { name: "America/Sao_Paulo", label: "São Paulo", region: "Americas" },
  { name: "Europe/London", label: "London", region: "Europe" },
  { name: "Europe/Paris", label: "Paris", region: "Europe" },
  { name: "Europe/Berlin", label: "Berlin", region: "Europe" },
  { name: "Europe/Moscow", label: "Moscow", region: "Europe" },
  { name: "Asia/Dubai", label: "Dubai", region: "Asia" },
  { name: "Asia/Shanghai", label: "Shanghai", region: "Asia" },
  { name: "Asia/Tokyo", label: "Tokyo", region: "Asia" },
  { name: "Asia/Hong_Kong", label: "Hong Kong", region: "Asia" },
  { name: "Asia/Singapore", label: "Singapore", region: "Asia" },
  { name: "Asia/Kolkata", label: "Mumbai", region: "Asia" },
  { name: "Australia/Sydney", label: "Sydney", region: "Pacific" },
  { name: "Pacific/Auckland", label: "Auckland", region: "Pacific" },
]

interface TimezoneData {
  name: string
  label: string
  time: string
  date: string
  offset: string
  offsetHours: number
  dayDiff: number
}

export default function TimezonePage() {
  const [referenceTime, setReferenceTime] = useState(new Date())
  const [selectedTimezones, setSelectedTimezones] = useState<string[]>([
    "America/New_York",
    "Europe/London",
    "Asia/Tokyo",
  ])
  const [timezoneData, setTimezoneData] = useState<TimezoneData[]>([])
  const [searchQuery, setSearchQuery] = useState("")

  useEffect(() => {
    const timer = setInterval(() => {
      setReferenceTime(new Date())
    }, 1000)
    return () => clearInterval(timer)
  }, [])

  useEffect(() => {
    const userTimezone = Intl.DateTimeFormat().resolvedOptions().timeZone
    const userDate = referenceTime.getDate()

    const data = selectedTimezones.map((tz) => {
      try {
        const time = referenceTime.toLocaleString("en-US", {
          timeZone: tz,
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit",
          hour12: true,
        })

        const date = referenceTime.toLocaleString("en-US", {
          timeZone: tz,
          month: "short",
          day: "numeric",
          weekday: "short",
        })

        // Calculate offset from user's timezone
        const userOffset = -new Date().getTimezoneOffset()
        const tzDate = new Date(referenceTime.toLocaleString("en-US", { timeZone: tz }))
        const tzOffset = -tzDate.getTimezoneOffset()
        const offsetDiff = (tzOffset - userOffset) / 60

        const offsetSign = offsetDiff >= 0 ? "+" : ""
        const offsetStr = `UTC${offsetSign}${offsetDiff}`

        const tzDay = new Date(referenceTime.toLocaleString("en-US", { timeZone: tz })).getDate()
        const dayDiff = tzDay - userDate

        const tzInfo = popularTimezones.find((t) => t.name === tz)

        return {
          name: tz,
          label: tzInfo?.label || tz.split("/").pop() || tz,
          time,
          date,
          offset: offsetStr,
          offsetHours: offsetDiff,
          dayDiff,
        }
      } catch (e) {
        return {
          name: tz,
          label: tz,
          time: "Invalid",
          date: "",
          offset: "",
          offsetHours: 0,
          dayDiff: 0,
        }
      }
    })

    // Sort by offset
    data.sort((a, b) => a.offsetHours - b.offsetHours)
    setTimezoneData(data)
  }, [referenceTime, selectedTimezones])

  const addTimezone = (tzName: string) => {
    if (!selectedTimezones.includes(tzName)) {
      setSelectedTimezones([...selectedTimezones, tzName])
    }
    setSearchQuery("")
  }

  const removeTimezone = (tzName: string) => {
    setSelectedTimezones(selectedTimezones.filter((tz) => tz !== tzName))
  }

  const filteredTimezones = popularTimezones.filter(
    (tz) =>
      !selectedTimezones.includes(tz.name) &&
      (tz.label.toLowerCase().includes(searchQuery.toLowerCase()) ||
        tz.name.toLowerCase().includes(searchQuery.toLowerCase())),
  )

  const userTimezone = Intl.DateTimeFormat().resolvedOptions().timeZone
  const userTime = referenceTime.toLocaleString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: true,
  })
  const userDate = referenceTime.toLocaleString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  })

  return (
    <ToolLayout
      title="Timezone Converter"
      description="Compare times across different timezones"
      icon={Clock}
      category="Developer"
    >
      <div className="space-y-6">
        <Card className="overflow-hidden border-2 border-primary/20">
            <div className="bg-gradient-to-r from-amber-500/10 to-orange-500/10 p-6">
              <div className="space-y-3">
                <div className="flex items-center gap-2">
                  <Globe2 className="h-5 w-5 text-primary" />
                  <h2 className="text-lg font-semibold">Your Local Time</h2>
                </div>
                <div className="space-y-1">
                  <p className="text-4xl font-mono font-bold tabular-nums">{userTime}</p>
                  <p className="text-lg text-muted-foreground">{userDate}</p>
                  <p className="text-sm text-muted-foreground flex items-center gap-1">
                    <Calendar className="h-3 w-3" />
                    {userTimezone}
                  </p>
                </div>
              </div>
            </div>
          </Card>

          <Card className="p-6">
            <div className="space-y-4">
              <div>
                <Label htmlFor="timezone-search" className="text-base font-semibold">
                  Add Timezones to Compare
                </Label>
                <p className="text-sm text-muted-foreground mb-3">Select cities to see their current times</p>
                <div className="relative">
                  <Input
                    id="timezone-search"
                    placeholder="Search for a city..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pr-10"
                  />
                  <Globe2 className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                </div>
              </div>

              {searchQuery && filteredTimezones.length > 0 && (
                <div className="max-h-48 overflow-y-auto rounded-lg border bg-card">
                  {filteredTimezones.slice(0, 10).map((tz) => (
                    <button
                      key={tz.name}
                      onClick={() => addTimezone(tz.name)}
                      className="w-full flex items-center justify-between p-3 hover:bg-accent transition-colors text-left border-b last:border-b-0"
                    >
                      <div>
                        <div className="font-medium">{tz.label}</div>
                        <div className="text-sm text-muted-foreground">{tz.name}</div>
                      </div>
                      <Plus className="h-4 w-4 text-muted-foreground" />
                    </button>
                  ))}
                </div>
              )}
            </div>
          </Card>

          <div className="space-y-3">
            <h3 className="text-lg font-semibold">
              Time Comparison ({timezoneData.length} {timezoneData.length === 1 ? "timezone" : "timezones"})
            </h3>
            {timezoneData.length === 0 ? (
              <Card className="p-8 text-center text-muted-foreground">
                <Globe2 className="h-12 w-12 mx-auto mb-3 opacity-50" />
                <p>No timezones selected. Add some timezones above to get started!</p>
              </Card>
            ) : (
              <div className="space-y-3">
                {timezoneData.map((tz) => (
                  <Card key={tz.name} className="p-4 hover:shadow-md transition-shadow">
                    <div className="flex items-center justify-between">
                      <div className="flex-1 space-y-1">
                        <div className="flex items-center gap-3">
                          <h4 className="text-lg font-semibold">{tz.label}</h4>
                          <Badge variant="outline" className="font-mono text-xs">
                            {tz.offset}
                          </Badge>
                          {tz.dayDiff !== 0 && (
                            <Badge variant="secondary" className="text-xs">
                              {tz.dayDiff > 0 ? `+${tz.dayDiff}` : tz.dayDiff} day
                            </Badge>
                          )}
                        </div>
                        <div className="flex items-baseline gap-3">
                          <p className="text-3xl font-mono font-bold tabular-nums">{tz.time}</p>
                          <p className="text-sm text-muted-foreground">{tz.date}</p>
                        </div>
                        <p className="text-xs text-muted-foreground">{tz.name}</p>
                      </div>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => removeTimezone(tz.name)}
                        className="text-muted-foreground hover:text-destructive"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </Card>
                ))}
              </div>
            )}
          </div>
      </div>
    </ToolLayout>
  )
}
