"use client";

import { Card } from "@/components/ui/card";
import { Coins, Flag, Phone } from "lucide-react";
import { useEffect, useRef, useState } from "react";

interface Country {
  name: string;
  alpha2: string;
  alpha3: string;
  numeric: string;
  calling: string;
  capital: string;
  currency: string;
  currencySymbol: string;
  continent: string;
  languages: string;
  flag: string;
}

interface CountryCardProps {
  country: Country;
}

interface FieldDisplayProps {
  label: string;
  value: string;
}

function FieldDisplay({ label, value }: FieldDisplayProps) {
  return (
    <div>
      <div className="text-xs text-muted-foreground">{label}</div>
      <div className="bg-secondary rounded p-2">
        <span className="text-sm">{value}</span>
      </div>
    </div>
  );
}

export function CountryCard({ country }: CountryCardProps) {
  const [isVisible, setIsVisible] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
            observer.disconnect();
          }
        });
      },
      {
        rootMargin: "100px", // Load content 100px before it enters viewport
      },
    );

    if (cardRef.current) {
      observer.observe(cardRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <Card ref={cardRef} className="border-2 overflow-hidden">
      {!isVisible ? (
        // Placeholder to maintain layout
        <div className="bg-muted/20 h-[280px] animate-pulse" />
      ) : (
        <>
          <div className="bg-gradient-to-r border-b from-blue-500/5 to-purple-500/5 p-4">
            <div className="flex gap-3 items-center">
              <span className="text-4xl">{country.flag}</span>
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
              {/* ISO Codes */}
              <div className="space-y-3">
                <div className="flex font-semibold text-sm gap-2 items-center">
                  <Flag className="h-4 text-primary w-4" />
                  <span>ISO Codes</span>
                </div>
                <div className="space-y-2">
                  <FieldDisplay label="Alpha-2" value={country.alpha2} />
                  <FieldDisplay label="Alpha-3" value={country.alpha3} />
                  <FieldDisplay label="Numeric" value={country.numeric} />
                </div>
              </div>

              {/* Currency and Language */}
              <div className="space-y-3">
                <div className="flex font-semibold text-sm gap-2 items-center">
                  <Coins className="h-4 text-primary w-4" />
                  <span>Currency & Language</span>
                </div>
                <div className="space-y-2">
                  <FieldDisplay label="Code" value={country.currency} />
                  <FieldDisplay label="Symbol" value={country.currencySymbol} />
                  <FieldDisplay label="Languages" value={country.languages} />
                </div>
              </div>

              {/* Contact Info */}
              <div className="space-y-3">
                <div className="flex font-semibold text-sm gap-2 items-center">
                  <Phone className="h-4 text-primary w-4" />
                  <span>Contact</span>
                </div>
                <div className="space-y-2">
                  <FieldDisplay label="Calling Code" value={country.calling} />
                  <FieldDisplay label="Capital" value={country.capital} />
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </Card>
  );
}
