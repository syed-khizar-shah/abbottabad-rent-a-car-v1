"use client";

import Link from "next/link";
import {
  Facebook,
  Instagram,
  Twitter,
  Mail,
  Phone,
  MapPin,
} from "lucide-react";
import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import { authApi, contactApi, locationApi } from "@/lib/api";

const footerLinks = {
  company: [
    { name: "About Us", href: "/about" },
    { name: "Our Fleet", href: "/fleet" },
    { name: "Reviews", href: "/reviews" },
    { name: "Blog", href: "/blog" },
  ],
  services: [
    { name: "Wedding Rentals", href: "/fleet" },
    { name: "Corporate Travel", href: "/fleet" },
    { name: "Airport Transfers", href: "/contact" },
    { name: "Chauffeur Services", href: "/contact" },
  ],
  support: [
    { name: "Contact Us", href: "/contact" },
    { name: "FAQs", href: "/faqs" },
    { name: "Terms & Conditions", href: "/terms" },
    { name: "Privacy Policy", href: "/privacy" },
  ],
};

export function Footer() {
  const [isAdmin, setIsAdmin] = useState(false);
  const [contactInfo, setContactInfo] = useState<any>(null);
  const [locationInfo, setLocationInfo] = useState<any>(null);
  const pathname = usePathname();

  useEffect(() => {
    checkAdminAuth();
    loadContactAndLocationInfo();
  }, [pathname]);

  const loadContactAndLocationInfo = async () => {
    try {
      const [contactData, locationData] = await Promise.all([
        contactApi.get().catch(() => null),
        locationApi.get().catch(() => null),
      ]);
      setContactInfo(contactData);
      setLocationInfo(locationData);
    } catch (err) {
      console.error("Error loading contact/location info:", err);
    }
  };

  const checkAdminAuth = async () => {
    // Don't show footer on admin pages or if admin is logged in
    if (pathname?.startsWith("/admin")) {
      setIsAdmin(true);
      return;
    }

    try {
      await authApi.me();
      setIsAdmin(true);
    } catch {
      setIsAdmin(false);
    }
  };

  // Hide footer if admin is logged in
  if (isAdmin) {
    return null;
  }

  return (
    <footer className="bg-gradient-to-br from-muted/50 via-muted/30 to-background border-t border-border/50">
      <div className="container mx-auto px-4 sm:px-6 py-16 md:py-20">
        <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-10 md:gap-12 lg:gap-16">
          {/* Brand Section */}
          <div className="lg:col-span-2 space-y-6">
            <Link
              href="/"
              className="inline-block text-2xl md:text-3xl font-serif font-bold hover:text-accent transition-all duration-200 hover:translate-x-1"
            >
              Abbottabad Rent a Car
            </Link>
            <p className="text-muted-foreground text-sm md:text-base max-w-md leading-relaxed">
              Experience the pinnacle of luxury automotive rentals in
              Abbottabad. Your journey to extraordinary begins here.
            </p>
            <div className="space-y-3 text-sm md:text-base">
              <a
                href={`tel:${
                  contactInfo?.phoneNumber ||
                  locationInfo?.phone ||
                  "+923001234567"
                }`}
                className="flex items-center gap-3 text-muted-foreground hover:text-accent transition-all duration-200 hover:translate-x-1 group"
              >
                <div className="w-9 h-9 rounded-lg bg-accent/10 flex items-center justify-center group-hover:bg-accent group-hover:text-accent-foreground transition-colors">
                  <Phone className="h-4 w-4" />
                </div>
                <span>
                  {contactInfo?.phoneNumber ||
                    locationInfo?.phone ||
                    "+92 300 1234567"}
                </span>
              </a>
              <a
                href={`mailto:${
                  contactInfo?.email ||
                  locationInfo?.email ||
                  "info@abbottabadrentacar.com"
                }`}
                className="flex items-center gap-3 text-muted-foreground hover:text-accent transition-all duration-200 hover:translate-x-1 group"
              >
                <div className="w-9 h-9 rounded-lg bg-accent/10 flex items-center justify-center group-hover:bg-accent group-hover:text-accent-foreground transition-colors">
                  <Mail className="h-4 w-4" />
                </div>
                <span>
                  {contactInfo?.email ||
                    locationInfo?.email ||
                    "info@abbottabadrentacar.com"}
                </span>
              </a>
              <div className="flex items-start gap-3 text-muted-foreground">
                <div className="w-9 h-9 rounded-lg bg-accent/10 flex items-center justify-center shrink-0 mt-0.5">
                  <MapPin className="h-4 w-4" />
                </div>
                <span className="text-sm md:text-base leading-relaxed">
                  {locationInfo?.address ||
                    contactInfo?.address ||
                    "Main Mansehra Road, Abbottabad, KPK"}
                  {locationInfo?.city && `, ${locationInfo.city}`}
                </span>
              </div>
            </div>
            <div className="flex gap-3 pt-2">
              {contactInfo?.socialMedia?.facebook && (
                <a
                  href={contactInfo.socialMedia.facebook}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group w-11 h-11 rounded-xl bg-muted/80 flex items-center justify-center hover:bg-accent hover:text-accent-foreground hover:scale-110 hover:-translate-y-1 transition-all duration-300 shadow-sm hover:shadow-md"
                >
                  <Facebook className="h-5 w-5 transition-transform group-hover:scale-110" />
                </a>
              )}
              {contactInfo?.socialMedia?.instagram && (
                <a
                  href={contactInfo.socialMedia.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group w-11 h-11 rounded-xl bg-muted/80 flex items-center justify-center hover:bg-accent hover:text-accent-foreground hover:scale-110 hover:-translate-y-1 transition-all duration-300 shadow-sm hover:shadow-md"
                >
                  <Instagram className="h-5 w-5 transition-transform group-hover:scale-110" />
                </a>
              )}
              {contactInfo?.socialMedia?.twitter && (
                <a
                  href={contactInfo.socialMedia.twitter}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group w-11 h-11 rounded-xl bg-muted/80 flex items-center justify-center hover:bg-accent hover:text-accent-foreground hover:scale-110 hover:-translate-y-1 transition-all duration-300 shadow-sm hover:shadow-md"
                >
                  <Twitter className="h-5 w-5 transition-transform group-hover:scale-110" />
                </a>
              )}
            </div>
          </div>

          {/* Company Links */}
          <div className="space-y-5">
            <h3 className="font-serif font-bold text-base md:text-lg mb-6 text-foreground">
              Company
            </h3>
            <ul className="space-y-3.5">
              {footerLinks.company.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="group text-sm md:text-base text-muted-foreground hover:text-accent inline-flex items-center gap-2 transition-all duration-200"
                  >
                    <span className="w-1 h-1 rounded-full bg-accent/0 group-hover:bg-accent transition-all duration-200" />
                    <span>{link.name}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services Links */}
          <div className="space-y-5">
            <h3 className="font-serif font-bold text-base md:text-lg mb-6 text-foreground">
              Services
            </h3>
            <ul className="space-y-3.5">
              {footerLinks.services.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="group text-sm md:text-base text-muted-foreground hover:text-accent inline-flex items-center gap-2 transition-all duration-200"
                  >
                    <span className="w-1 h-1 rounded-full bg-accent/0 group-hover:bg-accent transition-all duration-200" />
                    <span>{link.name}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Support Links */}
          <div className="space-y-5">
            <h3 className="font-serif font-bold text-base md:text-lg mb-6 text-foreground">
              Support
            </h3>
            <ul className="space-y-3.5">
              {footerLinks.support.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="group text-sm md:text-base text-muted-foreground hover:text-accent inline-flex items-center gap-2 transition-all duration-200"
                  >
                    <span className="w-1 h-1 rounded-full bg-accent/0 group-hover:bg-accent transition-all duration-200" />
                    <span>{link.name}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-border/50 bg-background/80 backdrop-blur-sm">
        <div className="container mx-auto px-4 sm:px-6 py-6 md:py-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-xs md:text-sm text-muted-foreground">
            <p className="text-center md:text-left">
              &copy; {new Date().getFullYear()} Abbottabad Rent a Car. All
              rights reserved.
            </p>
            <div className="flex gap-6 md:gap-8">
              <Link
                href="/terms"
                className="hover:text-accent transition-all duration-200 hover:underline underline-offset-4"
              >
                Terms
              </Link>
              <Link
                href="/privacy"
                className="hover:text-accent transition-all duration-200 hover:underline underline-offset-4"
              >
                Privacy
              </Link>
              <Link
                href="/sitemap-page"
                className="hover:text-accent transition-all duration-200 hover:underline underline-offset-4"
              >
                Sitemap
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
