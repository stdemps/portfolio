"use client"

import Image from "next/image"
import type { Tool } from "@/lib/portfolio-data"
import { getToolIconComponent } from "./tool-icon-svgs"
import { cn } from "@/lib/utils"

interface ToolIconsProps {
  tools: Tool[]
  className?: string
}

function ToolIcon({ tool }: { tool: Tool }) {
  const isExternal = tool.icon.startsWith("http")
  const isPath = tool.icon.startsWith("/") && tool.icon.length > 1
  const BuiltinIcon = !isPath && !isExternal ? getToolIconComponent(tool.icon) : null

  const content = BuiltinIcon ? (
    <BuiltinIcon className="h-6 w-6 text-muted-foreground md:h-7 md:w-7" />
  ) : isPath || isExternal ? (
    <Image
      src={tool.icon}
      alt=""
      width={48}
      height={48}
      className="h-6 w-6 object-contain md:h-7 md:w-7"
      unoptimized={isExternal}
    />
  ) : (
    <span className="font-display text-lg font-semibold text-muted-foreground md:text-xl">
      {tool.name.charAt(0)}
    </span>
  )

  const wrapper = (
    <div
      className={cn(
        "flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-muted/80 shadow-sm md:h-14 md:w-14",
        "border border-border/60"
      )}
      title={tool.name}
    >
      {content}
    </div>
  )

  if (tool.link) {
    return (
      <a
        href={tool.link}
        target="_blank"
        rel="noopener noreferrer"
        className="focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 rounded-xl shrink-0"
        aria-label={tool.name}
      >
        {wrapper}
      </a>
    )
  }

  return <div className="shrink-0">{wrapper}</div>
}

export function ToolIcons({ tools, className }: ToolIconsProps) {
  return (
    <section
      className={cn("border-t border-border/60", className)}
      aria-label="Tools in my stack"
    >
      <div className="container px-4 py-6 md:px-6 md:py-8 lg:px-8">
        <div className="flex w-full items-center justify-between gap-4 md:gap-6">
          {tools.map((tool) => (
            <ToolIcon key={tool.name} tool={tool} />
          ))}
        </div>
      </div>
    </section>
  )
}
