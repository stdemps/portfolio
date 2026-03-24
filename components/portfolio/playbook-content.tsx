"use client"

import Image from "next/image"
import { ScrollReveal } from "@/components/scroll-reveal"
import prototypeStarterScreenshot from "../../public/projects/prototype-starter.png"
import { SectionLabel } from "./section-label"

/* ── Inline code ── */
function Code({ children }: { children: React.ReactNode }) {
  return (
    <code className="rounded bg-muted px-1.5 py-0.5 font-mono text-[13px]">
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
          ? "mt-3 rounded-lg border border-orange-200 bg-orange-50 px-4 py-3 text-sm leading-relaxed text-orange-800 dark:border-orange-800/40 dark:bg-orange-950/30 dark:text-orange-300"
          : "mt-3 rounded-lg border border-border bg-card px-4 py-3 text-sm leading-relaxed text-muted-foreground"
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
        <h3 className="mt-1 font-display text-lg font-medium text-foreground md:text-xl">
          {title}
        </h3>
        <div className="mt-2 space-y-3 text-sm leading-relaxed text-muted-foreground md:text-base md:leading-relaxed">
          {children}
        </div>
      </div>
    </ScrollReveal>
  )
}

/* ── Main content ── */
export function PlaybookContent() {
  return (
    <>
      {/* ═══ HERO — two-column: copy left, image right ═══ */}
      <section className="border-b border-border/60">
        <div className="container px-4 py-12 md:px-6 md:py-16 lg:px-8 lg:pt-24 lg:pb-20">
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 md:items-center md:gap-8 lg:gap-12 xl:gap-16">
            <div className="max-w-3xl md:max-w-none">
              <p className="text-base text-muted-foreground md:text-lg">
                A designer&apos;s field guide
              </p>
              <h1 className="mt-4 font-display text-3xl font-medium leading-[1.25] tracking-tight text-foreground sm:text-4xl md:text-5xl lg:text-6xl">
                From idea to testable prototype
              </h1>
              <p className="mt-4 max-w-xl text-sm text-muted-foreground md:mt-5 md:text-base">
                Leverage Claude Code and AntiGravity to build real, testable
                products — in a fraction of the time.
              </p>
            </div>
            <div className="mt-8 min-w-0 md:mt-0">
              <div className="overflow-hidden rounded-lg border border-border/60 bg-muted/20 shadow-sm">
                <Image
                  src={prototypeStarterScreenshot}
                  alt="The prototype-starter workspace open in VS Code with Claude Code and the AI Agent panel"
                  placeholder="blur"
                  className="h-auto w-full"
                  sizes="(max-width: 767px) 100vw, (max-width: 1280px) 48vw, 640px"
                  priority
                />
              </div>
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
              <a
                href="https://github.com/stdemps/prototype-starter"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex shrink-0 items-center gap-2 rounded-md border border-border bg-background px-4 py-2 text-sm font-medium text-foreground transition-colors hover:bg-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                aria-label="Clone prototype-starter on GitHub (opens in new tab)"
              >
                Clone on GitHub
                <svg
                  viewBox="0 0 16 16"
                  className="h-4 w-4"
                  fill="currentColor"
                  aria-hidden
                >
                  <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0016 8c0-4.42-3.58-8-8-8z" />
                </svg>
              </a>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* ═══ PRE-FLIGHT — matches template repo cards pattern ═══ */}
      <section className="scroll-mt-16 border-b border-border/60 md:scroll-mt-20">
        <div className="container px-4 py-12 md:px-6 md:py-16 lg:px-8 lg:py-20">
          <ScrollReveal>
            <SectionLabel number="00" title="Pre-flight checklist" />
          </ScrollReveal>

          <ul className="mt-6 flex list-none flex-col gap-3 lg:flex-row lg:gap-4 md:mt-8">
            {[
              {
                title: "Open the Terminal",
                body: "Your command centre. Cmd + J (Mac) or Ctrl + ` (Windows), or View → Terminal in your IDE.",
              },
              {
                title: "Don't Panic on Red",
                body: "Copy the error, paste it to the AI, and say \"I got this error, help me fix it.\" You've got this.",
              },
              {
                title: "Run Setup First",
                body: "Follow the install steps in SETUP.md before jumping into the lifecycle below.",
              },
            ].map((card, i) => (
              <ScrollReveal asListItem key={card.title} delay={i * 80} className="flex-1">
                <div className="flex min-h-[4.5rem] flex-col gap-1 rounded-xl border border-border/60 bg-muted/30 px-4 py-3 transition-colors hover:bg-muted/50">
                  <span className="font-display font-medium text-foreground">
                    {card.title}
                  </span>
                  <p className="text-sm leading-relaxed text-muted-foreground">{card.body}</p>
                </div>
              </ScrollReveal>
            ))}
          </ul>
        </div>
      </section>

      {/* ═══ TOOLCHAIN — two cards side by side ═══ */}
      <section id="toolchain" className="scroll-mt-16 border-b border-border/60 md:scroll-mt-20">
        <div className="container px-4 py-12 md:px-6 md:py-16 lg:px-8 lg:py-20">
          <ScrollReveal>
            <SectionLabel number="01" title="The toolchain" />
            <p className="mt-4 max-w-2xl text-sm text-muted-foreground md:mt-5 md:text-base">
              Two tools, one codebase. Use whichever feels more natural — you
              can switch freely between them at any time.
            </p>
          </ScrollReveal>

          <div className="mt-8 grid gap-4 md:mt-10 md:grid-cols-2 lg:mt-12">
            <ScrollReveal>
              <div className="rounded-lg border border-border bg-card p-6">
                <p className="text-xs font-normal uppercase tracking-wide text-muted-foreground">
                  Terminal or Extension
                </p>
                <h3 className="mt-2 font-display text-lg font-medium text-foreground md:text-xl">
                  Claude Code
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                  Run <Code>claude</Code> in your terminal for a fast,
                  keyboard-driven experience — or install the Claude Code
                  Extension for a chat-like interface.
                </p>
                <ul className="mt-4 space-y-1.5 text-sm text-muted-foreground">
                  <li>• Reads Figma files directly via MCP</li>
                  <li>• Builds features end-to-end autonomously</li>
                  <li>• Runs audits, refactors, and polish commands</li>
                  <li>• Conversational agents like <Code>/designer</Code></li>
                </ul>
              </div>
            </ScrollReveal>

            <ScrollReveal delay={80}>
              <div className="rounded-lg border border-border bg-card p-6">
                <p className="text-xs font-normal uppercase tracking-wide text-muted-foreground">
                  IDE Chat Agent
                </p>
                <h3 className="mt-2 font-display text-lg font-medium text-foreground md:text-xl">
                  AntiGravity
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                  Lives in the primary AI Chat panel in your IDE. Uses{" "}
                  <Code>.agents/workflows/</Code> to execute multi-step
                  instructions from a single prompt.
                </p>
                <ul className="mt-4 space-y-1.5 text-sm text-muted-foreground">
                  <li>• Strong visual processing — image to code</li>
                  <li>• Pre-built slash-command workflows</li>
                  <li>• Scaffold entire features from Figma mockups</li>
                  <li>• Works on the same codebase as Claude Code</li>
                </ul>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* ═══ FIGMA MCP — matches the Moog Playground CTA card ═══ */}
      <section className="scroll-mt-16 border-b border-border/60 md:scroll-mt-20">
        <div className="container px-4 py-12 md:px-6 md:py-16 lg:px-8 lg:py-20">
          <ScrollReveal>
            <div className="rounded-xl border border-border/60 px-5 py-5 md:px-6 md:py-6">
              <h3 className="font-display text-base font-medium tracking-tight text-foreground md:text-lg">
                Figma Superpowers via MCP
              </h3>
              <p className="mt-2 max-w-lg text-sm text-muted-foreground">
                Claude Code can read design data, layout structures, and
                typography directly from your live Figma files — no more
                screenshot exports.
              </p>
              <pre className="mt-4 overflow-x-auto rounded-lg border border-border bg-muted/30 px-4 py-3 font-mono text-xs leading-relaxed text-foreground md:text-sm">
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

            <PhaseItem number="Phase 1" icon="💡" title="Ideation — The Product Partner" isCurrent delay={0}>
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
                A prototype isn&apos;t testable if it doesn&apos;t save data.
                Create a Firebase project, enable <strong>Firestore</strong> and{" "}
                <strong>Authentication</strong>, grab your config keys, and
                paste them into a <Code>.env.local</Code> file (duplicated from{" "}
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
                Deploying isn&apos;t the end — it&apos;s the beginning! Gather
                user feedback, quotes, and pain points, then let Claude
                synthesise the messy data:
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
            {[
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
            ].map((snippet, i) => (
              <ScrollReveal asListItem key={snippet.label} delay={i * 60} className="flex">
                <div className="flex-1 rounded-lg border border-border bg-card p-4">
                  <p className="text-xs font-normal uppercase tracking-wide text-muted-foreground">
                    {snippet.label}
                  </p>
                  <p className="mt-1.5 break-words font-mono text-sm text-foreground">
                    {snippet.cmd}
                  </p>
                  <p className="mt-1 text-sm text-muted-foreground">
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
