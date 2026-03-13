"use client"

import * as React from "react"
import Link from "next/link"
import Image from "next/image"
import { motion, AnimatePresence } from "framer-motion"
import { projects, templateRepos, workSectionLabels } from "@/lib/portfolio-data"
import { SectionLabel } from "./section-label"
import { ProjectBlock } from "./project-block"
import { ScrollReveal } from "@/components/scroll-reveal"
import { Button } from "@/components/ui/button"
import { ExternalLink } from "lucide-react"
import { cn } from "@/lib/utils"
import { MoogBankSelector } from "./moog-bank-selector"
import { useViewMode } from "@/hooks/use-view-mode"
import { useMediaQuery } from "@/hooks/use-media-query"

/** When true, show projects marked "Coming Soon"; otherwise hide them (default). */
const showComingSoon =
  process.env.NEXT_PUBLIC_SHOW_COMING_SOON_PROJECTS === "true"

function filterComingSoon<T extends { comingSoon?: boolean }>(items: T[]): T[] {
  if (showComingSoon) return items
  return items.filter((item) => !item.comingSoon)
}

interface WorkSectionProps {
  /** When true, render as horizontal snap carousel (playground mode) */
  carousel?: boolean
  /** When provided (Playground mode), clicking contact CTA switches to Contact patch */
  onContactClick?: () => void
}

