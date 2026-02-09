import { cn } from "@/lib/utils"

interface SectionLabelProps {
  number: string
  title: string
  className?: string
}

export function SectionLabel({ number, title, className }: SectionLabelProps) {
  return (
    <h2
      className={cn(
        "font-display text-2xl font-semibold tracking-tight md:text-3xl",
        "flex items-baseline gap-2",
        className
      )}
    >
      <span className="font-normal text-muted-foreground">{number}</span>
      <span className="text-foreground">{title}</span>
    </h2>
  )
}
