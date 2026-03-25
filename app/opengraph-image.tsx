import { ImageResponse } from "next/og"

export const runtime = "edge"

export const alt = "Steven Dempster — Product Design Lead, KPMG UK"
export const size = { width: 1200, height: 630 }
export const contentType = "image/png"

export default function OpenGraphImage() {
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
            fontSize: 56,
            fontWeight: 600,
            letterSpacing: -0.02,
            color: "#fafafa",
            lineHeight: 1.1,
          }}
        >
          Steven Dempster
        </div>
        <div
          style={{
            fontSize: 28,
            fontWeight: 500,
            color: "#a1a1aa",
            marginTop: 20,
            maxWidth: 900,
            lineHeight: 1.35,
          }}
        >
          Product Design Lead, KPMG UK — AI-assisted product development
        </div>
      </div>
    ),
    { ...size }
  )
}
