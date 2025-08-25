// storefront/src/app/layout.tsx
import type { Metadata } from "next"
import "./../styles/globals.css"
import { Inter, DM_Serif_Display } from "next/font/google"

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
})

const dmSerif = DM_Serif_Display({
  subsets: ["latin"],
  variable: "--font-serif",
  weight: ["400"],
  display: "swap",
})

export const metadata: Metadata = {
  title: "Madi — Apparel",
  description: "A clean, editorial storefront powered by Medusa",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${dmSerif.variable}`}
      suppressHydrationWarning
    >
      <body className="bg-brand-bg text-brand-text font-sans">
        {children}
      </body>
    </html>
  )
}