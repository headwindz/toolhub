import { Badge } from "@/components/ui/badge";
import type { LucideIcon } from "lucide-react";

interface ToolLayoutProps {
  title: string;
  description: string;
  icon: LucideIcon;
  // category: string
  badges?: { label: string; icon?: LucideIcon }[];
  children: React.ReactNode;
}

export function ToolLayout({
  title,
  description,
  icon: Icon,
  badges = [],
  children,
}: ToolLayoutProps) {
  return (
    <div className="space-y-8">
      <div className="flex items-start justify-between">
        <div className="flex gap-4 items-start">
          <div className="bg-gradient-to-br from-primary flex to-primary/60 rounded-2xl flex-shrink-0 h-14 shadow-lg text-primary-foreground w-14 items-center justify-center">
            <Icon className="h-7 w-7" />
          </div>
          <div>
            <div className="flex gap-2 items-center">
              <h1 className="font-bold tracking-tight text-4xl">{title}</h1>
              {/* reserved for tag */}
              {/* <Badge variant="secondary" className="mt-1">
                {category}
              </Badge> */}
            </div>
            <p className="mt-2 text-lg text-muted-foreground">{description}</p>
            {badges.length > 0 && (
              <div className="flex mt-3 gap-2">
                {badges.map((badge, index) => (
                  <Badge key={index} variant="outline" className="font-normal">
                    {badge.icon && <badge.icon className="h-3 mr-1 w-3" />}
                    {badge.label}
                  </Badge>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="space-y-6">{children}</div>
    </div>
  );
}
