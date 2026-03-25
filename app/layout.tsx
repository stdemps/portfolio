import type { Metadata } from "next";
import {
  Inter_Tight,
  Space_Grotesk,
  JetBrains_Mono,
  Space_Mono,
  VT323,
} from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { THEME_INIT_SCRIPT_HTML } from "@/lib/theme-init-script";
import { Toaster } from "@/components/ui/sonner";
import { Analytics } from "@vercel/analytics/next";
import { FathomAnalytics } from "@/components/analytics/fathom";
import { Agentation } from "agentation";
import { site } from "@/lib/portfolio-data";
import { ChatLayout } from "@/components/portfolio/chat-layout";
import { getSiteUrl } from "@/lib/site-url";
import { SiteJsonLd } from "@/components/seo/site-json-ld";

const siteUrl = getSiteUrl();
const defaultTitle = `${site.name} | Product Design Lead, KPMG UK`;

const interTight = Inter_Tight({
  subsets: ["latin"],
  variable: "--font-display",
  display: "swap",
});
const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-body",
  display: "swap",
});
const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  display: "swap",
});
const vt323 = VT323({
  subsets: ["latin"],
  variable: "--font-vfd",
  weight: "400",
  display: "swap",
});
const spaceMono = Space_Mono({
  subsets: ["latin"],
  variable: "--font-synth",
  weight: ["400", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: defaultTitle,
    template: `%s | ${site.name}`,
  },
  description: site.tagline,
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: "en_GB",
    url: siteUrl,
    siteName: site.name,
    title: defaultTitle,
    description: site.tagline,
  },
  twitter: {
    card: "summary_large_image",
    title: defaultTitle,
    description: site.tagline,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${interTight.variable} ${spaceGrotesk.variable} ${jetbrainsMono.variable} ${spaceMono.variable} ${vt323.variable}`}
    >
      <head>
        <script
          suppressHydrationWarning
          dangerouslySetInnerHTML={{ __html: THEME_INIT_SCRIPT_HTML }}
        />
        <SiteJsonLd siteUrl={siteUrl} />
      </head>
      <body className="font-sans antialiased overflow-x-hidden">
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[100] focus:rounded-md focus:border focus:border-border focus:bg-background focus:px-4 focus:py-3 focus:text-sm focus:font-medium focus:ring-2 focus:ring-ring focus:ring-offset-2 focus:outline-none"
        >
          Skip to main content
        </a>
        <ThemeProvider>
          <ChatLayout>
            {children}
          </ChatLayout>
          <Toaster />
        </ThemeProvider>
        <FathomAnalytics />
        <Analytics />
        {process.env.NODE_ENV === "development" && <Agentation />}
      </body>
    </html>
  );
}
