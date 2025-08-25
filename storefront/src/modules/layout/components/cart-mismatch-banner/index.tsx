import { InformationCircle } from "@medusajs/icons"
import LocalizedClientLink from "@modules/common/components/localized-client-link"

const CartMismatchBanner = () => {
  return (
    <div className="w-full rounded-md border border-brand/30 bg-brand/10 p-4 flex items-start gap-3 shadow-sm">
      <div className="flex-shrink-0">
        <InformationCircle className="w-5 h-5 text-brand" />
      </div>
      <div className="flex flex-col">
        <p className="text-sm text-brand font-medium">
          Your cart contains items for another region.
        </p>
        <LocalizedClientLink
          href="/cart"
          className="mt-1 inline-block text-sm font-semibold text-brand underline hover:opacity-80"
        >
          Review your cart →
        </LocalizedClientLink>
      </div>
    </div>
  )
}

export default CartMismatchBanner