"use client"

import * as React from "react"
import { useChatState } from "@/hooks/use-chat-state"
import { useMediaQuery } from "@/hooks/use-media-query"
import { AiChat } from "@/components/portfolio/ai-chat"

/**
 * ChatLayout — wraps page content and the AI chat panel in a CSS grid.
 *
 * Fold/tablet (md to <lg) when open: two equal columns ("1fr 1fr") so the UI
 * feels like two side-by-side mobile screens.
 *
 * Large desktop (lg+) when open: two-column grid with fixed chat width
 * ("1fr 400px"), preserving the desktop aside behavior.
 *
 * Mobile (<md): single column. The chat panel renders as a bottom Sheet and
 * does not reserve a hidden grid column.
 */
export function ChatLayout({ children }: { children: React.ReactNode }) {
  const chatState = useChatState()
  const isPanelOpen = chatState.state === "open"
  const isSplitCapable = useMediaQuery("(min-width: 768px)")
  const isLargeDesktop = useMediaQuery("(min-width: 1024px)")

  const gridTemplateColumns = React.useMemo(() => {
    if (!isSplitCapable) return "1fr"
    if (!isPanelOpen) return "1fr 0px"
    return isLargeDesktop ? "1fr 400px" : "1fr 1fr"
  }, [isSplitCapable, isPanelOpen, isLargeDesktop])

  return (
    <div
      className="grid min-h-svh transition-[grid-template-columns] duration-300 ease-[cubic-bezier(0.25,1,0.5,1)] motion-reduce:transition-none md:grid"
      style={{
        gridTemplateColumns,
      }}
    >
      {/* Page content — fills the left column */}
      <div className="min-w-0">{children}</div>

      {/* Chat panel — fills the right column (hidden at 0px, visible at 400px) */}
      <AiChat chatState={chatState} />
    </div>
  )
}
