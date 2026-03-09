"use client"

import dynamic from "next/dynamic"
import { useViewMode } from "@/hooks/use-view-mode"
import { useMediaQuery } from "@/hooks/use-media-query"
import { SiteHeader } from "@/components/portfolio/site-header"
import { Hero } from "@/components/portfolio/hero"
import { ToolIcons } from "@/components/portfolio/tool-icons"
import { WorkSection } from "@/components/portfolio/work-section"
import { WorkExperienceSection } from "@/components/portfolio/work-experience-section"
import { TestimonialsSection } from "@/components/portfolio/testimonials-section"
import { AboutSection } from "@/components/portfolio/about-section"
import { ContactSection } from "@/components/portfolio/contact-section"
import { Footer } from "@/components/portfolio/footer"
import { tools } from "@/lib/portfolio-data"

const MoogPlayground = dynamic(
  () => import("@/components/portfolio/moog-playground").then((m) => ({ default: m.MoogPlayground })),
  { ssr: false, loading: () => null }
)

export function HomeWithViewMode() {
  const [viewMode] = useViewMode()
  const isDesktop = useMediaQuery("(min-width: 1024px)")
  /** Playground only on large desktop; fold/tablet keeps Simple view */
  const isSimple = !isDesktop || viewMode === "Simple"

  return (
    <div className="flex min-h-screen flex-col">
      {isSimple && <SiteHeader />}
      <main id="main" className="flex-1">
        {isSimple ? (
          <>
            <Hero />
            <WorkSection />
            <WorkExperienceSection />
            <TestimonialsSection />
            <AboutSection />
            <ContactSection />
            <ToolIcons tools={tools} />
          </>
        ) : (
          <MoogPlayground />
        )}
      </main>
      {isSimple && <Footer />}
    </div>
  )
}
