"use client"

import * as React from "react"
import { motion, AnimatePresence } from "framer-motion"
import { useTheme } from "next-themes"
import { useViewMode } from "@/hooks/use-view-mode"
import { playKeyNote, playClickSound, PIANO_NOTES } from "@/lib/playground-sounds"
import { Hero } from "@/components/portfolio/hero"
import { WorkSection } from "@/components/portfolio/work-section"
import { WorkExperienceSection } from "@/components/portfolio/work-experience-section"
import { TestimonialsSection } from "@/components/portfolio/testimonials-section"
import { AboutSection } from "@/components/portfolio/about-section"
import { ContactSection } from "@/components/portfolio/contact-section"
import { cn } from "@/lib/utils"

const KEYBOARD_SEEN_KEY = "moog-keyboard-seen"

/** Patches match the portfolio section order: Hero → Work → Experience → Testimonials → About → Contact */
const PATCHES = [
  { id: "hero", label: "HERO", tone: "BASS LEAD", content: Hero, carousel: true },
  { id: "projects", label: "PROJECTS", tone: "PROG LEAD", content: WorkSection, carousel: true },
  { id: "experience", label: "EXPERIENCE", tone: "SUB BASS", content: WorkExperienceSection, carousel: true },
  { id: "testimonials", label: "TESTIMONIALS", tone: "WARM PAD", content: TestimonialsSection, carousel: true },
  { id: "about", label: "ABOUT", tone: "WARM PAD", content: AboutSection, carousel: true },
  { id: "contact", label: "CONTACT", tone: "SCI-FI ARP", content: ContactSection, carousel: true },
] as const

/* Screw head SVG */
function ScrewHead({ className }: { className?: string }) {
  const id = React.useId().replace(/:/g, "-")
  return (
    <div
      className={cn("absolute z-20", className)}
      aria-hidden
    >
      <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
        <defs>
          <linearGradient id={id} x1="0" y1="0" x2="14" y2="14">
            <stop offset="0%" stopColor="#4a4540" />
            <stop offset="50%" stopColor="#2a2520" />
            <stop offset="100%" stopColor="#3a3530" />
          </linearGradient>
        </defs>
        <circle cx="7" cy="7" r="6" fill={`url(#${id})`} stroke="#2a2520" strokeWidth="0.5" />
        <line x1="7" y1="2" x2="7" y2="12" stroke="#1a1714" strokeWidth="0.8" />
        <line x1="2" y1="7" x2="12" y2="7" stroke="#1a1714" strokeWidth="0.8" />
      </svg>
    </div>
  )
}

/* Moog LED button — flat black cap, silkscreen label left, amber LED window right */
function MoogLEDButton({
  label,
  onClick,
  "aria-label": ariaLabel,
}: {
  label: string
  onClick: () => void
  "aria-label"?: string
}) {
  const [lit, setLit] = React.useState(false)

  const handleClick = () => {
    setLit(true)
    setTimeout(() => setLit(false), 180)
    onClick()
  }

  return (
    <motion.button
      type="button"
      onClick={handleClick}
      aria-label={ariaLabel}
      whileTap={{ y: 2 }}
      transition={{ duration: 0.06, ease: "easeOut" }}
      className="flex min-h-[44px] min-w-[44px] flex-row items-center justify-center focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-moog-amber focus-visible:ring-offset-1 focus-visible:ring-offset-[#1a1814]"
      style={{
        width: 52,
        height: 22,
        background: "linear-gradient(180deg, #2e2b28 0%, #1c1a17 50%, #141210 100%)",
        border: "1px solid #0d0c0a",
        borderTop: "1px solid rgba(255,255,255,0.1)",
        borderRadius: 2,
        boxShadow: "0 3px 6px rgba(0,0,0,0.7), inset 0 1px 0 rgba(255,255,255,0.06)",
        gap: 0,
        overflow: "hidden",
      }}
    >
      {/* Silkscreen label */}
      <span
        className="font-synth flex-1 text-center text-[7px] uppercase tracking-widest leading-none select-none"
        style={{ color: "hsl(var(--moog-silkscreen) / 0.7)", paddingLeft: 4 }}
      >
        {label}
      </span>
      {/* LED window — amber glow when lit */}
      <div
        style={{
          width: 14,
          height: "100%",
          flexShrink: 0,
          borderLeft: "1px solid #0d0c0a",
          background: lit
            ? "linear-gradient(180deg, #ff8c20 0%, #e05a00 60%, #c04800 100%)"
            : "linear-gradient(180deg, #3a1a08 0%, #241008 100%)",
          boxShadow: lit ? "inset 0 0 4px hsl(var(--moog-amber) / 0.6), 0 0 6px hsl(var(--moog-amber) / 0.8)" : "inset 0 1px 2px rgba(0,0,0,0.5)",
          transition: "background 0.06s ease, box-shadow 0.06s ease",
        }}
      />
    </motion.button>
  )
}

