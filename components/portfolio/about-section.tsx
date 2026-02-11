import Image from "next/image"
import { aboutImages, aboutQuote } from "@/lib/portfolio-data"
import { SectionLabel } from "./section-label"
import { ScrollReveal } from "@/components/scroll-reveal"
import { cn } from "@/lib/utils"

export function AboutSection() {
  return (
    <section id="about" className="scroll-mt-16 md:scroll-mt-20">
      <div className="container px-4 py-12 md:px-6 md:py-16 lg:px-8 lg:py-20">
        <ScrollReveal>
          <SectionLabel number="04" title="Beyond the pixels" />
          <p className="mt-4 max-w-xl text-sm text-muted-foreground md:mt-5 md:text-base">
            Outside of work, I&apos;m either gigging, playing 5-a-side football, or hanging out with my partner and dog.
          </p>
        </ScrollReveal>

        <ScrollReveal delay={80}>
          <div
            className={cn(
              "mt-8 grid gap-3 md:mt-10 md:gap-4 lg:mt-12",
              "grid-cols-2 md:grid-cols-3 lg:grid-cols-4",
              "auto-rows-[160px] md:auto-rows-[180px] lg:auto-rows-[200px]"
            )}
          >
            {aboutImages.map((img) => (
              <div
                key={img.id}
                className={cn(
                  "relative overflow-hidden rounded-lg bg-muted",
                  img.span === "tall" && "row-span-2",
                  img.span === "full-tall" && "row-span-3",
                  img.span === "wide" && "col-span-2",
                  img.fullWidthMobile && "col-span-2 md:col-span-1"
                )}
              >
                <Image
                  src={img.src}
                  alt={img.alt}
                  fill
                  className="object-cover"
                  sizes={
                    img.span === "wide"
                      ? "(max-width: 768px) 100vw, 50vw"
                      : img.fullWidthMobile
                        ? "(max-width: 768px) 100vw, 25vw"
                        : "(max-width: 768px) 50vw, 25vw"
                  }
                />
              </div>
            ))}
          </div>
        </ScrollReveal>

        {/* Design philosophy quote — separate from bento so "Beyond the pixels" stays focused on lifestyle */}
        <ScrollReveal delay={160}>
          <div
            className={cn(
              "mt-8 rounded-lg border border-border bg-card p-6 md:mt-10 lg:mt-12"
            )}
          >
            <p className="font-display text-base font-medium leading-snug tracking-tight text-foreground md:text-lg">
              &ldquo;{aboutQuote}&rdquo;
            </p>
            <span className="mt-3 block text-xs uppercase tracking-widest text-muted-foreground">
              Design philosophy
            </span>
          </div>
        </ScrollReveal>
      </div>
    </section>
  )
}
