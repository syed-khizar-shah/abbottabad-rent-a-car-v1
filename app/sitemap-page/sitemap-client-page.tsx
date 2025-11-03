"use client"

import { motion } from "framer-motion"
import Link from "next/link"
import { Home, Car, MessageSquare, Phone, Shield } from "lucide-react"
import { Badge } from "@/components/ui/badge"

export default function SitemapClientPage() {
  const sitemapSections = [
    {
      icon: Home,
      title: "Main Pages",
      links: [
        { name: "Home", href: "/", description: "Welcome to Abbottabad Rent A Car" },
        { name: "About Us", href: "/about", description: "Learn about our company and values" },
        { name: "Contact Us", href: "/contact", description: "Get in touch with our team" },
      ],
    },
    {
      icon: Car,
      title: "Fleet & Services",
      links: [
        { name: "Our Fleet", href: "/fleet", description: "Browse our luxury vehicle collection" },
        { name: "Services", href: "/services", description: "Explore our rental services" },
        { name: "Service Areas", href: "/service-areas", description: "Areas we serve in Pakistan" },
        { name: "Tour Routes", href: "/tour-routes", description: "Popular destinations and routes" },
      ],
    },
    {
      icon: MessageSquare,
      title: "Customer Resources",
      links: [
        { name: "Reviews", href: "/reviews", description: "Read customer testimonials" },
        { name: "FAQs", href: "/faqs", description: "Frequently asked questions" },
        { name: "Blog", href: "/blog", description: "Travel guides and automotive insights" },
      ],
    },
    {
      icon: Shield,
      title: "Legal & Policies",
      links: [
        { name: "Terms & Conditions", href: "/terms", description: "Rental terms and agreements" },
        { name: "Privacy Policy", href: "/privacy", description: "How we protect your data" },
      ],
    },
  ]

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative h-[40vh] min-h-[400px] flex items-center justify-center overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: "url('/luxury-car-rental-customer-service-concierge-desk.jpg')",
          }}
        >
          <div className="absolute inset-0 bg-gradient-to-br from-navy-900/95 via-navy-800/90 to-navy-900/95" />
        </div>

        <div className="relative z-10 container mx-auto px-4 text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <Badge variant="secondary" className="mb-4 bg-amber-500/20 text-amber-300 border-amber-500/30">
              Site Navigation
            </Badge>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif font-bold text-white mb-6">Sitemap</h1>
            <p className="text-lg md:text-xl text-white/90 max-w-3xl mx-auto leading-relaxed">
              Explore all pages and resources available on Abbottabad Rent A Car
            </p>
          </motion.div>
        </div>
      </section>

      {/* Sitemap Content */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="grid md:grid-cols-2 gap-8">
            {sitemapSections.map((section, index) => (
              <motion.div
                key={section.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="bg-card border border-border rounded-2xl p-6 md:p-8 hover:shadow-lg transition-all hover:border-amber-500/30"
              >
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-12 h-12 rounded-xl bg-amber-500/10 flex items-center justify-center">
                    <section.icon className="w-6 h-6 text-amber-500" />
                  </div>
                  <h2 className="text-2xl font-serif font-bold">{section.title}</h2>
                </div>
                <ul className="space-y-4">
                  {section.links.map((link) => (
                    <li key={link.href}>
                      <Link href={link.href} className="group block p-4 rounded-xl hover:bg-muted/50 transition-all">
                        <div className="flex items-start justify-between gap-4">
                          <div>
                            <h3 className="font-semibold text-foreground group-hover:text-amber-500 transition-colors mb-1">
                              {link.name}
                            </h3>
                            <p className="text-sm text-muted-foreground leading-relaxed">{link.description}</p>
                          </div>
                          <svg
                            className="w-5 h-5 text-muted-foreground group-hover:text-amber-500 group-hover:translate-x-1 transition-all shrink-0 mt-1"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                          >
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                          </svg>
                        </div>
                      </Link>
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>

          {/* Quick Contact Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="mt-12 bg-gradient-to-br from-amber-500/10 to-amber-600/5 border border-amber-500/30 rounded-2xl p-8 md:p-12 text-center"
          >
            <Phone className="w-12 h-12 text-amber-500 mx-auto mb-4" />
            <h2 className="text-3xl font-serif font-bold mb-4">Need Help Finding Something?</h2>
            <p className="text-muted-foreground text-lg mb-6 max-w-2xl mx-auto leading-relaxed">
              Can't find what you're looking for? Our team is here to help you navigate our services and answer any
              questions.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/contact"
                className="inline-flex items-center justify-center px-8 py-3 bg-amber-500 text-white rounded-xl font-semibold hover:bg-amber-600 transition-colors"
              >
                Contact Us
              </Link>
              <Link
                href="/faqs"
                className="inline-flex items-center justify-center px-8 py-3 bg-navy-900 text-white rounded-xl font-semibold hover:bg-navy-800 transition-colors"
              >
                View FAQs
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  )
}
