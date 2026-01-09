"use client";

import { CopyButton } from "@/components/copy-button";
import { ToolLayout } from "@/components/tool-layout";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Binary, RefreshCw, Sparkles } from "lucide-react";
import { useState } from "react";
import { NumberBaseKnowledge } from "./knowledge";

export default function NumberBaseConverterPage() {
  const [decimal, setDecimal] = useState("");
  const [binary, setBinary] = useState("");
  const [octal, setOctal] = useState("");
  const [hexadecimal, setHexadecimal] = useState("");
  const [error, setError] = useState("");

  const convertFromDecimal = (value: string) => {
    setDecimal(value);
    if (!value.trim()) {
      setBinary("");
      setOctal("");
      setHexadecimal("");
      setError("");
      return;
    }

    const num = parseInt(value, 10);
    if (isNaN(num)) {
      setError("Invalid decimal number");
      setBinary("");
      setOctal("");
      setHexadecimal("");
      return;
    }

    setError("");
    setBinary(num.toString(2));
    setOctal(num.toString(8));
    setHexadecimal(num.toString(16).toUpperCase());
  };

  const convertFromBinary = (value: string) => {
    setBinary(value);
    if (!value.trim()) {
      setDecimal("");
      setOctal("");
      setHexadecimal("");
      setError("");
      return;
    }

    if (!/^[01]+$/.test(value)) {
      setError("Invalid binary number (only 0 and 1 allowed)");
      setDecimal("");
      setOctal("");
      setHexadecimal("");
      return;
    }

    const num = parseInt(value, 2);
    setError("");
    setDecimal(num.toString(10));
    setOctal(num.toString(8));
    setHexadecimal(num.toString(16).toUpperCase());
  };

  const convertFromOctal = (value: string) => {
    setOctal(value);
    if (!value.trim()) {
      setDecimal("");
      setBinary("");
      setHexadecimal("");
      setError("");
      return;
    }

    if (!/^[0-7]+$/.test(value)) {
      setError("Invalid octal number (only 0-7 allowed)");
      setDecimal("");
      setBinary("");
      setHexadecimal("");
      return;
    }

    const num = parseInt(value, 8);
    setError("");
    setDecimal(num.toString(10));
    setBinary(num.toString(2));
    setHexadecimal(num.toString(16).toUpperCase());
  };

  const convertFromHexadecimal = (value: string) => {
    setHexadecimal(value);
    if (!value.trim()) {
      setDecimal("");
      setBinary("");
      setOctal("");
      setError("");
      return;
    }

    if (!/^[0-9A-Fa-f]+$/.test(value)) {
      setError("Invalid hexadecimal number (only 0-9, A-F allowed)");
      setDecimal("");
      setBinary("");
      setOctal("");
      return;
    }

    const num = parseInt(value, 16);
    setError("");
    setDecimal(num.toString(10));
    setBinary(num.toString(2));
    setOctal(num.toString(8));
  };

  const clear = () => {
    setDecimal("");
    setBinary("");
    setOctal("");
    setHexadecimal("");
    setError("");
  };

  const loadExample = () => {
    convertFromDecimal("255");
  };

  return (
    <ToolLayout
      title="Number Base Converter"
      description="Convert numbers between binary, octal, decimal, and hexadecimal"
      icon={Binary}
      badges={[
        { label: "Real-time Conversion", icon: Sparkles },
        { label: "Multiple Bases" },
      ]}
    >
      <NumberBaseKnowledge />

      <Card className="border-2 shadow-xl transition-shadow overflow-hidden hover:shadow-2xl">
        <div className="bg-gradient-to-r to-transparent from-primary/10 via-primary/5 p-6">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="font-semibold text-xl">Base Converter</h2>
              <p className="text-sm text-muted-foreground">
                Enter a value in any base to convert
              </p>
            </div>
            <div className="flex gap-2">
              <Button onClick={loadExample} variant="outline" size="sm">
                <Sparkles className="h-4 mr-2 w-4" />
                Example
              </Button>
              <Button onClick={clear} variant="outline" size="sm">
                <RefreshCw className="h-4 mr-2 w-4" />
                Clear
              </Button>
            </div>
          </div>
        </div>

        <div className="p-6 pt-4">
          {error && (
            <div className="border rounded-lg bg-destructive/10 border-destructive/50 mb-4 p-3">
              <p className="font-medium text-sm text-destructive">{error}</p>
            </div>
          )}

          <div className="grid gap-6 md:grid-cols-2">
            {/* Decimal */}
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label htmlFor="decimal" className="text-base font-semibold">
                  Decimal (Base 10)
                </Label>
                {decimal && <CopyButton text={decimal} />}
              </div>
              <Input
                id="decimal"
                type="text"
                placeholder="Enter decimal number"
                value={decimal}
                onChange={(e) => convertFromDecimal(e.target.value)}
                className="font-mono text-base h-12"
              />
              <p className="text-xs text-muted-foreground">
                Standard base-10 number (0-9)
              </p>
            </div>

            {/* Binary */}
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label htmlFor="binary" className="text-base font-semibold">
                  Binary (Base 2)
                </Label>
                {binary && <CopyButton text={binary} />}
              </div>
              <Input
                id="binary"
                type="text"
                placeholder="Enter binary number"
                value={binary}
                onChange={(e) => convertFromBinary(e.target.value)}
                className="font-mono text-base h-12"
              />
              <p className="text-xs text-muted-foreground">
                Binary digits (0-1)
              </p>
            </div>

            {/* Octal */}
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label htmlFor="octal" className="text-base font-semibold">
                  Octal (Base 8)
                </Label>
                {octal && <CopyButton text={octal} />}
              </div>
              <Input
                id="octal"
                type="text"
                placeholder="Enter octal number"
                value={octal}
                onChange={(e) => convertFromOctal(e.target.value)}
                className="font-mono text-base h-12"
              />
              <p className="text-xs text-muted-foreground">
                Octal digits (0-7)
              </p>
            </div>

            {/* Hexadecimal */}
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label htmlFor="hexadecimal" className="text-base font-semibold">
                  Hexadecimal (Base 16)
                </Label>
                {hexadecimal && <CopyButton text={hexadecimal} />}
              </div>
              <Input
                id="hexadecimal"
                type="text"
                placeholder="Enter hexadecimal number"
                value={hexadecimal}
                onChange={(e) => convertFromHexadecimal(e.target.value.toUpperCase())}
                className="font-mono text-base h-12"
                style={{ textTransform: "uppercase" }}
              />
              <p className="text-xs text-muted-foreground">
                Hex digits (0-9, A-F)
              </p>
            </div>
          </div>

          {/* Conversion Info */}
          {decimal && (
            <div className="mt-6 p-4 rounded-lg bg-muted/50 border">
              <h3 className="font-semibold text-sm mb-2">Conversion Summary</h3>
              <div className="grid gap-2 text-sm font-mono">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Decimal:</span>
                  <span className="font-semibold">{decimal}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Binary:</span>
                  <span className="font-semibold text-green-600 dark:text-green-400">
                    0b{binary}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Octal:</span>
                  <span className="font-semibold text-blue-600 dark:text-blue-400">
                    0o{octal}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Hexadecimal:</span>
                  <span className="font-semibold text-purple-600 dark:text-purple-400">
                    0x{hexadecimal}
                  </span>
                </div>
              </div>
            </div>
          )}
        </div>
      </Card>
    </ToolLayout>
  );
}
