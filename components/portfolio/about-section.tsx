import { site } from "@/lib/portfolio-data"

export function AboutSection() {
  return (
    <section id="about" className="scroll-mt-16 border-t border-border/60 bg-muted/20 md:scroll-mt-20">
      <div className="container px-4 py-12 md:px-6 md:py-16 lg:px-8 lg:py-20">
        <h2 className="font-display text-2xl font-semibold tracking-tight text-foreground md:text-3xl">
          About
        </h2>
        <div className="mt-6 max-w-prose md:mt-8">
          <p className="text-sm leading-relaxed text-muted-foreground md:text-base md:leading-relaxed">
            {site.about}
          </p>
        </div>
      </div>
    </section>
  )
}
