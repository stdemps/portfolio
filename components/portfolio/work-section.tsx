import { projects } from "@/lib/portfolio-data"
import { SectionLabel } from "./section-label"
import { ProjectBlock } from "./project-block"
import { cn } from "@/lib/utils"

export function WorkSection() {
  return (
    <section id="work" className="scroll-mt-16 md:scroll-mt-20">
      <div className="container px-4 py-12 md:px-6 md:py-16 lg:px-8 lg:py-20">
        <SectionLabel number="01" title="Recent work" />
        <ul
          className={cn(
            "mt-8 grid list-none gap-4 md:mt-10 md:gap-5 lg:mt-12 lg:gap-6",
            "grid-cols-1 md:grid-cols-2",
            "lg:grid-cols-3 lg:auto-rows-auto"
          )}
        >
          {projects.map((project) => (
            <li
              key={project.id}
              className={cn(
                "min-h-0",
                project.featured && "md:col-span-2 lg:col-span-3"
              )}
            >
              <ProjectBlock project={project} className="h-full" />
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
