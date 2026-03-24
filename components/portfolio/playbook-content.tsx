"use client"

import * as React from "react"
import Image from "next/image"
import { Github, Maximize2, X } from "lucide-react"
import { ScrollReveal } from "@/components/scroll-reveal"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import prototypeStarterScreenshot from "../../public/projects/prototype-starter.png"
import { SectionLabel } from "./section-label"

const PREFLIGHT_CARDS = [
  {
    title: "Open the Terminal",
    body: "Your command centre. Cmd + J (Mac) or Ctrl + ` (Windows), or View → Terminal in your IDE.",
  },
  {
    title: "Don't Panic on Red",
    body: 'Copy the error, paste it to the AI, and say "I got this error, help me fix it." You\'ve got this.',
  },
  {
    title: "Run Setup First",
    body: "Follow the install steps in SETUP.md before jumping into the lifecycle below.",
  },
] as const

const QUICK_REFERENCE_SNIPPETS = [
  {
    label: "UI Review",
    cmd: "/critique components/Button.tsx",
    desc: "Get instant UX and design critique on any component.",
  },
  {
    label: "Mobile Fix",
    cmd: "/adapt components/Navbar.tsx",
    desc: "Make any component responsive and mobile-friendly.",
  },
  {
    label: "Animation",
    cmd: "/animate components/Modal.tsx",
    desc: "Add subtle, purposeful motion to any component.",
  },
  {
    label: "Design Question",
    cmd: "/designer What's the best pattern for a multi-step form?",
    desc: "Ask design system and UX pattern questions directly.",
  },
  {
    label: "Audit",
    cmd: "/audit",
    desc: "Run a full accessibility and spacing audit on your pages.",
  },
  {
    label: "Polish",
    cmd: "/polish",
    desc: "Apply final UX refinements and clean up any rough edges.",
  },
] as const

/* ── Inline code ── */
function Code({ children }: { children: React.ReactNode }) {
  return (
    <code className="break-words rounded bg-muted px-1.5 py-0.5 font-mono text-[13px] [overflow-wrap:anywhere]">
      {children}
    </code>
  )
}

/* ── Tip callout — matches the quote/card style from about-section ── */
function Tip({
  children,
  variant = "default",
}: {
  children: React.ReactNode
  variant?: "default" | "warning"
}) {
  return (
    <div
      className={
        variant === "warning"
          ? "mt-3 break-words rounded-lg border border-orange-200 bg-orange-50 px-4 py-3 text-sm leading-relaxed text-orange-800 dark:border-orange-800/40 dark:bg-orange-950/30 dark:text-orange-300"
          : "mt-3 break-words rounded-lg border border-border bg-card px-4 py-3 text-sm leading-relaxed text-muted-foreground"
      }
    >
      {children}
    </div>
  )
}

/* ── Phase item — follows work-experience timeline pattern ── */
function PhaseItem({
  number,
  icon,
  title,
  isCurrent = false,
  delay = 0,
  children,
}: {
  number: string
  icon: string
  title: string
  isCurrent?: boolean
  delay?: number
  children: React.ReactNode
}) {
  return (
    <ScrollReveal delay={delay} className="relative flex gap-4">
      {/* Timeline marker — matches work-experience dots */}
      <span
        className={
          isCurrent
            ? "relative z-10 mt-1.5 flex h-2.5 w-2.5 shrink-0 rounded-full border-2 border-muted-foreground/60 bg-background md:mt-2"
            : "relative z-10 mt-1.5 flex h-2.5 w-2.5 shrink-0 rounded-full bg-muted-foreground/40 md:mt-2"
        }
        aria-hidden
      />

      <div className="min-w-0 flex-1">
        <p className="text-xs font-normal uppercase tracking-wide text-muted-foreground">
          {icon} {number}
        </p>
        <h3 className="mt-1 break-words font-display text-lg font-medium text-foreground md:text-xl">
          {title}
        </h3>
        <div className="mt-2 min-w-0 space-y-3 break-words text-sm leading-relaxed text-muted-foreground md:text-base md:leading-relaxed">
          {children}
        </div>
      </div>
    </ScrollReveal>
  )
}

