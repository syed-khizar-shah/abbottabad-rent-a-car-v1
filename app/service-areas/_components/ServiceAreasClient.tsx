"use client"

import { BreadcrumbSchema, LocalBusinessSchema } from "@/components/structured-data"
import { Breadcrumbs } from "@/components/breadcrumbs"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { motion } from "framer-motion"
import { MapPin, Navigation, Clock } from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import { siteConfig } from "@/lib/metadata" // Assuming siteConfig is available client-side if needed

export default function ServiceAreasClient() {
  const serviceAreas = [
    {
      name: "Abbottabad",
      description: "Our main hub serving the heart of Khyber Pakhtunkhwa with premium car rental services",
      distance: "0 km",
      popular: true,
      attractions: ["Ilyasi Mosque", "Shimla Hill", "Thandiani", "Sajikot Waterfall"],
    },
    {
      name: "Nathia Gali",
      description: "Scenic hill station car rental for tourism and weekend getaways",
      distance: "35 km from Abbottabad",
      popular: true,
      attractions: ["Mukshpuri Trek", "Miranjani Trek", "Pipeline Track", "Dunga Gali"],
    },
    {
      name: "Mansehra",
      description: "Gateway to northern areas with reliable transportation services",
      distance: "25 km from Abbottabad",
      popular: true,
      attractions: ["Shinkiari", "Balakot", "Kaghan Valley", "Siran Valley"],
    },
    {
      name: "Haripur",
      description: "Connecting Abbottabad to Islamabad with comfortable car rental options",
      distance: "40 km from Abbottabad",
      popular: false,
      attractions: ["Khanpur Dam", "Tarbela Dam", "Taxila", "Haripur City"],
    },
    {
      name: "Murree",
      description: "Popular hill station accessible with our SUVs and 4x4 vehicles",
      distance: "80 km from Abbottabad",
      popular: true,
      attractions: ["Mall Road", "Patriata", "Kashmir Point", "Pindi Point"],
    },
    {
      name: "Islamabad",
      description: "Capital city airport transfers and corporate car rental services",
      distance: "120 km from Abbottabad",
      popular: true,
      attractions: ["Faisal Mosque", "Daman-e-Koh", "Lok Virsa", "Pakistan Monument"],
    },
    {
      name: "Naran & Kaghan",
      description: "Northern areas tourism with 4x4 vehicles and experienced drivers",
      distance: "100 km from Abbottabad",
      popular: true,
      attractions: ["Saif-ul-Malook", "Lulusar Lake", "Babusar Top", "Shogran"],
    },
    {
      name: "Balakot",
      description: "Starting point for Kaghan Valley tours with reliable vehicles",
      distance: "55 km from Abbottabad",
      popular: false,
      attractions: ["Kaghan Valley", "Kunhar River", "Kawai", "Paras"],
    },
    {
      name: "Ayubia",
      description: "National park visits with comfortable transportation",
      distance: "30 km from Abbottabad",
      popular: false,
      attractions: ["Ayubia National Park", "Pipeline Track", "Chairlift", "Khanspur"],
    },
  ]

  const popularRoutes = [
    {
      from: "Abbottabad",
      to: "Islamabad Airport",
      duration: "2.5 hours",
      price: "PKR 8,000",
    },
    {
      from: "Abbottabad",
      to: "Naran",
      duration: "3 hours",
      price: "PKR 12,000",
    },
    {
      from: "Abbottabad",
      to: "Murree",
      duration: "2 hours",
      price: "PKR 7,000",
    },
    {
      from: "Abbottabad",
      to: "Nathia Gali",
      duration: "1 hour",
      price: "PKR 4,000",
    },
  ]

  return (
    <>
      <LocalBusinessSchema />
      <BreadcrumbSchema
        items={[
          { name: "Home", url: "/" },
          { name: "Service Areas", url: "/service-areas" },
        ]}
      />

      <div className="min-h-screen bg-background">
        {/* Hero Section */}
        <section className="relative py-20 md:py-32 overflow-hidden">
          {/* Background Image */}
          <div className="absolute inset-0 z-0">
            <Image
              src="/scenic-mountain-road-in-northern-pakistan-abbottab.jpg"
              alt="Service Areas"
              fill
              className="object-cover brightness-[0.3]"
              priority
            />
          </div>

          {/* Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-background/40 to-accent/20 z-[1]" />

          <div className="container mx-auto px-4 relative z-10">
            <Breadcrumbs items={[{ label: "Service Areas", href: "/service-areas" }]} />

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="max-w-3xl"
            >
              <Badge className="mb-4">Wide Coverage</Badge>
              <h1 className="font-serif text-4xl md:text-6xl font-bold text-white mb-6 text-balance">
                Car Rental Service Areas in Khyber Pakhtunkhwa
              </h1>
              <p className="text-lg md:text-xl text-white/90 mb-8 text-pretty leading-relaxed">
                We serve Abbottabad and all major cities across KPK and northern Pakistan. From hill stations to urban
                centers, our fleet is ready to take you anywhere.
              </p>
              <Button size="lg" asChild>
                <Link href="/contact">Book Your Ride</Link>
              </Button>
            </motion.div>
          </div>
        </section>

        {/* Service Areas Grid */}
        <section className="py-20 md:py-32">
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-center mb-16"
            >
              <Badge className="mb-4">Where We Serve</Badge>
              <h2 className="font-serif text-3xl md:text-5xl font-bold mb-6">Our Service Coverage</h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto text-pretty">
                Comprehensive car rental services across {siteConfig.serviceAreas.length}+ locations in Pakistan
              </p>
            </motion.div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {serviceAreas.map((area, index) => (
                <motion.div
                  key={area.name}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <Card className="p-6 h-full hover:shadow-xl transition-all duration-300 hover:-translate-y-1 relative overflow-hidden group">
                    {area.popular && <Badge className="absolute top-4 right-4">Popular</Badge>}

                    <div className="flex items-start gap-4 mb-4">
                      <div className="bg-primary/10 w-12 h-12 rounded-xl flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform duration-300">
                        <MapPin className="h-6 w-6 text-primary" />
                      </div>
                      <div>
                        <h3 className="font-serif text-xl font-bold mb-1">{area.name}</h3>
                        <p className="text-sm text-muted-foreground flex items-center gap-1">
                          <Navigation className="h-3 w-3" />
                          {area.distance}
                        </p>
                      </div>
                    </div>

                    <p className="text-muted-foreground mb-4 text-sm leading-relaxed">{area.description}</p>

                    <div className="space-y-2">
                      <p className="text-sm font-medium">Popular Attractions:</p>
                      <div className="flex flex-wrap gap-2">
                        {area.attractions.map((attraction) => (
                          <Badge key={attraction} variant="secondary" className="text-xs">
                            {attraction}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Popular Routes */}
        <section className="py-20 md:py-32 bg-muted/30">
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-center mb-16"
            >
              <Badge className="mb-4">Popular Routes</Badge>
              <h2 className="font-serif text-3xl md:text-5xl font-bold mb-6">Most Requested Routes</h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto text-pretty">
                Frequently traveled routes from Abbottabad with estimated duration and pricing
              </p>
            </motion.div>

            <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
              {popularRoutes.map((route, index) => (
                <motion.div
                  key={`${route.from}-${route.to}`}
                  initial={{ opacity: 0, x: index % 2 === 0 ? -20 : 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <Card className="p-6 hover:shadow-lg transition-all duration-300">
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center gap-3">
                        <div className="bg-primary/10 w-10 h-10 rounded-full flex items-center justify-center">
                          <Navigation className="h-5 w-5 text-primary" />
                        </div>
                        <div>
                          <p className="font-medium">{route.from}</p>
                          <p className="text-sm text-muted-foreground">to {route.to}</p>
                        </div>
                      </div>
                      <Badge variant="secondary">{route.price}</Badge>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Clock className="h-4 w-4" />
                      <span>{route.duration}</span>
                    </div>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 md:py-32">
          <div className="container mx-auto px-4">
            <Card className="bg-gradient-to-br from-primary/10 via-background to-accent/10 p-12 md:p-16 text-center">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
              >
                <h2 className="font-serif text-3xl md:text-5xl font-bold mb-6">Need Service in Your Area?</h2>
                <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto text-pretty">
                  Contact us to check availability in your location. We're expanding our service areas regularly.
                </p>
                <Button size="lg" asChild>
                  <Link href="/contact">Contact Us</Link>
                </Button>
              </motion.div>
            </Card>
          </div>
        </section>
      </div>
    </>
  )
}
