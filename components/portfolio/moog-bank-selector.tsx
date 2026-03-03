"use client"

import { motion } from "framer-motion"
import { cn } from "@/lib/utils"
import { playClickSound } from "@/lib/playground-sounds"

interface MoogBankSelectorProps {
  bankCount: number
  activeBank: number
  onSelect: (index: number) => void
  className?: string
}

export function MoogBankSelector({
  bankCount,
  activeBank,
  onSelect,
  className,
}: MoogBankSelectorProps) {
  if (bankCount <= 1) return null

  return (
    <div
      className={cn("flex shrink-0 items-stretch border-t border-black/60", className)}
      role="tablist"
      aria-label="Memory bank selector"
      style={{
        background: "linear-gradient(180deg, #1a1814 0%, #121008 100%)",
        boxShadow: "inset 0 1px 0 rgba(255,255,255,0.04)",
      }}
    >
      {Array.from({ length: bankCount }, (_, i) => {
        const active = activeBank === i
        return (
          <motion.button
            key={i}
            type="button"
            role="tab"
            aria-selected={active}
            aria-label={`Bank ${(i + 1).toString().padStart(2, "0")}`}
            data-active={active}
            whileTap={{ y: 1 }}
            transition={{ duration: 0.06, ease: "easeOut" }}
            onClick={() => {
              if (!active) {
                void playClickSound()
                onSelect(i)
              }
            }}
            className={cn(
              "relative flex flex-1 items-stretch overflow-hidden border-r border-black/50 last:border-r-0",
              "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-moog-amber focus-visible:ring-inset"
            )}
            style={{
              background: active
                ? "linear-gradient(180deg, #252220 0%, #1a1814 100%)"
                : "linear-gradient(180deg, #1c1a17 0%, #131109 100%)",
              borderTop: active ? "1px solid rgba(255,255,255,0.08)" : "1px solid transparent",
              boxShadow: active ? "inset 0 1px 0 rgba(255,255,255,0.05)" : "none",
            }}
          >
            {/* Silkscreen label */}
            <span
              className="font-synth flex flex-1 items-center justify-center px-3 py-2.5 text-[10px] uppercase tracking-widest md:px-4 md:text-xs"
              style={{
                color: active ? "rgba(200,185,154,0.9)" : "rgba(200,185,154,0.35)",
                transition: "color 0.12s ease",
              }}
            >
              BANK {(i + 1).toString().padStart(2, "0")}
            </span>
            {/* LED window — right edge, full height */}
            <div
              style={{
                width: 10,
                flexShrink: 0,
                borderLeft: "1px solid #0d0c0a",
                background: active
                  ? "linear-gradient(180deg, #ff8c20 0%, #e05a00 60%, #c04800 100%)"
                  : "linear-gradient(180deg, #2a1408 0%, #1a0c04 100%)",
                boxShadow: active
                  ? "inset 0 0 4px hsl(var(--moog-amber) / 0.5), 0 0 8px hsl(var(--moog-amber) / 0.6)"
                  : "inset 0 1px 2px rgba(0,0,0,0.6)",
                transition: "background 0.12s ease, box-shadow 0.12s ease",
              }}
            />
          </motion.button>
        )
      })}
    </div>
  )
}
