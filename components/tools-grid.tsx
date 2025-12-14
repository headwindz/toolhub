import { cn } from "@/lib/utils"
import Link from "next/link"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { tools } from "@/constants/tools"
import { CategoryId } from "@/constants/categories"

interface ToolsGridProps {
  activeCategory: CategoryId
}

export function ToolsGrid({ activeCategory }: ToolsGridProps) {
  const filteredTools = activeCategory === CategoryId.All 
    ? tools 
    : tools.filter(tool => tool.category === activeCategory)

  return (
    <div className="space-y-6">
      <div>
        <h2 className="font-semibold tracking-tight text-2xl">Popular Tools</h2>
        <p className="text-sm text-muted-foreground">Most used utilities</p>
      </div>

      <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {filteredTools.map((tool) => {
          const Icon = tool.icon
          return (
            <Link key={tool.name} href={`/tools${tool.href}`} className="h-full">
              <Card className="h-full transition-all group relative overflow-hidden hover:border-primary/50 hover:shadow-lg hover:scale-105">
                <div className="flex flex-col h-full p-6">
                  <div className="flex mb-4 items-start justify-between">
                    <div
                      className={cn(
                        "flex h-12 w-12 items-center justify-center rounded-xl transition-transform group-hover:scale-110",
                        tool.color,
                      )}
                    >
                      <Icon className="h-6 text-white w-6" />
                    </div>
                    {tool.badge && (
                      <Badge variant={tool.badge === "New" ? "default" : "secondary"} className="text-xs">
                        {tool.badge}
                      </Badge>
                    )}
                  </div>
                  <h3 className="font-semibold text-card-foreground mb-2 transition-colors group-hover:text-primary">
                    {tool.name}
                  </h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{tool.description}</p>
                </div>
                <div className="bg-gradient-to-br from-primary/5 to-accent/5 opacity-0 inset-0 transition-opacity -z-10 absolute group-hover:opacity-100" />
              </Card>
            </Link>
          )
        })}
      </div>
    </div>
  )
}
