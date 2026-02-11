import type { Testimonial } from "@/lib/portfolio-data"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { cn } from "@/lib/utils"

interface TestimonialCardProps {
  testimonial: Testimonial
  className?: string
}

export function TestimonialCard({ testimonial, className }: TestimonialCardProps) {
  const initials = testimonial.name
    .split(" ")
    .map((n) => n.charAt(0))
    .join("")
    .slice(0, 2)

  return (
    <article
      className={cn(
        "flex h-full flex-col rounded-2xl border border-border/60 bg-card p-5 shadow-sm md:p-6",
        className
      )}
    >
      <div className="flex items-start justify-between gap-4">
        <div className="min-w-0">
          <h3 className="font-display text-lg font-medium text-foreground md:text-xl">
            {testimonial.name}
          </h3>
          <p className="mt-0.5 text-sm text-muted-foreground">{testimonial.role}</p>
        </div>
        <Avatar className="h-12 w-12 shrink-0 border border-border/60 md:h-14 md:w-14">
          {testimonial.avatar ? (
            <AvatarImage src={testimonial.avatar} alt="" />
          ) : null}
          <AvatarFallback className="bg-muted text-muted-foreground text-sm font-medium">
            {initials}
          </AvatarFallback>
        </Avatar>
      </div>
      <p className="mt-4 flex-1 text-sm leading-relaxed text-foreground md:text-base md:leading-relaxed">
        {testimonial.quote}
      </p>
    </article>
  )
}
