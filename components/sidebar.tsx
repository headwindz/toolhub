"use client"

import { useState } from "react"
import { Home, FileText, ImageIcon, Calculator, Code, Palette, Lock, Globe, ChevronLeft } from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"

const categories = [
  { id: "all", name: "All Tools", icon: Home },
  { id: "text", name: "Text Tools", icon: FileText },
  { id: "image", name: "Image Tools", icon: ImageIcon },
  { id: "converter", name: "Converters", icon: Calculator },
  { id: "developer", name: "Developer Tools", icon: Code },
  { id: "design", name: "Design Tools", icon: Palette },
  { id: "security", name: "Security", icon: Lock },
  { id: "network", name: "Network", icon: Globe },
]

interface SidebarProps {
  isCollapsed: boolean
  onToggle: () => void
}

export function Sidebar({ isCollapsed, onToggle }: SidebarProps) {
  const [activeCategory, setActiveCategory] = useState("all")

  return (
    <aside
      className={cn(
        "relative hidden h-screen border-r bg-muted/30 transition-all duration-300 lg:block",
        isCollapsed ? "w-16" : "w-64",
      )}
    >
      <nav className="space-y-1 p-4">
        {categories.map((category) => {
          const Icon = category.icon
          return (
            <button
              key={category.id}
              onClick={() => setActiveCategory(category.id)}
              className={cn(
                "flex w-full items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors",
                activeCategory === category.id
                  ? "bg-primary text-primary-foreground"
                  : "text-foreground hover:bg-muted",
                isCollapsed && "justify-center",
              )}
              title={isCollapsed ? category.name : undefined}
            >
              <Icon className="h-4 w-4 shrink-0" />
              {!isCollapsed && category.name}
            </button>
          )
        })}
      </nav>

      <Button
        variant="ghost"
        size="icon"
        onClick={onToggle}
        className="absolute bottom-4 -right-3 z-10 h-6 w-6 rounded-full border bg-background shadow-sm hover:bg-accent"
      >
        <ChevronLeft className={cn("h-3.5 w-3.5 transition-transform duration-300", isCollapsed && "rotate-180")} />
      </Button>
    </aside>
  )
}
