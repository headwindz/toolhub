"use client";

import { ToolLayout } from "@/components/tool-layout";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Select } from "@/components/ui/select";
import { Calendar, Loader2, PartyPopper } from "lucide-react";
import { useState } from "react";
import { COUNTRIES } from "./constants";

interface Holiday {
  date: string;
  localName: string;
  name: string;
  countryCode: string;
  fixed: boolean;
  global: boolean;
  counties: string[] | null;
  launchYear: number | null;
  types: string[];
  start: Date;
  end: Date;
}

export default function PublicHolidaysPage() {
  const [selectedCountry, setSelectedCountry] = useState("US");
  const [selectedYear, setSelectedYear] = useState(
    new Date().getFullYear().toString(),
  );
  const [holidays, setHolidays] = useState<Holiday[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const currentYear = new Date().getFullYear();
  const years = Array.from({ length: 5 }, (_, i) => currentYear - 2 + i);

  const fetchHolidays = async () => {
    if (!selectedCountry || !selectedYear) {
      setError("Please select both country and year");
      return;
    }

    setLoading(true);
    setError("");
    setHolidays([]);

    try {
      const response = await fetch(
        `https://date.nager.at/api/v3/PublicHolidays/${selectedYear}/${selectedCountry}`,
      );

      if (!response.ok) {
        throw new Error("Failed to fetch holidays");
      }

      const data = await response.json();
      setHolidays(data);
    } catch (err) {
      setError("Failed to fetch public holidays. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const getMonthName = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", { month: "long" });
  };

  const groupHolidaysByMonth = () => {
    const grouped: { [key: string]: Holiday[] } = {};

    holidays.forEach((holiday) => {
      const month = getMonthName(holiday.date);
      if (!grouped[month]) {
        grouped[month] = [];
      }
      grouped[month].push(holiday);
    });

    return grouped;
  };

  const groupedHolidays = groupHolidaysByMonth();
  const countryName = COUNTRIES.find((c) => c.code === selectedCountry)?.name;

  return (
    <ToolLayout
      title="Public Holidays"
      description="Get public holidays for any country and year"
      icon={Calendar}
    >
      <Card className="p-6">
        <div className="space-y-4">
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

          <Button onClick={fetchHolidays} disabled={loading} className="w-full">
            {loading ? (
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
              {error}
            </div>
          )}

          {holidays.length > 0 && (
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
                {Object.entries(groupedHolidays).map(
                  ([month, monthHolidays]) => (
                    <div key={month} className="space-y-3">
                      <h4 className="font-medium text-sm text-muted-foreground tracking-wide uppercase">
                        {month}
                      </h4>
                      <div className="space-y-2">
                        {monthHolidays.map((holiday, index) => (
                          <Card key={index} className="p-4">
                            <div className="flex gap-4 items-start justify-between">
                              <div className="space-y-1 flex-1">
                                <div className="flex gap-2 items-center">
                                  <h5 className="font-semibold">
                                    {holiday.name}
                                  </h5>
                                  {holiday.global && (
                                    <span className="rounded-full font-medium bg-primary/10 text-xs text-primary py-0.5 px-2 inline-flex items-center">
                                      National
                                    </span>
                                  )}
                                </div>
                                {holiday.localName !== holiday.name && (
                                  <p className="text-sm text-muted-foreground">
                                    {holiday.localName}
                                  </p>
                                )}
                                <p className="text-sm text-muted-foreground">
                                  {formatDate(holiday.date)}
                                </p>
                                {holiday.types && holiday.types.length > 0 && (
                                  <div className="flex flex-wrap pt-1 gap-1">
                                    {holiday.types.map((type, idx) => (
                                      <span
                                        key={idx}
                                        className="bg-secondary rounded-md text-xs py-0.5 px-2 inline-flex items-center"
                                      >
                                        {type}
                                      </span>
                                    ))}
                                  </div>
                                )}
                              </div>
                              <div className="flex flex-col gap-1 items-end">
                                <div className="bg-secondary rounded-md text-center py-2 px-3">
                                  <div className="text-xs text-muted-foreground">
                                    {new Date(holiday.date).toLocaleDateString(
                                      "en-US",
                                      {
                                        month: "short",
                                      },
                                    )}
                                  </div>
                                  <div className="font-bold text-2xl">
                                    {new Date(holiday.date).getDate()}
                                  </div>
                                </div>
                              </div>
                            </div>
                          </Card>
                        ))}
                      </div>
                    </div>
                  ),
                )}
              </div>
            </div>
          )}
        </div>
      </Card>
    </ToolLayout>
  );
}
