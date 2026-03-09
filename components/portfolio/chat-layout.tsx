"use client"

import * as React from "react"
import { useChatState } from "@/hooks/use-chat-state"
import { AiChat } from "@/components/portfolio/ai-chat"

/**
 * ChatLayout — wraps page content and the AI chat panel in a CSS grid.
 *
 * Desktop (md+): two-column grid. The chat panel slides in from the right by
 * transitioning grid-template-columns from "1fr 0px" to "1fr 400px". Content
 * is naturally pushed left — no transform or absolute positioning needed.
 *
 * Mobile (<md): single column. The chat panel renders as a bottom Sheet.
 */
export function ChatLayout({ children }: { children: React.ReactNode }) {
  const chatState = useChatState()
  const isPanelOpen = chatState.state === "open"

  return (
    <div
      className="grid min-h-svh transition-[grid-template-columns] duration-300 ease-[cubic-bezier(0.25,1,0.5,1)] motion-reduce:transition-none md:grid"
      style={{
        gridTemplateColumns: isPanelOpen ? "1fr 400px" : "1fr 0px",
      }}
    >
      {/* Page content — fills the left column */}
      <div className="min-w-0">{children}</div>

      {/* Chat panel — fills the right column (hidden at 0px, visible at 400px) */}
      <AiChat chatState={chatState} />
    </div>
  )
}
