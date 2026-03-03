import { Mail, LinkedinIcon } from "lucide-react"
import { site } from "@/lib/portfolio-data"
import { Button } from "@/components/ui/button"
import { ScrollReveal } from "@/components/scroll-reveal"

interface ContactSectionProps {
  /** When true, render as single slide in horizontal carousel (playground mode) */
  carousel?: boolean
  onContactClick?: () => void
}

export function ContactSection({ carousel = false }: ContactSectionProps) {
  const content = (
    <div className="container px-4 py-12 md:px-6 md:py-16 lg:px-8 lg:py-20">
      <ScrollReveal>
          <h2 className="font-display text-2xl font-medium tracking-tight text-foreground md:text-3xl">
            Want to collaborate or chat about design?
          </h2>
          <p className="mt-2 text-sm text-muted-foreground md:text-base">
            I&apos;m always happy to connect — whether it&apos;s about a project, a role, or just swapping ideas.
          </p>
        </ScrollReveal>

        <ScrollReveal delay={80}>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:gap-4 md:mt-10">
            <Button
              variant="default"
              size="lg"
              className="gap-2 px-5 text-base font-medium shadow-md focus-visible:ring-2 focus-visible:ring-offset-2 md:px-6"
              asChild
            >
              <a
                href={`mailto:${site.email}`}
                aria-label="Send an email"
              >
                <Mail className="h-5 w-5 shrink-0" aria-hidden />
                Email
              </a>
            </Button>
            <Button
              variant="outline"
              size="lg"
              className="gap-2 px-5 text-base font-medium focus-visible:ring-2 focus-visible:ring-offset-2 md:px-6"
              asChild
            >
              <a
                href={site.linkedIn}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Connect on LinkedIn (opens in new tab)"
              >
                <LinkedinIcon className="h-5 w-5 shrink-0" aria-hidden />
                LinkedIn
              </a>
            </Button>
          </div>
      </ScrollReveal>
    </div>
  )

  if (carousel) {
    return (
      <section id="contact" className="flex h-full flex-col">
        <div className="moog-screen-bank h-full w-full">
          <div className="moog-screen-bank-content flex flex-1 flex-col justify-center px-4 py-6 md:px-6 md:py-8">
            <div data-moog-bank-item>
              <h2 className="font-synth text-xl font-semibold tracking-tight text-foreground md:text-2xl">
                Want to collaborate or chat about design?
              </h2>
              <p className="mt-2 text-sm text-muted-foreground md:text-base">
                I&apos;m always happy to connect — whether it&apos;s about a project, a role, or just swapping ideas.
              </p>
              <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:gap-4 md:mt-10">
                <Button variant="outline" size="lg" className="moog-cta gap-2 px-5 text-base font-medium md:px-6" asChild>
                  <a href={`mailto:${site.email}`} aria-label="Send an email">
                    <Mail className="h-5 w-5 shrink-0" aria-hidden />
                    Email
                  </a>
                </Button>
                <Button variant="outline" size="lg" className="moog-cta gap-2 px-5 text-base font-medium md:px-6" asChild>
                  <a href={site.linkedIn} target="_blank" rel="noopener noreferrer" aria-label="Connect on LinkedIn (opens in new tab)">
                    <LinkedinIcon className="h-5 w-5 shrink-0" aria-hidden />
                    LinkedIn
                  </a>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>
    )
  }

  return (
    <section id="contact" className="scroll-mt-16 border-t border-border/60 md:scroll-mt-20">
      {content}
    </section>
  )
}
