"use client"

import Link from "next/link"
import { useState, useEffect } from "react"
import { usePathname } from "next/navigation"
import { Menu, Car } from "lucide-react"
import { Button } from "@/components/ui/button"
import { MobileNav } from "@/components/mobile-nav"
import { authApi } from "@/lib/api"
import Image from "next/image"

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [isAdmin, setIsAdmin] = useState(false)
  const pathname = usePathname()

  useEffect(() => {
    checkAdminAuth()
  }, [pathname])

  const checkAdminAuth = async () => {
    // Don't check if we're already on admin pages
    if (pathname?.startsWith("/admin")) {
      setIsAdmin(false)
      return
    }

    try {
      await authApi.me()
      setIsAdmin(true)
    } catch {
      setIsAdmin(false)
    }
  }

  // Don't show header on admin pages (they have their own sidebar)
  if (pathname?.startsWith("/admin")) {
    return null
  }

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
                  {/* <Car className="h-6 w-6 md:h-7 md:w-7 text-primary transition-transform group-hover:scale-110" /> */}
                  <Image src="/logo.png" alt="Abbottabad Rent A Car" width={100} height={100} className="h-16 transition-transform group-hover:scale-110" />
                  <div className="absolute inset-0 bg-accent/20 blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-full" />
                </div>
                <span className="font-serif text-base sm:text-lg md:text-xl font-bold text-foreground tracking-tight">
                  Abbottabad Rent A Car
                </span>
              </Link>
            </div>

            {!isAdmin && (
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
            )}
            {isAdmin && (
              <div className="hidden lg:flex items-center gap-2 text-sm text-muted-foreground">
                <span>Admin Mode</span>
              </div>
            )}

            {!isAdmin && (
              <div className="hidden lg:block">
                <Button 
                  asChild
                  className="shadow-sm hover:shadow-md transition-all duration-200 hover:scale-105 active:scale-95"
                >
                  <Link href="/contact">Contact Us</Link>
                </Button>
              </div>
            )}
            {isAdmin && (
              <div className="hidden lg:block">
                <Button 
                  asChild
                  variant="outline"
                  className="shadow-sm hover:shadow-md transition-all duration-200 hover:scale-105 active:scale-95"
                >
                  <Link href="/admin/dashboard">Admin Panel</Link>
                </Button>
              </div>
            )}
          </div>
        </div>
      </header>

      <MobileNav open={mobileMenuOpen} onOpenChange={setMobileMenuOpen} />
    </>
  )
}
