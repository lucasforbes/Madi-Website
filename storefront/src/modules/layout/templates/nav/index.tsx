"use client"

import { Suspense } from "react" // This import can be removed if not used elsewhere
import type { StoreRegion } from "@medusajs/types"
import LocalizedClientLink from "@modules/common/components/localized-client-link"
import SideMenu from "@modules/layout/components/side-menu"
import React from "react"

// Define props to accept 'children'
type NavProps = {
  regions?: StoreRegion[]
  children: React.ReactNode // The CartButton will be passed in here
}

export default function Nav({ regions, children }: NavProps) {
  return (
    <div className="sticky top-0 inset-x-0 z-50 group">
      <header className="navbar">
        <nav className="content-container h-16 flex items-center justify-between">
          {/* Left: Mobile menu + Brand */}
          <div className="flex items-center gap-3">
            <div className="md:hidden">
              <SideMenu regions={regions} />
            </div>
            <LocalizedClientLink
              href="/"
              className="font-serif text-2xl tracking-wide text-brand-dark hover:opacity-80"
              data-testid="nav-store-link"
            >
              Madi
            </LocalizedClientLink>
          </div>

          {/* Center: Desktop links */}
          <div className="hidden md:flex items-center gap-6">
            <LocalizedClientLink
              href="/store"
              className="text-base-regular hover:opacity-80"
            >
              Shop
            </LocalizedClientLink>
            <LocalizedClientLink
              href="/about"
              className="text-base-regular hover:opacity-80"
            >
              About
            </LocalizedClientLink>
            <LocalizedClientLink
              href="/contact"
              className="text-base-regular hover:opacity-80"
            >
              Contact
            </LocalizedClientLink>
          </div>

          {/* Right: Account + Cart */}
          <div className="flex items-center gap-4">
            <LocalizedClientLink
              href="/account"
              className="hidden md:inline-block text-base-regular hover:opacity-80"
              data-testid="nav-account-link"
            >
              Account
            </LocalizedClientLink>

            {/* Render the children prop where the CartButton used to be */}
            {children}
          </div>
        </nav>
      </header>
    </div>
  )
}