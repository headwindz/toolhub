"use client"

import { useState } from "react"
import { ChevronLeft, X } from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { categories, CategoryId } from "@/constants/categories"

interface SidebarProps {
  isCollapsed: boolean
  onToggle: () => void
  isMobileOpen?: boolean
  onMobileClose?: () => void
  activeCategory: CategoryId
  onCategoryChange: (category: CategoryId) => void
}

export function Sidebar({ isCollapsed, onToggle, isMobileOpen, onMobileClose, activeCategory, onCategoryChange }: SidebarProps) {

  return (
    <>
      {isMobileOpen && (
        <div className="bg-background/80 inset-0 z-40 fixed backdrop-blur-sm lg:hidden" onClick={onMobileClose} />
      )}

      <aside
        className={cn(
          "fixed inset-y-0 left-0 z-50 border-r bg-background transition-transform duration-300 lg:sticky lg:z-auto lg:translate-x-0",
          "lg:block lg:bg-muted/30",
          isMobileOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0",
          isCollapsed ? "w-64 lg:w-16" : "w-64",
          // Scrolling + height behavior
          "overflow-y-auto lg:top-16 lg:h-[calc(100vh-4rem)] lg:overflow-y-auto",
        )}
      >
        <div className="border-b flex h-16 px-4 items-center justify-between lg:hidden">
          <span className="font-semibold">Categories</span>
          <Button variant="ghost" size="icon" onClick={onMobileClose}>
            <X className="h-5 w-5" />
          </Button>
        </div>

        <nav className="space-y-1 p-4">
          {categories.map((category) => {
            const Icon = category.icon
            return (
              <button
                key={category.id}
                onClick={() => {
                  onCategoryChange(category.id)
                  onMobileClose?.()
                }}
                className={cn(
                  "flex w-full items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors",
                  activeCategory === category.id
                    ? "bg-primary text-primary-foreground"
                    : "text-foreground hover:bg-muted",
                  isCollapsed && "lg:justify-center",
                )}
                title={isCollapsed ? category.name : undefined}
              >
                <Icon className="h-4 w-4 shrink-0" />
                <span className={cn(isCollapsed && "lg:hidden")}>{category.name}</span>
              </button>
            )
          })}
        </nav>
      </aside>

      <Button
        variant="ghost"
        size="icon"
        onClick={onToggle}
        className={cn(
          "bg-background border rounded-full h-8 shadow-sm top-1/2 -translate-y-1/2 w-8 z-10 fixed hidden lg:flex hover:bg-accent transition-all duration-300",
          isCollapsed ? "left-12" : "left-60",
        )}
      >
        <ChevronLeft className={cn("h-4 w-4 transition-transform duration-300", isCollapsed && "rotate-180")} />
      </Button>
    </>
  )
}
