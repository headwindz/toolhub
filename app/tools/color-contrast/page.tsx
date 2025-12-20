"use client";

import { CommonCollapsible } from "@/components/common-collapsible";
import { ToolLayout } from "@/components/tool-layout";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Check, Contrast, Copy, RefreshCcw } from "lucide-react";
import { useMemo, useState } from "react";

const defaultFg = "#111827"; // slate-900
const defaultBg = "#ffffff"; // white

type ContrastResult = {
  ratio: number | null;
  aaNormal: boolean;
  aaaNormal: boolean;
  aaLarge: boolean;
  aaaLarge: boolean;
};

const parseHex = (hex: string) => {
  const normalized = hex.trim().replace("#", "");
  if (!/^([0-9a-fA-F]{3}|[0-9a-fA-F]{6})$/.test(normalized)) return null;
  const value =
    normalized.length === 3
      ? normalized
          .split("")
          .map((c) => c + c)
          .join("")
      : normalized;
  const r = Number.parseInt(value.slice(0, 2), 16);
  const g = Number.parseInt(value.slice(2, 4), 16);
  const b = Number.parseInt(value.slice(4, 6), 16);
  return { r, g, b };
};

const toLuminance = (channel: number) => {
  const c = channel / 255;
  return c <= 0.03928 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4);
};

const getContrastRatio = (fg: string, bg: string): ContrastResult => {
  const fgRgb = parseHex(fg);
  const bgRgb = parseHex(bg);
  if (!fgRgb || !bgRgb)
    return {
      ratio: null,
      aaNormal: false,
      aaaNormal: false,
      aaLarge: false,
      aaaLarge: false,
    };

  const l1 =
    0.2126 * toLuminance(fgRgb.r) +
    0.7152 * toLuminance(fgRgb.g) +
    0.0722 * toLuminance(fgRgb.b);
  const l2 =
    0.2126 * toLuminance(bgRgb.r) +
    0.7152 * toLuminance(bgRgb.g) +
    0.0722 * toLuminance(bgRgb.b);
  const lighter = Math.max(l1, l2);
  const darker = Math.min(l1, l2);
  const ratio = (lighter + 0.05) / (darker + 0.05);

  return {
    ratio,
    aaNormal: ratio >= 4.5,
    aaaNormal: ratio >= 7,
    aaLarge: ratio >= 3,
    aaaLarge: ratio >= 4.5,
  };
};

