import chinaHolidays from "@/app/tools/public-holidays/china-2025-holidays.json";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const country = searchParams.get("country");
  const year = searchParams.get("year");

  // For now, only China 2025 is supported
  if (country === "CN" && year === "2025") {
    return NextResponse.json(chinaHolidays);
  }

  // If country/year not supported, return empty array or error
  if (!country || !year) {
    return NextResponse.json(
      { error: "Please provide country and year parameters" },
      { status: 400 },
    );
  }

  return NextResponse.json(
    { error: `Holidays data for ${country} ${year} not available` },
    { status: 404 },
  );
}
