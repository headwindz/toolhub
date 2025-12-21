"use client";

import { CommonCollapsible } from "@/components/common-collapsible";
import { ToolLayout } from "@/components/tool-layout";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Award,
  Keyboard,
  RotateCcw,
  Target,
  Timer,
  TrendingUp,
} from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { KeyboardGuide } from "./keyboard-guide";
import { TypingKnowledge } from "./typing-knowledge";

const SAMPLE_TEXTS = {
  easy: [
    "The quick brown fox jumps over the lazy dog.",
    "A journey of a thousand miles begins with a single step.",
    "To be or not to be, that is the question.",
    "All that glitters is not gold.",
    "Practice makes perfect in typing and in life.",
  ],
  medium: [
    "The only way to do great work is to love what you do. If you haven't found it yet, keep looking. Don't settle.",
    "Success is not final, failure is not fatal: it is the courage to continue that counts.",
    "Innovation distinguishes between a leader and a follower. Stay curious and keep learning.",
    "The future belongs to those who believe in the beauty of their dreams and work towards them.",
  ],
  hard: [
    "Cryptography is the practice and study of techniques for secure communication in the presence of adversarial behavior. Modern cryptography exists at the intersection of mathematics, computer science, electrical engineering, and physics.",
    "TypeScript is a strongly typed programming language that builds on JavaScript, giving you better tooling at any scale. It adds optional static typing to JavaScript, which can help catch errors early through type checking.",
  ],
  code: [
    "function calculateSum(a: number, b: number): number { return a + b; }",
    'const fetchData = async () => { const response = await fetch("/api/data"); return response.json(); }',
    "interface User { id: string; name: string; email: string; createdAt: Date; }",
    "export default function Component({ data }: Props) { return <div>{data}</div>; }",
  ],
};

type Difficulty = keyof typeof SAMPLE_TEXTS;

