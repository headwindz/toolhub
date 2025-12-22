"use client";

import { CommonCollapsible } from "@/components/common-collapsible";
import { ToolLayout } from "@/components/tool-layout";
import { Card } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  AlertCircle,
  Building,
  Coins,
  Flag,
  Globe,
  Languages,
  Loader2,
  Phone,
  Search,
} from "lucide-react";
import { useEffect, useMemo, useState } from "react";
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
  const [codeOnly, setCodeOnly] = useState(false);
  const [countries, setCountries] = useState<Country[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

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
    if (!searchQuery.trim()) return countries;

    const query = searchQuery.toLowerCase();
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
  }, [searchQuery, countries, codeOnly]);

  if (loading) {
    return (
      <ToolLayout
        title="Country/Region Code Lookup"
        description="Search country/region codes"
        icon={Globe}
        badges={[{ label: "Reference" }, { label: "International" }]}
      >
        <Card className="border-2 text-center p-12">
          <Loader2 className="mx-auto h-12 text-primary mb-4 animate-spin w-12" />
          <h3 className="font-semibold text-lg mb-2">Loading countries...</h3>
          <p className="text-sm text-muted-foreground">
            Fetching data from REST Countries API
          </p>
        </Card>
      </ToolLayout>
    );
  }

  if (error) {
    return (
      <ToolLayout
        title="Country Code Lookup"
        description="Search country codes, calling codes, and country information"
        icon={Globe}
        badges={[{ label: "Reference" }, { label: "International" }]}
      >
        <Card className="border-2 border-destructive/50 text-center p-12">
          <AlertCircle className="mx-auto h-12 text-destructive mb-4 w-12" />
          <h3 className="font-semibold text-lg mb-2">
            Failed to load countries
          </h3>
          <p className="text-sm text-muted-foreground mb-4">{error}</p>
          <button
            onClick={() => window.location.reload()}
            className="text-sm text-primary hover:underline"
          >
            Try again
          </button>
        </Card>
      </ToolLayout>
    );
  }

  return (
    <ToolLayout
      title="Country/Region Code Lookup"
      description="Search country/regions codes"
      icon={Globe}
      badges={[{ label: "Reference" }, { label: "International" }]}
    >
      <div className="space-y-6">
        <Card className="border-2 overflow-hidden">
          <CommonCollapsible
            title="Learn About Country Codes"
            description="Understanding ISO codes and international standards"
          >
            <CountryCodeKnowledge />
          </CommonCollapsible>
        </Card>

        {/* Search */}
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
            <Card key={country.alpha2} className="border-2 overflow-hidden">
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
                <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                  {/* ISO Codes */}
                  <div className="space-y-3">
                    <div className="flex font-semibold text-sm gap-2 items-center">
                      <Flag className="h-4 text-primary w-4" />
                      <span>ISO Codes</span>
                    </div>
                    <div className="space-y-2">
                      <div>
                        <div className="text-xs text-muted-foreground">
                          Alpha-2
                        </div>
                        <div className="bg-secondary rounded p-2">
                          <code className="font-mono font-semibold text-sm">
                            {country.alpha2}
                          </code>
                        </div>
                      </div>
                      <div>
                        <div className="text-xs text-muted-foreground">
                          Alpha-3
                        </div>
                        <div className="bg-secondary rounded p-2">
                          <code className="font-mono font-semibold text-sm">
                            {country.alpha3}
                          </code>
                        </div>
                      </div>
                      <div>
                        <div className="text-xs text-muted-foreground">
                          Numeric
                        </div>
                        <div className="bg-secondary rounded p-2">
                          <code className="font-mono font-semibold text-sm">
                            {country.numeric}
                          </code>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Contact Info */}
                  <div className="space-y-3">
                    <div className="flex font-semibold text-sm gap-2 items-center">
                      <Phone className="h-4 text-primary w-4" />
                      <span>Contact</span>
                    </div>
                    <div className="space-y-2">
                      <div>
                        <div className="text-xs text-muted-foreground">
                          Calling Code
                        </div>
                        <div className="bg-secondary rounded p-2">
                          <code className="font-mono font-semibold text-sm">
                            {country.calling}
                          </code>
                        </div>
                      </div>
                      <div>
                        <div className="text-xs text-muted-foreground">
                          Capital
                        </div>
                        <div className="bg-secondary rounded p-2">
                          <div className="flex gap-2 items-center">
                            <Building className="h-3 text-muted-foreground w-3" />
                            <span className="text-sm">{country.capital}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Currency */}
                  <div className="space-y-3">
                    <div className="flex font-semibold text-sm gap-2 items-center">
                      <Coins className="h-4 text-primary w-4" />
                      <span>Currency</span>
                    </div>
                    <div className="space-y-2">
                      <div>
                        <div className="text-xs text-muted-foreground">
                          Code
                        </div>
                        <div className="bg-secondary rounded p-2">
                          <code className="font-mono font-semibold text-sm">
                            {country.currency}
                          </code>
                        </div>
                      </div>
                      <div>
                        <div className="text-xs text-muted-foreground">
                          Symbol
                        </div>
                        <div className="bg-secondary rounded p-2">
                          <span className="font-semibold text-lg">
                            {country.currencySymbol}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Languages */}
                  <div className="space-y-3">
                    <div className="flex font-semibold text-sm gap-2 items-center">
                      <Languages className="h-4 text-primary w-4" />
                      <span>Languages</span>
                    </div>
                    <div className="bg-secondary rounded p-2">
                      <p className="text-sm">{country.languages}</p>
                    </div>
                  </div>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </ToolLayout>
  );
}
