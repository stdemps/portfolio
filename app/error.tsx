"use client"

import { useEffect } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { AlertCircle } from "lucide-react"

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    console.error(error)
  }, [error])

  return (
    <main id="main" role="main" className="flex min-h-[60vh] flex-1 flex-col">
      <div className="container flex flex-1 flex-col items-center justify-center px-4 py-16 md:px-6 lg:px-8">
        <div
          className="mb-6 flex h-12 w-12 items-center justify-center rounded-full bg-muted/80 text-muted-foreground transition-colors duration-300 md:mb-8 md:h-14 md:w-14"
          aria-hidden
        >
          <AlertCircle className="h-6 w-6 md:h-7 md:w-7" strokeWidth={1.5} />
        </div>
        <h1 className="font-display text-2xl font-semibold text-foreground md:text-3xl">
          Something went wrong
        </h1>
        <p className="mt-2 max-w-md text-center text-sm text-muted-foreground md:text-base">
          This page hit a snag. Try again — or head back home and we’ll get you sorted.
        </p>
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <Button onClick={reset} variant="default" size="lg" className="min-h-[44px]">
            Try again
          </Button>
          <Button asChild variant="outline" size="lg" className="min-h-[44px]">
            <Link href="/">Back to home</Link>
          </Button>
        </div>
      </div>
    </main>
  )
}
