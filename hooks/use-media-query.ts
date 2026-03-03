"use client"

import { useEffect, useState } from "react"

/**
 * Returns true when the viewport matches the given media query.
 * Matches Tailwind md breakpoint: (min-width: 768px) = desktop.
 */
export function useMediaQuery(query: string): boolean {
  const [matches, setMatches] = useState(false)

  useEffect(() => {
    const mql = window.matchMedia(query)
    setMatches(mql.matches)
    const handler = (e: MediaQueryListEvent) => setMatches(e.matches)
    mql.addEventListener("change", handler)
    return () => mql.removeEventListener("change", handler)
  }, [query])

  return matches
}