/* Moog-style rocker toggle — snaps between two positions like hardware */
function RockerToggle({
  topLabel,
  bottomLabel,
  isTop,
  onClick,
  "aria-label": ariaLabel,
}: {
  topLabel: string
  bottomLabel: string
  isTop: boolean
  onClick: () => void
  "aria-label"?: string
}) {
  return (
    <div className="flex flex-col items-center gap-0.5">
      <span
        className="font-synth text-[7px] uppercase tracking-widest transition-colors duration-150"
            style={{ color: isTop ? "hsl(var(--moog-silkscreen))" : "hsl(var(--moog-silkscreen) / 0.3)" }}
      >
        {topLabel}
      </span>
      <motion.button
        type="button"
        onClick={onClick}
        aria-label={ariaLabel}
        aria-pressed={isTop}
        className="relative flex min-h-[44px] min-w-[44px] w-11 cursor-pointer flex-col overflow-hidden rounded-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-moog-amber focus-visible:ring-offset-1 focus-visible:ring-offset-[#1e1c1a]"
        style={{
          height: 36,
          background: "linear-gradient(to right, #1a1814, #252220, #1a1814)",
          border: "1px solid #111",
          boxShadow: "inset 0 0 4px rgba(0,0,0,0.8), 0 2px 6px rgba(0,0,0,0.6)",
        }}
      >
        {/* The rocker cap — snaps up or down */}
        <motion.div
          animate={{ y: isTop ? 0 : 18 }}
          transition={{ duration: 0.08, ease: "easeOut" }}
          className="absolute left-0 right-0"
          style={{ height: 18 }}
        >
          <div
            style={{
              height: "100%",
              background: "linear-gradient(180deg, #4a4540 0%, #2e2a26 60%, #252220 100%)",
              borderBottom: "1px solid #111",
              borderTop: "1px solid rgba(255,255,255,0.12)",
              boxShadow: "inset 0 1px 0 rgba(255,255,255,0.08)",
            }}
          />
        </motion.div>
        {/* Amber LED pip — glows near the active label */}
        <div
          className={`absolute ${isTop ? "top-1" : "bottom-1"} left-1/2 -translate-x-1/2 h-1.5 w-1.5 rounded-full transition-all duration-150`}
            style={{
              background: isTop ? "hsl(var(--moog-amber))" : "#2a1a0a",
              boxShadow: isTop ? "0 0 4px hsl(var(--moog-amber)), 0 0 8px hsl(var(--moog-amber) / 0.5)" : "none",
            }}
        />
      </motion.button>
      <span
        className="font-synth text-[7px] uppercase tracking-widest transition-colors duration-150"
        style={{ color: !isTop ? "hsl(var(--moog-silkscreen))" : "hsl(var(--moog-silkscreen) / 0.3)" }}
      >
        {bottomLabel}
      </span>
    </div>
  )
}

