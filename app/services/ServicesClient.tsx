"use client"
import { LocalBusinessSchema, BreadcrumbSchema } from "@/components/structured-data"
import { Breadcrumbs } from "@/components/breadcrumbs"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { motion } from "framer-motion"
import Image from "next/image"
import {
  Car,
  Users,
  Briefcase,
  Heart,
  Plane,
  MapPin,
  Shield,
  Clock,
  Headphones,
  CheckCircle2,
  Star,
  Award,
} from "lucide-react"
import Link from "next/link"

export default function ServicesClient() {
  const services = [
    {
      icon: Heart,
      title: "Wedding Car Rental",
      description:
        "Make your special day unforgettable with our luxury wedding car collection. Decorated vehicles with professional chauffeurs for your big day.",
      features: [
        "Luxury & Premium Cars",
        "Professional Decoration",
        "Experienced Chauffeurs",
        "Flexible Packages",
        "Photography Support",
      ],
      popular: true,
    },
    {
      icon: Briefcase,
      title: "Corporate Car Rental",
      description:
        "Professional transportation solutions for businesses in Abbottabad. Monthly contracts, executive cars, and reliable service for your corporate needs.",
      features: [
        "Executive Vehicles",
        "Monthly Contracts",
        "Professional Drivers",
        "Flexible Billing",
        "Priority Support",
      ],
      popular: true,
    },
    {
      icon: Plane,
      title: "Airport Transfer Service",
      description:
        "Reliable airport pickup and drop-off services from Abbottabad to Islamabad Airport. Comfortable journey with professional drivers.",
      features: [
        "Islamabad Airport Transfers",
        "Flight Tracking",
        "Meet & Greet Service",
        "Luggage Assistance",
        "24/7 Availability",
      ],
      popular: false,
    },
    {
      icon: MapPin,
      title: "Tourism & Sightseeing",
      description:
        "Explore the beautiful northern areas of Pakistan with our tourism packages. Visit Nathia Gali, Naran, Kaghan, and more with comfortable vehicles.",
      features: [
        "Northern Areas Tours",
        "Experienced Drivers",
        "Flexible Itineraries",
        "SUVs & 4x4 Vehicles",
        "Group Packages",
      ],
      popular: true,
    },
    {
      icon: Car,
      title: "Self-Drive Car Rental",
      description:
        "Rent a car and drive yourself across Abbottabad and KPK. Flexible rental periods from daily to monthly with comprehensive insurance.",
      features: [
        "Daily/Weekly/Monthly",
        "Well-Maintained Vehicles",
        "Comprehensive Insurance",
        "24/7 Roadside Assistance",
        "Easy Documentation",
      ],
      popular: false,
    },
    {
      icon: Users,
      title: "Chauffeur-Driven Service",
      description:
        "Professional chauffeur-driven car rental service in Abbottabad. Experienced drivers who know the local routes and ensure safe travel.",
      features: [
        "Professional Drivers",
        "Local Route Knowledge",
        "Safe & Comfortable",
        "Hourly/Daily Rates",
        "Verified Chauffeurs",
      ],
      popular: false,
    },
  ]

  const whyChooseUs = [
    {
      icon: Shield,
      title: "Fully Insured",
      description: "All vehicles come with comprehensive insurance coverage",
    },
    {
      icon: Clock,
      title: "24/7 Service",
      description: "Round-the-clock availability for your convenience",
    },
    {
      icon: Award,
      title: "Best Rates",
      description: "Competitive pricing with no hidden charges",
    },
    {
      icon: Headphones,
      title: "Customer Support",
      description: "Dedicated support team always ready to help",
    },
  ]

  return (
    <>
      <LocalBusinessSchema />
      <BreadcrumbSchema
        items={[
          { name: "Home", url: "/" },
          { name: "Services", url: "/services" },
        ]}
      />

      <div className="min-h-screen bg-background">
        {/* Hero Section */}
        <section className="relative py-20 md:py-32 overflow-hidden">
          {/* Background Image */}
          <div className="absolute inset-0 z-0">
            <Image
              src="/luxury-car-rental-services-professional-chauffeur-.jpg"
              alt="Car Rental Services"
              fill
              className="object-cover brightness-[0.3]"
              priority
            />
          </div>

          {/* Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-background/40 to-accent/20 z-[1]" />

          <div className="container mx-auto px-4 relative z-10">
            <Breadcrumbs items={[{ label: "Services", href: "/services" }]} />

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="max-w-3xl"
            >
              <Badge className="mb-4">Premium Services</Badge>
              <h1 className="font-serif text-4xl md:text-6xl font-bold text-white mb-6 text-balance">
                Car Rental Services in Abbottabad, Pakistan
              </h1>
              <p className="text-lg md:text-xl text-white/90 mb-8 text-pretty leading-relaxed">
                From weddings to corporate events, airport transfers to tourism adventures, we provide comprehensive car
                rental solutions across Abbottabad and Khyber Pakhtunkhwa.
              </p>
              <div className="flex flex-wrap gap-4">
                <Button size="lg" asChild>
                  <Link href="/fleet">View Our Fleet</Link>
                </Button>
                <Button size="lg" variant="outline" asChild>
                  <Link href="/contact">Get a Quote</Link>
                </Button>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Services Grid */}
        <section className="py-20 md:py-32">
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-center mb-16"
            >
              <Badge className="mb-4">What We Offer</Badge>
              <h2 className="font-serif text-3xl md:text-5xl font-bold mb-6">Our Services</h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto text-pretty">
                Tailored car rental solutions for every occasion in Abbottabad and surrounding areas
              </p>
            </motion.div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {services.map((service, index) => (
                <motion.div
                  key={service.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <Card className="p-8 h-full hover:shadow-xl transition-all duration-300 hover:-translate-y-1 relative overflow-hidden group">
                    {service.popular && (
                      <Badge className="absolute top-4 right-4">
                        <Star className="h-3 w-3 mr-1" />
                        Popular
                      </Badge>
                    )}

                    <div className="bg-primary/10 w-16 h-16 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                      <service.icon className="h-8 w-8 text-primary" />
                    </div>

                    <h3 className="font-serif text-2xl font-bold mb-4">{service.title}</h3>

                    <p className="text-muted-foreground mb-6 leading-relaxed">{service.description}</p>

                    <ul className="space-y-3 mb-6">
                      {service.features.map((feature) => (
                        <li key={feature} className="flex items-start gap-2">
                          <CheckCircle2 className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                          <span className="text-sm">{feature}</span>
                        </li>
                      ))}
                    </ul>

                    <Button className="w-full bg-transparent" variant="outline" asChild>
                      <Link href="/contact">Book Now</Link>
                    </Button>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Why Choose Us */}
        <section className="py-20 md:py-32 bg-muted/30">
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-center mb-16"
            >
              <h2 className="font-serif text-3xl md:text-5xl font-bold mb-6">Why Choose Abbottabad Rent A Car</h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto text-pretty">
                Your trusted car rental partner in Abbottabad with years of experience
              </p>
            </motion.div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {whyChooseUs.map((item, index) => (
                <motion.div
                  key={item.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="text-center"
                >
                  <div className="bg-primary/10 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6">
                    <item.icon className="h-10 w-10 text-primary" />
                  </div>
                  <h3 className="font-serif text-xl font-bold mb-3">{item.title}</h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">{item.description}</p>
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
                <h2 className="font-serif text-3xl md:text-5xl font-bold mb-6">Ready to Book Your Car?</h2>
                <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto text-pretty">
                  Contact us today for the best car rental rates in Abbottabad. Available 24/7 for your convenience.
                </p>
                <div className="flex flex-wrap gap-4 justify-center">
                  <Button size="lg" asChild>
                    <Link href="/contact">Contact Us</Link>
                  </Button>
                  <Button size="lg" variant="outline" asChild>
                    <Link href="/fleet">Browse Fleet</Link>
                  </Button>
                </div>
              </motion.div>
            </Card>
          </div>
        </section>
      </div>
    </>
  )
}
