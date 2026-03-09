import { describe, it, expect, vi, beforeEach, afterEach } from "vitest"
import { renderHook, act } from "@testing-library/react"
import { useChatState } from "./use-chat-state"

const STORAGE_KEY = "ai-chat-dismissed"
const COLLAPSE_DELAY = 4000

describe("useChatState", () => {
  let localStorageMock: Record<string, string>

  beforeEach(() => {
    vi.useFakeTimers()
    localStorageMock = {}
    vi.stubGlobal(
      "localStorage",
      {
        getItem: (key: string) => localStorageMock[key] ?? null,
        setItem: (key: string, value: string) => {
          localStorageMock[key] = value
        },
        removeItem: (key: string) => {
          delete localStorageMock[key]
        },
        clear: () => {
          localStorageMock = {}
        },
        length: 0,
        key: () => null,
      },
    )
  })

  afterEach(() => {
    vi.useRealTimers()
    vi.unstubAllGlobals()
  })

  it("starts as expanded-pill then collapses after COLLAPSE_DELAY", () => {
    const { result } = renderHook(() => useChatState())

    expect(result.current.state).toBe("expanded-pill")

    act(() => {
      vi.advanceTimersByTime(COLLAPSE_DELAY)
    })

    expect(result.current.state).toBe("collapsed")
  })

  it("stays dismissed when localStorage has ai-chat-dismissed=true", () => {
    localStorageMock[STORAGE_KEY] = "true"
    const { result } = renderHook(() => useChatState())

    expect(result.current.state).toBe("dismissed")
  })

  it("open() sets state to open and cancels collapse timer", () => {
    const { result } = renderHook(() => useChatState())

    act(() => {
      result.current.open()
    })
    expect(result.current.state).toBe("open")

    act(() => {
      vi.advanceTimersByTime(COLLAPSE_DELAY)
    })
    expect(result.current.state).toBe("open")
  })

  it("close() sets state back to collapsed", () => {
    const { result } = renderHook(() => useChatState())

    act(() => {
      result.current.open()
    })
    expect(result.current.state).toBe("open")

    act(() => {
      result.current.close()
    })
    expect(result.current.state).toBe("collapsed")
  })

  it("dismiss() sets state to dismissed and persists to localStorage", () => {
    const { result } = renderHook(() => useChatState())

    act(() => {
      result.current.dismiss()
    })

    expect(result.current.state).toBe("dismissed")
    expect(localStorageMock[STORAGE_KEY]).toBe("true")
  })

  it("dismiss() cancels collapse timer", () => {
    const { result } = renderHook(() => useChatState())

    act(() => {
      result.current.dismiss()
    })

    expect(result.current.state).toBe("dismissed")
    act(() => {
      vi.advanceTimersByTime(COLLAPSE_DELAY)
    })
    expect(result.current.state).toBe("dismissed")
  })
})
