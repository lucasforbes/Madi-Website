"use client"

import {
  Popover,
  PopoverButton,
  PopoverPanel,
  Transition,
} from "@headlessui/react"
import { convertToLocale } from "@lib/util/money"
import { HttpTypes } from "@medusajs/types"
import { Button } from "@medusajs/ui"
import DeleteButton from "@modules/common/components/delete-button"
import LineItemOptions from "@modules/common/components/line-item-options"
import LineItemPrice from "@modules/common/components/line-item-price"
import LocalizedClientLink from "@modules/common/components/localized-client-link"
import Thumbnail from "@modules/products/components/thumbnail"
import { usePathname } from "next/navigation"
import { Fragment, useEffect, useRef, useState } from "react"

type Props = {
  cart?: HttpTypes.StoreCart | null
  /** optional count passed by the server CartButton */
  quantity?: number
}

const CartDropdown = ({ cart: cartState, quantity }: Props) => {
  const [activeTimer, setActiveTimer] = useState<NodeJS.Timeout | undefined>()
  const [cartDropdownOpen, setCartDropdownOpen] = useState(false)

  const open = () => setCartDropdownOpen(true)
  const close = () => setCartDropdownOpen(false)

  // prefer server-provided quantity; fall back to client calculation
  const computedQty =
    typeof quantity === "number"
      ? quantity
      : cartState?.items?.reduce((acc, item) => acc + (item.quantity ?? 0), 0) ?? 0

  const subtotal = cartState?.subtotal ?? 0
  const lastQtyRef = useRef<number>(computedQty)

  const timedOpen = () => {
    open()
    const timer = setTimeout(close, 5000)
    setActiveTimer(timer)
  }

  const openAndCancel = () => {
    if (activeTimer) clearTimeout(activeTimer)
    open()
  }

  // Clear timer on unmount
  useEffect(() => {
    return () => {
      if (activeTimer) clearTimeout(activeTimer)
    }
  }, [activeTimer])

  const pathname = usePathname()

  // Open dropdown briefly when item count changes (not on /cart)
  useEffect(() => {
    if (!pathname.includes("/cart") && lastQtyRef.current !== computedQty) {
      timedOpen()
      lastQtyRef.current = computedQty
    }
  }, [computedQty, pathname])

  return (
    <div
      className="h-full z-50"
      onMouseEnter={openAndCancel}
      onMouseLeave={close}
    >
      <Popover className="relative h-full">
        <PopoverButton className="h-full">
          <LocalizedClientLink
            href="/cart"
            data-testid="nav-cart-link"
            className="relative inline-flex h-full items-center rounded-md px-3 py-2 text-sm font-medium hover:text-ui-fg-base"
          >
            {/* Cart glyph */}
            <svg
              aria-hidden="true"
              viewBox="0 0 24 24"
              className="mr-2 h-5 w-5"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
            >
              <path d="M3 3h2l.4 2M7 13h9l3-8H6.4M7 13l-1.5 6H19M7 13l-2-8" />
            </svg>
            <span className="sr-only">Cart</span>
            {/* Badge */}
            <span
              className="absolute -top-1 -right-1 grid h-5 w-5 place-items-center rounded-full bg-brand text-white text-[11px] leading-none"
              aria-label={`${computedQty} items in cart`}
            >
              {computedQty}
            </span>
            <span className="ml-6">Cart</span>
          </LocalizedClientLink>
        </PopoverButton>

        <Transition
          show={cartDropdownOpen}
          as={Fragment}
          enter="transition ease-out duration-200"
          enterFrom="opacity-0 translate-y-1"
          enterTo="opacity-100 translate-y-0"
          leave="transition ease-in duration-150"
          leaveFrom="opacity-100 translate-y-0"
          leaveTo="opacity-0 translate-y-1"
        >
          <PopoverPanel
            static
            className="hidden small:block absolute top-[calc(100%+1px)] right-0 w-[420px] border-x border-b border-gray-200 bg-white text-ui-fg-base shadow-lg"
            data-testid="nav-cart-dropdown"
          >
            <div className="flex items-center justify-center border-b border-gray-100 p-4">
              <h3 className="text-large-semi">Cart</h3>
            </div>

            {cartState && cartState.items?.length ? (
              <>
                <div className="no-scrollbar grid max-h-[402px] grid-cols-1 gap-y-8 overflow-y-scroll p-4">
                  {cartState.items
                    .sort((a, b) =>
                      (a.created_at ?? "") > (b.created_at ?? "") ? -1 : 1
                    )
                    .map((item) => (
                      <div
                        className="grid grid-cols-[122px_1fr] gap-x-4"
                        key={item.id}
                        data-testid="cart-item"
                      >
                        <LocalizedClientLink
                          href={`/products/${item.product_handle}`}
                          className="w-24"
                        >
                          <Thumbnail
                            thumbnail={item.thumbnail}
                            images={item.variant?.product?.images}
                            size="square"
                          />
                        </LocalizedClientLink>

                        <div className="flex flex-1 flex-col justify-between">
                          <div className="flex flex-1 flex-col">
                            <div className="flex items-start justify-between">
                              <div className="mr-4 w-[180px] whitespace-nowrap">
                                <h3 className="overflow-hidden text-ellipsis text-base-regular">
                                  <LocalizedClientLink
                                    href={`/products/${item.product_handle}`}
                                    data-testid="product-link"
                                  >
                                    {item.title}
                                  </LocalizedClientLink>
                                </h3>

                                <LineItemOptions
                                  variant={item.variant}
                                  data-testid="cart-item-variant"
                                  data-value={item.variant}
                                />

                                <span
                                  className="text-ui-fg-subtle"
                                  data-testid="cart-item-quantity"
                                  data-value={item.quantity}
                                >
                                  Quantity: {item.quantity}
                                </span>
                              </div>

                              <div className="flex justify-end">
                                <LineItemPrice
                                  item={item}
                                  style="tight"
                                  currencyCode={cartState.currency_code}
                                />
                              </div>
                            </div>
                          </div>

                          <DeleteButton
                            id={item.id}
                            className="mt-1"
                            data-testid="cart-item-remove-button"
                          >
                            Remove
                          </DeleteButton>
                        </div>
                      </div>
                    ))}
                </div>

                <div className="flex flex-col gap-y-4 border-t border-gray-100 p-4 text-small-regular">
                  <div className="flex items-center justify-between">
                    <span className="font-semibold">
                      Subtotal <span className="font-normal">(excl. taxes)</span>
                    </span>
                    <span
                      className="text-large-semi"
                      data-testid="cart-subtotal"
                      data-value={subtotal}
                    >
                      {convertToLocale({
                        amount: subtotal,
                        currency_code: cartState.currency_code,
                      })}
                    </span>
                  </div>

                  <LocalizedClientLink href="/cart" passHref>
                    <Button
                      className="w-full bg-brand text-white hover:bg-brand/90"
                      size="large"
                      data-testid="go-to-cart-button"
                    >
                      Go to cart
                    </Button>
                  </LocalizedClientLink>
                </div>
              </>
            ) : (
              <div className="p-6">
                <div className="flex flex-col items-center justify-center gap-y-4 py-10">
                  <div className="grid h-7 w-7 place-items-center rounded-full bg-gray-900 text-white">
                    <span className="text-[11px] leading-none">0</span>
                  </div>
                  <span>Your shopping bag is empty.</span>
                  <LocalizedClientLink href="/store">
                    <Button onClick={close} className="bg-brand text-white hover:bg-brand/90">
                      Explore products
                    </Button>
                  </LocalizedClientLink>
                </div>
              </div>
            )}
          </PopoverPanel>
        </Transition>
      </Popover>
    </div>
  )
}

export default CartDropdown