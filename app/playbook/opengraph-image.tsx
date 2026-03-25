import { ImageResponse } from "next/og"

export const runtime = "edge"

export const alt = "AI Prototyping Playbook — Steven Dempster"
export const size = { width: 1200, height: 630 }
export const contentType = "image/png"

export default function PlaybookOpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          background: "#0c0c0f",
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: 72,
        }}
      >
        <div
          style={{
            fontSize: 22,
            fontWeight: 600,
            letterSpacing: 0.08,
            textTransform: "uppercase",
            color: "#71717a",
            marginBottom: 16,
          }}
        >
          Field guide
        </div>
        <div
          style={{
            fontSize: 52,
            fontWeight: 600,
            letterSpacing: -0.02,
            color: "#fafafa",
            lineHeight: 1.1,
            maxWidth: 1000,
          }}
        >
          AI Prototyping Playbook
        </div>
        <div
          style={{
            fontSize: 26,
            fontWeight: 500,
            color: "#a1a1aa",
            marginTop: 20,
            maxWidth: 900,
            lineHeight: 1.35,
          }}
        >
          Real, testable prototypes with Claude Code and AntiGravity
        </div>
        <div style={{ fontSize: 22, color: "#52525b", marginTop: 36 }}>
          Steven Dempster
        </div>
      </div>
    ),
    { ...size }
  )
}