/* White keys: C,D,E,F,G,A,B x2 octaves — flex: 1 for even distribution */
const WHITE_KEYS = [0, 2, 4, 5, 7, 9, 11, 12, 14, 16, 17, 19, 21, 23]
/* Black keys: C#, D#, F#, G#, A# x2 — positioned over seams, width calc(100%/24) */
const BLACK_KEY_POSITIONS: { idx: number; leftPercent: number }[] = [
  { idx: 1, leftPercent: (1 / 14) * 100 - (100 / 24) / 2 },   // C# between 1st/2nd
  { idx: 3, leftPercent: (2 / 14) * 100 - (100 / 24) / 2 },   // D# between 2nd/3rd
  { idx: 6, leftPercent: (4 / 14) * 100 - (100 / 24) / 2 },   // F# between 4th/5th
  { idx: 8, leftPercent: (5 / 14) * 100 - (100 / 24) / 2 },   // G# between 5th/6th
  { idx: 10, leftPercent: (6 / 14) * 100 - (100 / 24) / 2 },  // A# between 6th/7th
  { idx: 13, leftPercent: (8 / 14) * 100 - (100 / 24) / 2 },  // C# octave 2
  { idx: 15, leftPercent: (9 / 14) * 100 - (100 / 24) / 2 },  // D#
  { idx: 18, leftPercent: (11 / 14) * 100 - (100 / 24) / 2 }, // F#
  { idx: 20, leftPercent: (12 / 14) * 100 - (100 / 24) / 2 }, // G#
  { idx: 22, leftPercent: (13 / 14) * 100 - (100 / 24) / 2 }, // A#
]

