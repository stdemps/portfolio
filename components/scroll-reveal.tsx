"use client"

import * as React from "react"
import { cn } from "@/lib/utils"

interface ScrollRevealProps {
  children: React.ReactNode
  className?: string
  /** Extra CSS class applied to the wrapper element */
  as?: keyof React.JSX.IntrinsicElements
  /** Stagger delay in ms (applied via CSS custom property) */
  delay?: number
}

/**
 * Lightweight scroll-triggered fade-up reveal.
 *
 * Uses IntersectionObserver (fires once, then unobserves) so there's
 * zero ongoing scroll cost. Animation is pure CSS via `.scroll-reveal`
 * and `.is-visible`. Respects `prefers-reduced-motion` in globals.css.
 */
export function ScrollReveal({
  children,
  className,
  as: Tag = "div",
  delay = 0,
}: ScrollRevealProps) {
  const ref = React.useRef<HTMLDivElement>(null)
  const [visible, setVisible] = React.useState(false)

  React.useEffect(() => {
    const el = ref.current
    if (!el) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true)
          observer.unobserve(el)
        }
      },
      { threshold: 0.15 }
    )

    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  return (
    // @ts-expect-error -- dynamic tag is safe for intrinsic elements
    <Tag
      ref={ref}
      className={cn("scroll-reveal", visible && "is-visible", className)}
      style={delay ? ({ "--reveal-delay": `${delay}ms` } as React.CSSProperties) : undefined}
    >
      {children}
    </Tag>
  )
}
