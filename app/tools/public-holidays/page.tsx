'use client'

import { Dropdown } from '@/components/dropdown'
import { ToolLayout } from '@/components/tool-layout'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Calendar, Loader2, PartyPopper } from 'lucide-react'
import { useMemo, useState } from 'react'
import useSWR from 'swr'
import { DOMAIN } from './constants'
import { FlagIcon } from './flag-icon'

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

interface Country {
  code: string
  name: string
}

const fetcher = async (url: string) => {
  const response = await fetch(url)
  if (!response.ok) {
    throw new Error('Failed to fetch data')
  }
  const result = await response.json()
  return result?.data || []
}

export default function PublicHolidaysPage() {
  const [selectedCountry, setSelectedCountry] = useState('CN')
  const [selectedYear, setSelectedYear] = useState('2025')
  const [requestedCountry, setRequestedCountry] = useState('')
  const [requestedYear, setRequestedYear] = useState('')

  // Fetch countries from API
  const { data: countries = [], isLoading: isLoadingCountries } = useSWR<
    Country[]
  >(`${DOMAIN}/api/countries`, fetcher)

  // Fetch years from API
  const { data: years = [], isLoading: isLoadingYears } = useSWR<number[]>(
    `${DOMAIN}/api/years`,
    fetcher
  )

  const apiUrl =
    requestedCountry && requestedYear
      ? `${DOMAIN}/api/public-holidays?year=${requestedYear}&code=${requestedCountry}`
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
    setRequestedCountry(selectedCountry)
    setRequestedYear(selectedYear)
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString('en-US', {
      weekday: 'long',
      // year: 'numeric',
      month: 'long',
      day: 'numeric',
    })
  }

  const getDisplayDate = (holiday: Holiday) => {
    const start = new Date(holiday.startDate)
    const end = new Date(holiday.endDate)

    // Check if dates are on the same day
    if (
      start.getFullYear() === end.getFullYear() &&
      start.getMonth() === end.getMonth() &&
      start.getDate() === end.getDate()
    ) {
      return formatDate(holiday.startDate)
    }

    return `${formatDate(holiday.startDate)} - ${formatDate(holiday.endDate)}`
  }

  const getDuration = (holiday: Holiday) => {
    const start = new Date(holiday.startDate)
    const end = new Date(holiday.endDate)
    const diffTime = Math.abs(end.getTime() - start.getTime())
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)) + 1 // +1 to include both start and end day

    if (diffDays === 1) {
      return '1 day'
    }
    return `${diffDays} days`
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
  const countryName = countries.find((c) => c.code === requestedCountry)?.name

  const renderMonthHolidays = (month: string, monthHolidays: Holiday[]) => (
    <div key={month} className="space-y-3">
      <h4 className="font-medium text-sm text-muted-foreground tracking-wide capitalize">
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
                  {getDisplayDate(holiday)}
                </p>
                <p className="text-xs text-muted-foreground">
                  {getDuration(holiday)}
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
            {countryName} - {requestedYear}
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

  const countryOptions = useMemo(
    () =>
      countries.map((country) => ({
        value: country.code,
        label: (
          <div className="flex gap-2 items-center">
            <FlagIcon code={country.code} className="h-4 w-6" />
            <span>{country.name}</span>
          </div>
        ),
      })),
    [countries]
  )

  const yearOptions = useMemo(
    () =>
      years.map((year) => ({
        value: year.toString(),
        label: year.toString(),
      })),
    [years]
  )

  const renderCountrySelected = useMemo(
    () => (value: string) => {
      const country = countries.find((c) => c.code === value)
      if (!country) return <span>{value}</span>
      return (
        <div className="flex gap-2 items-center">
          <FlagIcon code={country.code} className="h-4 w-6" />
          <span>{country.name}</span>
        </div>
      )
    },
    [countries]
  )

  const renderFilter = () => (
    <>
      <div className="grid gap-4 md:grid-cols-2">
        <Dropdown
          label="Country"
          icon={<Calendar className="h-4 w-4" />}
          value={selectedCountry}
          onChange={setSelectedCountry}
          options={countryOptions}
          searchable={true}
          searchPlaceholder="Search countries and regions"
          renderSelected={renderCountrySelected}
          isLoading={isLoadingCountries}
          height="50px"
          filterOption={(option, query) => {
            if (!query) return true
            const lowerQuery = query.toLowerCase()
            const country = countries.find((c) => c.code === option.value)
            if (!country) return false
            const { name, code } = country
            return (
              name.toLowerCase().includes(lowerQuery) ||
              code.toLowerCase().includes(lowerQuery)
            )
          }}
        />

        <Dropdown
          label="Year"
          icon={<Calendar className="h-4 w-4" />}
          value={selectedYear}
          onChange={setSelectedYear}
          options={yearOptions}
          isLoading={isLoadingYears}
          height="50px"
        />
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
      description="Get public holidays for any country/region and year"
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
