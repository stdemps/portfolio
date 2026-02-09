import type { Metadata } from "next"
import { Inter_Tight, Space_Grotesk } from "next/font/google"
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import { Toaster } from "@/components/ui/sonner"
import { FathomAnalytics } from "@/components/analytics/fathom"
import { Agentation } from "agentation"
import { site } from "@/lib/portfolio-data"

const interTight = Inter_Tight({
  subsets: ["latin"],
  variable: "--font-display",
  display: "swap",
})
const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-body",
  display: "swap",
})

export const metadata: Metadata = {
  title: `${site.name} | Product Designer`,
  description: site.tagline,
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning className={`${interTight.variable} ${spaceGrotesk.variable}`}>
      <body className="font-sans antialiased">
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[100] focus:rounded-md focus:border focus:border-border focus:bg-background focus:px-4 focus:py-3 focus:text-sm focus:font-medium focus:ring-2 focus:ring-ring focus:ring-offset-2 focus:outline-none"
        >
          Skip to main content
        </a>
        <ThemeProvider>
          {children}
          <Toaster />
        </ThemeProvider>
        <FathomAnalytics />
        {process.env.NODE_ENV === "development" && <Agentation />}
      </body>
    </html>
  )
}

