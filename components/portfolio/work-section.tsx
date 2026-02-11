import Link from "next/link"
import { projects, templateRepos, workSectionLabels } from "@/lib/portfolio-data"
import { SectionLabel } from "./section-label"
import { ProjectBlock } from "./project-block"
import { ScrollReveal } from "@/components/scroll-reveal"
import { Button } from "@/components/ui/button"
import { ExternalLink } from "lucide-react"
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
      <div className="container px-4 py-10 md:px-6 md:py-12 lg:px-8 lg:py-14">
        <ScrollReveal>
          <SectionLabel number="01" title={workSectionLabels.recentWork} />
          <p className="mt-4 max-w-2xl text-sm text-muted-foreground md:mt-5 md:text-base">
            {workSectionLabels.aiIntro}
          </p>
        </ScrollReveal>

        {/* Template repo links */}
        <ul className="mt-6 flex list-none flex-col gap-3 sm:flex-row sm:gap-4">
          {templateRepos.map((repo, i) => (
            <ScrollReveal as="li" key={repo.name} delay={i * 80}>
              <a
                href={repo.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`${repo.name} — ${repo.description} (opens in new tab)`}
                className="flex min-h-[4.5rem] items-start gap-3 rounded-xl border border-border/60 bg-muted/30 px-4 py-3 transition-colors hover:bg-muted/50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
              >
                <div className="min-w-0 flex-1">
                  <span className="font-display font-medium text-foreground">
                    {repo.name}
                  </span>
                  <p className="mt-0.5 text-sm text-muted-foreground">
                    {repo.description}
                  </p>
                </div>
                <ExternalLink className="h-4 w-4 shrink-0 text-muted-foreground" aria-hidden />
              </a>
            </ScrollReveal>
          ))}
        </ul>

        {/* Work projects (private) */}
        <ScrollReveal>
          <h3 className="mt-10 font-display text-lg font-medium tracking-tight text-muted-foreground md:mt-12 md:text-xl lg:mt-14">
            {workSectionLabels.workProjects}
          </h3>
          <p className="mt-4 max-w-2xl text-sm text-muted-foreground md:mt-5 md:text-base lg:mt-6">
            {workSectionLabels.workProjectsDescription}
          </p>
          <div className="mt-5 md:mt-6">
            <Button variant="outline" size="default" className="gap-2" asChild>
              <Link href="#contact">
                Get in touch →
              </Link>
            </Button>
          </div>
        </ScrollReveal>

        {/* Vibe coded prototypes */}
        <ScrollReveal>
          <h3 className="mt-10 font-display text-lg font-medium tracking-tight text-muted-foreground md:mt-12 md:text-xl lg:mt-14">
            {workSectionLabels.prototypes}
          </h3>
        </ScrollReveal>
        <ul
          className={cn(
            "mt-4 grid list-none gap-8 md:mt-5 lg:mt-6",
            "grid-cols-1 sm:grid-cols-2"
          )}
        >
          {prototypeProjects.map((project, i) => (
            <ScrollReveal as="li" key={project.id} delay={i * 100} className="min-h-0">
              <ProjectBlock project={project} className="h-full" />
            </ScrollReveal>
          ))}
        </ul>
      </div>
    </section>
  )
}