export default function ColorContrastPage() {
  const [foreground, setForeground] = useState(defaultFg);
  const [background, setBackground] = useState(defaultBg);
  const [sampleText, setSampleText] = useState(
    "Accessible contrast preview text",
  );
  const [copied, setCopied] = useState<string | null>(null);

  const contrast = useMemo(
    () => getContrastRatio(foreground, background),
    [foreground, background],
  );

  const swapColors = () => {
    setForeground(background);
    setBackground(foreground);
  };

  const copyValue = (value: string, label: string) => {
    navigator.clipboard.writeText(value);
    setCopied(label);
    setTimeout(() => setCopied(null), 1600);
  };

  const statusBadge = (passed: boolean, label: string) => (
    <Badge
      variant={passed ? "default" : "secondary"}
      className={passed ? "bg-green-500 text-white" : ""}
    >
      {passed ? "Pass" : "Fail"} {label}
    </Badge>
  );

  return (
    <ToolLayout
      title="Color Contrast"
      description="Calculate WCAG contrast ratios and see pass/fail for AA/AAA"
      icon={Contrast}
      badges={[{ label: "WCAG" }, { label: "AA/AAA" }]}
    >
      <div className="space-y-6">
        <Card className="border-2 overflow-hidden">
          <CommonCollapsible
            title="Learn about contrast"
            description="WCAG thresholds, large text rules, and practical tips"
          >
            <div className="space-y-4 text-sm leading-relaxed p-6">
              <div className="space-y-2">
                <h3 className="font-semibold text-base">WCAG basics</h3>
                <ul className="list-disc space-y-1 text-muted-foreground pl-5">
                  <li>
                    Contrast ratio ranges from 1:1 (same color) to 21:1 (black
                    on white).
                  </li>
                  <li>AA normal text: ≥ 4.5:1. AAA normal text: ≥ 7:1.</li>
                  <li>
                    AA large text: ≥ 3:1. AAA large text: ≥ 4.5:1. Large = 18pt
                    regular or 14pt bold.
                  </li>
                </ul>
              </div>
              <div className="space-y-2">
                <h3 className="font-semibold text-base">Practical tips</h3>
                <ul className="list-disc space-y-1 text-muted-foreground pl-5">
                  <li>
                    Avoid pure black on white; slightly softer pairs reduce eye
                    strain.
                  </li>
                  <li>
                    Test states: focus rings, hovers, disabled, and text over
                    images.
                  </li>
                  <li>
                    Increase font size or weight if you cannot change brand
                    colors.
                  </li>
                </ul>
              </div>
              <div className="space-y-2">
                <h3 className="font-semibold text-base">Common pitfalls</h3>
                <ul className="list-disc space-y-1 text-muted-foreground pl-5">
                  <li>
                    Light text on gradients can fail in some areas; pick the
                    darkest/lightest stop for testing.
                  </li>
                  <li>
                    Low-contrast placeholder text harms usability—treat it as
                    body text.
                  </li>
                  <li>
                    Remember transparent overlays: opacity changes the effective
                    background.
                  </li>
                </ul>
              </div>
            </div>
          </CommonCollapsible>
        </Card>

        <div className="grid gap-6 lg:grid-cols-2">
          <Card className="space-y-4 p-6">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="font-semibold text-lg">Colors</h2>
                <p className="text-sm text-muted-foreground">
                  Foreground and background inputs
                </p>
              </div>
              <Button
                variant="outline"
                size="sm"
                onClick={swapColors}
                className="gap-2"
              >
                <RefreshCcw className="h-4 w-4" /> Swap
              </Button>
            </div>

            <div className="space-y-4">
              <div className="grid gap-4 grid-cols-1 sm:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="foreground">Foreground</Label>
                  <div className="flex gap-2 items-center">
                    <Input
                      id="foreground"
                      type="color"
                      value={foreground}
                      onChange={(e) => setForeground(e.target.value)}
                      className="flex-shrink-0 h-9 p-1 w-9"
                    />
                    <Input
                      value={foreground}
                      onChange={(e) => setForeground(e.target.value)}
                      className="font-mono"
                    />
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={() => copyValue(foreground, "fg")}
                    >
                      {copied === "fg" ? (
                        <Check className="h-4 w-4" />
                      ) : (
                        <Copy className="h-4 w-4" />
                      )}
                    </Button>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="background">Background</Label>
                  <div className="flex gap-2 items-center">
                    <Input
                      id="background"
                      type="color"
                      value={background}
                      onChange={(e) => setBackground(e.target.value)}
                      className="flex-shrink-0 h-9 p-1 w-9"
                    />
                    <Input
                      value={background}
                      onChange={(e) => setBackground(e.target.value)}
                      className="font-mono"
                    />
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={() => copyValue(background, "bg")}
                    >
                      {copied === "bg" ? (
                        <Check className="h-4 w-4" />
                      ) : (
                        <Copy className="h-4 w-4" />
                      )}
                    </Button>
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="sample">Sample text</Label>
                <Input
                  id="sample"
                  value={sampleText}
                  onChange={(e) => setSampleText(e.target.value)}
                  placeholder="Accessible contrast preview text"
                />
              </div>
            </div>
          </Card>

          <Card className="space-y-4 p-6">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="font-semibold text-lg">Results</h2>
                <p className="text-sm text-muted-foreground">
                  WCAG pass/fail for normal and large text
                </p>
              </div>
              {contrast.ratio !== null && (
                <Badge className="font-semibold text-base">
                  {contrast.ratio.toFixed(2)} : 1
                </Badge>
              )}
            </div>

            <div
              className="border rounded-lg overflow-hidden"
              style={{ backgroundColor: background, color: foreground }}
            >
              <div className="space-y-3 p-6">
                <p className="font-semibold text-lg">
                  {sampleText || "Sample"}
                </p>
                <p className="text-sm opacity-80">Normal text preview</p>
                <p className="font-semibold text-xl">Large text preview</p>
              </div>
            </div>

            <div className="grid gap-3 grid-cols-2">
              <div className="space-y-2">
                <p className="text-sm text-muted-foreground">Normal text</p>
                <div className="flex flex-wrap gap-2">
                  {statusBadge(!!contrast.ratio && contrast.aaNormal, "AA")}
                  {statusBadge(!!contrast.ratio && contrast.aaaNormal, "AAA")}
                </div>
              </div>
              <div className="space-y-2">
                <p className="text-sm text-muted-foreground">Large text</p>
                <div className="flex flex-wrap gap-2">
                  {statusBadge(!!contrast.ratio && contrast.aaLarge, "AA")}
                  {statusBadge(!!contrast.ratio && contrast.aaaLarge, "AAA")}
                </div>
              </div>
            </div>

            {contrast.ratio === null && (
              <p className="text-sm text-muted-foreground">
                Enter valid HEX colors (e.g., #111827 and #ffffff).
              </p>
            )}
          </Card>
        </div>
      </div>
    </ToolLayout>
  );
}
