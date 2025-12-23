"use client";

import { ToolLayout } from "@/components/tool-layout";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Check, Copy, Palette } from "lucide-react";
import { useState } from "react";
import { ColorKnowledge } from "./color-knowledge";

export default function ColorPickerPage() {
  const [color, setColor] = useState("#8b5cf6");
  const [copied, setCopied] = useState<string | null>(null);

  const hexToRgb = (hex: string) => {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result
      ? {
          r: Number.parseInt(result[1], 16),
          g: Number.parseInt(result[2], 16),
          b: Number.parseInt(result[3], 16),
        }
      : null;
  };

  const hexToHsl = (hex: string) => {
    const rgb = hexToRgb(hex);
    if (!rgb) return null;

    const r = rgb.r / 255;
    const g = rgb.g / 255;
    const b = rgb.b / 255;

    const max = Math.max(r, g, b);
    const min = Math.min(r, g, b);
    let h = 0,
      s = 0,
      l = (max + min) / 2;

    if (max !== min) {
      const d = max - min;
      s = l > 0.5 ? d / (2 - max - min) : d / (max + min);

      switch (max) {
        case r:
          h = ((g - b) / d + (g < b ? 6 : 0)) / 6;
          break;
        case g:
          h = ((b - r) / d + 2) / 6;
          break;
        case b:
          h = ((r - g) / d + 4) / 6;
          break;
      }
    }

    return {
      h: Math.round(h * 360),
      s: Math.round(s * 100),
      l: Math.round(l * 100),
    };
  };

  const rgb = hexToRgb(color);
  const hsl = hexToHsl(color);

  const copyToClipboard = (text: string, type: string) => {
    navigator.clipboard.writeText(text);
    setCopied(type);
    setTimeout(() => setCopied(null), 2000);
  };

  const formats = [
    { label: "HEX", value: color.toUpperCase() },
    { label: "RGB", value: rgb ? `rgb(${rgb.r}, ${rgb.g}, ${rgb.b})` : "" },
    { label: "HSL", value: hsl ? `hsl(${hsl.h}, ${hsl.s}%, ${hsl.l}%)` : "" },
  ];

  return (
    <ToolLayout
      title="Color Picker"
      description="Pick colors and generate palettes"
      icon={Palette}
    >
      <ColorKnowledge />
      <Card className="p-6 overflow-hidden">
        <div
          className="rounded-lg h-64 shadow-lg mb-6 w-full transition-colors"
          style={{ backgroundColor: color }}
        />

        <div className="space-y-4">
          <div>
            <Label htmlFor="color-picker" className="mb-2 block">
              Pick a Color
            </Label>
            <Input
              id="color-picker"
              type="color"
              value={color}
              onChange={(e) => setColor(e.target.value)}
              className="cursor-pointer h-12 w-full"
            />
          </div>

          <div>
            <Label htmlFor="color-input" className="mb-2 block">
              Or Enter HEX Code
            </Label>
            <Input
              id="color-input"
              type="text"
              value={color}
              onChange={(e) => setColor(e.target.value)}
              placeholder="#8b5cf6"
              className="font-mono"
            />
          </div>
        </div>
      </Card>

      <Card className="p-6">
        <h2 className="font-semibold text-lg mb-4">Color Formats</h2>
        <div className="space-y-3">
          {formats.map((format) => (
            <div
              key={format.label}
              className="bg-muted rounded-lg flex p-4 gap-4 items-center justify-between"
            >
              <div className="flex-1">
                <p className="font-medium text-xs text-muted-foreground mb-1">
                  {format.label}
                </p>
                <p className="font-mono text-sm">{format.value}</p>
              </div>
              <Button
                variant="outline"
                size="icon"
                onClick={() => copyToClipboard(format.value, format.label)}
              >
                {copied === format.label ? (
                  <Check className="h-4 text-green-600 w-4" />
                ) : (
                  <Copy className="h-4 w-4" />
                )}
              </Button>
            </div>
          ))}
        </div>
      </Card>
    </ToolLayout>
  );
}
