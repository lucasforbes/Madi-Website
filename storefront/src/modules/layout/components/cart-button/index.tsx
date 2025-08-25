import { retrieveCart } from "@lib/data/cart"
import CartDropdown from "@modules/layout/components/cart-dropdown"

// This is a Server Component because it's async. This is correct.
export default async function CartButton() {
  const cart = await retrieveCart().catch(() => null)

  const quantity =
    cart?.items?.reduce((sum: number, i: any) => sum + (i?.quantity ?? 0), 0) ?? 0

  return <CartDropdown cart={cart} quantity={quantity} />
}