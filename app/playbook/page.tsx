import type { Metadata } from "next"
import Link from "next/link"
import { SiteHeader } from "@/components/portfolio/site-header"
import { Footer } from "@/components/portfolio/footer"
import { PlaybookContent } from "@/components/portfolio/playbook-content"

export const metadata: Metadata = {
  title: "AI Prototyping Playbook | Steven Dempster",
  description:
    "A designer's field guide to building real, testable prototypes with Claude Code and AntiGravity.",
}

export default function PlaybookPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <SiteHeader />
      <main id="main" className="flex-1">
        <nav
          aria-label="Breadcrumb"
          className="container px-4 pt-4 md:px-6 md:pt-6 lg:px-8"
        >
          <Link
            href="/"
            className="inline-flex items-center gap-1.5 text-sm text-muted-foreground transition-colors hover:text-foreground"
          >
            <svg
              width="16"
              height="16"
              viewBox="0 0 16 16"
              fill="none"
              className="shrink-0"
              aria-hidden
            >
              <path
                d="M10 12L6 8l4-4"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            Back to portfolio
          </Link>
        </nav>
        <PlaybookContent />
      </main>
      <Footer />
    </div>
  )
}
