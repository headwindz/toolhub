import { Card } from "@/components/ui/card";
import { LucideIcon } from "lucide-react";
import { ReactNode } from "react";

interface InfoCardProps {
  icon: LucideIcon | string;
  label: string;
  value: string | ReactNode;
  subtitle?: string | ReactNode;
  valueClassName?: string;
}

export function InfoCard({
  icon: Icon,
  label,
  value,
  subtitle,
  valueClassName,
}: InfoCardProps) {
  return (
    <Card className="bg-secondary/50 border-0 p-4">
      <div className="flex gap-3 items-start">
        <Icon className="h-5 mt-[1px] text-primary w-5" />
        <div className="flex-1 min-w-0">
          <div className="font-medium text-sm text-muted-foreground">
            {label}
          </div>
          <div className={`font-semibold mt-1 text-sm ${valueClassName || ""}`}>
            {value}
          </div>
          {subtitle && (
            <div className="mt-1 text-xs text-muted-foreground">{subtitle}</div>
          )}
        </div>
      </div>
    </Card>
  );
}