/* ── D-pad button (touch-optimised, no click delay) ── */
function DpadBtn({
  code,
  sendMsg,
  children,
  className,
}: {
  code: string
  sendMsg: (type: string, data?: Record<string, unknown>) => void
  children: React.ReactNode
  className?: string
}) {
  const pressed = React.useRef(false)
  const down = React.useCallback(
    (e: React.TouchEvent | React.MouseEvent) => {
      e.preventDefault()
      if (!pressed.current) {
        pressed.current = true
        sendMsg("keydown", { code })
      }
    },
    [code, sendMsg],
  )
  const up = React.useCallback(() => {
    if (pressed.current) {
      pressed.current = false
      sendMsg("keyup", { code })
    }
  }, [code, sendMsg])

  return (
    <button
      type="button"
      onTouchStart={down}
      onTouchEnd={up}
      onTouchCancel={up}
      onMouseDown={down}
      onMouseUp={up}
      onMouseLeave={up}
      className={cn(
        "flex items-center justify-center bg-[hsl(240,6%,13%)] text-white/50 active:bg-[hsl(240,6%,18%)] active:text-white/70",
        className,
      )}
      aria-label={`D-pad ${code.replace("Arrow", "").toLowerCase()}`}
    >
      {children}
    </button>
  )
}

/* ── Action button (A / B) ── */
function ActionBtn({
  label,
  onPress,
  onRelease,
  accent = false,
  className,
}: {
  label: string
  onPress: () => void
  onRelease?: () => void
  accent?: boolean
  className?: string
}) {
  return (
    <button
      type="button"
      onTouchStart={(e) => {
        e.preventDefault()
        onPress()
      }}
      onTouchEnd={(e) => {
        e.preventDefault()
        onRelease?.()
      }}
      onTouchCancel={() => onRelease?.()}
      onMouseDown={onPress}
      onMouseUp={() => onRelease?.()}
      onMouseLeave={() => onRelease?.()}
      className={cn(
        "flex h-[52px] w-[52px] select-none items-center justify-center rounded-full border-2 font-mono text-sm font-bold shadow-[0_3px_0_rgba(0,0,0,0.5)] active:translate-y-[1px] active:shadow-[0_1px_0_rgba(0,0,0,0.5)]",
        accent
          ? "border-[#4dd0e1]/40 bg-[hsl(240,6%,13%)] text-[#4dd0e1]"
          : "border-white/10 bg-[hsl(240,6%,13%)] text-white/50",
        className,
      )}
      aria-label={`${label} button`}
    >
      {label}
    </button>
  )
}

