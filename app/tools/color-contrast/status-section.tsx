import { Badge } from '@/components/ui/badge'

interface StatusSectionProps {
  label: string
  badges: Array<{ passed: boolean; label: string }>
}

export function StatusSection({ label, badges }: StatusSectionProps) {
  return (
    <div className="space-y-2">
      <p className="text-sm text-muted-foreground">{label}</p>
      <div className="flex flex-wrap gap-2">
        {badges.map((badge) => (
          <Badge
            key={badge.label}
            variant={badge.passed ? 'default' : 'secondary'}
            className={badge.passed ? 'bg-green-500 text-white' : ''}
          >
            {badge.passed ? 'Pass' : 'Fail'} {badge.label}
          </Badge>
        ))}
      </div>
    </div>
  )
}
