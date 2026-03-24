import type { Metadata } from "next"
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
        <PlaybookContent />
      </main>
      <Footer />
    </div>
  )
}
