import Image from "next/image"
import type { Project } from "@/lib/portfolio-data"
import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"

interface ProjectBlockProps {
  project: Project
  className?: string
}

function browserBarUrl(href?: string): string {
  if (!href) return ""
  try { return new URL(href).hostname.replace(/^www\./, "") } catch { return href }
}

export function ProjectBlock({ project, className }: ProjectBlockProps) {
  const showGradientBg = project.backgroundGradient
  const isPhones = project.mockupType === "phones"
  const isBrowser = project.mockupType === "browser"

  const card = (
    <article
      className={cn(
        "overflow-hidden rounded-2xl border border-border/60 transition-shadow",
        showGradientBg && "bg-gradient-to-br from-violet-50/60 via-muted/50 to-blue-50/60 dark:from-violet-950/25 dark:via-muted/20 dark:to-blue-950/25",
        !showGradientBg && "bg-card",
        project.href && "hover:shadow-lg",
        className
      )}
    >
      <div className="p-4 md:p-6 lg:p-8">
        {project.comingSoon && (
          <div className="mb-4 flex justify-end md:mb-5">
            <Badge className="bg-comingSoon text-white border-0">
              Coming Soon
            </Badge>
          </div>
        )}

        {isPhones && (
          <div className="flex justify-center gap-4 py-8 md:gap-6 md:py-12">
            <div className="relative h-[280px] w-[140px] rounded-[2rem] border-[8px] border-foreground/10 bg-card shadow-xl md:h-[320px] md:w-[160px]">
              <div className="absolute inset-2 rounded-[1.25rem] bg-muted" />
              <div className="absolute left-1/2 top-4 h-4 w-16 -translate-x-1/2 rounded-full bg-foreground/20" />
            </div>
            <div className="relative h-[280px] w-[140px] rounded-[2rem] border-[8px] border-foreground/10 bg-card shadow-xl md:h-[320px] md:w-[160px]">
              <div className="absolute inset-2 rounded-[1.25rem] bg-muted" />
              <div className="absolute left-1/2 top-4 h-4 w-16 -translate-x-1/2 rounded-full bg-foreground/20" />
            </div>
          </div>
        )}

        {isBrowser && project.image && (
          <div className="relative mt-4 overflow-hidden rounded-lg border border-border bg-card shadow-md">
            <div className="flex h-8 items-center gap-2 border-b border-border bg-muted/50 px-3">
              <div className="flex gap-1.5">
                <div className="h-2.5 w-2.5 rounded-full bg-browserDotRed" />
                <div className="h-2.5 w-2.5 rounded-full bg-browserDotAmber" />
                <div className="h-2.5 w-2.5 rounded-full bg-browserDotGreen" />
              </div>
              <div className="flex-1 rounded bg-background/80 px-3 py-1 text-center text-xs text-muted-foreground">
                {browserBarUrl(project.href) || project.subtitle || "preview"}
              </div>
            </div>
            <div className="relative aspect-video w-full bg-muted">
              <Image
                src={project.image}
                alt={project.imageAlt ?? ""}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 80vw"
              />
            </div>
          </div>
        )}

        {isBrowser && !project.image && (
          <div className="relative mt-4 overflow-hidden rounded-lg border border-border bg-card shadow-md">
            <div className="flex h-8 items-center gap-2 border-b border-border bg-muted/50 px-3">
              <div className="flex gap-1.5">
                <div className="h-2.5 w-2.5 rounded-full bg-browserDotRed" />
                <div className="h-2.5 w-2.5 rounded-full bg-browserDotAmber" />
                <div className="h-2.5 w-2.5 rounded-full bg-browserDotGreen" />
              </div>
              <div className="flex-1 rounded bg-background/80 px-3 py-1 text-center text-xs text-muted-foreground">
                {browserBarUrl(project.href) || project.subtitle || "preview"}
              </div>
            </div>
            <div className="aspect-video w-full bg-muted flex items-center justify-center text-sm text-muted-foreground">
              Browser mockup — add image to project
            </div>
          </div>
        )}

        {project.mockupType === "image" && project.image && (
          <div className="relative mt-4 aspect-video w-full overflow-hidden rounded-lg bg-muted">
            <Image
              src={project.image}
              alt={project.imageAlt ?? ""}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 80vw"
            />
          </div>
        )}

        <div className={cn((isPhones || isBrowser || project.mockupType === "image") && "mt-6")}>
          <h3 className="font-display text-xl font-semibold tracking-tight text-foreground md:text-2xl">
            {project.title}
          </h3>
          {(project.subtitle || project.tagline) && (
            <p className="mt-1 text-sm text-muted-foreground md:text-base">
              {project.subtitle ?? project.tagline}
            </p>
          )}
        </div>
      </div>
    </article>
  )

  if (project.href) {
    return (
      <a href={project.href} target="_blank" rel="noopener noreferrer" className="block">
        {card}
      </a>
    )
  }

  return card
}