export function WorkSection({ carousel = false, onContactClick }: WorkSectionProps) {
  const prototypeProjects = filterComingSoon(
    projects.filter((p) => p.kind === "personal")
  )
  const [activeBank, setActiveBank] = React.useState(0)
  const [, setViewMode] = useViewMode()
  const isDesktop = useMediaQuery("(min-width: 1024px)")

  if (carousel) {
    const bankItems: React.ReactNode[] = [
      /* Bank 0: Intro + template repos */
      <div key="intro" data-moog-bank-item className="flex flex-col justify-center">
        <SectionLabel number="01" title={workSectionLabels.recentWork} playground />
        <p className="mt-4 max-w-2xl text-sm text-muted-foreground">
          {workSectionLabels.aiIntro}
        </p>
        <ul className="mt-6 flex list-none flex-col gap-3 sm:flex-row sm:flex-wrap sm:gap-4">
          {templateRepos.map((repo) => (
            <a
              key={repo.name}
              href={repo.href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`${repo.name} (opens in new tab)`}
              className="moog-card flex min-h-[4.5rem] items-start gap-3 rounded-xl p-6 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
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
          ))}
        </ul>
      </div>,

      /* Bank 1: Work projects CTA */
      <div key="work-cta" data-moog-bank-item className="flex flex-col justify-center">
        <SectionLabel number="02" title={workSectionLabels.workProjects} playground />
        <p className="mt-4 max-w-2xl text-sm text-muted-foreground">
          {workSectionLabels.workProjectsDescription}
        </p>
        <div className="mt-5">
          {onContactClick ? (
            <Button variant="outline" size="default" className="moog-cta group gap-2" onClick={onContactClick}>
              Get in touch{" "}
              <span className="cta-arrow inline-block transition-transform duration-200 ease-[cubic-bezier(0.25,1,0.5,1)] group-hover:translate-x-0.5" aria-hidden>→</span>
            </Button>
          ) : (
            <Button variant="outline" size="default" className="moog-cta group gap-2" asChild>
              <Link href="#contact">
                Get in touch{" "}
                <span className="cta-arrow inline-block transition-transform duration-200 ease-[cubic-bezier(0.25,1,0.5,1)] group-hover:translate-x-0.5" aria-hidden>→</span>
              </Link>
            </Button>
          )}
        </div>
      </div>,

      /* Banks 2+: One project per bank — split-screen detail layout */
      ...prototypeProjects.map((project) => (
        <div
          key={project.id}
          data-moog-bank-item
          className="moog-project-detail flex h-full min-h-0 flex-col"
        >
          <SectionLabel number="03" title={workSectionLabels.prototypes} playground />
          <div className="grid min-h-0 flex-1 grid-cols-1 grid-rows-[auto_1fr] gap-6 md:grid-cols-2 md:grid-rows-1 md:gap-8">
            <div className="flex min-h-0 flex-col justify-center">
              <h2 className="font-synth text-lg font-semibold tracking-tight text-foreground md:text-xl lg:text-2xl">
                {project.subtitle ?? project.title}
              </h2>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground md:mt-3 md:text-base">
                {project.title}
              </p>
              {project.href && (
                <a
                  href={project.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-4 inline-flex items-center gap-2 text-sm font-medium text-amber-400 hover:text-amber-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-500"
                  aria-label={`View ${project.subtitle ?? project.title} (opens in new tab)`}
                >
                  View project
                  <ExternalLink className="h-4 w-4" aria-hidden />
                </a>
              )}
            </div>
            <div className="relative min-h-[200px] h-full w-full overflow-hidden self-stretch">
              {project.image ? (
                <div
                  className="moog-project-image-container relative h-full w-full overflow-hidden rounded-lg"
                  style={{
                    border: "1px solid #404040",
                  }}
                >
                  <Image
                    src={project.image}
                    alt={project.imageAlt ?? `${project.subtitle ?? project.title} — project preview`}
                    fill
                    className="object-cover object-top"
                    sizes="50vw"
                  />
                </div>
              ) : (
                <div className="flex h-full w-full items-center justify-center rounded-lg border border-dashed border-border bg-muted/30 text-sm text-muted-foreground">
                  No image
                </div>
              )}
            </div>
          </div>
        </div>
      )),
    ]

    const bankCount = bankItems.length
    const displayBank = bankCount > 0 ? Math.min(activeBank, bankCount - 1) : 0

    return (
      <section id="work" className="flex h-full flex-col">
        <div className="moog-screen-bank h-full w-full">
          <div className="moog-screen-bank-content relative flex flex-1 flex-col px-4 py-5 md:px-6 md:py-6">
            <AnimatePresence mode="wait">
              <motion.div
                key={displayBank}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.15 }}
                className="relative flex min-h-0 flex-1 flex-col justify-center"
              >
                {displayBank >= 2 ? (
                  <div className="absolute inset-0 flex min-h-0 flex-col overflow-hidden">
                    {bankItems[displayBank]}
                  </div>
                ) : (
                  bankItems[displayBank]
                )}
              </motion.div>
            </AnimatePresence>
          </div>
          <MoogBankSelector
            bankCount={bankCount}
            activeBank={displayBank}
            onSelect={setActiveBank}
          />
        </div>
      </section>
    )
  }

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
        <ul className="mt-6 flex list-none flex-col gap-3 sm:flex-row sm:gap-4 2xl:gap-6">
          {templateRepos.map((repo, i) => (
            <ScrollReveal asListItem key={repo.name} delay={i * 80}>
              <a
                href={repo.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`${repo.name} (opens in new tab)`}
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
            <Button variant="outline" size="default" className="group gap-2" asChild>
              <Link href="#contact">
                Get in touch{" "}
                <span className="cta-arrow inline-block transition-transform duration-200 ease-[cubic-bezier(0.25,1,0.5,1)] group-hover:translate-x-0.5" aria-hidden>
                  →
                </span>
              </Link>
            </Button>
          </div>
        </ScrollReveal>

        {/* Side projects */}
        <ScrollReveal>
          <h3 className="mt-10 font-display text-lg font-medium tracking-tight text-muted-foreground md:mt-12 md:text-xl lg:mt-14">
            {workSectionLabels.prototypes}
          </h3>
          <p className="mt-1.5 text-sm text-muted-foreground/70 md:text-base">
            {workSectionLabels.prototypesSubtext}
          </p>
        </ScrollReveal>
        {prototypeProjects.length > 0 ? (
          <ul
            className={cn(
              "mt-4 grid list-none gap-8 md:mt-5 lg:mt-6",
              "grid-cols-1 lg:grid-cols-2"
            )}
          >
            {prototypeProjects.map((project, i) => (
              <ScrollReveal asListItem key={project.id} delay={i * 100} className="min-h-0">
                <ProjectBlock project={project} className="h-full" />
              </ScrollReveal>
            ))}
          </ul>
        ) : (
          <ScrollReveal delay={80}>
            <p className="mt-4 text-sm text-muted-foreground md:mt-5">
              Nothing here yet — more to come soon.{" "}
              <Link href="#contact" className="underline decoration-primary/30 underline-offset-2 transition-colors hover:text-foreground hover:decoration-primary">
                Get in touch
              </Link>{" "}
              and I can share work samples.
            </p>
          </ScrollReveal>
        )}

        {/* Moog Playground CTA — only on lg+ where the playground is available */}
        {isDesktop && (
          <ScrollReveal delay={160}>
            <div className="mt-10 rounded-xl border border-border/60 px-5 py-5 md:mt-12 lg:mt-14">
              <div className="flex items-center gap-2.5">
                <span className="text-base" aria-hidden>🎛</span>
                <h3 className="font-display text-base font-medium tracking-tight text-foreground md:text-lg">
                  Moog Playground
                </h3>
              </div>
              <p className="mt-2 max-w-md text-sm text-muted-foreground">
                Experience this portfolio in a playful, interactive playground. Try the Moog synthesiser!
              </p>
              <div className="mt-4">
                <Button
                  variant="outline"
                  size="default"
                  className="group gap-2"
                  aria-label="Open Playground — opens interactive Moog synthesiser mode"
                  onClick={() => setViewMode("Playground")}
                >
                  Open Playground
                  <span
                    className="inline-block transition-transform duration-200 ease-[cubic-bezier(0.25,1,0.5,1)] group-hover:translate-x-0.5"
                    aria-hidden
                  >
                    →
                  </span>
                </Button>
              </div>
            </div>
          </ScrollReveal>
        )}
      </div>
    </section>
  )
}
