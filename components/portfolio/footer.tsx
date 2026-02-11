import Image from "next/image"
import { site } from "@/lib/portfolio-data"

export function Footer() {
  const year = new Date().getFullYear()

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
            className="h-5 w-5"
            aria-hidden
          />
        </p>
        <p className="text-sm text-muted-foreground">
          © {year} {site.name}
        </p>
      </div>
    </footer>
  )
}
