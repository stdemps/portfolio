"use client"

import * as React from "react"
import { motion, AnimatePresence } from "framer-motion"
import { testimonials } from "@/lib/portfolio-data"
import { SectionLabel } from "./section-label"
import { TestimonialCard } from "./testimonial-card"
import { ScrollReveal } from "@/components/scroll-reveal"
import { cn } from "@/lib/utils"
import { MoogBankSelector } from "./moog-bank-selector"

interface TestimonialsSectionProps {
  /** When true, render as memory bank view (playground mode) */
  carousel?: boolean
  onContactClick?: () => void
}

export function TestimonialsSection({ carousel = false }: TestimonialsSectionProps) {
  const [activeBank, setActiveBank] = React.useState(0)

  if (carousel) {
    const bankItems: React.ReactNode[] = testimonials.map((t, index) => (
      <div key={t.id} data-moog-bank-item className="flex flex-col justify-center gap-4">
        {index === 0 && (
          <SectionLabel number="03" title="Testimonials" playground />
        )}
        <TestimonialCard testimonial={t} className="moog-card h-full rounded-lg" />
      </div>
    ))

    const bankCount = bankItems.length
    const displayBank = bankCount > 0 ? Math.min(activeBank, bankCount - 1) : 0

    return (
      <section id="testimonials" className="flex h-full flex-col">
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
    <section id="testimonials" className="scroll-mt-16 md:scroll-mt-20">
      <div className="container px-4 py-12 md:px-6 md:py-16 lg:px-8 lg:py-20">
        <ScrollReveal>
          <SectionLabel number="03" title="Testimonials" />
        </ScrollReveal>
        {testimonials.length > 0 ? (
          <ul
            className={cn(
              "mt-8 grid list-none gap-4 md:mt-10 md:gap-5 lg:mt-12 lg:gap-6",
              "grid-cols-1 md:grid-cols-2",
              "lg:grid-cols-3 lg:auto-rows-auto"
            )}
          >
            {testimonials.map((t, i) => (
              <ScrollReveal
                asListItem
                key={t.id}
                delay={i * 60}
                className={cn(
                  "min-h-0",
                  t.featured && "md:col-span-2 lg:col-span-2"
                )}
              >
                <TestimonialCard testimonial={t} className="h-full" />
              </ScrollReveal>
            ))}
          </ul>
        ) : (
          <ScrollReveal delay={80}>
            <p className="mt-8 text-sm text-muted-foreground md:mt-10">
              Testimonials coming soon.
            </p>
          </ScrollReveal>
        )}
      </div>
    </section>
  )
}
