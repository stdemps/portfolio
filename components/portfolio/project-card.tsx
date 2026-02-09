import Image from "next/image"
import Link from "next/link"
import type { Project } from "@/lib/portfolio-data"
import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"

interface ProjectCardProps {
  project: Project
  className?: string
}

export function ProjectCard({ project, className }: ProjectCardProps) {
  const content = (
    <>
      {project.image && (
        <div className="relative aspect-[4/3] w-full overflow-hidden rounded-lg bg-muted">
          <Image
            src={project.image}
            alt=""
            fill
            className="object-cover transition-transform duration-300 group-hover:scale-[1.02]"
            sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
          />
        </div>
      )}
      <div className="mt-4 flex flex-wrap items-baseline gap-2 md:mt-5">
        <span className="font-display text-lg font-semibold text-foreground md:text-xl">
          {project.title}
        </span>
        {project.year && (
          <span className="text-sm text-muted-foreground">{project.year}</span>
        )}
      </div>
      <p className="mt-1 text-sm text-muted-foreground md:mt-2 md:text-base">
        {project.tagline}
      </p>
      <Badge
        variant="secondary"
        className="mt-3 w-fit font-normal capitalize"
      >
        {project.kind}
      </Badge>
    </>
  )

  const sharedClasses = cn(
    "group block text-left transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 rounded-lg",
    className
  )

  if (project.href) {
    return (
      <Link href={project.href} className={sharedClasses}>
        {content}
      </Link>
    )
  }

  return <div className={sharedClasses}>{content}</div>
}
