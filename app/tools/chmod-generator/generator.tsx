import { CopyButton } from '@/components/copy-button'
import { Card } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Terminal } from 'lucide-react'
import { useState, useEffect } from 'react'

type GeneratorProps = {
  customCommand: string
  setCustomCommand: (value: string) => void
  generateCommand: () => string
  calculateOctal: () => string
  calculateSymbolic: () => string
  getPermissionDescription: () => string
  setOctalPermission: (octal: string) => void
  setSymbolicPermission: (symbolic: string) => void
}

export function Generator({
  customCommand,
  setCustomCommand,
  generateCommand,
  calculateOctal,
  calculateSymbolic,
  getPermissionDescription,
  setOctalPermission,
  setSymbolicPermission,
}: GeneratorProps) {
  const [octalInput, setOctalInput] = useState('')
  const [symbolicInput, setSymbolicInput] = useState('')
  const [isOctalFocused, setIsOctalFocused] = useState(false)
  const [isSymbolicFocused, setIsSymbolicFocused] = useState(false)

  // Sync with calculated values when not being edited
  useEffect(() => {
    if (!isOctalFocused) {
      setOctalInput(calculateOctal())
    }
  }, [calculateOctal, isOctalFocused])

  useEffect(() => {
    if (!isSymbolicFocused) {
      setSymbolicInput(calculateSymbolic())
    }
  }, [calculateSymbolic, isSymbolicFocused])

  const handleOctalChange = (value: string) => {
    setOctalInput(value)
    // Only update permissions if it's a valid 3-digit octal
    if (/^[0-7]{3}$/.test(value)) {
      setOctalPermission(value)
    }
  }

  const handleSymbolicChange = (value: string) => {
    setSymbolicInput(value)
    // Only update permissions if it matches the complete symbolic pattern
    if (/^[r\-][w\-][x\-][r\-][w\-][x\-][r\-][w\-][x\-]$/.test(value)) {
      setSymbolicPermission(value)
    }
  }

  return (
    <Card className="p-6">
      <div className="space-y-4">
        <div className="flex items-center gap-2">
          <Terminal className="h-5 w-5 text-green-600" />
          <h3 className="text-lg font-semibold">Generated chmod Command</h3>
        </div>

        <div className="space-y-4">
          <div>
            <Label htmlFor="filename">File/Directory name (optional)</Label>
            <Input
              id="filename"
              placeholder="e.g., script.sh or /path/to/file"
              value={customCommand}
              onChange={(e) => setCustomCommand(e.target.value)}
              className="mt-1"
            />
          </div>

          <div className="space-y-3">
            <div className="p-4 bg-muted/30 rounded-lg border">
              <div className="flex items-center justify-between">
                <div className="font-mono text-lg">{generateCommand()}</div>
                <CopyButton text={generateCommand()} />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-3 bg-blue-50 rounded-lg border space-y-2">
                <Label
                  htmlFor="octal-input"
                  className="text-sm font-medium text-blue-900"
                >
                  Octal Notation
                </Label>
                <Input
                  id="octal-input"
                  value={octalInput}
                  onChange={(e) => handleOctalChange(e.target.value)}
                  onFocus={() => setIsOctalFocused(true)}
                  onBlur={() => setIsOctalFocused(false)}
                  placeholder="e.g., 755"
                  className="text-xl font-mono text-blue-700 bg-white border-blue-200"
                  maxLength={3}
                />
                <div className="text-xs text-blue-600">
                  Enter 3 digits (0-7)
                </div>
              </div>
              <div className="p-3 bg-green-50 rounded-lg border space-y-2">
                <Label
                  htmlFor="symbolic-input"
                  className="text-sm font-medium text-green-900"
                >
                  Symbolic Notation
                </Label>
                <Input
                  id="symbolic-input"
                  value={symbolicInput}
                  onChange={(e) => handleSymbolicChange(e.target.value)}
                  onFocus={() => setIsSymbolicFocused(true)}
                  onBlur={() => setIsSymbolicFocused(false)}
                  placeholder="e.g., rwxr-xr-x"
                  className="text-xl font-mono text-green-700 bg-white border-green-200"
                  maxLength={9}
                />
                <div className="text-xs text-green-600">
                  Enter 9 chars (r/w/x or -)
                </div>
              </div>
            </div>

            <div className="p-3 bg-yellow-50 rounded-lg border">
              <div className="text-sm font-medium text-yellow-900">
                Permission Description
              </div>
              <div className="text-yellow-700">
                {getPermissionDescription()}
              </div>
            </div>
          </div>
        </div>
      </div>
    </Card>
  )
}
