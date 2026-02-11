import { workExperience } from "@/lib/portfolio-data"
import { cn } from "@/lib/utils"
import { SectionLabel } from "./section-label"
import { ScrollReveal } from "@/components/scroll-reveal"

export function WorkExperienceSection() {
  return (
    <section id="experience" className="scroll-mt-16 border-t border-border/60 md:scroll-mt-20">
      <div className="container px-4 py-12 md:px-6 md:py-16 lg:px-8 lg:py-20">
        <ScrollReveal>
          <SectionLabel number="02" title="Work experience" />
        </ScrollReveal>
        <ul className="relative mt-8 list-none space-y-10 pl-6 md:mt-10 md:space-y-12 md:pl-8 lg:mt-12">
          {/* Vertical line */}
          <span
            className="absolute left-[27.5px] top-0 bottom-0 w-px bg-border md:left-[35.5px]"
            aria-hidden
          />
          {workExperience.map((item, index) => {
            const isCurrent = item.period?.toUpperCase().includes("CURRENT")
            return (
            <ScrollReveal
              asListItem
              key={`${item.title}-${item.employer}-${index}`}
              delay={index * 60}
              className="relative flex gap-4"
            >
              {/* Timeline marker: current = ring, past = filled muted */}
              <span
                className={cn(
                  "relative z-10 flex h-2 w-2 shrink-0 self-start rounded-full mt-1.5 md:mt-2 md:h-2.5 md:w-2.5",
                  isCurrent
                    ? "border-2 border-muted-foreground/60 bg-background"
                    : "border-0 bg-muted-foreground/40"
                )}
                aria-hidden
              />
              <div className="min-w-0 flex-1 flex flex-col gap-2">
                {item.period && (
                  <p className="text-xs font-normal uppercase tracking-wide text-muted-foreground md:text-sm">
                    {item.period}
                  </p>
                )}
                <p className="font-display text-lg font-medium text-foreground md:text-xl">
                  {item.title}
                  {", "}
                  {item.employer}
                </p>
                {item.description && (
                  <p className="max-w-prose text-sm leading-relaxed text-muted-foreground md:text-base md:leading-relaxed">
                    {item.description}
                  </p>
                )}
              </div>
            </ScrollReveal>
            )
          })}
        </ul>
      </div>
    </section>
  )
}