/* ── Playbook Quest iframe (hero + optional reuse) ── */
function PlaybookQuestEmbed({
  className,
  iframeLoading = "lazy",
}: {
  className?: string
  iframeLoading?: "eager" | "lazy"
}) {
  const [isFullscreen, setIsFullscreen] = React.useState(false)
  const containerRef = React.useRef<HTMLDivElement>(null)
  const iframeRef = React.useRef<HTMLIFrameElement>(null)

  const sendMsg = React.useCallback(
    (type: string, data?: Record<string, unknown>) => {
      iframeRef.current?.contentWindow?.postMessage({ type, ...data }, "*")
    },
    [],
  )

  const enterFullscreen = React.useCallback(() => {
    setIsFullscreen(true)
    sendMsg("extControls", { enabled: true })
    containerRef.current?.requestFullscreen?.().catch(() => {})
  }, [sendMsg])

  const exitFullscreen = React.useCallback(() => {
    setIsFullscreen(false)
    sendMsg("extControls", { enabled: false })
    if (document.fullscreenElement) {
      document.exitFullscreen().catch(() => {})
    }
  }, [sendMsg])

  React.useEffect(() => {
    function onFullscreenChange() {
      if (!document.fullscreenElement) {
        setIsFullscreen(false)
        sendMsg("extControls", { enabled: false })
      }
    }
    document.addEventListener("fullscreenchange", onFullscreenChange)
    return () =>
      document.removeEventListener("fullscreenchange", onFullscreenChange)
  }, [sendMsg])

  return (
    <div className={cn("mx-auto w-full max-w-[680px]", className)}>
      <div
        ref={containerRef}
        className={
          isFullscreen
            ? "fixed inset-0 z-50 flex flex-col bg-[hsl(240,10%,4%)]"
            : "relative"
        }
      >
        {/* ── Close button (fullscreen only) ── */}
        {isFullscreen ? (
          <button
            type="button"
            onClick={exitFullscreen}
            className="absolute right-3 top-3 z-50 flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-white backdrop-blur transition-colors hover:bg-white/20"
            aria-label="Exit fullscreen"
          >
            <X className="h-5 w-5" />
          </button>
        ) : null}

        {/* ── Game canvas ── */}
        <div
          className={
            isFullscreen
              ? "flex min-h-0 flex-1 items-center justify-center overflow-hidden"
              : undefined
          }
        >
          <div
            className={
              isFullscreen
                ? "relative w-full max-h-full overflow-hidden"
                : "relative w-full min-h-[200px] overflow-hidden rounded-xl border border-border/60 bg-muted/10"
            }
            style={{ aspectRatio: "640 / 440" }}
          >
            <iframe
              ref={iframeRef}
              src="/playbook-quest.html"
              title="Playbook Quest — an 8-bit game walkthrough of the AI prototyping lifecycle"
              className="absolute inset-0 h-full w-full border-0"
              loading={iframeLoading}
              allow="autoplay; fullscreen"
              referrerPolicy="strict-origin-when-cross-origin"
              aria-describedby="playbook-quest-hint"
            >
              <p className="p-4 text-sm text-muted-foreground">
                Your browser does not support iframes.{" "}
                <a href="/playbook-quest.html" className="underline">
                  Open Playbook Quest directly
                </a>
                .
              </p>
            </iframe>
          </div>
        </div>

        {/* ── Controller (fullscreen only) ── */}
        {isFullscreen ? (
          <div
            className="shrink-0 px-6 pb-[max(12px,env(safe-area-inset-bottom))] pt-4"
            role="group"
            aria-label="Game controller"
          >
            <div className="mx-auto flex max-w-md items-center justify-between">
              {/* D-pad */}
              <div className="grid h-[108px] w-[108px] grid-cols-3 grid-rows-3 gap-[2px] overflow-hidden rounded-2xl">
                <span />
                <DpadBtn
                  code="ArrowUp"
                  sendMsg={sendMsg}
                  className="rounded-t-xl"
                >
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden>
                    <path d="M8 3L13 11H3L8 3Z" fill="currentColor" />
                  </svg>
                </DpadBtn>
                <span />
                <DpadBtn
                  code="ArrowLeft"
                  sendMsg={sendMsg}
                  className="rounded-l-xl"
                >
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden>
                    <path d="M3 8L11 3V13L3 8Z" fill="currentColor" />
                  </svg>
                </DpadBtn>
                <span className="bg-[hsl(240,6%,11%)]" />
                <DpadBtn
                  code="ArrowRight"
                  sendMsg={sendMsg}
                  className="rounded-r-xl"
                >
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden>
                    <path d="M13 8L5 3V13L13 8Z" fill="currentColor" />
                  </svg>
                </DpadBtn>
                <span />
                <DpadBtn
                  code="ArrowDown"
                  sendMsg={sendMsg}
                  className="rounded-b-xl"
                >
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden>
                    <path d="M8 13L3 5H13L8 13Z" fill="currentColor" />
                  </svg>
                </DpadBtn>
                <span />
              </div>

              {/* A + B buttons */}
              <div className="flex items-end gap-4">
                <ActionBtn
                  label="B"
                  onPress={() => sendMsg("keydown", { code: "ArrowUp" })}
                  onRelease={() => sendMsg("keyup", { code: "ArrowUp" })}
                  className="translate-y-0"
                />
                <ActionBtn
                  label="A"
                  accent
                  onPress={() => sendMsg("action")}
                  className="-translate-y-4"
                />
              </div>
            </div>
          </div>
        ) : null}

        {/* ── Expand button (inline, mobile only) ── */}
        {!isFullscreen ? (
          <button
            type="button"
            onClick={enterFullscreen}
            className="absolute bottom-2 right-2 z-10 flex h-8 w-8 items-center justify-center rounded-md bg-black/60 text-white/70 backdrop-blur transition-colors hover:bg-black/80 hover:text-white lg:hidden"
            aria-label="Play fullscreen"
          >
            <Maximize2 className="h-4 w-4" />
          </button>
        ) : null}
      </div>

      <p
        id="playbook-quest-hint"
        className={
          isFullscreen
            ? "sr-only"
            : "mt-3 text-balance text-center text-xs text-muted-foreground"
        }
      >
        Desktop: arrow keys to move, space to interact. On a phone, use the
        on-screen buttons (◀ ▲ ▶ and A); during NPC dialogue the buttons hide
        so you can read — tap the text box to continue.
      </p>
    </div>
  )
}

