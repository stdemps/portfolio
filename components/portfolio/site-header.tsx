import Image from "next/image"
import Link from "next/link"
import { site } from "@/lib/portfolio-data"
import { ThemeToggle } from "@/components/theme-toggle"

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/60 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/80">
      <div className="container flex h-14 md:h-16 items-center justify-between px-4 md:px-6 lg:px-8">
        <Link
          href="/"
          className="flex items-center gap-2 font-display text-lg font-semibold tracking-tight text-foreground md:text-xl"
          aria-label={`${site.name} — home`}
        >
          {site.name}{" "}
          <Image
            src={site.avatar}
            alt=""
            width={24}
            height={24}
            className="h-6 w-6 md:h-7 md:w-7"
            aria-hidden
          />
        </Link>
        <ThemeToggle />
      </div>
    </header>
  )
}
