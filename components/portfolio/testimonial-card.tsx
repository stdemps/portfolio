import type { Testimonial } from "@/lib/portfolio-data"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { cn } from "@/lib/utils"
import { Quote } from "lucide-react"

interface TestimonialCardProps {
  testimonial: Testimonial
  className?: string
}

export function TestimonialCard({ testimonial, className }: TestimonialCardProps) {
  const displayName = testimonial.name ?? "Hidden for privacy"

  return (
    <article
      className={cn(
        "flex h-full flex-col rounded-2xl border border-border/60 bg-card p-5 shadow-sm md:p-6",
        className
      )}
    >
      <div className="flex items-start justify-between gap-4">
        <div className="min-w-0 flex-1 overflow-hidden">
          <h3 className="truncate font-display text-lg font-medium text-foreground md:text-xl">
            {displayName}
          </h3>
          <p className={cn("truncate text-sm text-muted-foreground", testimonial.name && "mt-0.5")}>
            {testimonial.role}
          </p>
        </div>
        <Avatar className="h-12 w-12 shrink-0 border border-border/60 md:h-14 md:w-14" aria-hidden="true">
          {testimonial.avatar ? (
            <AvatarImage src={testimonial.avatar} alt="" />
          ) : null}
          <AvatarFallback className="bg-muted text-muted-foreground flex items-center justify-center">
            <Quote className="h-5 w-5 md:h-6 md:w-6" aria-hidden="true" />
          </AvatarFallback>
        </Avatar>
      </div>
      <p className="mt-4 flex-1 overflow-hidden text-sm leading-relaxed text-foreground md:text-base md:leading-relaxed line-clamp-6">
        {testimonial.quote}
      </p>
    </article>
  )
}
