"use client"

import { useState, useEffect } from "react"
import { Clock } from "lucide-react"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { ToolLayout } from "@/components/tool-layout"

export default function TimestampPage() {
  const [currentTimestamp, setCurrentTimestamp] = useState(Date.now())
  const [inputTimestamp, setInputTimestamp] = useState("")
  const [convertedDate, setConvertedDate] = useState("")

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTimestamp(Date.now())
    }, 1000)
    return () => clearInterval(interval)
  }, [])

  const convertToDate = () => {
    const timestamp = Number.parseInt(inputTimestamp)
    if (isNaN(timestamp)) {
      setConvertedDate("Invalid timestamp")
      return
    }
    const date = new Date(timestamp)
    setConvertedDate(date.toString())
  }

  const getCurrentDate = () => {
    return new Date(currentTimestamp).toString()
  }

  return (
    <ToolLayout
      title="Timestamp Converter"
      description="Convert Unix timestamps to readable dates and vice versa"
      icon={Clock}
      category="Developer"
    >

      <div className="space-y-6">
        <Card className="p-6">
          <h2 className="mb-4 text-lg font-semibold">Current Timestamp</h2>
          <div className="space-y-3">
            <div className="rounded-lg bg-muted p-4">
              <p className="mb-1 text-xs text-muted-foreground">Unix Timestamp (ms)</p>
              <p className="font-mono text-2xl font-bold">{currentTimestamp}</p>
            </div>
            <div className="rounded-lg bg-muted p-4">
              <p className="mb-1 text-xs text-muted-foreground">Date & Time</p>
              <p className="font-mono text-sm">{getCurrentDate()}</p>
            </div>
          </div>
        </Card>

        <Card className="p-6">
          <h2 className="mb-4 text-lg font-semibold">Convert Timestamp</h2>
          <div className="space-y-4">
            <div>
              <Label htmlFor="timestamp-input">Unix Timestamp (milliseconds)</Label>
              <Input
                id="timestamp-input"
                type="text"
                placeholder="1234567890000"
                value={inputTimestamp}
                onChange={(e) => setInputTimestamp(e.target.value)}
                className="mt-2 font-mono"
              />
            </div>

            <Button onClick={convertToDate} className="w-full" size="lg">
              Convert to Date
            </Button>

            {convertedDate && (
              <div className="rounded-lg bg-muted p-4">
                <p className="mb-1 text-xs text-muted-foreground">Converted Date</p>
                <p className="font-mono text-sm">{convertedDate}</p>
              </div>
            )}
          </div>
        </Card>
      </div>
    </ToolLayout>
  )
}
