import { z } from "zod/v4"
import Anthropic from "@anthropic-ai/sdk"
import { SYSTEM_PROMPT } from "@/lib/ai-context"
import { isRateLimited } from "@/lib/rate-limit"

const client = new Anthropic()

export const runtime = "nodejs"

const MAX_MESSAGE_LENGTH = 2000
const MAX_CONVERSATION_LENGTH = 40

const messageSchema = z.object({
  role: z.enum(["user", "assistant"]),
  content: z.string().min(1).max(MAX_MESSAGE_LENGTH),
})

const bodySchema = z.object({
  messages: z.array(messageSchema).min(1).max(MAX_CONVERSATION_LENGTH),
})

export async function POST(request: Request) {
  // --- Rate limiting (keyed by IP) ---
  const forwarded = request.headers.get("x-forwarded-for")
  const ip = forwarded?.split(",")[0]?.trim() ?? "unknown"

  if (isRateLimited(ip)) {
    return new Response("Too many requests — please wait a moment.", {
      status: 429,
    })
  }

  // --- Input validation ---
  const parsed = bodySchema.safeParse(await request.json())

  if (!parsed.success) {
    return new Response("Invalid messages", { status: 400 })
  }

  const { messages } = parsed.data

  const stream = await client.messages.create({
    model: "claude-sonnet-4-6",
    max_tokens: 1024,
    system: SYSTEM_PROMPT,
    messages,
    stream: true,
  })

  const encoder = new TextEncoder()

  const readable = new ReadableStream({
    async start(controller) {
      for await (const event of stream) {
        if (
          event.type === "content_block_delta" &&
          event.delta.type === "text_delta"
        ) {
          controller.enqueue(encoder.encode(event.delta.text))
        }
      }
      controller.close()
    },
  })

  return new Response(readable, {
    headers: { "Content-Type": "text/plain; charset=utf-8" },
  })
}
