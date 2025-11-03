"use client"

import Link from "next/link"
import { useState } from "react"
import { Menu, Car } from "lucide-react"
import { Button } from "@/components/ui/button"
import { MobileNav } from "@/components/mobile-nav"

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  const navLinks = [
    { href: "/", label: "Home" },
    { href: "/fleet", label: "Fleet" },
    { href: "/tour-routes", label: "Tour Routes" },
    { href: "/about", label: "About Us" },
    { href: "/reviews", label: "Reviews" },
    { href: "/faqs", label: "FAQs" },
    { href: "/blog", label: "Blog" },
    { href: "/location", label: "Location" }, // Added Location link to navigation
  ]

  return (
    <>
      <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur-md supports-[backdrop-filter]:bg-background/80 shadow-sm">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="flex h-16 md:h-18 items-center justify-between">
            <div className="flex items-center gap-3 md:gap-4">
              <Button 
                variant="ghost" 
                size="icon" 
                className="lg:hidden hover:bg-accent/10 transition-all duration-200" 
                onClick={() => setMobileMenuOpen(true)}
              >
                <Menu className="h-5 w-5" />
                <span className="sr-only">Open menu</span>
              </Button>

              {/* Logo */}
              <Link 
                href="/" 
                className="flex items-center gap-2.5 transition-all duration-200 hover:opacity-90 active:scale-95 group"
              >
                <div className="relative">
                  <Car className="h-6 w-6 md:h-7 md:w-7 text-primary transition-transform group-hover:scale-110" />
                  <div className="absolute inset-0 bg-accent/20 blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-full" />
                </div>
                <span className="font-serif text-base sm:text-lg md:text-xl font-bold text-foreground tracking-tight">
                  Abbottabad Rent A Car
                </span>
              </Link>
            </div>

            <nav className="hidden lg:flex items-center gap-1">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="relative px-4 py-2 text-sm font-medium text-muted-foreground transition-all duration-200 hover:text-foreground rounded-md hover:bg-accent/5 group"
                >
                  <span className="relative z-10">{link.label}</span>
                  <span className="absolute inset-0 bg-accent/10 scale-x-0 group-hover:scale-x-100 transition-transform duration-200 origin-left rounded-md" />
                </Link>
              ))}
            </nav>

            <div className="hidden lg:block">
              <Button 
                asChild
                className="shadow-sm hover:shadow-md transition-all duration-200 hover:scale-105 active:scale-95"
              >
                <Link href="/contact">Contact Us</Link>
              </Button>
            </div>
          </div>
        </div>
      </header>

      <MobileNav open={mobileMenuOpen} onOpenChange={setMobileMenuOpen} />
    </>
  )
}
