import { listCategories } from "@lib/data/categories"
import { listCollections } from "@lib/data/collections"
import { Text, clx } from "@medusajs/ui"

import LocalizedClientLink from "@modules/common/components/localized-client-link"

export default async function Footer() {
  const { collections } = await listCollections({
    fields: "*products",
  })
  const productCategories = await listCategories()

  return (
    <footer className="bg-brand-dark text-white w-full">
      <div className="content-container flex flex-col w-full">
        <div className="flex flex-col gap-y-10 md:flex-row items-start justify-between py-12 border-b border-gray-700">
          {/* Logo / Brand */}
          <div>
            <LocalizedClientLink
              href="/"
              className="font-serif text-2xl tracking-wide text-brand-accent hover:opacity-80 transition"
            >
              Madi
            </LocalizedClientLink>
            <p className="text-sm mt-2 text-gray-400">
              Your destination for modern style.
            </p>
          </div>

          {/* Footer Links */}
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-8 text-sm">
            {/* Categories */}
            {productCategories && productCategories.length > 0 && (
              <div className="flex flex-col gap-y-3">
                <span className="font-semibold text-brand-accent">Categories</span>
                <ul
                  className="grid grid-cols-1 gap-2"
                  data-testid="footer-categories"
                >
                  {productCategories?.slice(0, 6).map((c) => {
                    if (c.parent_category) return

                    const children =
                      c.category_children?.map((child) => ({
                        name: child.name,
                        handle: child.handle,
                        id: child.id,
                      })) || null

                    return (
                      <li className="flex flex-col gap-2" key={c.id}>
                        <LocalizedClientLink
                          className={clx(
                            "hover:text-brand-accent transition",
                            children && "font-semibold"
                          )}
                          href={`/categories/${c.handle}`}
                          data-testid="category-link"
                        >
                          {c.name}
                        </LocalizedClientLink>
                        {children && (
                          <ul className="grid grid-cols-1 ml-3 gap-2">
                            {children.map((child) => (
                              <li key={child.id}>
                                <LocalizedClientLink
                                  className="hover:text-brand-accent transition"
                                  href={`/categories/${child.handle}`}
                                  data-testid="category-link"
                                >
                                  {child.name}
                                </LocalizedClientLink>
                              </li>
                            ))}
                          </ul>
                        )}
                      </li>
                    )
                  })}
                </ul>
              </div>
            )}

            {/* Collections */}
            {collections && collections.length > 0 && (
              <div className="flex flex-col gap-y-3">
                <span className="font-semibold text-brand-accent">Collections</span>
                <ul
                  className={clx(
                    "grid grid-cols-1 gap-2",
                    { "grid-cols-2": (collections?.length || 0) > 3 }
                  )}
                >
                  {collections?.slice(0, 6).map((c) => (
                    <li key={c.id}>
                      <LocalizedClientLink
                        className="hover:text-brand-accent transition"
                        href={`/collections/${c.handle}`}
                      >
                        {c.title}
                      </LocalizedClientLink>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Company Info */}
            <div className="flex flex-col gap-y-3">
              <span className="font-semibold text-brand-accent">Company</span>
              <ul className="flex flex-col gap-2">
                <li>
                  <LocalizedClientLink
                    href="/about"
                    className="hover:text-brand-accent transition"
                  >
                    About Us
                  </LocalizedClientLink>
                </li>
                <li>
                  <LocalizedClientLink
                    href="/contact"
                    className="hover:text-brand-accent transition"
                  >
                    Contact
                  </LocalizedClientLink>
                </li>
                <li>
                  <LocalizedClientLink
                    href="/privacy"
                    className="hover:text-brand-accent transition"
                  >
                    Privacy Policy
                  </LocalizedClientLink>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="flex flex-col md:flex-row justify-between items-center py-6 text-gray-400 text-sm">
          <Text>
            © {new Date().getFullYear()} Madi. All rights reserved.
          </Text>
          <div className="flex gap-5 mt-3 md:mt-0">
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noreferrer"
              className="hover:text-brand-accent transition"
            >
              Instagram
            </a>
            <a
              href="https://twitter.com"
              target="_blank"
              rel="noreferrer"
              className="hover:text-brand-accent transition"
            >
              Twitter
            </a>
            <a
              href="https://facebook.com"
              target="_blank"
              rel="noreferrer"
              className="hover:text-brand-accent transition"
            >
              Facebook
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}