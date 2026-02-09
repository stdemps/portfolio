import { workExperience } from "@/lib/portfolio-data"
import { SectionLabel } from "./section-label"

export function WorkExperienceSection() {
  return (
    <section id="experience" className="scroll-mt-16 border-t border-border/60 md:scroll-mt-20">
      <div className="container px-4 py-12 md:px-6 md:py-16 lg:px-8 lg:py-20">
        <SectionLabel number="02" title="Work experience" />
        <ul className="mt-8 list-none space-y-10 md:mt-10 md:space-y-12 lg:mt-12">
          {workExperience.map((item, index) => (
            <li
              key={`${item.title}-${item.employer}-${index}`}
              className="flex flex-col gap-2"
            >
              {item.period && (
                <p className="text-xs font-normal uppercase tracking-wide text-muted-foreground md:text-sm">
                  {item.period}
                </p>
              )}
              <p className="font-display text-lg font-semibold text-foreground md:text-xl">
                {item.title}
                {", "}
                {item.employer}
              </p>
              {item.description && (
                <p className="max-w-prose text-sm leading-relaxed text-foreground md:text-base md:leading-relaxed">
                  {item.description}
                </p>
              )}
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
