'use client'

import { ToolLayout } from '@/components/tool-layout'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Code, Lock, Unlock } from 'lucide-react'
import { useState } from 'react'
import { Base64Knowledge } from './knowledge'
import { ConversionCard, ConversionTab, Base64Tab } from './conversion'

export default function Base64() {
  const [input, setInput] = useState('')
  const [output, setOutput] = useState('')

  const createConverter = (fn: (s: string) => string, errorMsg: string) => {
    return () => {
      try {
        setOutput(fn(input))
      } catch (error) {
        setOutput(`Error: ${errorMsg}`)
      }
    }
  }

  const tabs: ConversionTab[] = [
    {
      id: Base64Tab.Encode,
      label: 'Encode',
      icon: Lock,
      inputLabel: 'Text to Encode',
      inputPlaceholder: 'Enter text to encode...',
      buttonLabel: 'Encode to Base64',
      resultLabel: 'Encoded Result',
      onConvert: () => btoa(input),
    },
    {
      id: Base64Tab.Decode,
      label: 'Decode',
      icon: Unlock,
      inputLabel: 'Base64 to Decode',
      inputPlaceholder: 'Enter Base64 string to decode...',
      buttonLabel: 'Decode from Base64',
      resultLabel: 'Decoded Result',
      onConvert: () => atob(input),
    },
  ]

  return (
    <ToolLayout
      title="Base64 Encoder/Decoder"
      description="Encode and decode Base64 strings"
      icon={Code}
      badges={[{ label: 'Fast' }, { label: 'Secure' }]}
    >
      <Base64Knowledge />
      <Tabs defaultValue={Base64Tab.Encode} className="space-y-6">
        <TabsList className="w-full grid grid-cols-2">
          {tabs.map((tab) => (
            <TabsTrigger key={tab.id} value={tab.id} className="gap-2">
              <tab.icon className="h-4 w-4" />
              {tab.label}
            </TabsTrigger>
          ))}
        </TabsList>

        {tabs.map((tab) => (
          <TabsContent key={tab.id} value={tab.id} className="space-y-4">
            <ConversionCard
              tab={tab}
              input={input}
              output={output}
              onInputChange={setInput}
              onConvert={createConverter(
                tab.onConvert,
                tab.id === Base64Tab.Encode
                  ? 'Invalid input for encoding'
                  : 'Invalid Base64 string'
              )}
            />
          </TabsContent>
        ))}
      </Tabs>
    </ToolLayout>
  )
}
