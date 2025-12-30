'use client'

import { CopyButton } from '@/components/copy-button'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { LucideIcon } from 'lucide-react'

export enum Base64Tab {
  Encode = 'encode',
  Decode = 'decode',
}

export interface ConversionTab {
  id: Base64Tab
  label: string
  icon: LucideIcon
  inputLabel: string
  inputPlaceholder: string
  buttonLabel: string
  resultLabel: string
  onConvert: (input: string) => string
}

export function ConversionCard({
  tab,
  input,
  output,
  onInputChange,
  onConvert,
}: {
  tab: ConversionTab
  input: string
  output: string
  onInputChange: (value: string) => void
  onConvert: () => void
}) {
  const Icon = tab.icon
  return (
    <Card className="border-2 overflow-hidden">
      <div className="space-y-4 p-6">
        <div>
          <Label
            htmlFor={`${tab.id}-input`}
            className="font-semibold mb-2 block"
          >
            {tab.inputLabel}
          </Label>
          <Textarea
            id={`${tab.id}-input`}
            placeholder={tab.inputPlaceholder}
            value={input}
            onChange={(e) => onInputChange(e.target.value)}
            className="font-mono text-sm min-h-[150px]"
          />
        </div>
        <Button onClick={onConvert} className="w-full gap-2" size="lg">
          <Icon className="h-4 w-4" />
          {tab.buttonLabel}
        </Button>
      </div>

      {output && (
        <div className="border-t bg-secondary/30 p-6">
          <div className="flex mb-2 items-center justify-between">
            <Label className="font-semibold">{tab.resultLabel}</Label>
            <CopyButton text={output} className="h-8 w-8" />
          </div>
          <Textarea
            value={output}
            readOnly
            className="bg-background font-mono text-sm min-h-[150px]"
          />
        </div>
      )}
    </Card>
  )
}
