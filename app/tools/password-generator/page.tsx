"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { Slider } from "@/components/ui/slider"
import { ArrowLeft, Copy, Check, Shield, Lock, Zap, ChevronDown, BookOpen } from "lucide-react"
import Link from "next/link"
import { Badge } from "@/components/ui/badge"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible"

export default function PasswordGeneratorPage() {
  const [password, setPassword] = useState("")
  const [length, setLength] = useState([16])
  const [options, setOptions] = useState({
    uppercase: true,
    lowercase: true,
    numbers: true,
    symbols: true,
  })
  const [copied, setCopied] = useState(false)
  const [strength, setStrength] = useState<"weak" | "medium" | "strong">("medium")
  const [isLearnOpen, setIsLearnOpen] = useState(false)

  useEffect(() => {
    if (!password) return
    const hasMultipleTypes = Object.values(options).filter(Boolean).length
    if (length[0] >= 16 && hasMultipleTypes >= 3) setStrength("strong")
    else if (length[0] >= 12 && hasMultipleTypes >= 2) setStrength("medium")
    else setStrength("weak")
  }, [password, length, options])

  const generatePassword = () => {
    let chars = ""
    if (options.uppercase) chars += "ABCDEFGHIJKLMNOPQRSTUVWXYZ"
    if (options.lowercase) chars += "abcdefghijklmnopqrstuvwxyz"
    if (options.numbers) chars += "0123456789"
    if (options.symbols) chars += "!@#$%^&*()_+-=[]{}|;:,.<>?"

    if (chars === "") return

    let result = ""
    for (let i = 0; i < length[0]; i++) {
      result += chars.charAt(Math.floor(Math.random() * chars.length))
    }
    setPassword(result)
  }

  const copyToClipboard = () => {
    navigator.clipboard.writeText(password)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const strengthColor = {
    weak: "bg-red-500/10 text-red-500 border-red-500/20",
    medium: "bg-yellow-500/10 text-yellow-500 border-yellow-500/20",
    strong: "bg-green-500/10 text-green-500 border-green-500/20",
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-primary/5 p-6">
      <div className="mx-auto max-w-3xl space-y-8">
        <div className="flex items-start justify-between">
          <div className="flex items-start gap-6">
            <Link href="/">
              <Button variant="ghost" size="icon" className="mt-1">
                <ArrowLeft className="h-5 w-5" />
              </Button>
            </Link>
            <div className="flex items-start gap-4">
              <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-primary to-primary/60 text-primary-foreground shadow-lg">
                <Shield className="h-7 w-7" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h1 className="text-4xl font-bold tracking-tight">Password Generator</h1>
                  <Badge variant="secondary" className="mt-1">
                    Security
                  </Badge>
                </div>
                <p className="mt-2 text-lg text-muted-foreground">
                  Create strong, secure, and random passwords instantly
                </p>
                <div className="mt-3 flex gap-2">
                  <Badge variant="outline" className="font-normal">
                    <Lock className="mr-1 h-3 w-3" />
                    Secure
                  </Badge>
                  <Badge variant="outline" className="font-normal">
                    Cryptographically Strong
                  </Badge>
                  <Badge variant="outline" className="font-normal">
                    Offline
                  </Badge>
                </div>
              </div>
            </div>
          </div>
        </div>

        <Card className="overflow-hidden border-2">
          <Collapsible open={isLearnOpen} onOpenChange={setIsLearnOpen}>
            <CollapsibleTrigger className="w-full">
              <div className="flex items-center justify-between bg-gradient-to-r from-blue-500/10 to-purple-500/10 p-4 hover:from-blue-500/15 hover:to-purple-500/15 transition-colors">
                <div className="flex items-center gap-3">
                  <BookOpen className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                  <div className="text-left">
                    <h3 className="font-semibold">Learn About Password Security</h3>
                    <p className="text-xs text-muted-foreground">Best practices for strong passwords</p>
                  </div>
                </div>
                <ChevronDown className={`h-5 w-5 transition-transform ${isLearnOpen ? "rotate-180" : ""}`} />
              </div>
            </CollapsibleTrigger>
            <CollapsibleContent>
              <div className="space-y-4 p-6 text-sm leading-relaxed">
                <div>
                  <h4 className="mb-2 font-semibold text-base">Why Strong Passwords Matter</h4>
                  <p className="text-muted-foreground">
                    Weak passwords are the leading cause of security breaches. A strong password acts as your first line
                    of defense against unauthorized access to your accounts, protecting your personal information,
                    financial data, and digital identity.
                  </p>
                </div>
                <div>
                  <h4 className="mb-2 font-semibold text-base">Characteristics of Strong Passwords</h4>
                  <ul className="list-disc space-y-1 pl-5 text-muted-foreground">
                    <li>
                      <strong>Length:</strong> At least 16 characters (longer is better)
                    </li>
                    <li>
                      <strong>Complexity:</strong> Mix of uppercase, lowercase, numbers, and symbols
                    </li>
                    <li>
                      <strong>Unpredictability:</strong> Avoid dictionary words, personal information, or patterns
                    </li>
                    <li>
                      <strong>Uniqueness:</strong> Never reuse passwords across different accounts
                    </li>
                  </ul>
                </div>
                <div>
                  <h4 className="mb-2 font-semibold text-base">How Hackers Break Passwords</h4>
                  <ul className="list-disc space-y-1 pl-5 text-muted-foreground">
                    <li>
                      <strong>Brute Force:</strong> Trying every possible combination
                    </li>
                    <li>
                      <strong>Dictionary Attacks:</strong> Using common words and phrases
                    </li>
                    <li>
                      <strong>Rainbow Tables:</strong> Pre-computed hashes of common passwords
                    </li>
                    <li>
                      <strong>Social Engineering:</strong> Guessing based on personal information
                    </li>
                  </ul>
                </div>
                <div className="rounded-lg border border-green-500/50 bg-green-500/10 p-4">
                  <h4 className="mb-2 font-semibold text-base text-green-900 dark:text-green-100">💡 Pro Tips</h4>
                  <ul className="list-disc space-y-1 pl-5 text-sm text-green-900/80 dark:text-green-100/80">
                    <li>Use a password manager to store unique passwords securely</li>
                    <li>Enable two-factor authentication (2FA) whenever possible</li>
                    <li>Change passwords immediately if you suspect a breach</li>
                    <li>Never share passwords via email or text message</li>
                  </ul>
                </div>
              </div>
            </CollapsibleContent>
          </Collapsible>
        </Card>

        <Card className="overflow-hidden border-2 shadow-xl">
          <div className="bg-gradient-to-r from-primary/10 via-primary/5 to-transparent p-6">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-xl font-semibold">Your Generated Password</h2>
                <p className="text-sm text-muted-foreground">Copy and use securely</p>
              </div>
              {password && (
                <Badge className={strengthColor[strength]}>
                  {strength === "strong" && "💪 Strong"}
                  {strength === "medium" && "⚠️ Medium"}
                  {strength === "weak" && "❌ Weak"}
                </Badge>
              )}
            </div>
          </div>

          <div className="p-6 pt-4">
            <div className="space-y-6">
              <div className="space-y-2">
                <div className="flex gap-2">
                  <div className="relative flex-1">
                    <Input
                      value={password}
                      readOnly
                      placeholder="Click generate to create password"
                      className="border-2 pr-4 font-mono text-lg shadow-inner transition-colors focus:border-primary"
                    />
                    {password && (
                      <div className="absolute inset-0 -z-10 rounded-lg bg-gradient-to-r from-primary/20 to-primary/5 blur-sm" />
                    )}
                  </div>
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={copyToClipboard}
                    disabled={!password}
                    className="h-12 w-12 shadow-md bg-transparent"
                  >
                    {copied ? <Check className="h-5 w-5" /> : <Copy className="h-5 w-5" />}
                  </Button>
                </div>
              </div>

              <Card className="border-2 bg-muted/30 p-6 shadow-inner">
                <div className="space-y-6">
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <Label className="text-base font-semibold">Password Length</Label>
                      <Badge variant="secondary" className="text-base">
                        {length[0]}
                      </Badge>
                    </div>
                    <Slider value={length} onValueChange={setLength} min={8} max={64} step={1} className="py-2" />
                    <div className="flex justify-between text-xs text-muted-foreground">
                      <span>8 (Minimum)</span>
                      <span>64 (Maximum)</span>
                    </div>
                  </div>

                  <div className="space-y-3">
                    <Label className="text-base font-semibold">Character Types</Label>
                    <div className="space-y-3">
                      <div className="flex items-center space-x-3 rounded-lg border bg-background p-3 transition-colors hover:bg-accent">
                        <Checkbox
                          id="uppercase"
                          checked={options.uppercase}
                          onCheckedChange={(checked) => setOptions({ ...options, uppercase: checked as boolean })}
                        />
                        <Label htmlFor="uppercase" className="flex-1 cursor-pointer font-normal">
                          Uppercase Letters
                        </Label>
                        <Badge variant="outline" className="font-mono">
                          A-Z
                        </Badge>
                      </div>

                      <div className="flex items-center space-x-3 rounded-lg border bg-background p-3 transition-colors hover:bg-accent">
                        <Checkbox
                          id="lowercase"
                          checked={options.lowercase}
                          onCheckedChange={(checked) => setOptions({ ...options, lowercase: checked as boolean })}
                        />
                        <Label htmlFor="lowercase" className="flex-1 cursor-pointer font-normal">
                          Lowercase Letters
                        </Label>
                        <Badge variant="outline" className="font-mono">
                          a-z
                        </Badge>
                      </div>

                      <div className="flex items-center space-x-3 rounded-lg border bg-background p-3 transition-colors hover:bg-accent">
                        <Checkbox
                          id="numbers"
                          checked={options.numbers}
                          onCheckedChange={(checked) => setOptions({ ...options, numbers: checked as boolean })}
                        />
                        <Label htmlFor="numbers" className="flex-1 cursor-pointer font-normal">
                          Numbers
                        </Label>
                        <Badge variant="outline" className="font-mono">
                          0-9
                        </Badge>
                      </div>

                      <div className="flex items-center space-x-3 rounded-lg border bg-background p-3 transition-colors hover:bg-accent">
                        <Checkbox
                          id="symbols"
                          checked={options.symbols}
                          onCheckedChange={(checked) => setOptions({ ...options, symbols: checked as boolean })}
                        />
                        <Label htmlFor="symbols" className="flex-1 cursor-pointer font-normal">
                          Special Symbols
                        </Label>
                        <Badge variant="outline" className="font-mono">
                          !@#$
                        </Badge>
                      </div>
                    </div>
                  </div>
                </div>
              </Card>

              <Button onClick={generatePassword} className="w-full shadow-lg" size="lg">
                <Zap className="mr-2 h-5 w-5" />
                Generate Secure Password
              </Button>
            </div>
          </div>
        </Card>
      </div>
    </div>
  )
}
