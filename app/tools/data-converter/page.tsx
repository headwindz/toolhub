'use client'

import { ToolLayout } from '@/components/tool-layout'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Select } from '@/components/ui/select'
import { Textarea } from '@/components/ui/textarea'
import { ArrowRightLeft, Download, Upload } from 'lucide-react'
import { useState } from 'react'
import { DataConverterKnowledge } from './knowledge'
import { convertData, DataFormat, FormatInfo, SUPPORTED_FORMATS } from './utils'
import { CopyButton } from '@/components/copy-button'
import { SAMPLE_DATA } from './data-converter'

export default function DataConverterPage() {
  const [input, setInput] = useState('')
  const [output, setOutput] = useState('')
  const [sourceFormat, setSourceFormat] = useState<DataFormat>('json')
  const [targetFormat, setTargetFormat] = useState<DataFormat>('yaml')
  const [error, setError] = useState('')
  const [isConverting, setIsConverting] = useState(false)

  const handleConvert = async () => {
    if (!input.trim()) {
      setError('Please enter data to convert')
      setOutput('')
      return
    }

    if (sourceFormat === targetFormat) {
      setError('Source and target formats cannot be the same')
      setOutput('')
      return
    }

    setIsConverting(true)
    setError('')

    try {
      const result = await convertData(input, sourceFormat, targetFormat)
      setOutput(result)
      setError('')
    } catch (err) {
      setError(
        `Conversion failed: ${err instanceof Error ? err.message : 'Unknown error'}`
      )
      setOutput('')
    } finally {
      setIsConverting(false)
    }
  }

  const swapFormats = () => {
    const temp = sourceFormat
    setSourceFormat(targetFormat)
    setTargetFormat(temp)
    // Also swap input and output if both are present
    if (input && output) {
      setInput(output)
      setOutput(input)
    }
  }

  const getFormatInfo = (format: DataFormat): FormatInfo =>
    SUPPORTED_FORMATS[format]

  const downloadOutput = () => {
    if (!output) return

    const blob = new Blob([output], { type: 'text/plain' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `converted.${getFormatInfo(targetFormat).extension}`
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
  }

  const loadSampleData = (format?: DataFormat) => {
    const formatToUse = format || sourceFormat
    setInput(SAMPLE_DATA[formatToUse])
    if (format && format !== sourceFormat) {
      setSourceFormat(format)
    }
  }

  return (
    <ToolLayout
      title="Data Converter"
      description="Convert data between JSON, YAML, TOML, XML, Zod and CSV formats instantly"
      icon={ArrowRightLeft}
      badges={[{ label: 'Local Processing' }, { label: 'Instant' }]}
    >
      <DataConverterKnowledge />

      {/* Format Selection */}
      <Card className="p-6 mb-6">
        <div className="flex flex-col sm:flex-row items-center gap-4">
          <div className="flex-1 w-full">
            <label className="block text-sm font-medium mb-2">
              Source Format
            </label>
            <Select
              value={sourceFormat}
              onChange={(e) => {
                const newFormat = e.target.value as DataFormat
                setSourceFormat(newFormat)
                // Auto-fill sample data if input is empty or contains previous sample
                if (
                  !input.trim() ||
                  Object.values(SAMPLE_DATA).includes(input)
                ) {
                  loadSampleData(newFormat)
                }
              }}
            >
              {Object.entries(SUPPORTED_FORMATS).map(([key, info]) => (
                <option key={key} value={key}>
                  {(info as FormatInfo).name}
                </option>
              ))}
            </Select>
          </div>

          <Button
            variant="outline"
            size="icon"
            onClick={swapFormats}
            className="mt-6 sm:mt-0"
            title="Swap formats"
          >
            <ArrowRightLeft className="h-4 w-4" />
          </Button>

          <div className="flex-1 w-full">
            <label className="block text-sm font-medium mb-2">
              Target Format
            </label>
            <Select
              value={targetFormat}
              onChange={(e) => setTargetFormat(e.target.value as DataFormat)}
            >
              {Object.entries(SUPPORTED_FORMATS).map(([key, info]) => (
                <option key={key} value={key}>
                  {(info as FormatInfo).name}
                </option>
              ))}
            </Select>
          </div>
        </div>
      </Card>

      <div className="grid gap-6 lg:grid-cols-2">
        {/* Input */}
        <Card className="border-2 shadow-xl transition-shadow overflow-hidden hover:shadow-2xl">
          <div className="bg-gradient-to-r to-transparent from-primary/10 via-primary/5 p-6">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="font-semibold text-xl flex items-center gap-2">
                  <span
                    className={`w-3 h-3 rounded-full ${getFormatInfo(sourceFormat).color}`}
                  />
                  {getFormatInfo(sourceFormat).name} Input
                </h2>
                <p className="text-sm text-muted-foreground">
                  Paste your {getFormatInfo(sourceFormat).name} data below
                </p>
              </div>
              <Button
                variant="outline"
                size="sm"
                onClick={() => loadSampleData()}
                className="text-xs"
              >
                <Upload className="h-3 w-3 mr-1" />
                Sample
              </Button>
            </div>
          </div>
          <div className="p-6 pt-4">
            <Textarea
              placeholder={getFormatInfo(sourceFormat).example}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              className={`font-mono border-2 shadow-inner text-sm min-h-[450px] transition-colors ${
                error
                  ? 'border-destructive focus:border-destructive focus:ring-2 focus:ring-destructive/40'
                  : 'focus:border-primary'
              }`}
            />
            <Button
              onClick={handleConvert}
              size="lg"
              className="w-full mt-4 shadow-lg"
              disabled={isConverting || !input.trim()}
            >
              {isConverting ? (
                <div className="flex items-center gap-2">
                  <div className="h-4 w-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  Converting...
                </div>
              ) : (
                <>
                  <ArrowRightLeft className="h-4 mr-2 w-4" />
                  Convert to {getFormatInfo(targetFormat).name}
                </>
              )}
            </Button>
            {error && (
              <div className="border rounded-lg bg-destructive/10 border-destructive/50 mt-3 p-3">
                <p className="font-medium text-sm text-destructive">{error}</p>
              </div>
            )}
          </div>
        </Card>

        {/* Output */}
        <Card className="border-2 shadow-xl transition-shadow overflow-hidden hover:shadow-2xl">
          <div className="bg-gradient-to-r to-transparent flex from-primary/10 via-primary/5 p-6 items-center justify-between">
            <div>
              <h2 className="font-semibold text-xl flex items-center gap-2">
                <span
                  className={`w-3 h-3 rounded-full ${getFormatInfo(targetFormat).color}`}
                />
                {getFormatInfo(targetFormat).name} Output
              </h2>
              <p className="text-sm text-muted-foreground">
                Converted {getFormatInfo(targetFormat).name} data
              </p>
            </div>
            <div className="flex gap-2">
              {output && (
                <>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={downloadOutput}
                    className="text-xs"
                  >
                    <Download className="h-3 w-3 mr-1" />
                    Download
                  </Button>
                  <CopyButton text={output} className="h-8 w-8 p-0" />
                </>
              )}
            </div>
          </div>
          <div className="p-6 pt-4">
            <Textarea
              placeholder={`Converted ${getFormatInfo(targetFormat).name} will appear here...`}
              value={output}
              readOnly
              className="font-mono border-2 shadow-inner text-sm min-h-[450px] bg-muted/50"
            />
            {output && (
              <div className="mt-4 text-xs text-muted-foreground">
                ✓ Successfully converted to {getFormatInfo(targetFormat).name}
              </div>
            )}
          </div>
        </Card>
      </div>
    </ToolLayout>
  )
}
