import React, { Suspense } from "react"
import Footer from "@modules/layout/templates/footer"
import Nav from "@modules/layout/templates/nav"
import CartButton from "@modules/layout/components/cart-button"
import LocalizedClientLink from "@modules/common/components/localized-client-link"

export default async function Layout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div>
      {/* The <Nav> component is the Client Component */}
      <Nav>
        {/* We are passing the CartButton and its Suspense boundary */}
        {/* as the 'children' prop to the Nav component. */}
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
      </Nav>
      <main className="relative">{children}</main>
      <Footer />
    </div>
  )
}