/* ── Main content ── */
export function PlaybookContent() {
  return (
    <>
      {/* ═══ HERO — two-column: copy left, Playbook Quest right ═══ */}
      <section className="border-b border-border/60">
        <div className="container px-4 py-12 md:px-6 md:py-16 lg:px-8 lg:pt-24 lg:pb-20">
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 md:items-center md:gap-8 lg:gap-12 xl:gap-16">
            <div className="max-w-3xl md:max-w-none">
              <p className="text-base text-muted-foreground md:text-lg">
                A designer&apos;s field guide
              </p>
              <h1 className="mt-4 break-words font-display text-3xl font-medium leading-[1.25] tracking-tight text-foreground sm:text-4xl md:text-5xl lg:text-6xl">
                From idea to testable prototype
              </h1>
              <p className="mt-4 max-w-xl break-words text-sm text-muted-foreground md:mt-5 md:text-base">
                Use Claude Code and AntiGravity to build real, testable
                prototypes — without writing code from scratch.
              </p>
            </div>
            <div className="mt-8 min-w-0 md:mt-0">
              <p className="mb-3 text-center text-xs font-normal uppercase tracking-wide text-muted-foreground md:text-left">
                Learn by playing
              </p>
              <PlaybookQuestEmbed
                className="max-w-none"
                iframeLoading="eager"
              />
            </div>
          </div>
        </div>
      </section>

      {/* ═══ STARTER CALLOUT — connects playbook to the workspace ═══ */}
      <section className="border-b border-border/60">
        <div className="container px-4 py-8 md:px-6 md:py-10 lg:px-8 lg:py-12">
          <ScrollReveal>
            <div className="flex flex-col gap-4 rounded-xl border border-border/60 bg-muted/30 px-5 py-5 sm:flex-row sm:items-center sm:justify-between md:px-6 md:py-6">
              <div className="min-w-0 flex-1">
                <p className="font-display text-base font-medium text-foreground md:text-lg">
                  Built for prototype-starter
                </p>
                <p className="mt-1 text-sm text-muted-foreground">
                  Clone the workspace, then follow this guide step by step.
                </p>
              </div>
              <Button
                variant="default"
                size="lg"
                className="w-full shrink-0 sm:w-auto"
                asChild
              >
                <a
                  href="https://github.com/stdemps/prototype-starter"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Clone prototype-starter on GitHub (opens in new tab)"
                >
                  Clone on GitHub
                  <Github className="h-4 w-4" aria-hidden />
                </a>
              </Button>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* ═══ PRE-FLIGHT — matches template repo cards pattern ═══ */}
      <section className="scroll-mt-16 border-b border-border/60 md:scroll-mt-20">
        <div className="container px-4 py-12 md:px-6 md:py-16 lg:px-8 lg:py-20">
          <ScrollReveal>
            <p className="mb-8 max-w-2xl text-sm text-muted-foreground md:mb-10 md:text-base">
              I put this together based on what my friend needs. It&apos;s a
              starting point - just follow the phases and you&apos;ll have
              something live and testable.
            </p>
          </ScrollReveal>

          <ScrollReveal>
            <SectionLabel number="00" title="Pre-flight checklist" />
          </ScrollReveal>

          <ul className="mt-6 flex list-none flex-col gap-3 lg:flex-row lg:gap-4 md:mt-8">
            {PREFLIGHT_CARDS.map((card, i) => (
              <ScrollReveal asListItem key={card.title} delay={i * 80} className="flex-1">
                <div className="flex min-h-[4.5rem] min-w-0 flex-col gap-1 rounded-xl border border-border/60 bg-muted/30 px-4 py-3 transition-colors hover:bg-muted/50">
                  <span className="break-words font-display font-medium text-foreground">
                    {card.title}
                  </span>
                  <p className="break-words text-sm leading-relaxed text-muted-foreground">
                    {card.body}
                  </p>
                </div>
              </ScrollReveal>
            ))}
          </ul>
        </div>
      </section>

      {/* ═══ TOOLCHAIN — bento: workspace image + stacked tool cards ═══ */}
      <section id="toolchain" className="scroll-mt-16 border-b border-border/60 md:scroll-mt-20">
        <div className="container px-4 py-12 md:px-6 md:py-16 lg:px-8 lg:py-20">
          <ScrollReveal>
            <SectionLabel number="01" title="The tools" />
            <p className="mt-4 max-w-2xl text-base leading-relaxed text-muted-foreground md:mt-5 lg:text-sm lg:leading-relaxed">
              Two tools, one codebase. Use whichever feels more natural — you
              can switch freely between them at any time.
            </p>
          </ScrollReveal>

          {/*
            Layout by breakpoint:
            - default–sm: single column — image, then cards stacked.
            - md–xl: image full width, then two tool cards side by side (tablet & 1024–1279 “awkward” band).
            - xl+: 70/30 bento — image left spanning rows, cards stacked right.
            Wrapper uses xl:contents so card ScrollReveals slot into the outer grid at xl+.
          */}
          <div className="mt-5 grid grid-cols-1 gap-4 sm:mt-6 sm:gap-5 md:mt-8 md:gap-6 xl:grid-cols-[minmax(0,7fr)_minmax(0,3fr)] xl:grid-rows-2 xl:items-stretch xl:gap-6">
            <ScrollReveal
              delay={40}
              className="flex min-h-0 flex-col xl:row-span-2"
            >
              {/* Phone: taller frame; sm+: 16:9; md–xl: cap height; xl+: contain + flex fill */}
              <div className="relative aspect-[16/10] w-full min-h-[200px] overflow-hidden rounded-xl border border-border/60 bg-muted/30 shadow-sm sm:aspect-video sm:min-h-[220px] md:aspect-video md:min-h-0 md:max-h-[420px] xl:max-h-none xl:min-h-[260px] xl:aspect-auto xl:flex-1">
                <Image
                  src={prototypeStarterScreenshot}
                  alt="The prototype-starter workspace open in VS Code with Claude Code and the AI Agent panel"
                  placeholder="blur"
                  fill
                  className="object-cover object-center xl:object-contain xl:object-left-top"
                  sizes="(max-width: 1279px) 100vw, 70vw"
                />
              </div>
            </ScrollReveal>

            <div className="grid grid-cols-1 gap-4 sm:gap-5 md:grid-cols-2 md:items-stretch md:gap-5 xl:contents">
              <ScrollReveal
                delay={60}
                className="h-full min-h-0 md:flex md:flex-col xl:col-start-2 xl:row-start-1"
              >
                <div className="flex h-full min-h-[11rem] flex-col rounded-xl border border-border bg-card p-4 sm:p-5 md:min-h-0 md:p-5 lg:p-6 xl:p-5">
                  <p className="text-[11px] font-normal uppercase tracking-wide text-muted-foreground sm:text-xs">
                    Terminal or Extension
                  </p>
                  <h3 className="mt-1.5 font-display text-lg font-medium leading-snug text-foreground sm:mt-2 md:text-xl lg:text-xl xl:text-lg xl:leading-snug">
                    Claude Code
                  </h3>
                  <p className="mt-2 text-base leading-relaxed text-muted-foreground md:text-sm lg:leading-relaxed">
                    Run <Code>claude</Code> in your terminal for a fast,
                    keyboard-driven experience — or install the Claude Code
                    Extension for a chat-like interface.
                  </p>
                  <ul className="mt-3 space-y-2.5 text-base leading-snug text-muted-foreground sm:mt-4 md:mt-3 md:space-y-2 md:text-sm md:leading-normal lg:space-y-2 xl:space-y-1.5">
                    <li className="pl-0.5">• Reads Figma files directly via MCP</li>
                    <li className="pl-0.5">• Builds features end-to-end autonomously</li>
                    <li className="pl-0.5">• Runs audits, refactors, and polish commands</li>
                    <li className="pl-0.5">
                      • Conversational agents like <Code>/designer</Code>
                    </li>
                  </ul>
                </div>
              </ScrollReveal>

              <ScrollReveal
                delay={100}
                className="h-full min-h-0 md:flex md:flex-col xl:col-start-2 xl:row-start-2"
              >
                <div className="flex h-full min-h-[11rem] flex-col rounded-xl border border-border bg-card p-4 sm:p-5 md:min-h-0 md:p-5 lg:p-6 xl:p-5">
                  <p className="text-[11px] font-normal uppercase tracking-wide text-muted-foreground sm:text-xs">
                    IDE Chat Agent
                  </p>
                  <h3 className="mt-1.5 font-display text-lg font-medium leading-snug text-foreground sm:mt-2 md:text-xl lg:text-xl xl:text-lg xl:leading-snug">
                    AntiGravity
                  </h3>
                  <p className="mt-2 text-base leading-relaxed text-muted-foreground md:text-sm lg:leading-relaxed">
                    Lives in the primary AI Chat panel in your IDE. Uses{" "}
                    <Code>.agents/workflows/</Code> to execute multi-step
                    instructions from a single prompt.
                  </p>
                  <ul className="mt-3 space-y-2.5 text-base leading-snug text-muted-foreground sm:mt-4 md:mt-3 md:space-y-2 md:text-sm md:leading-normal lg:space-y-2 xl:space-y-1.5">
                    <li className="pl-0.5">• Strong visual processing — image to code</li>
                    <li className="pl-0.5">• Pre-built slash-command workflows</li>
                    <li className="pl-0.5">• Scaffold entire features from Figma mockups</li>
                    <li className="pl-0.5">• Works on the same codebase as Claude Code</li>
                  </ul>
                </div>
              </ScrollReveal>
            </div>
          </div>
        </div>
      </section>

      {/* ═══ FIGMA MCP — matches the Moog Playground CTA card ═══ */}
      <section className="scroll-mt-16 border-b border-border/60 md:scroll-mt-20">
        <div className="container px-4 py-12 md:px-6 md:py-16 lg:px-8 lg:py-20">
          <ScrollReveal>
            <div className="rounded-xl border border-border/60 px-5 py-5 md:px-6 md:py-6">
              <h3 className="font-display text-base font-medium tracking-tight text-foreground md:text-lg">
                Reading Figma Directly via MCP
              </h3>
              <p className="mt-2 max-w-lg text-sm text-muted-foreground">
                Claude Code can read design data, layout structures, and
                typography directly from your live Figma files — no more
                screenshot exports.
              </p>
              <pre
                className="mt-4 overflow-x-auto break-all rounded-lg border border-border bg-muted/30 px-4 py-3 font-mono text-xs leading-relaxed text-foreground sm:break-normal md:text-sm"
                tabIndex={0}
              >
{`claude mcp add figma npx -y \\
  @modelcontextprotocol/server-figma \\
  <YOUR_FIGMA_TOKEN>`}
              </pre>
              <ol className="mt-4 list-decimal space-y-1 pl-5 text-sm text-muted-foreground">
                <li>Get a Figma Personal Access Token</li>
                <li>Run the install command in terminal</li>
                <li>Paste Figma URLs directly into Claude</li>
              </ol>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* ═══ LIFECYCLE — follows work-experience timeline pattern ═══ */}
      <section id="lifecycle" className="scroll-mt-16 border-b border-border/60 md:scroll-mt-20">
        <div className="container px-4 py-12 md:px-6 md:py-16 lg:px-8 lg:py-20">
          <ScrollReveal>
            <SectionLabel number="02" title="The lifecycle" />
          </ScrollReveal>

          <div className="relative mt-8 space-y-10 pl-6 md:mt-10 md:space-y-12 md:pl-8 lg:mt-12">
            {/* Vertical line — aligned to dot centre: pl-6 = -24px offset, dot is 10px wide, centre at 5px, minus line 1px → 4px */}
            <span
              className="absolute left-[4px] top-0 bottom-0 w-px bg-border md:left-[4px]"
              aria-hidden
            />

            <PhaseItem number="Phase 1" icon="💡" title="Ideation — Pressure-Test the Idea" isCurrent delay={0}>
              <p>
                Before pushing pixels, use Claude Code to pressure-test your
                ideas. Run <Code>/pm</Code> to discuss feature scope,
                prioritisation, and user journeys. Run{" "}
                <Code>/user-researcher</Code> to validate assumptions and
                outline a testing plan.
              </p>
              <Tip>
                💡 Write your ideas in a PRD doc at{" "}
                <Code>docs/prds/idea.md</Code>, then use{" "}
                <Code>/setup-project-context</Code> to load it into the
                AI&apos;s long-term memory.
              </Tip>
            </PhaseItem>

            <PhaseItem number="Phase 2" icon="🎨" title="Visual Design — Figma" delay={60}>
              <p>
                Take the insights from Phase 1 and build your mockups in Figma.
                Don&apos;t worry about CSS or React yet — just focus on the
                layout, spacing, and user experience. This is your creative
                sandbox.
              </p>
            </PhaseItem>

            <PhaseItem number="Phase 3" icon="⚙️" title="Code Prototyping" delay={120}>
              <p>
                With the Figma MCP running, point Claude directly at your file
                and skip the export dance entirely:
              </p>
              <Tip>
                🤖 <em>&quot;Hey Claude, act as my <Code>@designer</Code> and
                turn this Figma frame into a full React page:{" "}
                <Code>figma.com/file/...</Code> — use our
                DESIGN_SYSTEM.md.&quot;</em>
              </Tip>
              <p>
                Claude reads the exact auto-layouts, colour tokens, and
                typography from Figma and scaffolds your full page instantly.
                Then run <Code>npm run dev</Code> and preview at{" "}
                <Code>localhost:3000</Code>.
              </p>
              <Tip>
                🖼️ The MCP reads layouts and text perfectly, but won&apos;t
                auto-download photos or SVG icons. Export those manually into
                your <Code>public/</Code> folder and let Claude know
                they&apos;re there.
              </Tip>
            </PhaseItem>

            <PhaseItem number="Phase 4" icon="🔥" title="Making it Real — Firebase Data" delay={180}>
              <p>
                Want to capture user input? Create a Firebase project, enable{" "}
                <strong>Firestore</strong> and <strong>Authentication</strong>,
                grab your config keys, and paste them into a{" "}
                <Code>.env.local</Code> file (duplicated from{" "}
                <Code>.env.example</Code>).
              </p>
              <Tip>
                🤖 <em>&quot;Hey Claude, use the <Code>/engineer</Code> skill.
                Hook up my Variant A form so it saves submissions directly to
                Firestore.&quot;</em>
              </Tip>
              <Tip variant="warning">
                ⚠️ Firestore Test Mode has open rules for a limited time. Before
                any real users or deploy,{" "}
                <strong>replace with least-privilege security rules</strong>.
                Never ship production with default test rules.
              </Tip>
            </PhaseItem>

            <PhaseItem number="Phase 5" icon="✨" title="Experimentation & Refinement" delay={240}>
              <p>
                Spin up a Variant B and compare approaches. Once settled, refine
                using built-in polish workflows:
              </p>
              <Tip>
                🤖 Claude Code: <em>&quot;Run <Code>/audit</Code> then{" "}
                <Code>/polish</Code> on my Variant A page. Fix spacing,
                accessibility, then <Code>/animate</Code> key
                interactions.&quot;</em>
              </Tip>
              <Tip>
                ✨ AntiGravity: <em>&quot;Run{" "}
                <Code>/slash-command impeccable_refinement</Code> on Variant
                A.&quot;</em>
              </Tip>
            </PhaseItem>

            <PhaseItem number="Phase 5.5" icon="🔐" title="Security & Best Practices" delay={300}>
              <p>
                Before pushing to live users, harden your prototype. Claude will
                review your forms for proper validation, secure database
                queries, and optimise your React code for Vercel.
              </p>
              <Tip>
                🤖 <em>&quot;Hey Claude, run <Code>/harden</Code> and apply{" "}
                <Code>/vercel-react-best-practices</Code> to my new pages and
                components.&quot;</em>
              </Tip>
            </PhaseItem>

            <PhaseItem number="Phase 5.9" icon="📦" title="Saving Your Work — Push to GitHub" delay={360}>
              <p>
                Vercel needs your code stored on GitHub. If git commands
                aren&apos;t your thing, just ask:
              </p>
              <Tip>
                🤖 <em>&quot;Hey Claude, save my work, commit all my recent
                changes, and push them to GitHub.&quot;</em>
              </Tip>
            </PhaseItem>

            <PhaseItem number="Phase 6" icon="🚀" title="Testing on Users — Vercel Deployment" delay={420}>
              <p>
                Create a free account on <strong>Vercel.com</strong>, connect
                your GitHub repo, and import the repository. Add your Firebase
                environment variables in the Vercel Environment Variables
                settings, then click <strong>Deploy</strong>.
              </p>
              <p>
                Vercel will give you a live URL like{" "}
                <Code>my-prototype.vercel.app</Code> that auto-updates every
                time you push code to GitHub.
              </p>
            </PhaseItem>

            <PhaseItem number="Phase 7" icon="🔄" title="The Feedback Loop — Iterating" delay={480}>
              <p>
                Deploying isn&apos;t the finish line — it&apos;s where the
                real learning starts. Gather user feedback, quotes, and pain
                points, then let Claude synthesise the messy data:
              </p>
              <Tip>
                🤖 <em>&quot;Act as my <Code>/user-researcher</Code>. Here are
                notes from 3 user tests on Variant A. Synthesise the top
                friction points and suggest solutions.&quot;</em>
              </Tip>
              <p>
                With those insights, jump back into Figma to rethink layout, or
                straight into code to implement the fixes. The loop continues.
              </p>
            </PhaseItem>
          </div>
        </div>
      </section>

      {/* ═══ QUICK REF — matches the design philosophy quote card ═══ */}
      <section className="scroll-mt-16 md:scroll-mt-20">
        <div className="container px-4 py-12 md:px-6 md:py-16 lg:px-8 lg:py-20">
          <ScrollReveal>
            <SectionLabel number="03" title="Quick reference" />
          </ScrollReveal>

          <ul className="mt-6 grid list-none gap-3 sm:grid-cols-2 lg:grid-cols-3 md:mt-8">
            {QUICK_REFERENCE_SNIPPETS.map((snippet, i) => (
              <ScrollReveal asListItem key={snippet.label} delay={i * 60} className="flex">
                <div className="min-w-0 flex-1 rounded-lg border border-border bg-card p-4 transition-colors hover:bg-muted/50">
                  <p className="text-xs font-normal uppercase tracking-wide text-muted-foreground">
                    {snippet.label}
                  </p>
                  <p className="mt-1.5 break-words font-mono text-sm text-foreground [overflow-wrap:anywhere]">
                    {snippet.cmd}
                  </p>
                  <p className="mt-1 break-words text-sm text-muted-foreground">
                    {snippet.desc}
                  </p>
                </div>
              </ScrollReveal>
            ))}
          </ul>
        </div>
      </section>
    </>
  )
}
