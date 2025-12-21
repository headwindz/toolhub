"use client";

import { InfoCard } from "@/app/tools/ip-lookup/info-card";
import { CommonCollapsible } from "@/components/common-collapsible";
import { ToolLayout } from "@/components/tool-layout";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Chrome,
  Code,
  Globe,
  Monitor,
  Search,
  Smartphone,
  Tablet,
} from "lucide-react";
import { useEffect, useState } from "react";
import { UserAgentKnowledge } from "./user-agent-knowledge";

interface UAInfo {
  userAgent: string;
  browser: string;
  browserVersion: string;
  os: string;
  device: string;
  engine: string;
  platform: string;
  language: string;
  cookiesEnabled: boolean;
  doNotTrack: string;
  screenResolution: string;
  viewport: string;
}

export default function UserAgentPage() {
  const [uaInfo, setUaInfo] = useState<UAInfo | null>(null);
  const [customUA, setCustomUA] = useState("");
  const [currentUA, setCurrentUA] = useState("");
  const [showResults, setShowResults] = useState(false);
  const [error, setError] = useState("");

  const parseUserAgent = (ua: string, isCustom = false) => {
    // Validate user agent string
    if (!ua || ua.trim().length < 10) {
      setError("User agent string is too short or empty");
      setShowResults(false);
      return;
    }

    // Parse browser
    let browser = "Unknown";
    let browserVersion = "";

    if (ua.includes("Edg/")) {
      browser = "Microsoft Edge";
      browserVersion = ua.match(/Edg\/([\d.]+)/)?.[1] || "";
    } else if (ua.includes("Chrome/") && !ua.includes("Edg/")) {
      browser = "Google Chrome";
      browserVersion = ua.match(/Chrome\/([\d.]+)/)?.[1] || "";
    } else if (ua.includes("Safari/") && !ua.includes("Chrome/")) {
      browser = "Safari";
      browserVersion = ua.match(/Version\/([\d.]+)/)?.[1] || "";
    } else if (ua.includes("Firefox/")) {
      browser = "Mozilla Firefox";
      browserVersion = ua.match(/Firefox\/([\d.]+)/)?.[1] || "";
    } else if (ua.includes("Opera/") || ua.includes("OPR/")) {
      browser = "Opera";
      browserVersion = ua.match(/(?:Opera|OPR)\/([\d.]+)/)?.[1] || "";
    }

    // Parse OS
    let os = "Unknown";
    if (ua.includes("Windows NT 10.0")) os = "Windows 10/11";
    else if (ua.includes("Windows NT 6.3")) os = "Windows 8.1";
    else if (ua.includes("Windows NT 6.2")) os = "Windows 8";
    else if (ua.includes("Windows NT 6.1")) os = "Windows 7";
    else if (ua.includes("Mac OS X")) {
      const version = ua.match(/Mac OS X ([\d_]+)/)?.[1].replace(/_/g, ".");
      os = `macOS ${version || ""}`;
    } else if (ua.includes("Android")) {
      const version = ua.match(/Android ([\d.]+)/)?.[1];
      os = `Android ${version || ""}`;
    } else if (
      ua.includes("iOS") ||
      ua.includes("iPhone") ||
      ua.includes("iPad")
    ) {
      const version = ua.match(/OS ([\d_]+)/)?.[1].replace(/_/g, ".");
      os = `iOS ${version || ""}`;
    } else if (ua.includes("Linux")) os = "Linux";

    // Parse device
    let device = "Desktop";
    if (ua.includes("Mobile") || ua.includes("iPhone")) device = "Mobile";
    else if (ua.includes("iPad") || ua.includes("Tablet")) device = "Tablet";

    // Parse engine
    let engine = "Unknown";
    if (ua.includes("Blink") || ua.includes("Chrome/")) engine = "Blink";
    else if (ua.includes("Gecko/") && ua.includes("Firefox/")) engine = "Gecko";
    else if (ua.includes("WebKit/")) engine = "WebKit";
    else if (ua.includes("Trident/")) engine = "Trident";

    // For custom UA, we don't have access to navigator properties
    const platform = isCustom ? "N/A" : navigator.platform;
    const language = isCustom ? "N/A" : navigator.language;
    const cookiesEnabled = isCustom ? false : navigator.cookieEnabled;
    const doNotTrack = isCustom ? "N/A" : navigator.doNotTrack || "Not set";
    const screenResolution = isCustom
      ? "N/A"
      : `${window.screen.width}x${window.screen.height}`;
    const viewport = isCustom
      ? "N/A"
      : `${window.innerWidth}x${window.innerHeight}`;

    // Check if we could parse anything meaningful
    if (browser === "Unknown" && os === "Unknown" && engine === "Unknown") {
      setError(
        "Unable to parse user agent string. Please enter a valid user agent.",
      );
      setShowResults(false);
      return;
    }

    // Clear any previous errors
    setError("");
    setShowResults(true);

    setUaInfo({
      userAgent: ua,
      browser,
      browserVersion,
      os,
      device,
      engine,
      platform,
      language,
      cookiesEnabled,
      doNotTrack,
      screenResolution,
      viewport,
    });
  };

  useEffect(() => {
    if (typeof window !== "undefined") {
      const ua = navigator.userAgent;
      setCurrentUA(ua);
      parseUserAgent(ua, false);
    }
  }, []);

  const analyzeCustomUA = () => {
    if (customUA.trim()) {
      parseUserAgent(customUA, true);
    } else {
      setError("Please enter a user agent string");
      setShowResults(false);
    }
  };

  const loadMyUserAgent = () => {
    setCustomUA(currentUA);
    parseUserAgent(currentUA, false);
  };

  const getDeviceIcon = () => {
    if (!uaInfo) return Monitor;
    if (uaInfo.device === "Mobile") return Smartphone;
    if (uaInfo.device === "Tablet") return Tablet;
    return Monitor;
  };

  const DeviceIcon = getDeviceIcon();

  return (
    <ToolLayout
      title="User Agent Detector"
      description="Detect and analyze your browser's user agent"
      icon={Chrome}
      badges={[{ label: "Browser Info" }, { label: "Device Detection" }]}
    >
      <div className="space-y-6">
        <Card className="border-2 overflow-hidden">
          <CommonCollapsible
            title="Learn about User Agents"
            description="Understanding browser identification and user agent strings"
          >
            <UserAgentKnowledge />
          </CommonCollapsible>
        </Card>

        {/* Custom User Agent Input */}
        <Card className="border-2 p-6">
          <div className="space-y-4">
            <div className="flex flex-col gap-2 sm:flex-row sm:gap-3 sm:items-end">
              <div className="space-y-2 flex-1">
                <Label htmlFor="custom-ua">Custom User Agent</Label>
                <Input
                  id="custom-ua"
                  placeholder="Enter a custom user agent string to analyze..."
                  value={customUA}
                  onChange={(e) => {
                    setCustomUA(e.target.value);
                    setError(""); // Clear error on input change
                  }}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") analyzeCustomUA();
                  }}
                  className="font-mono text-sm"
                />
              </div>
              <div className="flex gap-2">
                <Button
                  onClick={analyzeCustomUA}
                  disabled={!customUA.trim()}
                  className="gap-2"
                >
                  <Search className="h-4 w-4" />
                  Analyze
                </Button>
              </div>
            </div>
            {error && (
              <div className="border rounded-md bg-destructive/10 border-destructive/20 text-sm text-destructive p-3">
                {error}
              </div>
            )}
            <Button
              onClick={loadMyUserAgent}
              variant="secondary"
              className="w-full gap-2 sm:w-auto"
            >
              <Chrome className="h-4 w-4" />
              Test My User Agent
            </Button>
          </div>
        </Card>

        {showResults && (
          <Card className="border-2 overflow-hidden">
            <div className="bg-gradient-to-r border-b from-blue-500/5 to-cyan-500/5 p-6">
              <div className="flex items-center justify-between">
                <div className="flex gap-3 items-center">
                  <div className="rounded-lg bg-primary/20 p-3">
                    <DeviceIcon className="h-6 text-primary w-6" />
                  </div>
                  <div>
                    <div className="text-sm text-muted-foreground">
                      Your Device
                    </div>
                    <div className="font-bold text-xl">
                      {uaInfo?.browser} on {uaInfo?.os}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="space-y-6 p-6">
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                <InfoCard
                  icon={Chrome}
                  label="Browser"
                  value={uaInfo?.browser}
                  subtitle={`Version ${uaInfo?.browserVersion}`}
                />

                <InfoCard
                  icon={Globe}
                  label="Operating System"
                  value={uaInfo?.os}
                  subtitle={`Platform: ${uaInfo?.platform}`}
                />

                <InfoCard
                  icon={DeviceIcon}
                  label="Device Type"
                  value={uaInfo?.device}
                  subtitle={`Resolution: ${uaInfo?.screenResolution}`}
                />

                <InfoCard
                  icon={Code}
                  label="Rendering Engine"
                  value={uaInfo?.engine}
                />

                <InfoCard
                  icon={Globe}
                  label="Language"
                  value={uaInfo?.language}
                  subtitle={`Cookies: ${uaInfo?.cookiesEnabled ? "Enabled" : "Disabled"}`}
                />

                <InfoCard
                  icon={Monitor}
                  label="Viewport"
                  value={uaInfo?.viewport}
                  subtitle={`DNT: ${uaInfo?.doNotTrack}`}
                  valueClassName="font-mono"
                />
              </div>
            </div>
          </Card>
        )}
      </div>
    </ToolLayout>
  );
}
