import { site } from "@/lib/portfolio-data"

export function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className="border-t border-border/60 bg-muted/30">
      <div className="container flex flex-col gap-4 px-4 py-8 md:flex-row md:items-center md:justify-between md:px-6 md:py-10 lg:px-8">
        <p className="font-display text-sm font-medium text-foreground">
          {site.name} {site.emoji}
        </p>
        <p className="text-sm text-muted-foreground">
          © {year} {site.name}
        </p>
        <a
          href="https://nextjs.org"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Built with Next.js (opens in new tab)"
          className="text-sm text-muted-foreground underline decoration-muted-foreground/50 underline-offset-2 hover:text-foreground hover:decoration-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:rounded-sm"
        >
          Built with Next.js
        </a>
      </div>
    </footer>
  )
}
