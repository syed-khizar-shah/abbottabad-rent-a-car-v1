import type { Metadata } from "next"
import { Phone, MapPin, Car, ArrowRight, MessageCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Breadcrumbs } from "@/components/breadcrumbs"
import { StructuredData } from "@/components/structured-data"
import Image from "next/image"

export const metadata: Metadata = {
  title: "Tour Routes & Destinations | Abbottabad Rent A Car - Travel Across Pakistan",
  description:
    "Explore our comprehensive tour routes from Abbottabad, Islamabad, Rawalpindi, and Mansehra to popular destinations across Pakistan. Rent a car for Naran, Hunza, Skardu, Kashmir, Swat, and more.",
  keywords:
    "rent a car Abbottabad to Naran, car rental Islamabad to Hunza, Abbottabad to Skardu car hire, tour packages Pakistan, northern areas car rental",
  openGraph: {
    title: "Tour Routes & Destinations | Abbottabad Rent A Car",
    description:
      "Travel across Pakistan with our premium car rental services. Routes to Naran, Hunza, Skardu, Kashmir, Swat, and all major cities.",
    type: "website",
  },
}

const tourRoutes = [
  {
    category: "From Islamabad",
    routes: [
      { id: 1, destination: "Abbottabad", oneWay: "On Call", twoWay: "On Call" },
      { id: 2, destination: "Mansehra", oneWay: "On Call", twoWay: "On Call" },
      { id: 3, destination: "Murree", oneWay: "On Call", twoWay: "On Call" },
      { id: 4, destination: "Nathiagali", oneWay: "On Call", twoWay: "On Call" },
      { id: 5, destination: "Kashmir", oneWay: "On Call", twoWay: "On Call" },
      { id: 6, destination: "Neelum Valley", oneWay: "On Call", twoWay: "On Call" },
      { id: 7, destination: "Swat", oneWay: "On Call", twoWay: "On Call" },
      { id: 8, destination: "Naran Kaghan", oneWay: "On Call", twoWay: "On Call" },
      { id: 9, destination: "Hunza", oneWay: "On Call", twoWay: "On Call" },
      { id: 10, destination: "Skardu", oneWay: "On Call", twoWay: "On Call" },
      { id: 11, destination: "Gilgit", oneWay: "On Call", twoWay: "On Call" },
      { id: 12, destination: "Lahore", oneWay: "On Call", twoWay: "On Call" },
      { id: 13, destination: "Multan", oneWay: "On Call", twoWay: "On Call" },
      { id: 14, destination: "Faisalabad", oneWay: "On Call", twoWay: "On Call" },
      { id: 15, destination: "Chitral", oneWay: "On Call", twoWay: "On Call" },
      { id: 16, destination: "Shogran", oneWay: "On Call", twoWay: "On Call" },
      { id: 17, destination: "Saiful Muluk", oneWay: "On Call", twoWay: "On Call" },
      { id: 18, destination: "Peshawar", oneWay: "On Call", twoWay: "On Call" },
      { id: 19, destination: "Sukkur", oneWay: "On Call", twoWay: "On Call" },
      { id: 20, destination: "Karachi", oneWay: "On Call", twoWay: "On Call" },
    ],
  },
  {
    category: "From Rawalpindi",
    routes: [
      { id: 21, destination: "Abbottabad", oneWay: "On Call", twoWay: "On Call" },
      { id: 22, destination: "Mansehra", oneWay: "On Call", twoWay: "On Call" },
      { id: 23, destination: "Murree", oneWay: "On Call", twoWay: "On Call" },
      { id: 24, destination: "Nathiagali", oneWay: "On Call", twoWay: "On Call" },
      { id: 25, destination: "Kashmir", oneWay: "On Call", twoWay: "On Call" },
      { id: 26, destination: "Neelum Valley", oneWay: "On Call", twoWay: "On Call" },
      { id: 27, destination: "Swat", oneWay: "On Call", twoWay: "On Call" },
      { id: 28, destination: "Naran Kaghan", oneWay: "On Call", twoWay: "On Call" },
      { id: 29, destination: "Hunza", oneWay: "On Call", twoWay: "On Call" },
      { id: 30, destination: "Skardu", oneWay: "On Call", twoWay: "On Call" },
      { id: 31, destination: "Gilgit", oneWay: "On Call", twoWay: "On Call" },
      { id: 32, destination: "Lahore", oneWay: "On Call", twoWay: "On Call" },
      { id: 33, destination: "Multan", oneWay: "On Call", twoWay: "On Call" },
      { id: 34, destination: "Faisalabad", oneWay: "On Call", twoWay: "On Call" },
      { id: 35, destination: "Chitral", oneWay: "On Call", twoWay: "On Call" },
      { id: 36, destination: "Shogran", oneWay: "On Call", twoWay: "On Call" },
      { id: 37, destination: "Peshawar", oneWay: "On Call", twoWay: "On Call" },
      { id: 38, destination: "Saiful Muluk", oneWay: "On Call", twoWay: "On Call" },
      { id: 39, destination: "Sukkur", oneWay: "On Call", twoWay: "On Call" },
      { id: 40, destination: "Karachi", oneWay: "On Call", twoWay: "On Call" },
    ],
  },
  {
    category: "From Abbottabad",
    routes: [
      { id: 41, destination: "Islamabad", oneWay: "On Call", twoWay: "On Call" },
      { id: 42, destination: "Islamabad Airport", oneWay: "On Call", twoWay: "On Call" },
      { id: 43, destination: "Murree", oneWay: "On Call", twoWay: "On Call" },
      { id: 44, destination: "Nathiagali", oneWay: "On Call", twoWay: "On Call" },
      { id: 45, destination: "Lahore", oneWay: "On Call", twoWay: "On Call" },
      { id: 46, destination: "Multan", oneWay: "On Call", twoWay: "On Call" },
      { id: 47, destination: "Faisalabad", oneWay: "On Call", twoWay: "On Call" },
      { id: 48, destination: "Peshawar", oneWay: "On Call", twoWay: "On Call" },
      { id: 49, destination: "Mardan", oneWay: "On Call", twoWay: "On Call" },
      { id: 50, destination: "Karachi", oneWay: "On Call", twoWay: "On Call" },
    ],
  },
  {
    category: "From Mansehra",
    routes: [
      { id: 51, destination: "Islamabad", oneWay: "On Call", twoWay: "On Call" },
      { id: 52, destination: "Islamabad Airport", oneWay: "On Call", twoWay: "On Call" },
      { id: 53, destination: "Murree", oneWay: "On Call", twoWay: "On Call" },
      { id: 54, destination: "Nathiagali", oneWay: "On Call", twoWay: "On Call" },
      { id: 55, destination: "Lahore", oneWay: "On Call", twoWay: "On Call" },
      { id: 56, destination: "Multan", oneWay: "On Call", twoWay: "On Call" },
      { id: 57, destination: "Faisalabad", oneWay: "On Call", twoWay: "On Call" },
      { id: 58, destination: "Peshawar", oneWay: "On Call", twoWay: "On Call" },
      { id: 59, destination: "Mardan", oneWay: "On Call", twoWay: "On Call" },
      { id: 60, destination: "Karachi", oneWay: "On Call", twoWay: "On Call" },
    ],
  },
]

