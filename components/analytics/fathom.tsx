import Script from "next/script"

const FATHOM_SCRIPT_URL =
  process.env.NEXT_PUBLIC_FATHOM_SCRIPT_URL || "https://cdn.usefathom.com/script.js"

export function FathomAnalytics() {
  const siteId = process.env.NEXT_PUBLIC_FATHOM_SITE_ID
  if (!siteId) return null

  return (
    <Script
      src={FATHOM_SCRIPT_URL}
      data-site={siteId}
      strategy="afterInteractive"
      defer
    />
  )
}
