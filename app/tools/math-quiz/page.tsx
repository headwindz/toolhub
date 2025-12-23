"use client";

import {
  generateQuestions,
  getOperandLabel,
  type MathQuestion,
  type OperationType,
  type QuizConfig,
} from "@/app/tools/math-quiz/math-quiz-utils";
import { ToolLayout } from "@/components/tool-layout";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select } from "@/components/ui/select";
import { Calculator, Printer } from "lucide-react";
import { useRef, useState } from "react";
import { MathQuizKnowledge } from "./math-quiz-knowledge";

export default function MathQuizPage() {
  const [operationType, setOperationType] = useState<OperationType>("addition");
  const [questions, setQuestions] = useState<MathQuestion[]>([]);
  const [hasGenerated, setHasGenerated] = useState(false);
  const quizRef = useRef<HTMLDivElement>(null);

  // String inputs for better mobile editing (allow empty while typing)
  const [numQuestionsInput, setNumQuestionsInput] = useState("5");
  const [firstOperandInput, setFirstOperandInput] = useState("1");
  const [secondOperandInput, setSecondOperandInput] = useState("1");

  const generateQuiz = () => {
    // Parse and clamp from string inputs to ensure latest values are used
    const parsedNumQuestions = Math.min(
      50,
      Math.max(1, parseInt(numQuestionsInput || "0") || 1),
    );
    const parsedFirstDigits = Math.min(
      5,
      Math.max(1, parseInt(firstOperandInput || "0") || 1),
    );
    const parsedSecondDigits = Math.min(
      5,
      Math.max(1, parseInt(secondOperandInput || "0") || 1),
    );

    // Sync numeric state (used elsewhere) and normalized display
    setNumQuestionsInput(String(parsedNumQuestions));
    setFirstOperandInput(String(parsedFirstDigits));
    setSecondOperandInput(String(parsedSecondDigits));

    const config: QuizConfig = {
      type: operationType,
      firstOperandDigits: parsedFirstDigits,
      secondOperandDigits: parsedSecondDigits,
      numberOfQuestions: parsedNumQuestions,
    };

    const newQuestions = generateQuestions(config);
    setQuestions(newQuestions);
    setHasGenerated(true);
  };

  const handlePrint = () => {
    if (!quizRef.current) return;
    const printWindow = window.open("", "", "height=600,width=800");
    if (printWindow) {
      printWindow.document.write(`
        <!DOCTYPE html>
        <html>
        <head>
          <title>Math Quiz</title>
          <style>
            body {
              font-family: monospace;
              margin: 20px;
              line-height: 1.8;
            }
            .grid {
              display: grid;
              grid-template-columns: repeat(5, 1fr);
              gap: 16px;
            }
            .question {
              text-align: center;
              font-weight: bold;
              font-size: 16px;
            }
            @media print {
              body {
                margin: 0;
                padding: 10px;
              }
            }
          </style>
        </head>
        <body>
          <div class="grid">
            ${questions.map((q) => `<div class="question">${q.displayText}</div>`).join("")}
          </div>
        </body>
        </html>
      `);
      printWindow.document.close();
      printWindow.print();
    }
  };

  return (
    <ToolLayout
      title="Math Quiz Generator"
      description="Create and print custom math practice quizzes"
      icon={Calculator}
      badges={[{ label: "Printable" }, { label: "No Time Limit" }]}
    >
      <MathQuizKnowledge />

      <Card className="p-6 gap-3">
        <div>
          <Label htmlFor="num-questions" className="font-semibold mb-2 block">
            Number of Questions (1-50)
          </Label>
          <Input
            id="num-questions"
            type="number"
            inputMode="numeric"
            value={numQuestionsInput}
            onChange={(e) => {
              // Allow empty during typing
              const val = e.target.value;
              if (val === "" || /^\d+$/.test(val)) {
                setNumQuestionsInput(val);
              }
            }}
            onBlur={(e) => {
              const num = Math.min(
                50,
                Math.max(1, parseInt(e.target.value || "0") || 1),
              );
              setNumQuestionsInput(String(num));
            }}
            className="font-mono"
          />
        </div>

        <div>
          <Label htmlFor="operation" className="font-semibold mb-3 block">
            Select Operation
          </Label>
          <Select
            id="operation"
            value={operationType}
            onChange={(e) => setOperationType(e.target.value as OperationType)}
          >
            <option value="addition">Addition</option>
            <option value="subtraction">Subtraction</option>
            <option value="multiplication">Multiplication</option>
            <option value="division">Division</option>
          </Select>
        </div>

        <div className="grid gap-6 grid-cols-1 sm:grid-cols-2">
          <div>
            <Label htmlFor="first-operand" className="mb-2 block">
              {getOperandLabel(operationType, true)} (1-5)
            </Label>
            <Input
              id="first-operand"
              type="number"
              inputMode="numeric"
              value={firstOperandInput}
              onChange={(e) => {
                const val = e.target.value;
                if (val === "" || /^\d+$/.test(val)) {
                  setFirstOperandInput(val);
                }
              }}
              onBlur={(e) => {
                const num = Math.min(
                  5,
                  Math.max(1, parseInt(e.target.value || "0") || 1),
                );
                setFirstOperandInput(String(num));
              }}
            />
          </div>
          <div>
            <Label htmlFor="second-operand" className="mb-2 block">
              {getOperandLabel(operationType, false)} (1-5)
            </Label>
            <Input
              id="second-operand"
              type="number"
              inputMode="numeric"
              value={secondOperandInput}
              onChange={(e) => {
                const val = e.target.value;
                if (val === "" || /^\d+$/.test(val)) {
                  setSecondOperandInput(val);
                }
              }}
              onBlur={(e) => {
                const num = Math.min(
                  5,
                  Math.max(1, parseInt(e.target.value || "0") || 1),
                );
                setSecondOperandInput(String(num));
              }}
              className="font-mono"
            />
          </div>
        </div>

        <Button
          onClick={generateQuiz}
          className="font-semibold h-11 text-base w-full"
        >
          Generate Quiz
        </Button>
      </Card>

      {hasGenerated && questions.length > 0 && (
        <div className="space-y-4">
          <div className="flex gap-3 justify-end">
            <Button onClick={handlePrint} variant="outline" className="gap-2">
              <Printer className="h-4 w-4" />
              Print Quiz
            </Button>
          </div>

          <div
            ref={quizRef}
            className="border-foreground rounded-lg border-2 grid p-6 gap-4 grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5"
          >
            {questions.map((question) => (
              <div
                key={question.id}
                className="font-mono font-bold text-center text-xl"
              >
                {question.displayText}
              </div>
            ))}
          </div>
        </div>
      )}
    </ToolLayout>
  );
}
