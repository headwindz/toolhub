'use client'

import { ToolLayout } from '@/components/tool-layout'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Label } from '@/components/ui/label'
import { Select } from '@/components/ui/select'
import { Calendar, Loader2, PartyPopper } from 'lucide-react'
import { useState } from 'react'
import useSWR from 'swr'
import { COUNTRIES } from './constants'

interface Holiday {
  localName: string
  name: string
  countryCode: string
  fixed: boolean
  global: boolean
  counties: string[] | null
  launchYear: number | null
  types: string[]
  startDate: string
  endDate: string
}

const fetcher = async (url: string) => {
  const response = await fetch(url)
  if (!response.ok) {
    throw new Error('Failed to fetch holidays')
  }
  const result = await response.json()
  return result?.data || []
}

export default function PublicHolidaysPage() {
  const [selectedCountry, setSelectedCountry] = useState('US')
  const [selectedYear, setSelectedYear] = useState(
    new Date().getFullYear().toString()
  )
  const [shouldFetch, setShouldFetch] = useState(false)

  const currentYear = new Date().getFullYear()
  const years = Array.from({ length: 5 }, (_, i) => currentYear - 2 + i)

  const apiUrl = shouldFetch
    ? `https://public-holidays.toolhub.run/api/public-holidays?year=${selectedYear}&code=${selectedCountry}`
    : null

  const {
    data: holidays = [],
    error,
    isLoading,
  } = useSWR<Holiday[]>(apiUrl, fetcher)

  const fetchHolidays = () => {
    if (!selectedCountry || !selectedYear) {
      return
    }
    setShouldFetch(true)
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    })
  }

  const getMonthName = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString('en-US', { month: 'long' })
  }

  const groupHolidaysByMonth = () => {
    const grouped: { [key: string]: Holiday[] } = {}

    holidays.forEach((holiday) => {
      const month = getMonthName(holiday.startDate)
      if (!grouped[month]) {
        grouped[month] = []
      }
      grouped[month].push(holiday)
    })

    return grouped
  }

  const groupedHolidays = groupHolidaysByMonth()
  const countryName = COUNTRIES.find((c) => c.code === selectedCountry)?.name

  const renderMonthHolidays = (month: string, monthHolidays: Holiday[]) => (
    <div key={month} className="space-y-3">
      <h4 className="font-medium text-sm text-muted-foreground tracking-wide uppercase">
        {month}
      </h4>
      <div className="space-y-2">
        {monthHolidays.map((holiday, index) => (
          <Card key={index} className="p-4">
            <div className="flex gap-4 items-start justify-between">
              <div className="space-y-1 flex-1">
                <div className="flex font-semibold gap-2 items-center">
                  {holiday.name}
                </div>
                {holiday.localName !== holiday.name && (
                  <p className="text-sm text-muted-foreground">
                    {holiday.localName}
                  </p>
                )}
                <p className="text-sm text-muted-foreground">
                  {formatDate(holiday.startDate)} -{' '}
                  {formatDate(holiday.endDate)}
                </p>
              </div>
              <div className="bg-secondary rounded-md flex flex-col h-16 text-center w-16 gap-1 items-center justify-center">
                <div className="text-xs text-muted-foreground">
                  {new Date(holiday.startDate).toLocaleDateString('en-US', {
                    month: 'short',
                  })}
                </div>
                <div className="font-bold text-2xl">
                  {new Date(holiday.startDate).getDate()}
                </div>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  )

  const renderResult = () => {
    if (holidays.length === 0) return null

    return (
      <div className="space-y-6 pt-4">
        <div className="border-b flex pb-2 items-center justify-between">
          <h3 className="font-semibold text-lg">
            {countryName} - {selectedYear}
          </h3>
          <div className="flex text-sm text-muted-foreground gap-2 items-center">
            <PartyPopper className="h-4 w-4" />
            <span>{holidays.length} holidays</span>
          </div>
        </div>

        <div className="space-y-6">
          {Object.entries(groupedHolidays).map(([month, monthHolidays]) =>
            renderMonthHolidays(month, monthHolidays)
          )}
        </div>
      </div>
    )
  }

  const renderFilter = () => (
    <>
      <div className="grid gap-4 md:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="country">Country</Label>
          <Select
            id="country"
            value={selectedCountry}
            onChange={(e) => setSelectedCountry(e.target.value)}
          >
            {COUNTRIES.map((country) => (
              <option key={country.code} value={country.code}>
                {country.name}
              </option>
            ))}
          </Select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="year">Year</Label>
          <Select
            id="year"
            value={selectedYear}
            onChange={(e) => setSelectedYear(e.target.value)}
          >
            {years.map((year) => (
              <option key={year} value={year.toString()}>
                {year}
              </option>
            ))}
          </Select>
        </div>
      </div>

      <Button onClick={fetchHolidays} disabled={isLoading} className="w-full">
        {isLoading ? (
          <>
            <Loader2 className="h-4 mr-2 animate-spin w-4" />
            Loading...
          </>
        ) : (
          <>
            <Calendar className="h-4 mr-2 w-4" />
            Get Holidays
          </>
        )}
      </Button>

      {error && (
        <div className="rounded-md bg-destructive/10 text-sm text-destructive p-3">
          {error.message ||
            'Failed to fetch public holidays. Please try again.'}
        </div>
      )}
    </>
  )

  return (
    <ToolLayout
      title="Public Holidays"
      description="Get public holidays for any country and year"
      icon={Calendar}
    >
      <Card className="p-6">
        <div className="space-y-4">
          {renderFilter()}
          {renderResult()}
        </div>
      </Card>
    </ToolLayout>
  )
}
