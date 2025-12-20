"use client"

import { useState } from "react"
import { Calculator, Plus, Minus, X, Divide, Check, RotateCcw, Trophy } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { ToolLayout } from "@/components/tool-layout"
import { CommonCollapsible } from "@/components/common-collapsible"

type Operation = "add" | "subtract" | "multiply" | "divide"

interface Question {
  num1: number
  num2: number
  operation: Operation
  answer: number
}

export default function MathQuizPage() {
  const [selectedOperation, setSelectedOperation] = useState<Operation>("add")
  const [addSubtractSettings, setAddSubtractSettings] = useState({
    minNumber: 1,
    maxNumber: 10,
    questionCount: 10,
  })
  const [multiplyDivideSettings, setMultiplyDivideSettings] = useState({
    digits: 2,
    questionCount: 10,
  })
  const [questions, setQuestions] = useState<Question[]>([])
  const [userAnswers, setUserAnswers] = useState<string[]>([])
  const [submitted, setSubmitted] = useState(false)
  const [score, setScore] = useState(0)

  const operationSymbols = {
    add: "+",
    subtract: "-",
    multiply: "×",
    divide: "÷",
  }

  const operationIcons = {
    add: Plus,
    subtract: Minus,
    multiply: X,
    divide: Divide,
  }

  const generateQuestion = (): Question => {
    const operation = selectedOperation
    let num1: number
    let num2: number

    if (operation === "add" || operation === "subtract") {
      const { minNumber, maxNumber } = addSubtractSettings
      num1 = Math.floor(Math.random() * (maxNumber - minNumber + 1)) + minNumber
      num2 = Math.floor(Math.random() * (maxNumber - minNumber + 1)) + minNumber
    } else {
      const { digits } = multiplyDivideSettings
      const min = Math.pow(10, digits - 1)
      const max = Math.pow(10, digits) - 1
      num1 = Math.floor(Math.random() * (max - min + 1)) + min
      num2 = Math.floor(Math.random() * (max - min + 1)) + min
    }

    if (operation === "divide") {
      num2 = Math.max(1, num2)
      num1 = num2 * Math.floor(Math.random() * Math.pow(10, multiplyDivideSettings.digits)) + 1
    }

    let answer: number
    switch (operation) {
      case "add":
        answer = num1 + num2
        break
      case "subtract":
        if (num1 < num2) [num1, num2] = [num2, num1]
        answer = num1 - num2
        break
      case "multiply":
        answer = num1 * num2
        break
      case "divide":
        answer = num1 / num2
        break
    }

    return { num1, num2, operation, answer }
  }

  const generateQuiz = () => {
    const questionCount =
      selectedOperation === "add" || selectedOperation === "subtract"
        ? addSubtractSettings.questionCount
        : multiplyDivideSettings.questionCount

    const newQuestions = Array.from({ length: questionCount }, generateQuestion)
    setQuestions(newQuestions)
    setUserAnswers(new Array(questionCount).fill(""))
    setSubmitted(false)
    setScore(0)
  }

  const submitQuiz = () => {
    let correct = 0
    questions.forEach((q, i) => {
      if (Number.parseFloat(userAnswers[i]) === q.answer) {
        correct++
      }
    })
    setScore(correct)
    setSubmitted(true)
  }

  const resetQuiz = () => {
    setQuestions([])
    setUserAnswers([])
    setSubmitted(false)
    setScore(0)
  }

  return (
    <ToolLayout title="Math Quiz Generator" description="Generate custom math practice quizzes" icon={Calculator}>
      <div className="space-y-6">
        <Card className="border-2 overflow-hidden">
          <CommonCollapsible
            title="Learn about math practice"
            description="Benefits of regular practice and effective learning strategies"
          >
            <div className="space-y-4 text-sm leading-relaxed p-6">
              <div className="space-y-2">
                <h3 className="font-semibold text-base">Why practice math?</h3>
                <p className="text-muted-foreground">
                  Regular math practice strengthens mental calculation abilities, improves number sense, and builds
                  confidence. Repeated exposure to problems helps develop pattern recognition and faster problem-solving
                  skills.
                </p>
              </div>
              <div className="space-y-2">
                <h3 className="font-semibold text-base">Effective practice strategies</h3>
                <ul className="list-disc space-y-1 text-muted-foreground pl-5">
                  <li>
                    <strong>Start simple:</strong> Begin with smaller numbers and gradually increase difficulty
                  </li>
                  <li>
                    <strong>Focus on one operation:</strong> Master one type before mixing multiple operations
                  </li>
                  <li>
                    <strong>Time yourself:</strong> Track improvement by measuring speed while maintaining accuracy
                  </li>
                  <li>
                    <strong>Review mistakes:</strong> Understand why you got answers wrong to avoid repeating errors
                  </li>
                  <li>
                    <strong>Practice daily:</strong> Short, consistent sessions are more effective than long cramming
                  </li>
                </ul>
              </div>
              <div className="space-y-2">
                <h3 className="font-semibold text-base">Tips for each operation</h3>
                <ul className="list-disc space-y-1 text-muted-foreground pl-5">
                  <li>
                    <strong>Addition:</strong> Look for pairs that make 10, use number bonds
                  </li>
                  <li>
                    <strong>Subtraction:</strong> Count up from the smaller number or break into easier parts
                  </li>
                  <li>
                    <strong>Multiplication:</strong> Memorize times tables, use the commutative property (3×4 = 4×3)
                  </li>
                  <li>
                    <strong>Division:</strong> Think of it as "how many groups?" and relate to multiplication
                  </li>
                </ul>
              </div>
            </div>
          </CommonCollapsible>
        </Card>

        <Card className="p-6">
          <h2 className="font-semibold text-lg mb-4">Quiz Settings</h2>
          <div className="space-y-6">
            <div>
              <Label className="mb-3 block">Select Operation</Label>
              <RadioGroup value={selectedOperation} onValueChange={(value) => setSelectedOperation(value as Operation)}>
                <div className="gap-4 grid grid-cols-2 sm:grid-cols-4">
                  {(["add", "subtract", "multiply", "divide"] as Operation[]).map((op) => {
                    const Icon = operationIcons[op]
                    return (
                      <div
                        key={op}
                        onClick={() => setSelectedOperation(op)}
                        className={`flex cursor-pointer flex-col items-center gap-2 rounded-lg border-2 p-4 transition-all hover:border-primary ${
                          selectedOperation === op ? "border-primary bg-primary/5" : "border-muted"
                        }`}
                      >
                        <RadioGroupItem value={op} id={op} />
                        <Icon className="h-6 w-6" />
                        <span className="font-medium text-sm capitalize">{op}</span>
                      </div>
                    )
                  })}
                </div>
              </RadioGroup>
            </div>

            {selectedOperation === "add" || selectedOperation === "subtract" ? (
              <div className="gap-4 grid grid-cols-1 sm:grid-cols-3">
                <div>
                  <Label htmlFor="min">Min Number</Label>
                  <Input
                    id="min"
                    type="number"
                    value={addSubtractSettings.minNumber}
                    onChange={(e) =>
                      setAddSubtractSettings({
                        ...addSubtractSettings,
                        minNumber: Math.max(0, Number.parseInt(e.target.value) || 0),
                      })
                    }
                    className="mt-2"
                  />
                </div>
                <div>
                  <Label htmlFor="max">Max Number</Label>
                  <Input
                    id="max"
                    type="number"
                    value={addSubtractSettings.maxNumber}
                    onChange={(e) =>
                      setAddSubtractSettings({
                        ...addSubtractSettings,
                        maxNumber: Math.max(addSubtractSettings.minNumber, Number.parseInt(e.target.value) || 10),
                      })
                    }
                    className="mt-2"
                  />
                </div>
                <div>
                  <Label htmlFor="count">Questions</Label>
                  <Input
                    id="count"
                    type="number"
                    value={addSubtractSettings.questionCount}
                    onChange={(e) =>
                      setAddSubtractSettings({
                        ...addSubtractSettings,
                        questionCount: Math.max(1, Math.min(50, Number.parseInt(e.target.value) || 10)),
                      })
                    }
                    className="mt-2"
                  />
                </div>
              </div>
            ) : (
              <div className="gap-4 grid grid-cols-1 sm:grid-cols-2">
                <div>
                  <Label htmlFor="digits">Number of Digits</Label>
                  <Input
                    id="digits"
                    type="number"
                    value={multiplyDivideSettings.digits}
                    onChange={(e) =>
                      setMultiplyDivideSettings({
                        ...multiplyDivideSettings,
                        digits: Math.max(1, Math.min(4, Number.parseInt(e.target.value) || 2)),
                      })
                    }
                    className="mt-2"
                    min={1}
                    max={4}
                  />
                  <p className="text-xs text-muted-foreground mt-1">1-4 digits (e.g., 2 digits = 10-99)</p>
                </div>
                <div>
                  <Label htmlFor="count">Questions</Label>
                  <Input
                    id="count"
                    type="number"
                    value={multiplyDivideSettings.questionCount}
                    onChange={(e) =>
                      setMultiplyDivideSettings({
                        ...multiplyDivideSettings,
                        questionCount: Math.max(1, Math.min(50, Number.parseInt(e.target.value) || 10)),
                      })
                    }
                    className="mt-2"
                  />
                </div>
              </div>
            )}

            <Button onClick={generateQuiz} className="w-full" size="lg">
              <Calculator className="mr-2 h-5 w-5" />
              Generate Quiz
            </Button>
          </div>
        </Card>

        {questions.length > 0 && (
          <Card className="p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="font-semibold text-lg">Your Quiz</h2>
              {submitted && (
                <div className="flex gap-2 items-center">
                  <Trophy className="h-5 text-yellow-500 w-5" />
                  <span className="font-semibold text-lg">
                    Score: {score}/{questions.length}
                  </span>
                  <span className="text-muted-foreground text-sm">
                    ({Math.round((score / questions.length) * 100)}%)
                  </span>
                </div>
              )}
            </div>

            <div className="gap-4 grid grid-cols-1 sm:grid-cols-2">
              {questions.map((q, i) => {
                const isCorrect = submitted && Number.parseFloat(userAnswers[i]) === q.answer
                const isIncorrect = submitted && Number.parseFloat(userAnswers[i]) !== q.answer

                return (
                  <div
                    key={i}
                    className={`rounded-lg border-2 p-4 transition-all ${
                      isCorrect
                        ? "border-green-500 bg-green-50 dark:bg-green-950"
                        : isIncorrect
                          ? "border-red-500 bg-red-50 dark:bg-red-950"
                          : "border-muted"
                    }`}
                  >
                    <div className="flex gap-3 items-center justify-between mb-3">
                      <div className="flex flex-1 gap-2 items-center font-mono text-xl">
                        <span className="font-semibold">{q.num1}</span>
                        <span className="text-muted-foreground">{operationSymbols[q.operation]}</span>
                        <span className="font-semibold">{q.num2}</span>
                        <span className="text-muted-foreground">=</span>
                        <Input
                          type="number"
                          value={userAnswers[i]}
                          onChange={(e) => {
                            const newAnswers = [...userAnswers]
                            newAnswers[i] = e.target.value
                            setUserAnswers(newAnswers)
                          }}
                          disabled={submitted}
                          className="w-24 font-mono"
                          placeholder="?"
                        />
                      </div>
                      {submitted && (
                        <div>
                          {isCorrect ? (
                            <Check className="h-6 text-green-600 w-6" />
                          ) : (
                            <div className="font-semibold text-red-600 text-sm">✕ {q.answer}</div>
                          )}
                        </div>
                      )}
                    </div>
                  </div>
                )
              })}
            </div>

            <div className="flex gap-3 mt-6">
              {!submitted ? (
                <Button onClick={submitQuiz} className="flex-1" size="lg">
                  <Check className="mr-2 h-5 w-5" />
                  Submit Quiz
                </Button>
              ) : (
                <Button onClick={resetQuiz} variant="outline" className="flex-1 bg-transparent" size="lg">
                  <RotateCcw className="mr-2 h-5 w-5" />
                  New Quiz
                </Button>
              )}
            </div>
          </Card>
        )}
      </div>
    </ToolLayout>
  )
}
