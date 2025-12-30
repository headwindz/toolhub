'use client'

import { CopyButton } from '@/components/copy-button'
import { ToolLayout } from '@/components/tool-layout'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Checkbox } from '@/components/ui/checkbox'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Slider } from '@/components/ui/slider'
import { Lock, Shield, Zap } from 'lucide-react'
import { useEffect, useState } from 'react'
import { PasswordKnowledge } from './password-knowledge'

export default function PasswordGeneratorPage() {
  const [password, setPassword] = useState('')
  const [length, setLength] = useState([16])
  const [options, setOptions] = useState({
    uppercase: true,
    lowercase: true,
    numbers: true,
    symbols: true,
  })
  const [strength, setStrength] = useState<'weak' | 'medium' | 'strong'>(
    'medium'
  )

  useEffect(() => {
    if (!password) return
    const hasMultipleTypes = Object.values(options).filter(Boolean).length
    if (length[0] >= 16 && hasMultipleTypes >= 3) setStrength('strong')
    else if (length[0] >= 12 && hasMultipleTypes >= 2) setStrength('medium')
    else setStrength('weak')
  }, [password, length, options])

  const generatePassword = () => {
    let chars = ''
    if (options.uppercase) chars += 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'
    if (options.lowercase) chars += 'abcdefghijklmnopqrstuvwxyz'
    if (options.numbers) chars += '0123456789'
    if (options.symbols) chars += '!@#$%^&*()_+-=[]{}|;:,.<>?'

    if (chars === '') return

    let result = ''
    for (let i = 0; i < length[0]; i++) {
      result += chars.charAt(Math.floor(Math.random() * chars.length))
    }
    setPassword(result)
  }

  const strengthColor = {
    weak: 'bg-red-500/10 text-red-500 border-red-500/20',
    medium: 'bg-yellow-500/10 text-yellow-500 border-yellow-500/20',
    strong: 'bg-green-500/10 text-green-500 border-green-500/20',
  }

  return (
    <ToolLayout
      title="Password Generator"
      description="Create strong, secure, and random passwords instantly"
      icon={Shield}
      badges={[
        { label: 'Secure', icon: Lock },
        { label: 'Cryptographically Strong' },
        { label: 'Offline' },
      ]}
    >
      <PasswordKnowledge />

      <Card className="border-2 shadow-xl overflow-hidden">
        <div className="bg-gradient-to-r to-transparent from-primary/10 via-primary/5 p-6">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="font-semibold text-xl">Your Generated Password</h2>
              <p className="text-sm text-muted-foreground">
                Copy and use securely
              </p>
            </div>
            {password && (
              <Badge className={strengthColor[strength]}>
                {strength === 'strong' && '💪 Strong'}
                {strength === 'medium' && '⚠️ Medium'}
                {strength === 'weak' && '❌ Weak'}
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
                    className="font-mono border-2 h-10 shadow-inner text-lg pr-4 transition-colors focus:border-primary"
                  />
                  {password && (
                    <div className="bg-gradient-to-r rounded-lg from-primary/20 to-primary/5 inset-0 -z-10 absolute blur-sm" />
                  )}
                </div>
                <CopyButton
                  text={password}
                  disabled={!password}
                  className="bg-transparent h-10 shadow-md w-10"
                />
              </div>
            </div>

            <Card className="bg-muted/30 border-2 shadow-inner p-6">
              <div className="space-y-6">
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <Label className="font-semibold text-base">
                      Password Length
                    </Label>
                    <Badge variant="secondary" className="text-base">
                      {length[0]}
                    </Badge>
                  </div>
                  <Slider
                    value={length}
                    onValueChange={setLength}
                    min={8}
                    max={64}
                    step={1}
                    className="py-2"
                  />
                  <div className="flex text-xs text-muted-foreground justify-between">
                    <span>8 (Minimum)</span>
                    <span>64 (Maximum)</span>
                  </div>
                </div>

                <div className="space-y-3">
                  <Label className="font-semibold text-base">
                    Character Types
                  </Label>
                  <div className="space-y-3">
                    <div className="bg-background border rounded-lg flex space-x-3 p-3 transition-colors items-center hover:bg-accent">
                      <Checkbox
                        id="uppercase"
                        checked={options.uppercase}
                        onCheckedChange={(checked) =>
                          setOptions({
                            ...options,
                            uppercase: checked as boolean,
                          })
                        }
                      />
                      <Label
                        htmlFor="uppercase"
                        className="cursor-pointer font-normal flex-1"
                      >
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
                        onCheckedChange={(checked) =>
                          setOptions({
                            ...options,
                            lowercase: checked as boolean,
                          })
                        }
                      />
                      <Label
                        htmlFor="lowercase"
                        className="cursor-pointer font-normal flex-1"
                      >
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
                        onCheckedChange={(checked) =>
                          setOptions({
                            ...options,
                            numbers: checked as boolean,
                          })
                        }
                      />
                      <Label
                        htmlFor="numbers"
                        className="cursor-pointer font-normal flex-1"
                      >
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
                        onCheckedChange={(checked) =>
                          setOptions({
                            ...options,
                            symbols: checked as boolean,
                          })
                        }
                      />
                      <Label
                        htmlFor="symbols"
                        className="cursor-pointer font-normal flex-1"
                      >
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

            <Button
              onClick={generatePassword}
              className="shadow-lg w-full"
              size="lg"
            >
              <Zap className="h-5 mr-2 w-5" />
              Generate Secure Password
            </Button>
          </div>
        </div>
      </Card>
    </ToolLayout>
  )
}
