"use client"

import { useViewMode } from "@/hooks/use-view-mode"
import { Switch } from "@/components/ui/switch"
import { cn } from "@/lib/utils"

export function ViewModeToggle() {
  const [viewMode, setViewMode] = useViewMode()
  const isPlayground = viewMode === "Playground"

  const handleCheckedChange = (checked: boolean) => {
    setViewMode(checked ? "Playground" : "Simple")
  }

  return (
    <div
      className="flex items-center gap-2"
      role="group"
      aria-label="View mode"
    >
      <span
        className={cn(
          "text-xs font-medium md:text-sm",
          isPlayground ? "text-muted-foreground" : "text-foreground"
        )}
      >
        Simple
      </span>
      <Switch
        id="view-mode-switch"
        checked={isPlayground}
        onCheckedChange={handleCheckedChange}
        aria-label={isPlayground ? "Switch to Simple mode" : "Switch to Playground mode"}
        className="data-[state=checked]:bg-primary"
      />
      <span
        className={cn(
          "text-xs font-medium md:text-sm",
          isPlayground ? "text-foreground" : "text-muted-foreground"
        )}
        title="Try the Moog synthesiser — an interactive playground mode"
      >
        Playground
      </span>
    </div>
  )
}
