import Link from "next/link"
import { site } from "@/lib/portfolio-data"
import { Button } from "@/components/ui/button"

export function Hero() {
  return (
    <section className="border-b border-border/60">
      <div className="container px-4 py-12 md:px-6 md:py-16 lg:px-8 lg:py-24">
        <div className="max-w-3xl md:max-w-4xl lg:max-w-5xl xl:max-w-6xl">
          <p className="text-base text-muted-foreground md:text-lg">
            {site.heroGreeting}
          </p>
          <h1 className="mt-4 font-display text-3xl font-medium leading-[1.25] tracking-tight text-foreground sm:text-4xl md:text-5xl lg:text-6xl">
            {"A "}
            <span className="text-heroBlue">product design lead</span>
            {" at "}
            <span className="text-heroBlue">KPMG UK</span>
            {", growing a design team and exploring "}
            <span className="text-heroPink">AI-assisted engineering</span>
            {"."}
          </h1>
          <div className="mt-6 md:mt-8">
            <Button variant="default" size="lg" className="h-11 gap-2 px-6 text-base font-semibold shadow-md focus-visible:ring-2 focus-visible:ring-offset-2 md:h-12 md:px-8" asChild>
              <Link href="#contact">
                Let&apos;s chat →
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}
