import { testimonials } from "@/lib/portfolio-data"
import { SectionLabel } from "./section-label"
import { TestimonialCard } from "./testimonial-card"
import { ScrollReveal } from "@/components/scroll-reveal"
import { cn } from "@/lib/utils"

export function TestimonialsSection() {
  return (
    <section id="testimonials" className="scroll-mt-16 md:scroll-mt-20">
      <div className="container px-4 py-12 md:px-6 md:py-16 lg:px-8 lg:py-20">
        <ScrollReveal>
          <SectionLabel number="03" title="Testimonials" />
        </ScrollReveal>
        <ul
          className={cn(
            "mt-8 grid list-none gap-4 md:mt-10 md:gap-5 lg:mt-12 lg:gap-6",
            "grid-cols-1 md:grid-cols-2",
            "lg:grid-cols-3 lg:auto-rows-auto"
          )}
        >
          {testimonials.map((t, i) => (
            <ScrollReveal
              asListItem
              key={t.id}
              delay={i * 60}
              className={cn(
                "min-h-0",
                t.featured && "md:col-span-2 lg:col-span-2"
              )}
            >
              <TestimonialCard testimonial={t} className="h-full" />
            </ScrollReveal>
          ))}
        </ul>
      </div>
    </section>
  )
}
