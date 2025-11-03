import type React from "react"
import type { Metadata } from "next"
import { Space_Grotesk, Lora } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import "./globals.css"
import { Footer } from "@/components/footer"
import { ContactButtons } from "@/components/contact-buttons"
import { Header } from "@/components/header"

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
  weight: ["300", "400", "500", "600", "700"],
})

const lora = Lora({
  subsets: ["latin"],
  variable: "--font-serif",
  display: "swap",
  weight: ["400", "500", "600", "700"],
})

export const metadata: Metadata = {
  title: "Abbottabad Rent A Car - Premium Car Rental Services",
  description:
    "Rent premium cars in Abbottabad. Wide selection of vehicles, competitive prices, and excellent service.",
  generator: "v0.app",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className={`${spaceGrotesk.variable} ${lora.variable}`}>
      <body className="antialiased" suppressHydrationWarning>
        <Header />
        <main className="min-h-screen">{children}</main>
        <Footer />
        <ContactButtons />
        <Analytics />
      </body>
    </html>
  )
}
