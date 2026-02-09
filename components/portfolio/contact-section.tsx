"use client"

import { useState } from "react"
import { CheckCircle2 } from "lucide-react"
import { site } from "@/lib/portfolio-data"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"

const FORMSPREE_URL = "https://formspree.io/f"

export function ContactSection() {
  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle")
  const formId = process.env.NEXT_PUBLIC_FORMSPREE_FORM_ID
  const action = formId ? `${FORMSPREE_URL}/${formId}` : null

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    if (!action) {
      setStatus("error")
      return
    }
    const form = e.currentTarget
    const formData = new FormData(form)
    setStatus("sending")
    try {
      const res = await fetch(action, {
        method: "POST",
        body: formData,
        headers: { Accept: "application/json" },
      })
      if (res.ok) {
        setStatus("success")
        form.reset()
      } else {
        setStatus("error")
      }
    } catch {
      setStatus("error")
    }
  }

  return (
    <section id="contact" className="scroll-mt-16 border-t border-border/60 md:scroll-mt-20">
      <div className="container px-4 py-12 md:px-6 md:py-16 lg:px-8 lg:py-20">
        <div className="mx-auto max-w-xl">
          <h2 className="font-display text-2xl font-semibold tracking-tight text-foreground md:text-3xl">
            Get in touch
          </h2>
          <p className="mt-2 text-sm text-muted-foreground md:text-base">
            Open to freelance and full-time opportunities.
          </p>

          <div className="mt-8 md:mt-10">
            {!formId && (
              <p className="mb-5 rounded-md border border-border/60 bg-muted/50 px-4 py-3 text-sm text-muted-foreground" role="status">
                Form not configured — use the Email link below to get in touch.
              </p>
            )}

            <form
              onSubmit={handleSubmit}
              action={action ?? undefined}
              method="POST"
              className="space-y-5"
            >
              <div className="space-y-2">
                <Label htmlFor="contact-name">Name</Label>
                <Input
                  id="contact-name"
                  name="name"
                  type="text"
                  placeholder="Your name"
                  className="h-11 bg-muted/50"
                  required
                  aria-required
                  disabled={status === "sending"}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="contact-email">Email</Label>
                <Input
                  id="contact-email"
                  name="email"
                  type="email"
                  placeholder="jane@example.com"
                  className="h-11 bg-muted/50"
                  required
                  aria-required
                  disabled={status === "sending"}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="contact-message">Your message</Label>
                <Textarea
                  id="contact-message"
                  name="message"
                  placeholder="Say hello..."
                  rows={5}
                  className="resize-y bg-muted/50"
                  required
                  aria-required
                  disabled={status === "sending"}
                />
              </div>
              {status === "error" && (
                <p className="text-sm text-destructive" role="alert">
                  Something went wrong. Please try again or email me directly.
                </p>
              )}
              {status === "success" && (
                <p className="flex items-center gap-2 text-sm text-foreground" role="status" aria-live="polite">
                  <CheckCircle2 className="h-5 w-5 shrink-0 text-primary" aria-hidden />
                  Message sent — I&apos;ll get back to you soon.
                </p>
              )}
              <Button
                type="submit"
                size="lg"
                className="h-11 w-full focus-visible:ring-2 focus-visible:ring-offset-2 md:w-auto"
                disabled={status === "sending" || !formId}
              >
                {status === "sending" ? "Sending…" : "Send"}
              </Button>
            </form>
          </div>

          <div className="mt-8 flex flex-wrap gap-6 md:mt-10">
            <a
              href={`mailto:${site.email}`}
              className="text-sm font-medium text-foreground underline decoration-foreground/50 underline-offset-2 hover:decoration-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:rounded-sm"
            >
              Email
            </a>
            <a
              href={site.linkedIn}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn (opens in new tab)"
              className="text-sm text-muted-foreground underline decoration-muted-foreground/50 underline-offset-2 hover:text-foreground hover:decoration-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:rounded-sm"
            >
              LinkedIn
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}
