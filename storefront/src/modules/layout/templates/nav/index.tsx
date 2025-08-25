"use client"

import { Suspense } from "react"
import type { StoreRegion } from "@medusajs/types"
import LocalizedClientLink from "@modules/common/components/localized-client-link"
import CartButton from "@modules/layout/components/cart-button"
import SideMenu from "@modules/layout/components/side-menu"

type NavProps = {
  regions?: StoreRegion[]
}

export default function Nav({ regions }: NavProps) {
  return (
    <div className="sticky top-0 inset-x-0 z-50 group">
      <header className="navbar">
        <nav className="content-container h-16 flex items-center justify-between">
          {/* Left: Mobile menu + Brand */}
          <div className="flex items-center gap-3">
            <div className="md:hidden">
              {/* pass regions if your SideMenu expects them */}
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

            <Suspense
              fallback={
                <LocalizedClientLink
                  className="text-base-regular hover:opacity-80 flex gap-2"
                  href="/cart"
                  data-testid="nav-cart-link"
                >
                  Cart (0)
                </LocalizedClientLink>
              }
            >
              <CartButton />
            </Suspense>
          </div>
        </nav>
      </header>
    </div>
  )
}