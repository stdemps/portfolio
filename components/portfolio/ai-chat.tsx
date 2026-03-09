"use client"

import * as React from "react"
import { X, ArrowUp, Square, Mic, ChevronDown, ChevronUp, MessageCircle } from "lucide-react"
import ReactMarkdown from "react-markdown"
import remarkGfm from "remark-gfm"
import { cn } from "@/lib/utils"
import {
  Sheet,
  SheetContent,
  SheetTitle,
} from "@/components/ui/sheet"
import { useChatState } from "@/hooks/use-chat-state"
import { useMediaQuery } from "@/hooks/use-media-query"

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

type Message = { role: "user" | "assistant"; content: string }

export type ChatStateReturn = ReturnType<typeof useChatState>

// ---------------------------------------------------------------------------
// Constants
// ---------------------------------------------------------------------------

const SUGGESTIONS = [
  "What's your design process?",
  "Recent projects",
  "How to contact?",
  "How does he use AI?",
]

const WELCOME_BODY =
  "I can answer questions about Steven's experience, projects, and design process."
const WELCOME_HINT = "No script—just what he'd say in person."

const THINKING_PHRASES = [
  "Thinking…",
  "Checking notes…",
  "One moment…",
]

/** Typewriter: reveal one character from the buffer this often (~40 chars/sec) */
const TYPEWRITER_TICK_MS = 25


const speechSupported =
  typeof window !== "undefined" &&
  !!((window as any).SpeechRecognition || (window as any).webkitSpeechRecognition) // eslint-disable-line @typescript-eslint/no-explicit-any

// ---------------------------------------------------------------------------
// Pill / collapsed trigger
// ---------------------------------------------------------------------------

function ChatTrigger({
  state,
  onOpen,
  onDismiss,
}: {
  state: "expanded-pill" | "collapsed"
  onOpen: () => void
  onDismiss: () => void
}) {
  const isExpanded = state === "expanded-pill"

  return (
    <div
      className="fixed bottom-6 right-6 z-50"
      style={{ paddingBottom: "env(safe-area-inset-bottom)" }}
    >
      {/* Pill wrapper — flex row so the two buttons sit side by side */}
      <div
        className={cn(
          "flex items-center rounded-full bg-foreground text-background shadow-lg transition-all duration-300 ease-[cubic-bezier(0.25,1,0.5,1)] motion-reduce:transition-none",
          isExpanded ? "px-4 py-2.5 gap-2" : "h-11 w-11 justify-center"
        )}
      >
        {/* Main open button — when collapsed, fill circle and center icon */}
        <button
          type="button"
          onClick={onOpen}
          aria-label="Ask about Steven"
          title="Ask about Steven"
          className={cn(
            "flex cursor-pointer items-center transition-[opacity,transform] duration-200 ease-[cubic-bezier(0.25,1,0.5,1)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 hover:opacity-90 active:scale-[0.98] motion-reduce:active:scale-100",
            isExpanded ? "gap-2" : "h-11 w-11 shrink-0 justify-center"
          )}
        >
          {!isExpanded && (
            <MessageCircle className="h-[18px] w-[18px] shrink-0" aria-hidden />
          )}
          <span
            className={cn(
              "overflow-hidden whitespace-nowrap text-[13px] font-medium transition-all duration-300 ease-in-out",
              isExpanded ? "max-w-[220px] opacity-100" : "max-w-0 opacity-0"
            )}
          >
            Questions about Steven? Just ask
          </span>
        </button>

        {/* Dismiss button — sibling, not child */}
        {isExpanded && (
          <button
            type="button"
            onClick={onDismiss}
            aria-label="Dismiss chat prompt"
            className="ml-1 flex h-5 w-5 shrink-0 cursor-pointer items-center justify-center rounded-full bg-white/15 transition-colors duration-200 hover:bg-white/25 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-white active:scale-95 motion-reduce:active:scale-100"
          >
            <X className="h-3 w-3" aria-hidden />
          </button>
        )}
      </div>
    </div>
  )
}

// ---------------------------------------------------------------------------
// Empty state
// ---------------------------------------------------------------------------

