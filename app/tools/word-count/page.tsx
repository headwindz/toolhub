"use client";

import { ToolLayout } from "@/components/tool-layout";
import { Card } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { FileText } from "lucide-react";
import { useMemo, useState } from "react";
import { WordCountKnowledge } from "./word-count-knowledge";

export default function WordCountPage() {
  const [text, setText] = useState("");

  const stats = useMemo(() => {
    const trimmedText = text.trim();

    // Character count (with and without spaces)
    const characters = text.length;
    const charactersNoSpaces = text.replace(/\s/g, "").length;

    // Word count
    const words = trimmedText === "" ? 0 : trimmedText.split(/\s+/).length;

    // Sentence count (count periods, question marks, exclamation points)
    const sentences =
      trimmedText === "" ? 0 : (trimmedText.match(/[.!?]+/g) || []).length;

    // Paragraph count (split by double newlines)
    const paragraphs =
      trimmedText === ""
        ? 0
        : trimmedText.split(/\n\s*\n/).filter((p) => p.trim().length > 0)
            .length;

    // Line count
    const lines = trimmedText === "" ? 0 : trimmedText.split(/\n/).length;

    // Average word length
    const totalChars = trimmedText.replace(/\s/g, "").length;
    const avgWordLength = words > 0 ? (totalChars / words).toFixed(1) : "0";

    // Reading time (average reading speed: 200 words per minute)
    const readingTimeMinutes = Math.ceil(words / 200);

    // Speaking time (average speaking speed: 130 words per minute)
    const speakingTimeMinutes = Math.ceil(words / 130);

    return {
      characters,
      charactersNoSpaces,
      words,
      sentences,
      paragraphs,
      lines,
      avgWordLength,
      readingTimeMinutes,
      speakingTimeMinutes,
    };
  }, [text]);

  return (
    <ToolLayout
      title="Word Counter"
      description="Count words, characters, sentences, and more"
      icon={FileText}
      badges={[{ label: "Real-time" }, { label: "Detailed Stats" }]}
    >
      <WordCountKnowledge />

      <Card className="border-2 overflow-hidden">
        <div className="space-y-4 p-6">
          <div>
            <Label htmlFor="text-input" className="font-semibold mb-2 block">
              Enter Your Text
            </Label>
            <Textarea
              id="text-input"
              placeholder="Start typing or paste your text here..."
              value={text}
              onChange={(e) => setText(e.target.value)}
              className="text-sm min-h-[300px] resize-y"
            />
          </div>
        </div>
      </Card>

      <Card className="border-2 overflow-hidden">
        <div className="p-6">
          <h3 className="font-semibold mb-4 text-lg">Statistics</h3>
          <div className="gap-4 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            <StatCard label="Words" value={stats.words} />
            <StatCard label="Characters" value={stats.characters} />
            <StatCard
              label="Characters (no spaces)"
              value={stats.charactersNoSpaces}
            />
            <StatCard label="Sentences" value={stats.sentences} />
            <StatCard label="Paragraphs" value={stats.paragraphs} />
            <StatCard label="Lines" value={stats.lines} />
            <StatCard
              label="Avg. Word Length"
              value={`${stats.avgWordLength} chars`}
            />
            <StatCard
              label="Reading Time"
              value={`${stats.readingTimeMinutes} min`}
            />
            <StatCard
              label="Speaking Time"
              value={`${stats.speakingTimeMinutes} min`}
            />
          </div>
        </div>
      </Card>
    </ToolLayout>
  );
}

function StatCard({ label, value }: { label: string; value: string | number }) {
  return (
    <div className="bg-secondary/30 p-4 rounded-lg">
      <div className="text-muted-foreground text-xs">{label}</div>
      <div className="font-semibold mt-1 text-2xl">{value}</div>
    </div>
  );
}
