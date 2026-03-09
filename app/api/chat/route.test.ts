import { describe, it, expect, vi, beforeEach } from "vitest"

function createMockStream() {
  return (async function* () {
    yield {
      type: "content_block_delta",
      delta: { type: "text_delta", text: "Hello " },
    }
    yield {
      type: "content_block_delta",
      delta: { type: "text_delta", text: "from AI" },
    }
  })()
}

vi.mock("@anthropic-ai/sdk", () => ({
  default: class MockAnthropic {
    messages = {
      create: vi.fn().mockImplementation(() => createMockStream()),
    }
  },
}))

describe("POST /api/chat", () => {
  beforeEach(() => {
    vi.resetModules()
  })

  it("returns 400 when body is missing messages", async () => {
    const { POST } = await import("./route")
    const req = new Request("http://localhost/api/chat", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({}),
    })
    const res = await POST(req)
    expect(res.status).toBe(400)
    expect(await res.text()).toBe("Invalid messages")
  })

  it("returns 400 when messages is not an array", async () => {
    const { POST } = await import("./route")
    const req = new Request("http://localhost/api/chat", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ messages: "not-array" }),
    })
    const res = await POST(req)
    expect(res.status).toBe(400)
    expect(await res.text()).toBe("Invalid messages")
  })

  it("returns 400 when messages is empty array", async () => {
    const { POST } = await import("./route")
    const req = new Request("http://localhost/api/chat", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ messages: [] }),
    })
    const res = await POST(req)
    expect(res.status).toBe(400)
    expect(await res.text()).toBe("Invalid messages")
  })

  it("returns 200 with streaming text when messages are valid", async () => {
    const { POST } = await import("./route")
    const req = new Request("http://localhost/api/chat", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        messages: [{ role: "user", content: "Hi" }],
      }),
    })
    const res = await POST(req)
    expect(res.status).toBe(200)
    expect(res.headers.get("Content-Type")).toBe("text/plain; charset=utf-8")
    expect(res.body).toBeDefined()
    const reader = res.body!.getReader()
    const decoder = new TextDecoder()
    let text = ""
    while (true) {
      const { done, value } = await reader.read()
      if (done) break
      text += decoder.decode(value)
    }
    expect(text).toBe("Hello from AI")
  })
})