export default function TypingExercisePage() {
  const [difficulty, setDifficulty] = useState<Difficulty>("easy");
  const [targetText, setTargetText] = useState("");
  const [userInput, setUserInput] = useState("");
  const [isStarted, setIsStarted] = useState(false);
  const [isFinished, setIsFinished] = useState(false);
  const [startTime, setStartTime] = useState<number | null>(null);
  const [endTime, setEndTime] = useState<number | null>(null);
  const [errors, setErrors] = useState(0);
  const [currentKey, setCurrentKey] = useState<string>("");
  const inputRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    generateNewText();
  }, [difficulty]);

  const generateNewText = () => {
    const texts = SAMPLE_TEXTS[difficulty];
    const randomText = texts[Math.floor(Math.random() * texts.length)];
    setTargetText(randomText);
    resetExercise();
    setCurrentKey(randomText[0] || "");
  };

  const resetExercise = () => {
    setUserInput("");
    setIsStarted(false);
    setIsFinished(false);
    setStartTime(null);
    setEndTime(null);
    setErrors(0);
  };

  const handleInputChange = (value: string) => {
    if (!isStarted) {
      setIsStarted(true);
      setStartTime(Date.now());
    }

    setUserInput(value);

    // Update current key to highlight
    if (value.length < targetText.length) {
      setCurrentKey(targetText[value.length]);
    } else {
      setCurrentKey("");
    }

    // Count errors (characters that don't match)
    let errorCount = 0;
    for (let i = 0; i < value.length; i++) {
      if (value[i] !== targetText[i]) {
        errorCount++;
      }
    }
    setErrors(errorCount);

    // Check if finished
    if (value === targetText) {
      setIsFinished(true);
      setEndTime(Date.now());
    }
  };

  const getCharacterClass = (index: number) => {
    if (index >= userInput.length) return "text-muted-foreground";
    if (userInput[index] === targetText[index])
      return "text-green-500 bg-green-500/10";
    return "text-red-500 bg-red-500/10";
  };

  const calculateStats = () => {
    if (!startTime) return null;

    const timeElapsed = ((endTime || Date.now()) - startTime) / 1000 / 60; // minutes
    const wordsTyped = userInput.trim().split(/\s+/).length;
    const wpm = Math.round(wordsTyped / timeElapsed);
    const accuracy =
      targetText.length > 0
        ? Math.round(((targetText.length - errors) / targetText.length) * 100)
        : 0;

    return { wpm, accuracy, timeElapsed: Math.round(timeElapsed * 60) };
  };

  const stats = calculateStats();

  return (
    <ToolLayout
      title="Typing Exercise"
      description="Practice and improve your typing speed and accuracy"
      icon={Keyboard}
      badges={[
        { label: "Practice" },
        { label: "Skill Building" },
        { label: "PC" },
      ]}
    >
      <div className="space-y-6">
        <Card className="border-2 overflow-hidden">
          <CommonCollapsible
            title="Learn About Typing Practice"
            description="Improve your typing skills and productivity"
          >
            <TypingKnowledge />
          </CommonCollapsible>
        </Card>

        {/* Difficulty Selection */}
        <Card className="border-2 p-6">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <Label className="font-semibold text-base">
                Select Difficulty
              </Label>
              <Button
                onClick={generateNewText}
                variant="outline"
                size="sm"
                className="gap-2"
              >
                <RotateCcw className="h-4 w-4" />
                New Text
              </Button>
            </div>

            <Tabs
              value={difficulty}
              onValueChange={(value) => setDifficulty(value as Difficulty)}
            >
              <TabsList className="w-full grid grid-cols-4">
                <TabsTrigger value="easy">Easy</TabsTrigger>
                <TabsTrigger value="medium">Medium</TabsTrigger>
                <TabsTrigger value="hard">Hard</TabsTrigger>
                <TabsTrigger value="code">Code</TabsTrigger>
              </TabsList>
            </Tabs>
          </div>
        </Card>

        {/* Keyboard Guide */}
        <KeyboardGuide currentKey={currentKey} />

        {/* Stats Display */}
        {isStarted && stats && (
          <div className="grid gap-4 sm:grid-cols-3">
            <Card className="border-2 p-4">
              <div className="flex gap-3 items-center">
                <div className="rounded-lg bg-blue-500/20 p-3">
                  <Timer className="h-5 text-blue-500 w-5" />
                </div>
                <div>
                  <div className="text-sm text-muted-foreground">Time</div>
                  <div className="font-bold text-xl">{stats.timeElapsed}s</div>
                </div>
              </div>
            </Card>

            <Card className="border-2 p-4">
              <div className="flex gap-3 items-center">
                <div className="rounded-lg bg-green-500/20 p-3">
                  <TrendingUp className="h-5 text-green-500 w-5" />
                </div>
                <div>
                  <div className="text-sm text-muted-foreground">WPM</div>
                  <div className="font-bold text-xl">{stats.wpm}</div>
                </div>
              </div>
            </Card>

            <Card className="border-2 p-4">
              <div className="flex gap-3 items-center">
                <div className="rounded-lg bg-purple-500/20 p-3">
                  <Target className="h-5 text-purple-500 w-5" />
                </div>
                <div>
                  <div className="text-sm text-muted-foreground">Accuracy</div>
                  <div className="font-bold text-xl">{stats.accuracy}%</div>
                </div>
              </div>
            </Card>
          </div>
        )}

        {/* Typing Area */}
        <Card className="border-2 p-6">
          <div className="space-y-4">
            {/* Target Text Display */}
            <div className="rounded-lg bg-secondary/30 border-2 p-6">
              <Label className="font-semibold text-sm mb-3 block">
                Type this text:
              </Label>
              <div
                className={`font-mono text-lg leading-relaxed ${
                  difficulty === "code" ? "text-base" : ""
                }`}
              >
                {targetText.split("").map((char, index) => (
                  <span key={index} className={getCharacterClass(index)}>
                    {char}
                  </span>
                ))}
              </div>
            </div>

            {/* Input Area */}
            <div className="space-y-2">
              <Label htmlFor="typing-input">Your typing:</Label>
              <textarea
                ref={inputRef}
                id="typing-input"
                value={userInput}
                onChange={(e) => handleInputChange(e.target.value)}
                disabled={isFinished}
                placeholder="Start typing here..."
                className={`w-full rounded-lg border-2 bg-background p-4 font-mono text-lg leading-relaxed focus:outline-none focus:ring-2 focus:ring-primary ${
                  difficulty === "code" ? "text-base" : ""
                } ${isFinished ? "bg-green-500/5 border-green-500" : ""}`}
                rows={difficulty === "code" ? 3 : 5}
                spellCheck={false}
                autoComplete="off"
                autoCorrect="off"
                autoCapitalize="off"
              />
            </div>

            {/* Progress */}
            <div className="space-y-2">
              <div className="flex text-sm items-center justify-between">
                <span className="text-muted-foreground">Progress</span>
                <span className="font-semibold">
                  {userInput.length} / {targetText.length}
                </span>
              </div>
              <div className="bg-secondary rounded-full h-2 overflow-hidden">
                <div
                  className={`h-full transition-all ${
                    isFinished ? "bg-green-500" : "bg-primary"
                  }`}
                  style={{
                    width: `${(userInput.length / targetText.length) * 100}%`,
                  }}
                />
              </div>
            </div>

            {/* Completion Message */}
            {isFinished && stats && (
              <Card className="bg-green-500/5 border-2 border-green-500/50 p-6">
                <div className="flex gap-4 items-start">
                  <div className="rounded-lg bg-green-500/20 p-3">
                    <Award className="h-6 text-green-500 w-6" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-bold text-lg mb-2 text-green-600 dark:text-green-400">
                      Congratulations! 🎉
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      You completed the exercise in {stats.timeElapsed} seconds
                      with {stats.wpm} WPM and {stats.accuracy}% accuracy!
                    </p>
                    <Button
                      onClick={generateNewText}
                      className="mt-4 gap-2"
                      size="sm"
                    >
                      <RotateCcw className="h-4 w-4" />
                      Try Another
                    </Button>
                  </div>
                </div>
              </Card>
            )}
          </div>
        </Card>
      </div>
    </ToolLayout>
  );
}
