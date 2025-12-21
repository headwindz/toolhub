"use client";

import { CommonCollapsible } from "@/components/common-collapsible";
import { CopyButton } from "@/components/copy-button";
import { ToolLayout } from "@/components/tool-layout";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import { Code, Lock, Unlock } from "lucide-react";
import { useState } from "react";
import { Base64Knowledge } from "./base64-knowledge";

export default function Base64Page() {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");

  const encode = () => {
    try {
      const encoded = btoa(input);
      setOutput(encoded);
    } catch (error) {
      setOutput("Error: Invalid input for encoding");
    }
  };

  const decode = () => {
    try {
      const decoded = atob(input);
      setOutput(decoded);
    } catch (error) {
      setOutput("Error: Invalid Base64 string");
    }
  };

  return (
    <ToolLayout
      title="Base64 Encoder/Decoder"
      description="Encode and decode Base64 strings"
      icon={Code}
      badges={[{ label: "Fast" }, { label: "Secure" }]}
    >
      <div className="space-y-6">
        <Card className="border-2 overflow-hidden">
          <CommonCollapsible
            title="Learn about Base64"
            description="Understanding Base64 encoding and decoding"
          >
            <Base64Knowledge />
          </CommonCollapsible>
        </Card>
        <Tabs defaultValue="encode" className="space-y-6">
          <TabsList className="w-full grid grid-cols-2">
            <TabsTrigger value="encode" className="gap-2">
              <Lock className="h-4 w-4" />
              Encode
            </TabsTrigger>
            <TabsTrigger value="decode" className="gap-2">
              <Unlock className="h-4 w-4" />
              Decode
            </TabsTrigger>
          </TabsList>

          <TabsContent value="encode" className="space-y-4">
            <Card className="border-2 overflow-hidden">
              <div className="space-y-4 p-6">
                <div>
                  <Label
                    htmlFor="encode-input"
                    className="font-semibold mb-2 block"
                  >
                    Text to Encode
                  </Label>
                  <Textarea
                    id="encode-input"
                    placeholder="Enter text to encode..."
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    className="font-mono text-sm min-h-[150px]"
                  />
                </div>
                <Button onClick={encode} className="w-full gap-2" size="lg">
                  <Lock className="h-4 w-4" />
                  Encode to Base64
                </Button>
              </div>

              {output && (
                <div className="border-t bg-secondary/30 p-6">
                  <div className="flex mb-2 items-center justify-between">
                    <Label className="font-semibold">Encoded Result</Label>
                    <CopyButton text={output} className="h-8" />
                  </div>
                  <Textarea
                    value={output}
                    readOnly
                    className="bg-background font-mono text-sm min-h-[150px]"
                  />
                </div>
              )}
            </Card>
          </TabsContent>

          <TabsContent value="decode" className="space-y-4">
            <Card className="border-2 overflow-hidden">
              <div className="space-y-4 p-6">
                <div>
                  <Label
                    htmlFor="decode-input"
                    className="font-semibold mb-2 block"
                  >
                    Base64 to Decode
                  </Label>
                  <Textarea
                    id="decode-input"
                    placeholder="Enter Base64 string to decode..."
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    className="font-mono text-sm min-h-[150px]"
                  />
                </div>
                <Button onClick={decode} className="w-full gap-2" size="lg">
                  <Unlock className="h-4 w-4" />
                  Decode from Base64
                </Button>
              </div>

              {output && (
                <div className="border-t bg-secondary/30 p-6">
                  <div className="flex mb-2 items-center justify-between">
                    <Label className="font-semibold">Decoded Result</Label>
                    <CopyButton text={output} className="h-8" />
                  </div>
                  <Textarea
                    value={output}
                    readOnly
                    className="bg-background font-mono text-sm min-h-[150px]"
                  />
                </div>
              )}
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </ToolLayout>
  );
}
