"use client"

import * as React from "react"
import { motion, AnimatePresence, useReducedMotion } from "framer-motion"

const TOUR_DONE_KEY = "moog-tour-done"
const PADDING = 12 // px of glow around the spotlight target

interface TourStep {
  target: string // data-tour attribute value
  title: string
  body: string
  // When spanning two targets (e.g. PREV + NEXT), provide a second target
  target2?: string
}

const STEPS: TourStep[] = [
  {
    target: "screen",
    title: "Patch Display",
    body: "This is your VFD screen. Each patch maps to a section of my portfolio — Hero, Projects, Experience, and more. Use PREV / NEXT to browse.",
  },
  {
    target: "nav",
    target2: "nav-end",
    title: "Patch Navigation",
    body: "PREV and NEXT scroll through portfolio sections — just like stepping through memory banks on a real Moog synthesiser.",
  },
  {
    target: "knobs",
    title: "Controls",
    body: "Drag BRIGHT to adjust screen brightness; REVERB adds depth to the piano. The strip below has oscillators, filter, and octave.",
  },
  {
    target: "keyboard",
    title: "Play the Keys",
    body: "A fully playable two-octave piano. Click the keys or use your keyboard (A–K maps the white keys). Each patch changes the synth voice.",
  },
]

interface SpotlightRect {
  x: number
  y: number
  width: number
  height: number
}

function getRect(selector: string, selector2?: string): SpotlightRect | null {
  const el = document.querySelector(`[data-tour="${selector}"]`)
  if (!el) return null
  const r = el.getBoundingClientRect()

  if (selector2) {
    const el2 = document.querySelector(`[data-tour="${selector2}"]`)
    if (el2) {
      const r2 = el2.getBoundingClientRect()
      const left = Math.min(r.left, r2.left)
      const top = Math.min(r.top, r2.top)
      const right = Math.max(r.right, r2.right)
      const bottom = Math.max(r.bottom, r2.bottom)
      return { x: left, y: top, width: right - left, height: bottom - top }
    }
  }

  return { x: r.left, y: r.top, width: r.width, height: r.height }
}

/** Clip-path string that dims everything except the highlighted rect */
function makeClipPath(rect: SpotlightRect, pad: number): string {
  const { x, y, width, height } = rect
  const l = x - pad
  const t = y - pad
  const r = x + width + pad
  const b = y + height + pad
  // evenodd: outer full-screen rect minus inner window = opaque everywhere except inside
  return `polygon(evenodd, 0 0, 100% 0, 100% 100%, 0 100%, 0 0, ${l}px ${t}px, ${l}px ${b}px, ${r}px ${b}px, ${r}px ${t}px, ${l}px ${t}px)`
}

