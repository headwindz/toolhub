import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'

type UrlFieldProps = {
  id: string
  label: string
  value: string
  onChange: (value: string) => void
  placeholder: string
}

export function UrlField({
  id,
  label,
  value,
  onChange,
  placeholder,
}: UrlFieldProps) {
  return (
    <div>
      <Label htmlFor={id}>{label}</Label>
      <Input
        id={id}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="mt-1 font-mono"
      />
    </div>
  )
}
