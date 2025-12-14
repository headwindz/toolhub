import type { LucideIcon } from "lucide-react"
import { Badge } from "@/components/ui/badge"

interface ToolLayoutProps {
  title: string
  description: string
  icon: LucideIcon
  category: string
  badges?: { label: string; icon?: LucideIcon }[]
  children: React.ReactNode
}

export function ToolLayout({ title, description, icon: Icon, category, badges = [], children }: ToolLayoutProps) {
  return (
    <div className="space-y-8">
      <div className="flex items-start justify-between">
        <div className="flex items-start gap-4">
          <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-primary to-primary/60 text-primary-foreground shadow-lg">
            <Icon className="h-7 w-7" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-4xl font-bold tracking-tight">{title}</h1>
              <Badge variant="secondary" className="mt-1">
                {category}
              </Badge>
            </div>
            <p className="mt-2 text-lg text-muted-foreground">{description}</p>
            {badges.length > 0 && (
              <div className="mt-3 flex gap-2">
                {badges.map((badge, index) => (
                  <Badge key={index} variant="outline" className="font-normal">
                    {badge.icon && <badge.icon className="mr-1 h-3 w-3" />}
                    {badge.label}
                  </Badge>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {children}
    </div>
  )
}