export function MoogPlayground() {
  const [, setViewMode] = useViewMode()
  const { setTheme } = useTheme()
  const [patchIndex, setPatchIndex] = React.useState(0)
  const screenContentRef = React.useRef<HTMLDivElement>(null)

  React.useEffect(() => {
    setTheme("dark")
  }, [setTheme])
  const [crtKey, setCrtKey] = React.useState(0)
  const [brightness, setBrightness] = React.useState(0.75)
  const [reverb, setReverb] = React.useState(0.2)
  const [showWelcome, setShowWelcome] = React.useState(true)
  const [activeNoteLabel, setActiveNoteLabel] = React.useState<string | null>(null)
  const [activeKeys, setActiveKeys] = React.useState<Set<number>>(new Set())
  const [keyboardSeen, setKeyboardSeen] = React.useState(false)
  const [keyboardHintVisible, setKeyboardHintVisible] = React.useState(false)
  const releaseFns = React.useRef<Map<number, () => void>>(new Map())
  const activeKeysRef = React.useRef(activeKeys)
  activeKeysRef.current = activeKeys

  // Check localStorage for keyboard-seen flag
  React.useEffect(() => {
    try {
      const seen = window.localStorage.getItem(KEYBOARD_SEEN_KEY) === "1"
      setKeyboardSeen(seen)
      if (!seen) {
        // Show hint after 1s on first visit
        const t = setTimeout(() => setKeyboardHintVisible(true), 1000)
        return () => clearTimeout(t)
      }
    } catch {
      // ignore
    }
  }, [])

  const dismissKeyboardHint = React.useCallback(() => {
    setKeyboardHintVisible(false)
    setKeyboardSeen(true)
    try { window.localStorage.setItem(KEYBOARD_SEEN_KEY, "1") } catch { /* ignore */ }
  }, [])

  const patch = PATCHES[patchIndex]
  const PatchContent = patch.content
  const carousel = patch.carousel ?? false

  const handleContactClick = React.useCallback(() => {
    void playClickSound()
    setPatchIndex(PATCHES.findIndex((p) => p.id === "contact"))
    setCrtKey((k) => k + 1)
  }, [])

  const handlePrevPatch = () => {
    void playClickSound()
    setPatchIndex((i) => (i - 1 + PATCHES.length) % PATCHES.length)
    setCrtKey((k) => k + 1)
  }

  const handleNextPatch = () => {
    void playClickSound()
    setPatchIndex((i) => (i + 1) % PATCHES.length)
    setCrtKey((k) => k + 1)
  }

  const handleDotClick = (i: number) => {
    if (i === patchIndex) return
    void playClickSound()
    setPatchIndex(i)
    setCrtKey((k) => k + 1)
  }


  const handleExitPlayground = () => {
    setViewMode("Simple")
  }

  const handleKeyDown = React.useCallback(async (idx: number) => {
    if (activeKeysRef.current.has(idx)) return
    setActiveKeys((s) => new Set(s).add(idx))
    setActiveNoteLabel(PIANO_NOTES[idx])
    dismissKeyboardHint()
    const release = await playKeyNote(PIANO_NOTES[idx], patchIndex)
    releaseFns.current.set(idx, release)
  }, [patchIndex, dismissKeyboardHint])

  const handleKeyUp = React.useCallback((idx: number) => {
    const release = releaseFns.current.get(idx)
    if (release) {
      release()
      releaseFns.current.delete(idx)
    }
    setActiveKeys((s) => {
      const next = new Set(s)
      next.delete(idx)
      if (next.size === 0) setActiveNoteLabel(null)
      return next
    })
  }, [])


  return (
    <motion.div
      className="moog-playground-fullscreen fixed inset-0 flex flex-col overflow-hidden"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
    >
      {/* Main faceplate — full width, no top nav */}
      <div className="moog-wood flex flex-1 flex-col min-h-0 p-2 md:p-3">
        <div className="relative flex flex-1 min-h-0 rounded-lg border border-stone-800/60 bg-stone-900/30 p-2 md:p-3">
          <ScrewHead className="left-2 top-2" />
          <ScrewHead className="right-2 top-2" />
          <ScrewHead className="bottom-2 left-2" />
          <ScrewHead className="bottom-2 right-2" />
          <div className="moog-faceplate flex flex-1 flex-col overflow-hidden rounded-md">
            {/* Central control row: LCD + Nav + Knobs + Exit */}
            <div className="relative flex shrink-0 flex-nowrap items-end justify-center gap-4 md:gap-6 border-b border-stone-700/60 px-4 py-3 md:px-6 md:py-4 overflow-x-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
              {/* Exit toggle — bottom-left of panel, Moog-style rocker */}
              <div className="absolute left-3 bottom-3 md:bottom-4">
                <RockerToggle
                  topLabel="PLAY"
                  bottomLabel="SIMPLE"
                  isTop={true}
                  onClick={handleExitPlayground}
                  aria-label="Exit to Simple view"
                />
              </div>
              <div className="flex flex-col items-center gap-0.5">
                <MoogLEDButton onClick={handlePrevPatch} label="PREV" aria-label="Previous patch" />
              </div>
              <div className="flex flex-col items-center gap-1">
                <div
                  className="relative flex w-[340px] flex-col items-center justify-center overflow-hidden rounded border border-black/80 px-4 pb-2 pt-1.5 md:w-[380px] md:px-6"
                  style={{
                    boxShadow: "inset 0px 3px 8px rgba(0,0,0,1), 0px 1px 0px rgba(255,255,255,0.08)",
                    backgroundImage: `repeating-linear-gradient(0deg, transparent 0px, transparent 2px, rgba(0,0,0,0.08) 2px, rgba(0,0,0,0.08) 3px)`,
                    backgroundColor: "#0a0806",
                  }}
                >
                  <div className="absolute inset-0 overflow-hidden rounded opacity-[0.06] pointer-events-none">
                    <div className="moog-scanlines h-full w-full" />
                  </div>
                  <div
                    className="absolute inset-0 overflow-hidden rounded pointer-events-none"
                    style={{ background: "linear-gradient(115deg, transparent 40%, rgba(255,255,255,0.04) 50%, transparent 60%)" }}
                  />
                  {/* Header label */}
                  <span
                    className="font-synth relative z-10 text-[8px] tracking-[0.25em] md:text-[9px]"
                    style={{ color: "hsl(var(--moog-silkscreen) / 0.5)", textShadow: "0 0 4px hsl(var(--moog-amber) / 0.15)" }}
                  >
                    SD PORTFOLIO // PLAYGROUND
                  </span>
                  {/* First-visit welcome — always reserves space, fades in/out via opacity */}
                  <motion.span
                    className="font-synth relative z-10 text-[7px] tracking-[0.15em] md:text-[8px] pointer-events-none"
                    animate={{ opacity: showWelcome ? 1 : 0 }}
                    initial={{ opacity: 0 }}
                    transition={{ delay: showWelcome ? 0.5 : 0, duration: 0.4 }}
                    onAnimationComplete={() => {
                      if (showWelcome) setTimeout(() => setShowWelcome(false), 3500)
                    }}
                    style={{ color: "hsl(var(--moog-silkscreen) / 0.5)", textShadow: "0 0 4px hsl(var(--moog-amber) / 0.15)" }}
                  >
                    &larr; BROWSE MY WORK &rarr; PLAY THE KEYS
                  </motion.span>
                  {/* Patch name row — amber VFD glow */}
                  <span
                    className="font-synth relative z-10 flex items-center gap-1.5 text-lg tracking-[0.2em] md:text-xl whitespace-nowrap text-moog-amber-light"
                    style={{ textShadow: "0 0 8px hsl(var(--moog-amber)), 0 0 20px hsl(var(--moog-amber) / 0.4)" }}
                  >
                    PATCH {(patchIndex + 1).toString().padStart(2, "0")}: {patch.label}
                    <motion.span
                      className="inline-block w-[2px] text-transparent select-none bg-moog-amber-light"
                      style={{ height: "0.75em", verticalAlign: "-0.05em", boxShadow: "0 0 6px hsl(var(--moog-amber))" }}
                      animate={{ opacity: [1, 1, 0, 0] }}
                      transition={{ duration: 1.1, repeat: Infinity, times: [0, 0.45, 0.5, 0.95] }}
                    >
                      _
                    </motion.span>
                  </span>
                  {/* Patch tone descriptor */}
                  <span
                    className="font-synth relative z-10 text-[7px] tracking-[0.2em] text-moog-amber-light/45 md:text-[8px]"
                    style={{ textShadow: "0 0 4px hsl(var(--moog-amber) / 0.15)" }}
                  >
                    {patch.tone}
                  </span>
                </div>
                {/* Patch position dots — amber LEDs */}
                <div className="flex items-center gap-1.5" role="tablist" aria-label="Select patch">
                  {PATCHES.map((p, i) => (
                    <button
                      key={i}
                      type="button"
                      role="tab"
                      aria-selected={i === patchIndex}
                      aria-label={`Go to ${p.label}`}
                      onClick={() => handleDotClick(i)}
                      className="flex h-6 w-6 min-h-[44px] min-w-[44px] items-center justify-center focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-moog-amber/60 rounded-full"
                    >
                      <div
                        className="rounded-full transition-all duration-200"
                        style={{
                          width: i === patchIndex ? 7 : 5,
                          height: i === patchIndex ? 7 : 5,
                          background: i === patchIndex ? "hsl(var(--moog-amber))" : "hsl(var(--moog-amber) / 0.18)",
                          boxShadow: i === patchIndex ? "0 0 5px hsl(var(--moog-amber)), 0 0 10px hsl(var(--moog-amber) / 0.4)" : "none",
                        }}
                      />
                    </button>
                  ))}
                </div>
              </div>
              <div className="flex flex-col items-center gap-0.5">
                <MoogLEDButton onClick={handleNextPatch} label="NEXT" aria-label="Next patch" />
              </div>

              <div className="flex gap-4 md:gap-5">
                <ControlKnob label="BRIGHT" value={brightness} onChange={setBrightness} />
                <ControlKnob label="REVERB" value={reverb} onChange={setReverb} />
              </div>
            </div>

            {/* Main content — backlit projection / embedded screen in faceplate */}
            <div
              ref={screenContentRef}
              className="relative flex-1 min-h-0 overflow-hidden rounded-b"
              style={{
                boxShadow: "inset 0 8px 32px rgba(0,0,0,0.7), inset 0 0 0 1px rgba(0,0,0,0.5)",
              }}
            >
              <AnimatePresence mode="wait">
                <motion.div
                  key={crtKey}
                  initial={false}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.15 }}
                  className={cn(
                    "h-full overflow-hidden",
                    crtKey > 0 && "moog-crt-flicker"
                  )}
                  style={{
                    filter: `brightness(${0.7 + brightness * 0.6})`,
                  }}
                >
                  <div className="h-full [&_.container]:max-w-none">
                    <PatchContent carousel={carousel} onContactClick={handleContactClick} />
                  </div>
                </motion.div>
              </AnimatePresence>

              {/* Phosphor screen vignette — warm amber falloff toward edges, like a CRT display */}
              <div
                className="pointer-events-none absolute inset-0 rounded-b"
                style={{
                  background: "radial-gradient(ellipse at 50% 40%, transparent 55%, rgba(12,8,4,0.55) 85%, rgba(6,4,2,0.8) 100%)",
                  mixBlendMode: "multiply",
                }}
                aria-hidden
              />
              {/* Amber edge warmth — faint glow around screen perimeter, like phosphor bleed */}
              <div
                className="pointer-events-none absolute inset-0 rounded-b"
                style={{
                  boxShadow: "inset 0 0 40px hsl(var(--moog-amber) / 0.05), inset 0 0 80px hsl(var(--moog-amber) / 0.03)",
                }}
                aria-hidden
              />

            </div>
          </div>
        </div>
      </div>


      {/* Keyboard hint — shown on first visit, dismissed on first key press */}
      <KeyboardHint
        visible={keyboardHintVisible && !keyboardSeen}
        onDismiss={dismissKeyboardHint}
      />

      {/* Note name HUD — shows above keyboard while a key is held */}
      <AnimatePresence>
        {activeNoteLabel && (
          <motion.div
            key={activeNoteLabel}
            className="pointer-events-none absolute bottom-[28vh] left-1/2 z-30 -translate-x-1/2"
            initial={{ opacity: 0, y: 4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.1 }}
          >
            <span
              className="font-synth rounded border border-moog-amber/40 bg-black/70 px-2 py-0.5 text-sm tracking-widest text-moog-amber-light shadow backdrop-blur-sm"
              style={{ textShadow: "0 0 8px hsl(var(--moog-amber) / 0.6)" }}
            >
              {activeNoteLabel}
            </span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Keyboard — foundation, 25–30% height, full width */}
      <PianoKeyboard
        activeKeys={activeKeys}
        onKeyDown={handleKeyDown}
        onKeyUp={handleKeyUp}
        onFirstHover={!keyboardSeen ? () => setKeyboardHintVisible(true) : undefined}
      />
    </motion.div>
  )
}

