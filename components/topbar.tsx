"use client"

import * as React from "react"
import { ThemeToggle } from "./theme-toggle"

export function TopBar() {
  return (
    <div className="sticky top-0 z-40 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-14 items-center gap-4 px-4 md:px-6">
        <div className="flex flex-1 items-center gap-4">
          <h2 className="text-lg font-semibold">App Name</h2>
        </div>
        <div className="flex items-center gap-2">
          <ThemeToggle />
        </div>
      </div>
    </div>
  )
}