export default function TourRoutesPage() {
  return (
    <>
      <StructuredData
        type="BreadcrumbList"
        data={{
          itemListElement: [
            { position: 1, name: "Home", item: "https://abbottabad-rent-a-car.vercel.app" },
            { position: 2, name: "Tour Routes", item: "https://abbottabad-rent-a-car.vercel.app/tour-routes" },
          ],
        }}
      />

      <div className="min-h-screen bg-background">
        {/* Hero Section */}
        <section className="relative py-24 overflow-hidden">
          {/* Background Image */}
          <div className="absolute inset-0 z-0">
            <Image
              src="/scenic-mountain-road-pakistan.jpg"
              alt="Tour routes across Pakistan"
              fill
              className="object-cover brightness-[0.3]"
              priority
            />
          </div>

          {/* Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-background/40 to-accent/20 z-[1]" />

          <div className="container mx-auto px-4 relative z-10">
            <Breadcrumbs
              items={[
                { label: "Home", href: "/" },
                { label: "Tour Routes", href: "/tour-routes" },
              ]}
              className="mb-8"
            />
            <div className="max-w-3xl mx-auto text-center space-y-6">
              <Badge variant="outline" className="text-sm bg-background/20 backdrop-blur-sm">
                Travel Destinations
              </Badge>
              <h1 className="text-5xl md:text-6xl font-serif font-bold text-white">Tour Routes & Destinations</h1>
              <p className="text-xl text-white/90">
                Explore Pakistan's most beautiful destinations with Abbottabad Rent A Car
              </p>
              <div className="flex flex-wrap gap-4 justify-center pt-4">
                <Button size="lg" asChild>
                  <a href="tel:+923001234567">
                    <Phone className="mr-2 h-5 w-5" />
                    Call for Rates
                  </a>
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  asChild
                  className="bg-background/20 backdrop-blur-sm hover:bg-background/30"
                >
                  <a href="https://wa.me/923001234567" target="_blank" rel="noopener noreferrer">
                    <MessageCircle className="mr-2 h-5 w-5" />
                    WhatsApp Us
                  </a>
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Popular Destinations Highlight */}
        <section className="py-16 bg-muted/30">
          <div className="container mx-auto px-4">
            <div className="max-w-6xl mx-auto">
              <h2 className="font-serif text-3xl md:text-4xl font-bold text-center mb-12">Popular Destinations</h2>
              <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
                {[
                  "Naran Kaghan",
                  "Hunza",
                  "Skardu",
                  "Swat",
                  "Kashmir",
                  "Neelum Valley",
                  "Murree",
                  "Nathiagali",
                  "Gilgit",
                  "Chitral",
                  "Shogran",
                  "Saiful Muluk",
                ].map((destination) => (
                  <Card
                    key={destination}
                    className="p-4 text-center hover:shadow-lg transition-all hover:scale-105 cursor-pointer"
                  >
                    <MapPin className="h-6 w-6 mx-auto mb-2 text-accent" />
                    <p className="font-medium text-sm">{destination}</p>
                  </Card>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Tour Routes by Category */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="max-w-7xl mx-auto space-y-16">
              {tourRoutes.map((category, idx) => (
                <div key={idx} className="space-y-6">
                  <div className="flex items-center gap-3">
                    <Car className="h-8 w-8 text-accent" />
                    <h2 className="font-serif text-3xl md:text-4xl font-bold">{category.category}</h2>
                  </div>
                  <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                    {category.routes.map((route) => (
                      <Card
                        key={route.id}
                        className="p-6 hover:shadow-xl transition-all hover:scale-[1.02] group cursor-pointer"
                      >
                        <div className="flex items-start justify-between mb-4">
                          <div className="flex-1">
                            <h3 className="font-semibold text-lg mb-2 group-hover:text-accent transition-colors">
                              {category.category.replace("From ", "")} to {route.destination}
                            </h3>
                            <div className="flex items-center gap-2 text-sm text-muted-foreground">
                              <MapPin className="h-4 w-4" />
                              <span>{route.destination}</span>
                            </div>
                          </div>
                          <ArrowRight className="h-5 w-5 text-accent group-hover:translate-x-1 transition-transform" />
                        </div>
                        <div className="space-y-2 pt-4 border-t">
                          <div className="flex justify-between text-sm">
                            <span className="text-muted-foreground">One Way:</span>
                            <span className="font-semibold text-accent">{route.oneWay}</span>
                          </div>
                          <div className="flex justify-between text-sm">
                            <span className="text-muted-foreground">Round Trip:</span>
                            <span className="font-semibold text-accent">{route.twoWay}</span>
                          </div>
                        </div>
                        <Button className="w-full mt-4" size="sm" asChild>
                          <a href="tel:+923001234567">
                            <Phone className="mr-2 h-4 w-4" />
                            Get Quote
                          </a>
                        </Button>
                      </Card>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 bg-gradient-to-br from-accent/10 to-primary/10">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center">
              <h2 className="font-serif text-3xl md:text-5xl font-bold mb-6">Ready to Start Your Journey?</h2>
              <p className="text-lg text-muted-foreground mb-8">
                Contact us today to get customized rates for your destination. We offer competitive pricing and flexible
                packages for all routes.
              </p>
              <div className="flex flex-wrap gap-4 justify-center">
                <Button size="lg" asChild>
                  <a href="tel:+923001234567">
                    <Phone className="mr-2 h-5 w-5" />
                    Call Now
                  </a>
                </Button>
                <Button size="lg" variant="outline" asChild>
                  <a href="/contact">View All Services</a>
                </Button>
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  )
}