/* ---- Control Knob (Potentiometer) ---- */
function ControlKnob({
  label,
  value,
  onChange,
}: {
  label: string
  value: number
  onChange: (v: number) => void
}) {
  const knobRef = React.useRef<HTMLDivElement>(null)
  const isDragging = React.useRef(false)
  const startY = React.useRef(0)
  const startValue = React.useRef(0)

  const handlePointerDown = (e: React.PointerEvent) => {
    e.preventDefault()
    isDragging.current = true
    startY.current = e.clientY
    startValue.current = value
    ;(e.target as HTMLElement).setPointerCapture(e.pointerId)
  }

  const handlePointerMove = (e: React.PointerEvent) => {
    if (!isDragging.current) return
    const dy = startY.current - e.clientY
    const delta = dy / 150
    const next = Math.max(0, Math.min(1, startValue.current + delta))
    onChange(next)
  }

  const handlePointerUp = (e: React.PointerEvent) => {
    isDragging.current = false
    ;(e.target as HTMLElement).releasePointerCapture(e.pointerId)
  }

  const rotation = -135 + value * 270

  return (
    <div className="flex flex-col items-center gap-0.5">
      <span className="font-synth text-[10px] font-medium uppercase tracking-wider text-moog-silkscreen/60">
        {label}
      </span>
      <div
        ref={knobRef}
        role="slider"
        aria-valuemin={0}
        aria-valuemax={100}
        aria-valuenow={Math.round(value * 100)}
        aria-label={`${label} control`}
        tabIndex={0}
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        onPointerLeave={handlePointerUp}
        onKeyDown={(e) => {
          if (e.key === "ArrowUp" || e.key === "ArrowRight") {
            e.preventDefault()
            onChange(Math.min(1, value + 0.05))
          } else if (e.key === "ArrowDown" || e.key === "ArrowLeft") {
            e.preventDefault()
            onChange(Math.max(0, value - 0.05))
          }
        }}
        className="relative flex h-11 w-11 min-h-[44px] min-w-[44px] cursor-n-resize items-center justify-center rounded-full focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-moog-amber focus-visible:ring-offset-2 focus-visible:ring-offset-[#1a1814]"
        style={{
          background: "conic-gradient(from 0deg, #333, #666, #333, #111, #333)",
          boxShadow:
            "inset 0 2px 4px rgba(255,255,255,0.08), inset 0 -2px 4px rgba(0,0,0,0.6), 0 2px 6px rgba(0,0,0,0.5)",
          border: "1px solid #2a2a2a",
        }}
      >
        {/* White indicator dot at edge — rotates with value */}
        <div
          className="absolute inset-0 flex items-start justify-center pt-0.5"
          style={{ transform: `rotate(${rotation}deg)` }}
        >
          <div className="h-1.5 w-1.5 rounded-full bg-moog-amber-light" style={{ boxShadow: "0 0 4px hsl(var(--moog-amber) / 0.8)" }} />
        </div>
      </div>
    </div>
  )
}

