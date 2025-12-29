'use client'

import { Card } from '@/components/ui/card'
import { Coins, Flag, Phone } from 'lucide-react'
import { useEffect, useRef, useState } from 'react'
import { FlagIcon } from '../public-holidays/flag-icon'
import { InfoSection } from './info-section'

interface Country {
  name: string
  alpha2: string
  alpha3: string
  numeric: string
  calling: string
  capital: string
  currency: string
  currencySymbol: string
  continent: string
  languages: string
  flag: string
}

interface CountryCardProps {
  country: Country
}

export function CountryCard({ country }: CountryCardProps) {
  const [isVisible, setIsVisible] = useState(false)
  const cardRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true)
            observer.disconnect()
          }
        })
      },
      {
        rootMargin: '100px', // Load content 100px before it enters viewport
      }
    )

    if (cardRef.current) {
      observer.observe(cardRef.current)
    }

    return () => observer.disconnect()
  }, [])

  return (
    <Card ref={cardRef} className="border-2 overflow-hidden">
      {!isVisible ? (
        // Placeholder to maintain layout
        <div className="bg-muted/20 h-[280px] animate-pulse" />
      ) : (
        <>
          <div className="bg-gradient-to-r border-b from-blue-500/5 to-purple-500/5 p-4">
            <div className="flex gap-3 items-center">
              <FlagIcon code={country.alpha2} className="h-8 w-12" />
              <div>
                <h3 className="font-bold text-lg">{country.name}</h3>
                <p className="text-sm text-muted-foreground">
                  {country.continent}
                </p>
              </div>
            </div>
          </div>

          <div className="p-4">
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              <InfoSection
                icon={Flag}
                title="ISO Codes"
                fields={[
                  { label: 'Alpha-2', value: country.alpha2 },
                  { label: 'Alpha-3', value: country.alpha3 },
                  { label: 'Numeric', value: country.numeric },
                ]}
              />
              <InfoSection
                icon={Coins}
                title="Currency & Language"
                fields={[
                  { label: 'Code', value: country.currency },
                  { label: 'Symbol', value: country.currencySymbol },
                  { label: 'Languages', value: country.languages },
                ]}
              />
              <InfoSection
                icon={Phone}
                title="Contact"
                fields={[
                  { label: 'Calling Code', value: country.calling },
                  { label: 'Capital', value: country.capital },
                ]}
              />
            </div>
          </div>
        </>
      )}
    </Card>
  )
}
