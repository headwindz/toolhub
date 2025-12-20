"use client";

import { ToolLayout } from "@/components/tool-layout";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Globe, Loader2, MapPin } from "lucide-react";
import { useState } from "react";

export default function IpLookupPage() {
  const [ipAddress, setIpAddress] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<any>(null);
  const [error, setError] = useState("");

  const lookupIp = async () => {
    if (!ipAddress.trim()) {
      setError("Please enter an IP address");
      return;
    }

    setLoading(true);
    setError("");
    setResult(null);

    try {
      const response = await fetch(`https://ipapi.co/${ipAddress}/json/`);
      const data = await response.json();

      if (data.error) {
        setError(data.reason || "Invalid IP address");
      } else {
        setResult(data);
      }
    } catch (err) {
      setError("Failed to lookup IP address");
    } finally {
      setLoading(false);
    }
  };

  const getCurrentIp = async () => {
    setLoading(true);
    setError("");
    setResult(null);

    try {
      const response = await fetch("https://ipapi.co/json/");
      const data = await response.json();
      setResult(data);
      setIpAddress(data.ip);
    } catch (err) {
      setError("Failed to get current IP");
    } finally {
      setLoading(false);
    }
  };

  return (
    <ToolLayout
      title="IP Lookup"
      description="Get geolocation information for any IP address"
      icon={Globe}
    >
      <div className="mx-auto space-y-6 max-w-3xl">
        <p className="text-muted-foreground">
          Get geolocation information for any IP address
        </p>
      </div>

      <Card className="overflow-hidden">
        <div className="bg-gradient-to-r from-blue-500/10 to-cyan-500/10 p-6">
          <div className="space-y-4">
            <div className="flex gap-2">
              <Input
                placeholder="Enter IP address (e.g., 8.8.8.8)"
                value={ipAddress}
                onChange={(e) => setIpAddress(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && lookupIp()}
                className="flex-1"
              />
              <Button onClick={lookupIp} disabled={loading}>
                {loading ? (
                  <Loader2 className="h-4 animate-spin w-4" />
                ) : (
                  "Lookup"
                )}
              </Button>
            </div>
            <Button
              variant="outline"
              onClick={getCurrentIp}
              disabled={loading}
              className="bg-transparent w-full"
            >
              <Globe className="h-4 mr-2 w-4" />
              Get My IP
            </Button>
          </div>
        </div>

        {error && (
          <div className="border-t bg-red-500/10 p-4">
            <p className="text-sm text-red-600 dark:text-red-400">{error}</p>
          </div>
        )}

        {result && (
          <div className="border-t p-6">
            <div className="space-y-4">
              <div className="flex gap-3 items-start">
                <MapPin className="h-5 mt-1 text-primary w-5" />
                <div className="space-y-3 flex-1">
                  <div>
                    <div className="font-medium text-sm text-muted-foreground">
                      IP Address
                    </div>
                    <div className="font-semibold text-lg">{result.ip}</div>
                  </div>

                  <div className="grid gap-3 sm:grid-cols-2">
                    <div>
                      <div className="font-medium text-sm text-muted-foreground">
                        Country
                      </div>
                      <div className="font-medium">
                        {result.country_flag} {result.country_name}
                      </div>
                    </div>
                    <div>
                      <div className="font-medium text-sm text-muted-foreground">
                        City
                      </div>
                      <div className="font-medium">{result.city || "N/A"}</div>
                    </div>
                    <div>
                      <div className="font-medium text-sm text-muted-foreground">
                        Region
                      </div>
                      <div className="font-medium">
                        {result.region || "N/A"}
                      </div>
                    </div>
                    <div>
                      <div className="font-medium text-sm text-muted-foreground">
                        Postal Code
                      </div>
                      <div className="font-medium">
                        {result.postal || "N/A"}
                      </div>
                    </div>
                    <div>
                      <div className="font-medium text-sm text-muted-foreground">
                        Coordinates
                      </div>
                      <div className="font-medium">
                        {result.latitude}, {result.longitude}
                      </div>
                    </div>
                    <div>
                      <div className="font-medium text-sm text-muted-foreground">
                        Timezone
                      </div>
                      <div className="font-medium">
                        {result.timezone || "N/A"}
                      </div>
                    </div>
                    <div>
                      <div className="font-medium text-sm text-muted-foreground">
                        ISP
                      </div>
                      <div className="font-medium">{result.org || "N/A"}</div>
                    </div>
                    <div>
                      <div className="font-medium text-sm text-muted-foreground">
                        ASN
                      </div>
                      <div className="font-medium">{result.asn || "N/A"}</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </Card>
    </ToolLayout>
  );
}
