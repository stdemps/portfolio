"use client"

import { useEffect } from "react"
import Image from "next/image"
import { site } from "@/lib/portfolio-data"

export function Footer() {
  const year = new Date().getFullYear()

  useEffect(() => {
    if (process.env.NODE_ENV === "development") {
      console.log(
        "%cHey, curious dev — like what you see? This portfolio is built with Next.js, Tailwind, and a lot of care. Say hi: steven@stevendempster.com",
        "color: #64748b; font-size: 12px;"
      )
    }
  }, [])

  return (
    <footer className="border-t border-border/60 bg-muted/30">
      <div className="container flex flex-col gap-4 px-4 py-8 md:flex-row md:items-center md:justify-between md:px-6 md:py-10 lg:px-8">
        <p className="flex items-center gap-2 font-display text-sm font-medium text-foreground">
          {site.name}{" "}
          <Image
            src={site.avatar}
            alt=""
            width={20}
            height={20}
            className="h-5 w-5 transition-transform duration-200 ease-[cubic-bezier(0.25,1,0.5,1)] hover:scale-105"
            aria-hidden
            title={`${site.name} · Product design lead`}
          />
        </p>
        <p className="text-sm text-muted-foreground">
          © {year} {site.name}
        </p>
      </div>
    </footer>
  )
}
