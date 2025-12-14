import { useMemo, useState } from "react"
import type { ReactNode } from "react"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible"
import { BookOpen, ChevronDown } from "lucide-react"

interface CommonCollapsibleProps {
  // Controlled state (optional). If omitted, the component manages its own open state.
  open?: boolean
  onOpenChange?: (open: boolean) => void
  defaultOpen?: boolean
  // Provide either a custom trigger node or simple title/description for a built-in trigger.
  trigger?: ReactNode
  title?: string
  description?: string
  children: ReactNode // collapsibleContent
}

export function CommonCollapsible({
  open,
  onOpenChange,
  defaultOpen = false,
  trigger,
  title,
  description,
  children,
}: CommonCollapsibleProps) {
  const isControlled = open !== undefined
  const [internalOpen, setInternalOpen] = useState(defaultOpen)
  const currentOpen = isControlled ? open : internalOpen

  const handleOpenChange = (next: boolean) => {
    if (!isControlled) {
      setInternalOpen(next)
    }
    onOpenChange?.(next)
  }

  const triggerContent = useMemo(() => {
    if (trigger) return trigger
    if (!title && !description) return null
    return (
      <div className="bg-gradient-to-r flex from-blue-500/10 to-purple-500/10 p-4 transition-colors items-center justify-between hover:from-blue-500/15 hover:to-purple-500/15">
        <div className="flex gap-3 items-center">
          <BookOpen className="h-5 text-blue-600 w-5 dark:text-blue-400" />
          <div className="text-left">
            <h3 className="font-semibold">{title}</h3>
            <p className="text-xs text-muted-foreground">{description}</p>
          </div>
        </div>
        <ChevronDown className={`h-5 w-5 transition-transform ${open ? "rotate-180" : ""}`} />
      </div>
    )
  }, [trigger, title, description])

  return (
    <Collapsible open={currentOpen} onOpenChange={handleOpenChange}>
      {triggerContent && <CollapsibleTrigger className="text-left w-full">{triggerContent}</CollapsibleTrigger>}
      <CollapsibleContent>{children}</CollapsibleContent>
    </Collapsible>
  )
}
