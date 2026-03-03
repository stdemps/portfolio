"use client"

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
import { MoogPlayground } from "@/components/portfolio/moog-playground"
import { tools } from "@/lib/portfolio-data"

export function HomeWithViewMode() {
  const [viewMode] = useViewMode()
  const isDesktop = useMediaQuery("(min-width: 768px)")
  /** Playground only on desktop; mobile always gets Simple view */
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
