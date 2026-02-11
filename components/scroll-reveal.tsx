"use client"

import * as React from "react"
import { cn } from "@/lib/utils"

interface ScrollRevealProps {
  children: React.ReactNode
  className?: string
  /** Render as <li> instead of <div> (for use inside <ul>/<ol>) */
  asListItem?: boolean
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
  asListItem = false,
  delay = 0,
}: ScrollRevealProps) {
  const ref = React.useRef<HTMLElement>(null)
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

  const sharedProps = {
    ref: ref as React.RefObject<HTMLElement>,
    className: cn("scroll-reveal", visible && "is-visible", className),
    style: delay ? ({ "--reveal-delay": `${delay}ms` } as React.CSSProperties) : undefined,
  }

  if (asListItem) {
    return (
      <li ref={ref as React.RefObject<HTMLLIElement>} className={sharedProps.className} style={sharedProps.style}>
        {children}
      </li>
    )
  }

  return (
    <div ref={ref as React.RefObject<HTMLDivElement>} className={sharedProps.className} style={sharedProps.style}>
      {children}
    </div>
  )
}
