"use client"

import { useState, useEffect, useCallback, useRef } from "react"

export type ChatState = "dismissed" | "collapsed" | "expanded-pill" | "open"

const STORAGE_KEY = "ai-chat-dismissed"
const COLLAPSE_DELAY = 4000

export function useChatState() {
  const [state, setState] = useState<ChatState>("collapsed")
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  useEffect(() => {
    const dismissed = localStorage.getItem(STORAGE_KEY) === "true"
    if (dismissed) {
      setState("dismissed")
      return
    }
    // Show expanded pill, then auto-collapse after 4 s
    setState("expanded-pill")
    timerRef.current = setTimeout(() => {
      setState((prev) => (prev === "expanded-pill" ? "collapsed" : prev))
    }, COLLAPSE_DELAY)
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current)
    }
  }, [])

  const open = useCallback(() => {
    if (timerRef.current) clearTimeout(timerRef.current)
    setState("open")
  }, [])

  const close = useCallback(() => setState("collapsed"), [])

  const dismiss = useCallback(() => {
    if (timerRef.current) clearTimeout(timerRef.current)
    localStorage.setItem(STORAGE_KEY, "true")
    setState("dismissed")
  }, [])

  return { state, open, close, dismiss }
}
