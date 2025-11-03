"use client"

import Link from "next/link"
import { Car, Home, Grid3x3, Info, Star, HelpCircle, BookOpen, Phone, Mail, MapPin, Map } from "lucide-react"
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetDescription } from "@/components/ui/sheet"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"

interface MobileNavProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

const navLinks = [
  { href: "/", label: "Home", icon: Home },
  { href: "/fleet", label: "Our Fleet", icon: Grid3x3 },
  { href: "/tour-routes", label: "Tour Routes", icon: Map },
  { href: "/about", label: "About Us", icon: Info },
  { href: "/reviews", label: "Reviews", icon: Star },
  { href: "/faqs", label: "FAQs", icon: HelpCircle },
  { href: "/blog", label: "Blog", icon: BookOpen },
  { href: "/location", label: "Location", icon: MapPin },
]

export function MobileNav({ open, onOpenChange }: MobileNavProps) {
  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent side="left" className="w-[300px] sm:w-[350px] p-0">
        <SheetHeader className="p-6 pb-4 text-left">
          <div className="flex items-center gap-2 mb-2">
            <div className="h-10 w-10 rounded-lg bg-secondary flex items-center justify-center">
              <Car className="h-6 w-6 text-secondary-foreground" />
            </div>
            <div>
              <SheetTitle className="text-lg font-serif">Abbottabad Rent A Car</SheetTitle>
              <SheetDescription className="text-xs">Premium Car Rental Services</SheetDescription>
            </div>
          </div>
        </SheetHeader>

        <Separator />

        {/* Navigation Links */}
        <nav className="flex flex-col p-4 space-y-1">
          {navLinks.map((link) => {
            const Icon = link.icon
            return (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => onOpenChange(false)}
                className="flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-accent transition-colors"
              >
                <Icon className="h-5 w-5" />
                {link.label}
              </Link>
            )
          })}
        </nav>

        <Separator className="my-4" />

        {/* Contact Information */}
        <div className="px-6 py-4 space-y-4">
          <h3 className="text-sm font-semibold text-foreground">Contact Us</h3>
          <div className="space-y-3 text-sm">
            <a
              href="tel:+923001234567"
              className="flex items-center gap-3 text-muted-foreground hover:text-foreground transition-colors"
            >
              <Phone className="h-4 w-4" />
              <span>+92 300 1234567</span>
            </a>
            <a
              href="mailto:info@abbottabadrentacar.com"
              className="flex items-center gap-3 text-muted-foreground hover:text-foreground transition-colors"
            >
              <Mail className="h-4 w-4" />
              <span>info@abbottabadrentacar.com</span>
            </a>
            <div className="flex items-start gap-3 text-muted-foreground">
              <MapPin className="h-4 w-4 mt-0.5" />
              <span>Supply Bazar, Abbottabad, KPK, Pakistan</span>
            </div>
          </div>
        </div>

        <Separator className="my-4" />

        {/* CTA Buttons */}
        <div className="px-6 pb-6 space-y-2">
          <Button className="w-full" size="lg" asChild>
            <Link href="/fleet">Browse Fleet</Link>
          </Button>
          <Button variant="outline" className="w-full bg-transparent" size="lg" asChild>
            <Link href="/contact">Get in Touch</Link>
          </Button>
        </div>
      </SheetContent>
    </Sheet>
  )
}
