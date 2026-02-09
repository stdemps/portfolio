import { projects, workSectionLabels } from "@/lib/portfolio-data"
import { SectionLabel } from "./section-label"
import { ProjectBlock } from "./project-block"
import { cn } from "@/lib/utils"

/** When true, show projects marked "Coming Soon"; otherwise hide them (default). */
const showComingSoon =
  process.env.NEXT_PUBLIC_SHOW_COMING_SOON_PROJECTS === "true"

function filterComingSoon<T extends { comingSoon?: boolean }>(items: T[]): T[] {
  if (showComingSoon) return items
  return items.filter((item) => !item.comingSoon)
}

export function WorkSection() {
  const prototypeProjects = filterComingSoon(
    projects.filter((p) => p.kind === "personal")
  )

  return (
    <section id="work" className="scroll-mt-16 md:scroll-mt-20">
      <div className="container px-4 py-12 md:px-6 md:py-16 lg:px-8 lg:py-20">
        <SectionLabel number="01" title={workSectionLabels.recentWork} />
        <h3 className="mt-8 font-display text-lg font-medium tracking-tight text-muted-foreground md:mt-10 md:text-xl lg:mt-12">
          {workSectionLabels.workProjects}
        </h3>
        <p className="mt-4 max-w-2xl text-sm text-muted-foreground md:mt-5 md:text-base lg:mt-6">
          {workSectionLabels.workProjectsDescription}
        </p>

        <h3 className="mt-8 font-display text-lg font-medium tracking-tight text-muted-foreground md:mt-10 md:text-xl lg:mt-12">
          {workSectionLabels.prototypes}
        </h3>
        <ul
          className={cn(
            "mt-4 grid list-none gap-4 md:mt-5 md:gap-5 lg:mt-6 lg:gap-6",
            "grid-cols-1 sm:grid-cols-2"
          )}
        >
          {prototypeProjects.map((project) => (
            <li key={project.id} className="min-h-0">
              <ProjectBlock project={project} className="h-full" />
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