/* ---- Keyboard hint — shown on first visit until dismissed ---- */
function KeyboardHint({ visible, onDismiss }: { visible: boolean; onDismiss: () => void }) {
  return (
    <AnimatePresence>
      {visible && (
        <motion.button
          type="button"
          className="absolute bottom-[30vh] left-1/2 z-30 -translate-x-1/2 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-moog-amber focus-visible:ring-offset-2 focus-visible:ring-offset-[#1a1814]"
          initial={{ opacity: 0, y: 4 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -4 }}
          transition={{ duration: 0.4 }}
          onClick={onDismiss}
          aria-label="Dismiss keyboard hint — press any key to play"
        >
          <span className="flex items-center gap-2 rounded-full border border-white/10 bg-black/60 px-3 py-1.5 backdrop-blur-sm shadow-[0_2px_12px_rgba(0,0,0,0.6)]">
            <span className="font-synth text-[10px] uppercase tracking-widest" style={{ color: "rgba(200,185,154,0.8)" }}>
              Type like a keyboard piano
            </span>
            <kbd className="rounded border border-moog-amber/30 bg-black/50 px-1 py-0.5 font-synth text-[9px] text-moog-amber-light">
              A–K
            </kbd>
          </span>
        </motion.button>
      )}
    </AnimatePresence>
  )
}