/** Tooltip positioned above or below the spotlight rect */
function TooltipCard({
  rect,
  step,
  stepIndex,
  total,
  onNext,
  onSkip,
  reducedMotion,
}: {
  rect: SpotlightRect
  step: TourStep
  stepIndex: number
  total: number
  onNext: () => void
  onSkip: () => void
  reducedMotion: boolean | null
}) {
  const tooltipWidth = 280
  const pad = PADDING
  const isLast = stepIndex === total - 1

  // Try to place tooltip below the spotlight; if too low, place above
  const viewH = typeof window !== "undefined" ? window.innerHeight : 600
  const spotBottom = rect.y + rect.height + pad
  const tooltipH = 160 // approximate
  const placeBelow = spotBottom + tooltipH + 16 < viewH

  const top = placeBelow ? spotBottom + 12 : rect.y - pad - tooltipH - 12
  const centerX = rect.x + rect.width / 2
  const winW = typeof window !== "undefined" ? window.innerWidth : 400
  const left = Math.min(
    Math.max(centerX - tooltipWidth / 2, 12),
    winW - tooltipWidth - 12
  )

  const transition = reducedMotion ? { duration: 0 } : { duration: 0.22, ease: "easeOut" as const }
  const initial = reducedMotion ? false : { opacity: 0, y: placeBelow ? -6 : 6 }
  const exit = reducedMotion ? { opacity: 0 } : { opacity: 0, y: placeBelow ? -4 : 4 }

  return (
    <motion.div
      key={stepIndex}
      initial={initial}
      animate={{ opacity: 1, y: 0 }}
      exit={exit}
      transition={transition}
      className="fixed z-[200] font-synth"
      style={{ top, left, width: tooltipWidth }}
    >
      <div
        className="rounded border border-moog-amber/30 bg-black/90 p-4 shadow-[0_8px_32px_rgba(0,0,0,0.8)] backdrop-blur-sm"
        style={{ boxShadow: "0 0 0 1px rgba(200,140,40,0.15), 0 8px 32px rgba(0,0,0,0.8), inset 0 1px 0 rgba(255,255,255,0.04)" }}
      >
        {/* Step counter */}
        <div className="mb-1.5 flex items-center justify-between">
          <span className="text-[9px] tracking-[0.2em] uppercase" style={{ color: "hsl(var(--moog-amber) / 0.5)" }}>
            {stepIndex + 1} / {total}
          </span>
          <button
            type="button"
            onClick={onSkip}
            className="text-[9px] tracking-[0.15em] uppercase transition-colors hover:opacity-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-moog-amber focus-visible:ring-offset-1 focus-visible:ring-offset-black rounded"
            style={{ color: "hsl(var(--moog-silkscreen) / 0.5)" }}
            aria-label="Skip tour"
          >
            Skip
          </button>
        </div>

        {/* Title */}
        <p
          className="mb-1 text-[11px] font-medium tracking-[0.18em] uppercase"
          style={{ color: "hsl(var(--moog-amber-light))", textShadow: "0 0 6px hsl(var(--moog-amber) / 0.4)" }}
        >
          {step.title}
        </p>

        {/* Body */}
        <p className="mb-3 text-[10px] leading-relaxed tracking-wide" style={{ color: "hsl(var(--moog-silkscreen) / 0.75)" }}>
          {step.body}
        </p>

        {/* CTA */}
        <button
          type="button"
          onClick={onNext}
          className="w-full rounded py-1.5 text-[10px] tracking-[0.2em] uppercase transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-moog-amber"
          style={{
            background: "linear-gradient(180deg, hsl(var(--moog-amber) / 0.9) 0%, hsl(var(--moog-amber) / 0.7) 100%)",
            color: "#0a0600",
            fontWeight: 600,
            boxShadow: "0 0 8px hsl(var(--moog-amber) / 0.3)",
          }}
        >
          {isLast ? "Let's play →" : "Next →"}
        </button>
      </div>

      {/* Connector arrow toward spotlight */}
      <div
        className="absolute left-1/2 -translate-x-1/2 w-0 h-0"
        style={
          placeBelow
            ? { top: -6, borderLeft: "6px solid transparent", borderRight: "6px solid transparent", borderBottom: "6px solid rgba(200,140,40,0.3)" }
            : { bottom: -6, borderLeft: "6px solid transparent", borderRight: "6px solid transparent", borderTop: "6px solid rgba(200,140,40,0.3)" }
        }
      />
    </motion.div>
  )
}

