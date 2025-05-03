"use client"

import { UserButton } from "@clerk/nextjs"
import Link from "next/link"
import { MessageSquare, Settings } from "lucide-react"

export function DashboardHeader() {
  return (
    <header className="border-b">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          <div className="flex items-center gap-4">
            <Link href="/" className="flex items-center gap-2">
              <MessageSquare className="h-6 w-6 text-primary" />
              <span className="text-xl font-semibold">SupportGenie</span>
            </Link>
          </div>

          <div className="flex items-center gap-4">
            <Link
              href="/settings"
              className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors"
            >
              <Settings className="h-5 w-5" />
              <span className="hidden sm:inline">Settings</span>
            </Link>
            <UserButton afterSignOutUrl="/" />
          </div>
        </div>
      </div>
    </header>
  )
} 