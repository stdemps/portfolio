import { SiteHeader } from "@/components/portfolio/site-header"
import { Hero } from "@/components/portfolio/hero"
import { ToolIcons } from "@/components/portfolio/tool-icons"
import { ExploringSection } from "@/components/portfolio/exploring-section"
import { WorkSection } from "@/components/portfolio/work-section"
import { WorkExperienceSection } from "@/components/portfolio/work-experience-section"
import { TestimonialsSection } from "@/components/portfolio/testimonials-section"
import { ContactSection } from "@/components/portfolio/contact-section"
import { Footer } from "@/components/portfolio/footer"
import { tools } from "@/lib/portfolio-data"

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col">
      <SiteHeader />
      <main id="main" className="flex-1">
        <Hero />
        <ToolIcons tools={tools} />
        <ExploringSection />
        <WorkSection />
        <WorkExperienceSection />
        <TestimonialsSection />
        <ContactSection />
      </main>
      <Footer />
    </div>
  )
}