export function SynthTour() {
  const reducedMotion = useReducedMotion()
  const [phase, setPhase] = React.useState<"prompt" | "touring" | "done">("done")
  const [stepIndex, setStepIndex] = React.useState(0)
  const [spotRect, setSpotRect] = React.useState<SpotlightRect | null>(null)

  // On mount: check localStorage — if tour not done, show prompt after a short delay
  React.useEffect(() => {
    try {
      if (window.localStorage.getItem(TOUR_DONE_KEY) === "1") return
    } catch { /* ignore */ }
    // Delay so the welcome message plays first
    const t = setTimeout(() => setPhase("prompt"), 4800)
    return () => clearTimeout(t)
  }, [])

  // Measure spotlight target whenever step changes
  React.useEffect(() => {
    if (phase !== "touring") return
    const step = STEPS[stepIndex]

    const measure = () => {
      const rect = getRect(step.target, step.target2)
      if (rect) setSpotRect(rect)
    }

    measure()
    // Re-measure after short delay to catch layout settling
    const t = setTimeout(measure, 80)

    const handleResize = () => measure()
    window.addEventListener("resize", handleResize)
    return () => {
      clearTimeout(t)
      window.removeEventListener("resize", handleResize)
    }
  }, [phase, stepIndex])

  const startTour = () => {
    setStepIndex(0)
    setPhase("touring")
  }

  const completeTour = () => {
    setPhase("done")
    try { window.localStorage.setItem(TOUR_DONE_KEY, "1") } catch { /* ignore */ }
  }

  const handleNext = () => {
    if (stepIndex < STEPS.length - 1) {
      setStepIndex((i) => i + 1)
    } else {
      completeTour()
    }
  }

  const handleSkip = () => completeTour()

  return (
    <>
      {/* Start Tour prompt */}
      <AnimatePresence>
        {phase === "prompt" && (
          <motion.div
            key="tour-prompt"
            initial={reducedMotion ? false : { opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={reducedMotion ? { opacity: 0 } : { opacity: 0, y: -4 }}
            transition={reducedMotion ? { duration: 0 } : { duration: 0.4, ease: "easeOut" }}
            className="fixed bottom-[32vh] left-1/2 z-[150] -translate-x-1/2 font-synth"
          >
            <div className="flex items-center gap-3 rounded border border-moog-amber/25 bg-black/80 px-4 py-2.5 shadow-[0_4px_24px_rgba(0,0,0,0.7)] backdrop-blur-sm">
              <span className="text-[10px] tracking-[0.15em] uppercase" style={{ color: "hsl(var(--moog-silkscreen) / 0.75)" }}>
                New to the playground?
              </span>
              <button
                type="button"
                onClick={startTour}
                className="rounded px-2.5 py-1 text-[10px] tracking-[0.18em] uppercase transition-all hover:brightness-110 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-moog-amber"
                style={{
                  background: "linear-gradient(180deg, hsl(var(--moog-amber) / 0.9) 0%, hsl(var(--moog-amber) / 0.7) 100%)",
                  color: "#0a0600",
                  fontWeight: 600,
                  boxShadow: "0 0 8px hsl(var(--moog-amber) / 0.3)",
                }}
                aria-label="Start guided tour"
              >
                Start Tour
              </button>
              <button
                type="button"
                onClick={handleSkip}
                className="text-[9px] tracking-[0.15em] uppercase transition-opacity hover:opacity-60 focus-visible:outline-none rounded"
                style={{ color: "hsl(var(--moog-silkscreen) / 0.4)" }}
                aria-label="Dismiss tour prompt"
              >
                ✕
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Tour overlay */}
      <AnimatePresence>
        {phase === "touring" && spotRect && (
          <>
            {/* Dim overlay with spotlight cutout */}
            <motion.div
              key={`overlay-${stepIndex}`}
              initial={{ opacity: reducedMotion ? 1 : 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: reducedMotion ? 0 : 0.3 }}
              className="fixed inset-0 z-[190] pointer-events-none"
              style={{
                background: "rgba(0,0,0,0.72)",
                clipPath: makeClipPath(spotRect, PADDING),
              }}
              aria-hidden
            />

            {/* Spotlight glow ring */}
            <motion.div
              key={`glow-${stepIndex}`}
              initial={{ opacity: reducedMotion ? 1 : 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: reducedMotion ? 0 : 0.25, delay: reducedMotion ? 0 : 0.1 }}
              className="fixed z-[191] pointer-events-none rounded"
              style={{
                left: spotRect.x - PADDING,
                top: spotRect.y - PADDING,
                width: spotRect.width + PADDING * 2,
                height: spotRect.height + PADDING * 2,
                boxShadow: "0 0 0 2px hsl(var(--moog-amber) / 0.5), 0 0 24px hsl(var(--moog-amber) / 0.2)",
              }}
              aria-hidden
            />

            {/* Tooltip card — pointer-events on so buttons work */}
            <div className="fixed inset-0 z-[200] pointer-events-none">
              <div className="pointer-events-auto">
                <AnimatePresence mode="wait">
                  <TooltipCard
                    key={stepIndex}
                    rect={spotRect}
                    step={STEPS[stepIndex]}
                    stepIndex={stepIndex}
                    total={STEPS.length}
                    onNext={handleNext}
                    onSkip={handleSkip}
                    reducedMotion={!!reducedMotion}
                  />
                </AnimatePresence>
              </div>
            </div>
          </>
        )}
      </AnimatePresence>
    </>
  )
}
