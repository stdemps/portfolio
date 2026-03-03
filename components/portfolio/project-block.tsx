import Image from "next/image"
import type { Project } from "@/lib/portfolio-data"
import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"

interface ProjectBlockProps {
  project: Project
  className?: string
  /** When true, use compact sizing for synth screen / constrained layouts */
  compact?: boolean
}

function browserBarUrl(href?: string): string {
  if (!href) return ""
  try { return new URL(href).hostname.replace(/^www\./, "") } catch { return href }
}

export function ProjectBlock({ project, className, compact = false }: ProjectBlockProps) {
  const isPhones = project.mockupType === "phones"
  const isBrowser = project.mockupType === "browser"

  const mockupHover = project.href
    ? "transition-all duration-200 hover:-translate-y-0.5 hover:shadow-lg"
    : ""

  const card = (
    <article className={cn(className)}>
      {project.comingSoon && (
        <div className={cn("flex justify-end", compact ? "mb-1" : "mb-4 md:mb-5")}>
          <Badge className={cn("bg-comingSoon text-white border-0", compact && "text-[10px] px-1.5 py-0")}>
            Coming Soon
          </Badge>
        </div>
      )}

      {isPhones && (
        <div className={cn("flex justify-center", compact ? "gap-2 py-2" : "gap-4 py-8 md:gap-6 md:py-12")}>
          <div className={cn(
            "relative rounded-[2rem] border-[8px] border-foreground/10 bg-card shadow-xl",
            compact ? "h-[80px] w-[40px] rounded-xl border-[4px]" : "h-[280px] w-[140px] md:h-[320px] md:w-[160px]"
          )}>
            <div className={cn("absolute bg-muted", compact ? "inset-1 rounded-lg" : "inset-2 rounded-[1.25rem]")} />
            <div className={cn("absolute left-1/2 -translate-x-1/2 rounded-full bg-foreground/20", compact ? "top-1 h-2 w-6" : "top-4 h-4 w-16")} />
          </div>
          <div className={cn(
            "relative rounded-[2rem] border-[8px] border-foreground/10 bg-card shadow-xl",
            compact ? "h-[80px] w-[40px] rounded-xl border-[4px]" : "h-[280px] w-[140px] md:h-[320px] md:w-[160px]"
          )}>
            <div className={cn("absolute bg-muted", compact ? "inset-1 rounded-lg" : "inset-2 rounded-[1.25rem]")} />
            <div className={cn("absolute left-1/2 -translate-x-1/2 rounded-full bg-foreground/20", compact ? "top-1 h-2 w-6" : "top-4 h-4 w-16")} />
          </div>
        </div>
      )}

      {isBrowser && project.image && (
        <div
          className={cn(
            "relative overflow-hidden rounded-lg border border-border bg-card shadow-md",
            compact && "rounded-md",
            mockupHover
          )}
        >
          <div className={cn("flex items-center border-b border-border bg-muted/50", compact ? "h-5 px-2" : "h-8 px-3")}>
            <div className={cn("flex-1 truncate rounded bg-background/80 py-1 text-center text-muted-foreground", compact ? "text-[8px] px-1" : "px-3 text-[10px]")}>
              {browserBarUrl(project.href) || project.subtitle || "preview"}
            </div>
          </div>
          <div className={cn("relative w-full bg-muted", compact ? "h-14" : "aspect-video")}>
            <Image
              src={project.image}
              alt={project.imageAlt ?? `${project.title} — project preview`}
              fill
              className="object-cover"
              sizes={compact ? "80px" : "(max-width: 768px) 100vw, 80vw"}
            />
          </div>
        </div>
      )}

      {isBrowser && !project.image && (
        <div
          className={cn(
            "relative overflow-hidden rounded-lg border border-border bg-card shadow-md",
            compact && "rounded-md",
            mockupHover
          )}
        >
          <div className={cn("flex items-center border-b border-border bg-muted/50", compact ? "h-5 px-2" : "h-8 px-3")}>
            <div className={cn("flex-1 truncate rounded bg-background/80 py-1 text-center text-muted-foreground", compact ? "text-[8px] px-1" : "px-3 text-[10px]")}>
              {browserBarUrl(project.href) || project.subtitle || "preview"}
            </div>
          </div>
          <div className={cn("w-full bg-muted flex items-center justify-center text-muted-foreground px-4 text-center", compact ? "h-14 text-[10px]" : "aspect-video text-sm")} aria-hidden>
            No preview image
          </div>
        </div>
      )}

      {project.mockupType === "image" && project.image && (
        <div
          className={cn(
            "relative overflow-hidden rounded-lg bg-muted w-full",
            compact ? "h-14" : "aspect-video",
            mockupHover
          )}
        >
          <Image
            src={project.image}
            alt={project.imageAlt ?? `${project.title} — project preview`}
            fill
            className="object-cover"
            sizes={compact ? "80px" : "(max-width: 768px) 100vw, 80vw"}
          />
        </div>
      )}

      <div className={cn(
        (isPhones || isBrowser || project.mockupType === "image") && (compact ? "mt-2" : "mt-6")
      )}>
        <h3 className={cn(
          "font-display font-medium tracking-tight text-foreground overflow-hidden",
          compact ? "text-xs line-clamp-2" : "text-xl line-clamp-2 md:text-2xl"
        )}>
          {project.title}
        </h3>
        {(project.subtitle || project.tagline) && (
          <p className={cn(
            "text-muted-foreground overflow-hidden",
            compact ? "mt-0.5 text-[10px] line-clamp-2" : "mt-1 text-sm line-clamp-2 md:text-base"
          )}>
            {project.subtitle ?? project.tagline}
          </p>
        )}
      </div>
    </article>
  )

  if (project.href) {
    return (
      <a href={project.href} target="_blank" rel="noopener noreferrer" className="block rounded-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background">
        {card}
      </a>
    )
  }

  return card
}
