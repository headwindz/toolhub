"use client"

import { useState, useEffect } from "react"
import { ArrowLeft, Clock } from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

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
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/20">
      <div className="container mx-auto max-w-4xl px-4 py-8">
        <Link href="/">
          <Button variant="ghost" size="sm" className="mb-6">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back
          </Button>
        </Link>

        <div className="mb-8 flex items-center gap-4">
          <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-amber-500 to-amber-600 shadow-lg">
            <Clock className="h-8 w-8 text-white" />
          </div>
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Timestamp Converter</h1>
            <p className="text-muted-foreground">Convert Unix timestamps</p>
          </div>
        </div>

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
      </div>
    </div>
  )
}