/* ---- Piano Keyboard —— professional instrument, full width, 25–30% height ---- */
function PianoKeyboard({
  activeKeys,
  onKeyDown,
  onKeyUp,
  onFirstHover,
}: {
  activeKeys: Set<number>
  onKeyDown: (idx: number) => void
  onKeyUp: (idx: number) => void
  onFirstHover?: () => void
}) {
  const keyMap = React.useMemo(() => {
    const map: Record<string, number> = {}
    const base = "awsedftgyhujkolp;'"
    base.split("").forEach((c, i) => {
      if (i < PIANO_NOTES.length) map[c] = i
    })
    const shifted = "AWSEDFTGYHUJKOLP:\""
    shifted.split("").forEach((c, i) => {
      if (i < PIANO_NOTES.length) map[c] = i
    })
    return map
  }, [])

  React.useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.repeat) return
      const idx = keyMap[e.key]
      if (idx != null) {
        e.preventDefault()
        onKeyDown(idx)
      }
    }
    const handleKeyUp = (e: KeyboardEvent) => {
      const idx = keyMap[e.key]
      if (idx != null) {
        e.preventDefault()
        onKeyUp(idx)
      }
    }
    window.addEventListener("keydown", handleKeyDown)
    window.addEventListener("keyup", handleKeyUp)
    return () => {
      window.removeEventListener("keydown", handleKeyDown)
      window.removeEventListener("keyup", handleKeyUp)
    }
  }, [keyMap, onKeyDown, onKeyUp])

  return (
    <div
      className="moog-wood moog-keybed flex shrink-0 flex-col w-full"
      style={{ height: "28vh", minHeight: 160 }}
      onMouseEnter={onFirstHover}
    >
      {/* Key-stop shadow where keys meet faceplate */}
      <div
        className="h-1 shrink-0 w-full"
        style={{ background: "linear-gradient(180deg, rgba(0,0,0,0.4) 0%, transparent 100%)" }}
      />
      {/* Keys container — position relative, flex row, 14 white keys flex:1 */}
      <div className="relative flex flex-1 w-full flex-row">
        {/* White keys — flex: 1 for even distribution */}
        {WHITE_KEYS.map((idx) => (
          <PianoKey
            key={`w-${idx}`}
            idx={idx}
            isBlack={false}
            isActive={activeKeys.has(idx)}
            onPointerDown={() => onKeyDown(idx)}
            onPointerUp={() => onKeyUp(idx)}
            style={{ flex: 1 }}
          />
        ))}
        {/* Black keys — position absolute, width calc(100%/24), over seams */}
        {BLACK_KEY_POSITIONS.map(({ idx, leftPercent }) => (
          <div
            key={`b-${idx}`}
            className="absolute top-0 h-[60%] pointer-events-auto z-[10]"
            style={{
              left: `${leftPercent}%`,
              width: "calc(100% / 24)",
            }}
          >
            <PianoKey
              idx={idx}
              isBlack
              isActive={activeKeys.has(idx)}
              onPointerDown={() => onKeyDown(idx)}
              onPointerUp={() => onKeyUp(idx)}
              style={{ width: "100%", height: "100%" }}
            />
          </div>
        ))}
      </div>
    </div>
  )
}

