"use client"

import { useEffect } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"

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
    <div className="container flex min-h-[60vh] flex-col items-center justify-center px-4 py-16 md:px-6 lg:px-8">
      <h1 className="font-display text-2xl font-semibold text-foreground md:text-3xl">
        Something went wrong
      </h1>
      <p className="mt-2 max-w-md text-center text-sm text-muted-foreground md:text-base">
        We couldn’t load this page. Please try again or head back home.
      </p>
      <div className="mt-8 flex flex-wrap justify-center gap-3">
        <Button onClick={reset} variant="default" size="lg">
          Try again
        </Button>
        <Button asChild variant="outline" size="lg">
          <Link href="/">Back to home</Link>
        </Button>
      </div>
    </div>
  )
}
