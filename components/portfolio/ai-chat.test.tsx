import { describe, it, expect, vi, beforeEach } from "vitest"
import { render, screen, within } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import { AiChat } from "./ai-chat"

function renderWithState(
  state: "dismissed" | "collapsed" | "expanded-pill" | "open",
) {
  const open = vi.fn()
  const close = vi.fn()
  const dismiss = vi.fn()
  const chatState = { state, open, close, dismiss }
  const result = render(<AiChat chatState={chatState} />)
  return { open, close, dismiss, ...result }
}

describe("AiChat", () => {
  beforeEach(() => {
    vi.clearAllMocks()
    global.fetch = vi.fn()
  })

  it("renders nothing when state is dismissed", () => {
    renderWithState("dismissed")
    expect(screen.queryByRole("button", { name: /ask about steven/i })).not.toBeInTheDocument()
    expect(screen.queryByLabelText(/chat with steven/i)).not.toBeInTheDocument()
  })

  it("renders trigger with accessible label when collapsed", () => {
    renderWithState("collapsed")
    const trigger = screen.getByRole("button", { name: /ask about steven/i })
    expect(trigger).toBeInTheDocument()
  })

  it("renders trigger when expanded-pill", () => {
    renderWithState("expanded-pill")
    const trigger = screen.getByRole("button", { name: /ask about steven/i })
    expect(trigger).toBeInTheDocument()
    expect(screen.getByText(/questions about steven\? ask the ai/i)).toBeInTheDocument()
  })

  it("calls open when trigger is clicked", async () => {
    const user = userEvent.setup()
    const { open } = renderWithState("collapsed")
    await user.click(screen.getByRole("button", { name: /ask about steven/i }))
    expect(open).toHaveBeenCalledTimes(1)
  })

  it("shows dismiss button when expanded-pill and calls dismiss when clicked", async () => {
    const user = userEvent.setup()
    const { dismiss } = renderWithState("expanded-pill")
    const dismissBtn = screen.getByRole("button", { name: /dismiss chat prompt/i })
    await user.click(dismissBtn)
    expect(dismiss).toHaveBeenCalledTimes(1)
  })

  it("when open, shows sheet with empty state and suggestion chips", () => {
    renderWithState("open")
    const sheet = screen.getByRole("dialog", { name: /ask about steven/i })
    expect(sheet).toBeInTheDocument()
    expect(within(sheet).getByText(/ask me anything/i)).toBeInTheDocument()
    expect(within(sheet).getByText(/suggested/i)).toBeInTheDocument()
  })

  it("when open, has close button that calls close", async () => {
    const user = userEvent.setup()
    const { close } = renderWithState("open")
    const closeBtn = within(screen.getByRole("dialog")).getByRole("button", {
      name: /close chat/i,
    })
    await user.click(closeBtn)
    expect(close).toHaveBeenCalledTimes(1)
  })

  it("when open, has input with placeholder and send button", () => {
    renderWithState("open")
    const input = screen.getByRole("textbox", { name: /type your question/i })
    expect(input.getAttribute("placeholder")).toMatch(/ask anything about steven/i)
    expect(screen.getByRole("button", { name: /send message/i })).toBeInTheDocument()
  })
})
