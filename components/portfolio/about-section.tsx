"use client"

import * as React from "react"
import Image from "next/image"
import { motion, AnimatePresence } from "framer-motion"
import { aboutImages, aboutQuote } from "@/lib/portfolio-data"
import { SectionLabel } from "./section-label"
import { ScrollReveal } from "@/components/scroll-reveal"
import { cn } from "@/lib/utils"
import { MoogBankSelector } from "./moog-bank-selector"

interface AboutSectionProps {
  /** When true, render as memory bank view (playground mode) */
  carousel?: boolean
  onContactClick?: () => void
}

/**
 * Named grid areas for lg — gives full control over the 3-column layout,
 * overriding auto-placement and all span classes at once.
 *
 * Pattern: portrait (1 col) left + landscape (2 cols) right, ×3 row pairs.
 */
const lgAreaMap: Record<string, string> = {
  "live-bass":   "lg:[grid-area:bass]",
  "studio":      "lg:[grid-area:studio]",
  "cory":        "lg:[grid-area:cory]",
  "five-a-side": "lg:[grid-area:five]",
  "reggie":      "lg:[grid-area:reggie]",
  "oran-mor":    "lg:[grid-area:oran]",
}

export function AboutSection({ carousel = false }: AboutSectionProps) {
  const [activeBank, setActiveBank] = React.useState(0)

  if (carousel) {
    const bentoImages = aboutImages.slice(0, 4)

    const bankItems: React.ReactNode[] = [
      <div
        key="intro"
        data-moog-bank-item
        className="about-bento-grid grid h-full w-full gap-4"
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(4, 1fr)",
          gridTemplateRows: "repeat(2, 1fr)",
        }}
      >
        {/* Hero text tile — spans 2×2 */}
        <div className="moog-card flex flex-col justify-center rounded-md p-8">
          <SectionLabel number="04" title="Beyond the pixels" playground />
          <p className="mt-4 max-w-sm text-sm text-muted-foreground">
            Outside of work, I&apos;m either gigging, playing 5-a-side football, or hanging out with my partner and dog.
          </p>
        </div>

        {/* Image tiles — only render when content exists */}
        {bentoImages.map((img) => (
          <div key={img.id} className="moog-card group relative h-full w-full overflow-hidden rounded-md">
            <Image
              src={img.src}
              alt={img.alt}
              fill
              className="object-cover object-center transition-[filter] duration-200 grayscale-[0.2] contrast-[1.2] group-hover:grayscale-0 group-hover:contrast-100"
              sizes="(max-width: 768px) 25vw, 15vw"
            />
          </div>
        ))}
      </div>,
      <div key="quote" data-moog-bank-item className="flex flex-col justify-center">
        <div className="moog-card rounded-lg bg-card p-6">
          <p className="font-synth text-sm font-medium leading-snug tracking-tight text-foreground md:text-base">
            &ldquo;{aboutQuote}&rdquo;
          </p>
          <span className="mt-3 block text-xs uppercase tracking-widest text-moog-amber/60">
            Design philosophy
          </span>
        </div>
      </div>,
    ]

    const bankCount = bankItems.length
    const displayBank = bankCount > 0 ? Math.min(activeBank, bankCount - 1) : 0

    return (
      <section id="about" className="flex h-full flex-col">
        <div className="moog-screen-bank h-full w-full">
          <div className="moog-screen-bank-content flex flex-1 flex-col px-4 py-5 md:px-6 md:py-6">
            <AnimatePresence mode="wait">
              <motion.div
                key={displayBank}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.15 }}
                className="flex min-h-0 flex-1 flex-col justify-center"
              >
                {bankItems[displayBank]}
              </motion.div>
            </AnimatePresence>
          </div>
          <MoogBankSelector
            bankCount={bankCount}
            activeBank={displayBank}
            onSelect={setActiveBank}
          />
        </div>
      </section>
    )
  }

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
              "grid-cols-2 md:grid-cols-3",
              "auto-rows-[160px] md:auto-rows-[180px] lg:auto-rows-[220px]",
              "lg:[grid-template-areas:'bass_studio_studio'_'bass_studio_studio'_'cory_five_five'_'cory_five_five'_'reggie_oran_oran'_'reggie_oran_oran']"
            )}
          >
            {aboutImages.map((img) => (
              <div
                key={img.id}
                className={cn(
                  "relative overflow-hidden rounded-lg bg-muted",
                  img.span === "tall" && "row-span-2",
                  img.span === "full-tall" && "row-span-3",
                  img.span === "wide" && "col-span-2 row-span-2",
                  img.fullWidthMobile && "col-span-2 md:col-span-1",
                  lgAreaMap[img.id]
                )}
              >
                <Image
                  src={img.src}
                  alt={img.alt}
                  fill
                  className="object-cover"
                  sizes={
                    img.span === "wide"
                      ? "(max-width: 768px) 100vw, 66vw"
                      : img.fullWidthMobile
                        ? "(max-width: 768px) 100vw, 33vw"
                        : "(max-width: 768px) 50vw, 33vw"
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
