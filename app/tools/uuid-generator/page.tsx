"use client";

import { ToolLayout } from "@/components/tool-layout";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Check, Copy, Key, RefreshCw } from "lucide-react";
import { useState } from "react";
import { UUIDKnowledge } from "./uuid-knowledge";

export default function UUIDGeneratorPage() {
  const [uuids, setUuids] = useState<string[]>([]);
  const [count, setCount] = useState(2);
  const [copied, setCopied] = useState<number | null>(null);

  const generateUUID = () => {
    return crypto.randomUUID();
  };

  const generateUUIDs = () => {
    const newUuids = Array.from({ length: count }, generateUUID);
    setUuids(newUuids);
  };

  const copyToClipboard = (text: string, index: number) => {
    navigator.clipboard.writeText(text);
    setCopied(index);
    setTimeout(() => setCopied(null), 2000);
  };

  const copyAll = () => {
    navigator.clipboard.writeText(uuids.join("\n"));
    setCopied(-1);
    setTimeout(() => setCopied(null), 2000);
  };

  return (
    <ToolLayout
      title="UUID Generator"
      description="Generate universally unique identifiers (UUIDs)"
      icon={Key}
    >
      <UUIDKnowledge />

      <Card className="p-6">
        <div className="space-y-4">
          <div>
            <Label htmlFor="count">Number of UUIDs</Label>
            <Input
              id="count"
              type="number"
              min={1}
              max={100}
              value={count}
              onChange={(e) => setCount(Number.parseInt(e.target.value) || 1)}
              className="mt-2"
            />
          </div>

          <Button onClick={generateUUIDs} className="w-full" size="lg">
            <RefreshCw className="h-4 mr-2 w-4" />
            Generate UUIDs
          </Button>
        </div>
      </Card>

      {uuids.length > 0 && (
        <Card className="p-6">
          <div className="flex mb-4 items-center justify-between">
            <Label className="font-semibold text-base">Generated UUIDs</Label>
            <Button variant="outline" size="sm" onClick={copyAll}>
              {copied === -1 ? (
                <>
                  <Check className="h-4 mr-2 text-green-600 w-4" />
                  Copied All
                </>
              ) : (
                <>
                  <Copy className="h-4 mr-2 w-4" />
                  Copy All
                </>
              )}
            </Button>
          </div>

          <div className="space-y-2">
            {uuids.map((uuid, index) => (
              <div
                key={index}
                className="bg-muted rounded-lg flex font-mono text-sm p-3 gap-2 items-center justify-between"
              >
                <span className="flex-1">{uuid}</span>
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-8 w-8"
                  onClick={() => copyToClipboard(uuid, index)}
                >
                  {copied === index ? (
                    <Check className="h-4 text-green-600 w-4" />
                  ) : (
                    <Copy className="h-4 w-4" />
                  )}
                </Button>
              </div>
            ))}
          </div>
        </Card>
      )}
    </ToolLayout>
  );
}
