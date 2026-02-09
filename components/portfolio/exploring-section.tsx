import { templateRepos } from "@/lib/portfolio-data"
import { ExternalLink } from "lucide-react"

export function ExploringSection() {
  return (
    <section className="border-b border-border/60">
      <div className="container px-4 py-8 md:px-6 md:py-10 lg:px-8 lg:py-12">
        <h2 className="font-display text-2xl font-medium tracking-tight text-foreground md:text-3xl">
          Exploring AI-assisted engineering
        </h2>
        <p className="mt-2 max-w-2xl text-sm text-muted-foreground md:text-base">
          I&apos;m exploring vibe coding and building reusable starters in Cursor. Here are a couple of template repos I maintain.
        </p>
        <ul className="mt-6 flex list-none flex-col gap-3 sm:flex-row sm:gap-4">
          {templateRepos.map((repo) => (
            <li key={repo.name}>
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
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
