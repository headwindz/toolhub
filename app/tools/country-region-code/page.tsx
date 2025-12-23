"use client";

import { ToolLayout } from "@/components/tool-layout";
import { Card } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { AlertCircle, Globe, Loader2, Search } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { CountryCard } from "./country-card";
import { CountryCodeKnowledge } from "./country-code-knowledge";

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

export default function CountryCodePage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [debouncedQuery, setDebouncedQuery] = useState("");
  const [codeOnly, setCodeOnly] = useState(false);
  const [countries, setCountries] = useState<Country[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Debounce search query
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedQuery(searchQuery);
    }, 300);

    return () => clearTimeout(timer);
  }, [searchQuery]);

  useEffect(() => {
    const fetchCountries = async () => {
      try {
        setLoading(true);
        setError(null);

        const response = await fetch(
          "https://restcountries.com/v3.1/all?fields=name,cca2,cca3,ccn3,idd,capital,currencies,region,languages,flag",
        );

        if (!response.ok) {
          throw new Error("Failed to fetch country data");
        }

        const data = await response.json();

        const transformedCountries: Country[] = data
          .map((country: any) => {
            // Get first currency
            const currencyCode = country.currencies
              ? Object.keys(country.currencies)[0]
              : "";
            const currency = country.currencies?.[currencyCode];

            // Get calling code
            const callingCode = country.idd?.root
              ? `${country.idd.root}${country.idd.suffixes?.[0] || ""}`
              : "";

            // Get languages
            const languages = country.languages
              ? Object.values(country.languages).join(", ")
              : "N/A";

            return {
              name: country.name.common,
              alpha2: country.cca2,
              alpha3: country.cca3,
              numeric: country.ccn3 || "N/A",
              calling: callingCode,
              capital: country.capital?.[0] || "N/A",
              currency: currencyCode,
              currencySymbol: currency?.symbol || "",
              continent: country.region,
              languages: languages,
              flag: country.flag,
            };
          })
          .sort((a: Country, b: Country) => a.name.localeCompare(b.name));

        setCountries(transformedCountries);
      } catch (err) {
        setError(
          err instanceof Error ? err.message : "Failed to load countries",
        );
      } finally {
        setLoading(false);
      }
    };

    fetchCountries();
  }, []);

  const filteredCountries = useMemo(() => {
    if (!debouncedQuery.trim()) return countries;

    const query = debouncedQuery.toLowerCase();
    return countries.filter((country) => {
      if (codeOnly) {
        return (
          country.alpha2.toLowerCase().includes(query) ||
          country.alpha3.toLowerCase().includes(query)
        );
      }
      return (
        country.name.toLowerCase().includes(query) ||
        country.alpha2.toLowerCase().includes(query) ||
        country.alpha3.toLowerCase().includes(query)
      );
    });
  }, [debouncedQuery, countries, codeOnly]);

  const renderContent = () => {
    if (loading) {
      return (
        <Card className="border-2 text-center p-12">
          <Loader2 className="mx-auto h-12 text-primary mb-4 animate-spin w-12" />
          <h3 className="font-semibold text-lg mb-2">Loading countries...</h3>
          <p className="text-sm text-muted-foreground">
            Fetching data from REST Countries API
          </p>
        </Card>
      );
    }
    return (
      <>
        <Card className="border-2 p-6">
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="search">Search Countries</Label>
              <div className="relative">
                <Search className="h-4 text-muted-foreground top-1/2 left-3 w-4 -translate-y-1/2 absolute" />
                <Input
                  id="search"
                  placeholder={
                    codeOnly
                      ? "Search by country code..."
                      : "Search by name, code, or calling code..."
                  }
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            <div className="flex space-x-2 items-center">
              <Checkbox
                id="codeOnly"
                checked={codeOnly}
                onCheckedChange={(checked) => setCodeOnly(checked as boolean)}
              />
              <label
                htmlFor="codeOnly"
                className="cursor-pointer font-medium text-sm leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                Search by country code only (Alpha-2, Alpha-3)
              </label>
            </div>
            <p className="text-xs text-muted-foreground">
              {searchQuery.trim()
                ? `Found ${filteredCountries.length} ${filteredCountries.length === 1 ? "country" : "countries"}`
                : `Showing all ${filteredCountries.length} countries`}
            </p>
          </div>
        </Card>

        {searchQuery.trim() && filteredCountries.length === 0 && (
          <Card className="border-2 text-center p-12">
            <AlertCircle className="mx-auto h-12 text-muted-foreground mb-4 w-12" />
            <h3 className="font-semibold text-lg mb-2">No countries found</h3>
            <p className="text-sm text-muted-foreground">
              Try a different search term
            </p>
          </Card>
        )}

        <div className="grid gap-4">
          {filteredCountries.map((country) => (
            <CountryCard key={country.alpha2} country={country} />
          ))}
        </div>
      </>
    );
  };

  return (
    <ToolLayout
      title="Country/Region Code Lookup"
      description="Search country/regions codes"
      icon={Globe}
      badges={[{ label: "Reference" }, { label: "International" }]}
    >
      <CountryCodeKnowledge />
      {renderContent()}
    </ToolLayout>
  );
}
