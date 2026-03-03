import { cn } from "@/lib/utils"

interface SectionLabelProps {
  number: string
  title: string
  className?: string
  /** When true, render as small glowing label for Playground mode */
  playground?: boolean
}

export function SectionLabel({ number, title, className, playground = false }: SectionLabelProps) {
  if (playground) {
    return (
      <h2 className={cn("moog-category-label shrink-0 pb-2", className)}>
        {number} {title}
      </h2>
    )
  }

  return (
    <h2
      className={cn(
        "font-display text-2xl font-medium tracking-tight md:text-3xl",
        "flex items-baseline gap-2",
        className
      )}
    >
      <span className="font-normal text-muted-foreground">{number}</span>
      <span className="text-foreground">{title}</span>
    </h2>
  )
}