function PianoKey({
  idx,
  isBlack,
  isActive,
  onPointerDown,
  onPointerUp,
  style: styleProp,
}: {
  idx?: number
  isBlack: boolean
  isActive: boolean
  onPointerDown: () => void
  onPointerUp: () => void
  style?: React.CSSProperties
}) {
  const noteLabel = idx != null && idx < PIANO_NOTES.length ? PIANO_NOTES[idx] : "piano key"
  return (
    <motion.button
      type="button"
      aria-label={`Play note ${noteLabel}`}
      onPointerDown={(e) => {
        e.preventDefault()
        onPointerDown()
      }}
      onPointerUp={onPointerUp}
      onPointerLeave={onPointerUp}
      className={cn(
        "relative min-w-0 shrink-0 last:border-r-0 overflow-visible",
        isBlack ? "z-[10] moog-black-key rounded-bl-md rounded-br-md" : "z-0 moog-white-key rounded-b-[4px]"
      )}
      style={{
        ...styleProp,
        transformOrigin: "top",
        background: isBlack
          ? "linear-gradient(180deg, #2a2a2a 0%, #111 50%, #000 100%)"
          : "linear-gradient(180deg, #f5ede0 0%, #e8dace 60%, #ddd0bc 100%)",
        borderRight: isBlack ? undefined : "1px solid #d1d5db",
        boxShadow: isBlack
          ? "4px 6px 10px rgba(0,0,0,0.7), inset 1px 1px 2px rgba(255,255,255,0.2)"
          : "inset 0 2px 0 rgba(255,255,255,0.8), 0 2px 0 rgba(0,0,0,0.06)",
      }}
      whileTap={
        isBlack
          ? { scaleY: 0.98 }
          : { y: 4, borderBottomWidth: "2px", borderBottomColor: "#b0b0b0" }
      }
      transition={{ duration: 0.1, ease: "easeOut" }}
    >
      {/* Key-stop shadow at top where key meets faceplate */}
      <div
        className="absolute left-0 right-0 top-0 h-1 pointer-events-none"
        style={{
          boxShadow: "inset 0 2px 4px rgba(0,0,0,0.15)",
        }}
      />
      {/* Amber glow on key when active */}
      <motion.div
        className="absolute inset-0 rounded-b-[4px] pointer-events-none"
        initial={false}
        animate={{
          boxShadow: isActive
            ? "inset 0 -8px 24px rgba(232,101,10,0.35)"
            : "none",
        }}
      />
      {/* Amber light bleed — spills upward onto wood/metal when active */}
      {isActive && (
        <div
          className="absolute left-0 right-0 -top-4 h-6 pointer-events-none"
          style={{
            background: "linear-gradient(180deg, transparent 0%, rgba(232,101,10,0.15) 40%, rgba(232,101,10,0.06) 100%)",
            boxShadow: "0 -4px 16px rgba(232,101,10,0.2)",
          }}
        />
      )}
    </motion.button>
  )
}
