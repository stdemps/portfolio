"use client"

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react"

const STORAGE_KEY = "portfolio-view-mode"

export type ViewMode = "Simple" | "Playground"

const DEFAULT_VIEW_MODE: ViewMode = "Simple"

function getStoredViewMode(): ViewMode {
  if (typeof window === "undefined") return DEFAULT_VIEW_MODE
  try {
    const stored = window.localStorage.getItem(STORAGE_KEY)
    if (stored === "Simple" || stored === "Playground") return stored
  } catch {
    // ignore
  }
  return DEFAULT_VIEW_MODE
}

type ViewModeContextValue = [ViewMode, (mode: ViewMode) => void]

const ViewModeContext = createContext<ViewModeContextValue | null>(null)

/**
 * Provider that shares view mode state across all consumers.
 * Ensures the header toggle and main content stay in sync.
 */
export function ViewModeProvider({ children }: { children: ReactNode }) {
  const [viewMode, setViewModeState] = useState<ViewMode>(DEFAULT_VIEW_MODE)

  useEffect(() => {
    setViewModeState(getStoredViewMode())
  }, [])

  const setViewMode = useCallback((mode: ViewMode) => {
    setViewModeState(mode)
    try {
      window.localStorage.setItem(STORAGE_KEY, mode)
    } catch {
      // ignore
    }
  }, [])

  return (
    <ViewModeContext.Provider value={[viewMode, setViewMode]}>
      {children}
    </ViewModeContext.Provider>
  )
}

/**
 * Persists view mode to localStorage and returns current value + setter.
 * Must be used within ViewModeProvider for state to sync across components.
 */
export function useViewMode(): ViewModeContextValue {
  const ctx = useContext(ViewModeContext)
  if (!ctx) {
    throw new Error("useViewMode must be used within ViewModeProvider")
  }
  return ctx
}
