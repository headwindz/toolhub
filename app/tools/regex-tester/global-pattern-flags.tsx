import { Checkbox } from '@/components/ui/checkbox'
import { Label } from '@/components/ui/label'

export const flagsDescriptions = {
  g: 'Global - Find all matches',
  i: 'Case insensitive - Ignore case',
  m: 'Multiline - ^ and $ match line breaks',
  s: 'Dot all - . matches newlines',
  u: 'Unicode - Treat pattern as Unicode',
  y: 'Sticky - Match from lastIndex only',
}

export function GlobalPatternFlags({
  flags,
  toggleFlag,
}: {
  flags: Record<string, boolean>
  toggleFlag: (flag: keyof typeof flagsDescriptions) => void
}) {
  return (
    <div className="space-y-2">
      <Label className="font-semibold">Flags</Label>
      <div className="grid gap-3 grid-cols-2 md:grid-cols-3">
        {Object.entries(flagsDescriptions).map(([flag, description]) => (
          <div key={flag} className="flex space-x-2 items-start">
            <Checkbox
              id={`flag-${flag}`}
              checked={flags[flag]}
              onCheckedChange={() =>
                toggleFlag(flag as keyof typeof flagsDescriptions)
              }
            />
            <div className="leading-none grid gap-0.5">
              <label
                htmlFor={`flag-${flag}`}
                className="cursor-pointer font-mono font-medium text-sm leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                {flag}
              </label>
              <p className="text-xs text-muted-foreground">{description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
