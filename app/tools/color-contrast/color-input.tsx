import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { CopyButton } from '@/components/copy-button'

interface ColorInputProps {
  id: string
  label: string
  value: string
  onChange: (value: string) => void
}

export function ColorInput({ id, label, value, onChange }: ColorInputProps) {
  return (
    <div className="space-y-2">
      <Label htmlFor={id}>{label}</Label>
      <div className="flex gap-2 items-center">
        <Input
          id={id}
          type="color"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="flex-shrink-0 h-9 p-1 w-9"
          suppressHydrationWarning
        />
        <Input
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="font-mono"
        />
        <CopyButton text={value} size="sm" className="h-9 p-0 w-9" />
      </div>
    </div>
  )
}
