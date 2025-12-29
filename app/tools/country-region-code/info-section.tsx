import { LucideIcon } from 'lucide-react'

interface InfoSectionProps {
  icon: LucideIcon
  title: string
  fields: Array<{ label: string; value: string }>
}

export function InfoSection({ icon, title, fields }: InfoSectionProps) {
  const Icon = icon as LucideIcon
  return (
    <div className="space-y-3">
      <div className="flex font-semibold text-sm gap-2 items-center">
        <Icon className="h-4 text-primary w-4" />
        <span>{title}</span>
      </div>
      <div className="space-y-2">
        {fields.map((field) => (
          <div key={field.label}>
            <div className="text-xs text-muted-foreground">{field.label}</div>
            <div className="bg-secondary rounded p-2">
              <span className="text-sm">{field.value}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