function EmptyState() {
  return (
    <div className="empty-state-reveal flex flex-1 flex-col justify-start px-6 pt-10 pb-8">
      <p className="font-display text-base font-semibold text-foreground">
        What would you like to know?
      </p>
      <p className="mt-1 text-[13px] leading-relaxed text-muted-foreground">
        {WELCOME_BODY}
      </p>
      <p className="mt-2 text-[12px] text-muted-foreground">
        {WELCOME_HINT}
      </p>
    </div>
  )
}

// ---------------------------------------------------------------------------
// Suggestion carousel
// ---------------------------------------------------------------------------

function SuggestionCarousel({
  onSuggest,
  visible,
  onToggle,
}: {
  onSuggest: (s: string) => void
  visible: boolean
  onToggle: () => void
}) {
  return (
    <div className="shrink-0">
      {/* Toggle row */}
      <div className="flex items-center justify-between px-3 pt-2 pb-1">
        <span className="text-[10px] font-medium uppercase tracking-wide text-muted-foreground">
          Suggested
        </span>
        <button
          type="button"
          onClick={onToggle}
          aria-label={visible ? "Hide suggestions" : "Show suggestions"}
          className="flex cursor-pointer items-center gap-1 rounded text-[10px] text-muted-foreground transition-colors duration-200 hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
        >
          {visible ? (
            <>Hide <ChevronDown className="h-3 w-3" aria-hidden /></>
          ) : (
            <>Show <ChevronUp className="h-3 w-3" aria-hidden /></>
          )}
        </button>
      </div>

      {/* Scrollable chip row — grid-template-rows for smooth expand/collapse */}
      <div
        className="grid overflow-hidden transition-[grid-template-rows] duration-200 ease-[cubic-bezier(0.25,1,0.5,1)] motion-reduce:transition-none"
        style={{ gridTemplateRows: visible ? "1fr" : "0fr" }}
      >
        <div className="min-h-0 overflow-hidden">
          <div className="relative pb-1">
            {/* Fade hint on right edge */}
            <div className="pointer-events-none absolute inset-y-0 right-0 w-8 bg-gradient-to-l from-background to-transparent z-10" aria-hidden />
            <div
              className="flex gap-2 overflow-x-auto pl-3.5 pr-0 pb-0.5 ml-3 mr-3"
              style={{
                scrollSnapType: "x mandatory",
                scrollbarWidth: "none",
                WebkitOverflowScrolling: "touch",
              }}
            >
              {SUGGESTIONS.map((s) => (
                <button
                  key={s}
                  type="button"
                  onClick={() => onSuggest(s)}
                  style={{ scrollSnapAlign: "start" }}
                  className="shrink-0 cursor-pointer rounded-full bg-muted px-3 py-1.5 text-xs text-muted-foreground transition-[color,transform] duration-150 ease-[cubic-bezier(0.25,1,0.5,1)] hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring active:scale-[0.98] motion-reduce:active:scale-100"
                >
                  {s}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

// ---------------------------------------------------------------------------
// Markdown renderer (AI bubbles only)
// ---------------------------------------------------------------------------

function MarkdownMessage({ content }: { content: string }) {
  return (
    <ReactMarkdown
      remarkPlugins={[remarkGfm]}
      components={{
        // Headers → bold text, no size bump (keep chat feel)
        h1: ({ children }) => <p className="font-semibold">{children}</p>,
        h2: ({ children }) => <p className="font-semibold">{children}</p>,
        h3: ({ children }) => <p className="font-semibold">{children}</p>,
        h4: ({ children }) => <p className="font-semibold">{children}</p>,
        h5: ({ children }) => <p className="font-semibold">{children}</p>,
        h6: ({ children }) => <p className="font-semibold">{children}</p>,
        // Paragraphs — small gap between them
        p: ({ children }) => <p className="mt-1.5 first:mt-0">{children}</p>,
        // Compact lists — feel like chat, not a document
        ul: ({ children }) => <ul className="mt-1.5 space-y-0.5 pl-3">{children}</ul>,
        ol: ({ children }) => <ol className="mt-1.5 space-y-0.5 pl-3 list-decimal">{children}</ol>,
        li: ({ children }) => (
          <li className="flex gap-1.5">
            <span className="mt-[5px] h-1 w-1 shrink-0 rounded-full bg-current opacity-50" aria-hidden />
            <span>{children}</span>
          </li>
        ),
        // Links open in new tab
        a: ({ href, children }) => (
          <a
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            className="text-primary underline underline-offset-2 hover:opacity-80"
          >
            {children}
          </a>
        ),
        // Inline code — semantic muted bg for light/dark
        code: ({ children }) => (
          <code className="rounded bg-muted px-1 py-0.5 font-mono text-[12px]">{children}</code>
        ),
        // Suppress horizontal rules
        hr: () => null,
        // Blockquote — subtle left border (for testimonial-style quotes)
        blockquote: ({ children }) => (
          <blockquote className="mt-1.5 border-l-2 border-current/30 pl-2.5 opacity-80">
            {children}
          </blockquote>
        ),
      }}
    >
      {content}
    </ReactMarkdown>
  )
}

// ---------------------------------------------------------------------------
// Message list
// ---------------------------------------------------------------------------

function MessageList({ messages }: { messages: Message[] }) {
  const endRef = React.useRef<HTMLDivElement>(null)
  const isStreaming =
    messages.length > 0 &&
    messages[messages.length - 1].role === "assistant" &&
    messages[messages.length - 1].content === ""
  const [thinkingIndex, setThinkingIndex] = React.useState(0)

  React.useEffect(() => {
    endRef.current?.scrollIntoView({
      behavior: isStreaming ? "auto" : "smooth",
      block: "end",
    })
  }, [messages, isStreaming])

  // Rotate thinking phrase every 2.5s while streaming (delight: human, not robotic)
  React.useEffect(() => {
    if (!isStreaming) return
    const id = setInterval(() => {
      setThinkingIndex((i) => (i + 1) % THINKING_PHRASES.length)
    }, 2500)
    return () => clearInterval(id)
  }, [isStreaming])

  return (
    <div
      role="log"
      aria-live="polite"
      aria-label="Conversation"
      className="flex flex-1 flex-col gap-3 overflow-y-auto px-4 py-4"
    >
      {messages.map((msg, i) => (
        <div
          key={i}
          className={cn("flex", msg.role === "user" ? "justify-end" : "justify-start")}
        >
          <div
            className={cn(
              "max-w-[88%] px-3 py-2 text-[13px] leading-relaxed",
              msg.role === "user"
                ? "message-bubble-in rounded-[10px_10px_2px_10px] bg-primary text-primary-foreground"
                : "rounded-[10px_10px_10px_2px] bg-muted text-foreground"
            )}
          >
            {msg.role === "assistant" && msg.content ? (
              <>
                <MarkdownMessage content={msg.content} />
                {isStreaming && i === messages.length - 1 && (
                  <span
                    className="ml-0.5 inline-block h-4 w-0.5 animate-pulse bg-current opacity-70 align-middle motion-reduce:animate-none"
                    aria-hidden
                  />
                )}
              </>
            ) : msg.content ? (
              msg.content
            ) : (
              /* Thinking: rotating phrase + dots (delight: human, not robotic) */
              <span className="flex items-center gap-1.5">
                <span className="text-muted-foreground/90" aria-hidden>
                  {THINKING_PHRASES[thinkingIndex]}
                </span>
                <span className="flex items-center gap-0.5" aria-hidden>
                  {[0, 150, 300].map((delay) => (
                    <span
                      key={delay}
                      className="inline-block h-1.5 w-1.5 animate-bounce rounded-full bg-current opacity-60 motion-reduce:animate-none"
                      style={{ animationDelay: `${delay}ms` }}
                    />
                  ))}
                </span>
                <span className="sr-only">Steven's assistant is typing</span>
              </span>
            )}
          </div>
        </div>
      ))}
      <div ref={endRef} />
    </div>
  )
}

// ---------------------------------------------------------------------------
// Input bar
// ---------------------------------------------------------------------------

function InputBar({
  value,
  onChange,
  onSend,
  onStop,
  isStreaming,
  inputRef,
}: {
  value: string
  onChange: (v: string) => void
  onSend: () => void
  onStop: () => void
  isStreaming: boolean
  inputRef: React.RefObject<HTMLTextAreaElement | null>
}) {
  const [isRecording, setIsRecording] = React.useState(false)
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const recognitionRef = React.useRef<any>(null)

  // Stop mic on unmount if recording
  React.useEffect(() => {
    return () => { recognitionRef.current?.stop() }
  }, [])

  function toggleRecording() {
    if (isRecording) {
      recognitionRef.current?.stop()
      return
    }

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const SR = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition as any
    const recognition = new SR()
    recognition.continuous = false
    recognition.interimResults = true
    recognition.lang = "en-GB"

    recognition.onresult = (e: any) => {
      const transcript = Array.from(e.results as any[])
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        .map((r: any) => r[0].transcript)
        .join("")
      onChange(transcript)
    }

    recognition.onend = () => setIsRecording(false)
    recognition.onerror = () => setIsRecording(false)

    recognitionRef.current = recognition
    recognition.start()
    setIsRecording(true)
  }

  function handleKeyDown(e: React.KeyboardEvent<HTMLTextAreaElement>) {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      onSend()
    }
  }

  return (
    <div
      className="shrink-0 border-t border-border px-3 py-3"
      style={{ paddingBottom: "calc(12px + env(safe-area-inset-bottom))" }}
    >
      {/* Modern input container — textarea + action row */}
      <div className="rounded-xl border border-border bg-background transition-[border-color] duration-200 ease-[cubic-bezier(0.25,1,0.5,1)] focus-within:border-foreground/40">
        <textarea
          ref={inputRef}
          value={value}
          onChange={(e) => {
            onChange(e.target.value)
            // Auto-resize
            e.target.style.height = "auto"
            e.target.style.height = `${e.target.scrollHeight}px`
          }}
          onKeyDown={handleKeyDown}
          placeholder="Ask anything about Steven…"
          disabled={isStreaming}
          rows={2}
          aria-label="Type your question"
          className="w-full resize-none bg-transparent px-3.5 pt-3 pb-1 font-sans text-[13px] text-foreground placeholder:text-muted-foreground outline-none focus-visible:ring-0 focus-visible:ring-offset-0 disabled:opacity-50"
          style={{ maxHeight: "120px", overflowY: "auto" }}
        />

        {/* Action row — left: mic, right: send/stop */}
        <div className="flex items-center justify-between px-2 pb-2">
          {/* Mic button — left side, only if supported */}
          {speechSupported ? (
            <button
              type="button"
              onClick={toggleRecording}
              disabled={isStreaming}
              aria-label={isRecording ? "Stop recording" : "Start voice input"}
              className={cn(
                "flex h-8 w-8 cursor-pointer items-center justify-center rounded-lg transition-[color,transform] duration-150 ease-[cubic-bezier(0.25,1,0.5,1)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-40 active:scale-[0.97] motion-reduce:active:scale-100",
                isRecording
                  ? "bg-red-500/10 text-red-500 ring-2 ring-red-500/30 animate-pulse motion-reduce:animate-none"
                  : "text-muted-foreground hover:bg-muted hover:text-foreground"
              )}
            >
              <Mic className="h-4 w-4" aria-hidden />
            </button>
          ) : (
            <span />
          )}

          {/* Stop button — shown while streaming */}
          {isStreaming && (
            <button
              type="button"
              onClick={onStop}
              aria-label="Stop generating"
              className="flex h-8 w-8 cursor-pointer items-center justify-center rounded-lg bg-foreground text-background transition-[opacity,transform] duration-150 ease-[cubic-bezier(0.25,1,0.5,1)] hover:opacity-80 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring active:scale-[0.97] motion-reduce:active:scale-100"
            >
              <Square className="h-3.5 w-3.5 shrink-0 fill-current" aria-hidden />
            </button>
          )}

          {/* Send button — animates in when text is present, hidden otherwise */}
          {!isStreaming && (
            <button
              type="button"
              onClick={onSend}
              disabled={!value.trim()}
              aria-label="Send message"
              className={cn(
                "flex h-8 w-8 cursor-pointer items-center justify-center rounded-lg bg-foreground text-background transition-[opacity,transform] duration-200 ease-[cubic-bezier(0.25,1,0.5,1)] hover:opacity-80 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring active:scale-[0.97] motion-reduce:active:scale-100",
                value.trim()
                  ? "opacity-100 scale-100"
                  : "opacity-0 scale-75 pointer-events-none"
              )}
            >
              <ArrowUp className="h-4 w-4 shrink-0 block" aria-hidden />
            </button>
          )}
        </div>
      </div>

      <p className="mt-2 text-center text-[10px] text-muted-foreground">
        Answers are based on Steven&apos;s real background and experience.
      </p>
    </div>
  )
}

// ---------------------------------------------------------------------------
// Panel contents — shared between desktop aside and mobile Sheet
// ---------------------------------------------------------------------------

function PanelContents({
  messages,
  panelOpenKey,
  showSuggestions,
  setShowSuggestions,
  input,
  setInput,
  isStreaming,
  inputRef,
  sendMessage,
  stopStreaming,
  onClose,
}: {
  messages: Message[]
  panelOpenKey: number
  showSuggestions: boolean
  setShowSuggestions: React.Dispatch<React.SetStateAction<boolean>>
  input: string
  setInput: React.Dispatch<React.SetStateAction<string>>
  isStreaming: boolean
  inputRef: React.RefObject<HTMLTextAreaElement | null>
  sendMessage: (text: string) => Promise<void>
  stopStreaming: () => void
  onClose: () => void
}) {
  return (
    <>
      {/* Panel header */}
      <div className="flex h-14 shrink-0 items-center justify-between border-b border-border px-4">
        <span className="font-display text-sm font-semibold tracking-tight">
          Ask about Steven
        </span>
        <button
          type="button"
          onClick={onClose}
          aria-label="Close chat"
          className="flex h-7 w-7 cursor-pointer items-center justify-center rounded border border-border text-muted-foreground transition-[color,transform] duration-150 ease-[cubic-bezier(0.25,1,0.5,1)] hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 active:scale-95 motion-reduce:active:scale-100"
        >
          <X className="h-4 w-4" aria-hidden />
        </button>
      </div>

      {/* Body */}
      {messages.length === 0 ? (
        <EmptyState key={`empty-${panelOpenKey}`} />
      ) : (
        <MessageList messages={messages} />
      )}

      {/* Suggestion carousel — only before first message */}
      {messages.length === 0 && (
        <SuggestionCarousel
          onSuggest={(s) => sendMessage(s)}
          visible={showSuggestions}
          onToggle={() => setShowSuggestions((v) => !v)}
        />
      )}

      {/* Input */}
      <InputBar
        value={input}
        onChange={setInput}
        onSend={() => sendMessage(input)}
        onStop={stopStreaming}
        isStreaming={isStreaming}
        inputRef={inputRef}
      />
    </>
  )
}

// ---------------------------------------------------------------------------
// Root component — composes everything
// ---------------------------------------------------------------------------

export function AiChat({ chatState }: { chatState: ChatStateReturn }) {
  const { state, open, close, dismiss } = chatState
  const [messages, setMessages] = React.useState<Message[]>([])
  const [input, setInput] = React.useState("")
  const [isStreaming, setIsStreaming] = React.useState(false)
  const [showSuggestions, setShowSuggestions] = React.useState(true)
  const [panelOpenKey, setPanelOpenKey] = React.useState(0)
  const inputRef = React.useRef<HTMLTextAreaElement>(null)
  const streamBufferRef = React.useRef("")
  const streamEndedRef = React.useRef(false)
  const drainIntervalRef = React.useRef<ReturnType<typeof setInterval> | null>(null)
  const abortControllerRef = React.useRef<AbortController | null>(null)

  // Cleanup drain interval on unmount
  React.useEffect(() => {
    return () => {
      if (drainIntervalRef.current) clearInterval(drainIntervalRef.current)
    }
  }, [])

  // Remount empty state + reset suggestions when panel opens
  React.useEffect(() => {
    if (state === "open") {
      setPanelOpenKey((k) => k + 1)
      setShowSuggestions(true)
      // Focus the input
      setTimeout(() => inputRef.current?.focus(), 50)
    }
  }, [state])

  // Easter egg: one console message when panel opens (for curious devs / recruiters)
  const hasLoggedRef = React.useRef(false)
  React.useEffect(() => {
    if (state === "open" && !hasLoggedRef.current) {
      hasLoggedRef.current = true
      console.log(
        "Chat built with Next.js + Vercel AI SDK. View source to explore."
      )
    }
  }, [state])

  function stopStreaming() {
    abortControllerRef.current?.abort()
    streamEndedRef.current = true
    if (drainIntervalRef.current) {
      clearInterval(drainIntervalRef.current)
      drainIntervalRef.current = null
    }
    setIsStreaming(false)
  }

  async function sendMessage(text: string) {
    const trimmed = text.trim()
    if (!trimmed || isStreaming) return

    const userMessage: Message = { role: "user", content: trimmed }
    const nextMessages = [...messages, userMessage]
    setMessages(nextMessages)
    setInput("")
    setIsStreaming(true)

    // Append empty assistant message to stream into
    setMessages((prev) => [...prev, { role: "assistant", content: "" }])
    streamBufferRef.current = ""
    streamEndedRef.current = false
    if (drainIntervalRef.current) {
      clearInterval(drainIntervalRef.current)
      drainIntervalRef.current = null
    }

    // Typewriter: drain buffer character-by-character at a steady rate
    drainIntervalRef.current = setInterval(() => {
      const buf = streamBufferRef.current
      if (buf.length > 0) {
        const first = buf[0]
        streamBufferRef.current = buf.slice(1)
        setMessages((prev) => {
          const updated = [...prev]
          const last = updated.length - 1
          if (last >= 0 && updated[last].role === "assistant") {
            updated[last] = {
              ...updated[last],
              content: updated[last].content + first,
            }
          }
          return updated
        })
      } else if (streamEndedRef.current) {
        if (drainIntervalRef.current) {
          clearInterval(drainIntervalRef.current)
          drainIntervalRef.current = null
        }
        setIsStreaming(false)
      }
    }, TYPEWRITER_TICK_MS)

    const controller = new AbortController()
    abortControllerRef.current = controller

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: nextMessages }),
        signal: controller.signal,
      })

      if (!res.ok || !res.body) throw new Error("Request failed")

      const reader = res.body.getReader()
      const decoder = new TextDecoder()

      while (true) {
        const { done, value } = await reader.read()
        if (done) break
        const chunk = decoder.decode(value, { stream: true })
        streamBufferRef.current += chunk
      }
      streamEndedRef.current = true
    } catch (err) {
      // Aborted by user — leave whatever was typed so far, just stop
      if (err instanceof Error && err.name === "AbortError") {
        streamEndedRef.current = true
        return
      }
      streamEndedRef.current = true
      if (drainIntervalRef.current) {
        clearInterval(drainIntervalRef.current)
        drainIntervalRef.current = null
      }
      setMessages((prev) => {
        const updated = [...prev]
        updated[updated.length - 1] = {
          role: "assistant",
          content:
            "Something went wrong on our end. You can reach Steven directly at steven.dempster@hotmail.co.uk",
        }
        return updated
      })
      setIsStreaming(false)
    }
  }

  if (state === "dismissed") return null

  const panelProps = {
    messages,
    panelOpenKey,
    showSuggestions,
    setShowSuggestions,
    input,
    setInput,
    isStreaming,
    inputRef,
    sendMessage,
    stopStreaming,
    onClose: close,
  }

  const isOpen = state === "open"
  const isDesktop = useMediaQuery("(min-width: 768px)")

  return (
    <>
      {/* Floating pill / collapsed icon trigger — hidden when panel is open */}
      {!isOpen && (
        <ChatTrigger
          state={state}
          onOpen={open}
          onDismiss={dismiss}
        />
      )}

      {/* Desktop panel: sticky aside inside the grid column */}
      {isDesktop && (
        <aside
          aria-label="Chat with Steven's AI assistant"
          aria-hidden={!isOpen}
          className={cn(
            "flex flex-col border-l border-border bg-background",
            "sticky top-0 h-svh overflow-hidden",
            isOpen ? "w-full" : "w-0 border-l-0"
          )}
        >
          {isOpen && <PanelContents {...panelProps} />}
        </aside>
      )}

      {/* Mobile panel: bottom Sheet — only mounted on mobile to avoid scroll lock on desktop */}
      {!isDesktop && (
        <Sheet open={isOpen} onOpenChange={(o) => !o && close()}>
          <SheetContent
            side="bottom"
            aria-label="Chat with Steven's AI assistant"
            className="flex flex-col p-0 h-[85svh] rounded-t-2xl"
            onOpenAutoFocus={(e) => { e.preventDefault(); inputRef.current?.focus() }}
          >
            <SheetTitle className="sr-only">Ask about Steven</SheetTitle>
            <PanelContents {...panelProps} />
          </SheetContent>
        </Sheet>
      )}
    </>
  )
}
