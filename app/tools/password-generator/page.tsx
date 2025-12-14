"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { Slider } from "@/components/ui/slider"
import { Copy, Check, Shield, Lock, Zap, ChevronDown, BookOpen } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { CommonCollapsible } from "@/components/common-collapsible"
import { ToolLayout } from "@/components/tool-layout"

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
    <ToolLayout
      title="Password Generator"
      description="Create strong, secure, and random passwords instantly"
      icon={Shield}
      category="Security"
      badges={[
        { label: "Secure", icon: Lock },
        { label: "Cryptographically Strong" },
        { label: "Offline" },
      ]}
    >

        <Card className="border-2 overflow-hidden">
          <CommonCollapsible
            open={isLearnOpen}
            onOpenChange={setIsLearnOpen}
            trigger={
              <div className="bg-gradient-to-r flex from-blue-500/10 to-purple-500/10 p-4 transition-colors items-center justify-between hover:from-blue-500/15 hover:to-purple-500/15">
                <div className="flex gap-3 items-center">
                  <BookOpen className="h-5 text-blue-600 w-5 dark:text-blue-400" />
                  <div className="text-left">
                    <h3 className="font-semibold">Learn About Password Security</h3>
                    <p className="text-xs text-muted-foreground">Best practices for strong passwords</p>
                  </div>
                </div>
                <ChevronDown className={`h-5 w-5 transition-transform ${isLearnOpen ? "rotate-180" : ""}`} />
              </div>
            }
          >
            <div className="space-y-4 text-sm leading-relaxed p-6">
              <div>
                <h4 className="font-semibold text-base mb-2">Why Strong Passwords Matter</h4>
                <p className="text-muted-foreground">
                  Weak passwords are the leading cause of security breaches. A strong password acts as your first line
                  of defense against unauthorized access to your accounts, protecting your personal information,
                  financial data, and digital identity.
                </p>
              </div>
              <div>
                <h4 className="font-semibold text-base mb-2">Characteristics of Strong Passwords</h4>
                <ul className="list-disc space-y-1 text-muted-foreground pl-5">
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
                <h4 className="font-semibold text-base mb-2">How Hackers Break Passwords</h4>
                <ul className="list-disc space-y-1 text-muted-foreground pl-5">
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
              <div className="border rounded-lg bg-green-500/10 border-green-500/50 p-4">
                <h4 className="font-semibold text-base mb-2 text-green-900 dark:text-green-100">💡 Pro Tips</h4>
                <ul className="list-disc space-y-1 text-sm pl-5 text-green-900/80 dark:text-green-100/80">
                  <li>Use a password manager to store unique passwords securely</li>
                  <li>Enable two-factor authentication (2FA) whenever possible</li>
                  <li>Change passwords immediately if you suspect a breach</li>
                  <li>Never share passwords via email or text message</li>
                </ul>
              </div>
            </div>
          </CommonCollapsible>
        </Card>

        <Card className="border-2 shadow-xl overflow-hidden">
          <div className="bg-gradient-to-r to-transparent from-primary/10 via-primary/5 p-6">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="font-semibold text-xl">Your Generated Password</h2>
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
                  <div className="flex-1 relative">
                    <Input
                      value={password}
                      readOnly
                      placeholder="Click generate to create password"
                      className="font-mono border-2 shadow-inner text-lg pr-4 transition-colors focus:border-primary"
                    />
                    {password && (
                      <div className="bg-gradient-to-r rounded-lg from-primary/20 to-primary/5 inset-0 -z-10 absolute blur-sm" />
                    )}
                  </div>
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={copyToClipboard}
                    disabled={!password}
                    className="bg-transparent h-12 shadow-md w-12"
                  >
                    {copied ? <Check className="h-5 w-5" /> : <Copy className="h-5 w-5" />}
                  </Button>
                </div>
              </div>

              <Card className="bg-muted/30 border-2 shadow-inner p-6">
                <div className="space-y-6">
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <Label className="font-semibold text-base">Password Length</Label>
                      <Badge variant="secondary" className="text-base">
                        {length[0]}
                      </Badge>
                    </div>
                    <Slider value={length} onValueChange={setLength} min={8} max={64} step={1} className="py-2" />
                    <div className="flex text-xs text-muted-foreground justify-between">
                      <span>8 (Minimum)</span>
                      <span>64 (Maximum)</span>
                    </div>
                  </div>

                  <div className="space-y-3">
                    <Label className="font-semibold text-base">Character Types</Label>
                    <div className="space-y-3">
                      <div className="bg-background border rounded-lg flex space-x-3 p-3 transition-colors items-center hover:bg-accent">
                        <Checkbox
                          id="uppercase"
                          checked={options.uppercase}
                          onCheckedChange={(checked) => setOptions({ ...options, uppercase: checked as boolean })}
                        />
                        <Label htmlFor="uppercase" className="cursor-pointer font-normal flex-1">
                          Uppercase Letters
                        </Label>
                        <Badge variant="outline" className="font-mono">
                          A-Z
                        </Badge>
                      </div>

                      <div className="bg-background border rounded-lg flex space-x-3 p-3 transition-colors items-center hover:bg-accent">
                        <Checkbox
                          id="lowercase"
                          checked={options.lowercase}
                          onCheckedChange={(checked) => setOptions({ ...options, lowercase: checked as boolean })}
                        />
                        <Label htmlFor="lowercase" className="cursor-pointer font-normal flex-1">
                          Lowercase Letters
                        </Label>
                        <Badge variant="outline" className="font-mono">
                          a-z
                        </Badge>
                      </div>

                      <div className="bg-background border rounded-lg flex space-x-3 p-3 transition-colors items-center hover:bg-accent">
                        <Checkbox
                          id="numbers"
                          checked={options.numbers}
                          onCheckedChange={(checked) => setOptions({ ...options, numbers: checked as boolean })}
                        />
                        <Label htmlFor="numbers" className="cursor-pointer font-normal flex-1">
                          Numbers
                        </Label>
                        <Badge variant="outline" className="font-mono">
                          0-9
                        </Badge>
                      </div>

                      <div className="bg-background border rounded-lg flex space-x-3 p-3 transition-colors items-center hover:bg-accent">
                        <Checkbox
                          id="symbols"
                          checked={options.symbols}
                          onCheckedChange={(checked) => setOptions({ ...options, symbols: checked as boolean })}
                        />
                        <Label htmlFor="symbols" className="cursor-pointer font-normal flex-1">
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

              <Button onClick={generatePassword} className="shadow-lg w-full" size="lg">
                <Zap className="h-5 mr-2 w-5" />
                Generate Secure Password
              </Button>
            </div>
          </div>
        </Card>
    </ToolLayout>
  )
}
