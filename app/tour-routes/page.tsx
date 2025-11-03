"use client"

import { useEffect, useState } from "react"
import { Phone, MapPin, Car, ArrowRight, MessageCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Breadcrumbs } from "@/components/breadcrumbs"
import { StructuredData } from "@/components/structured-data"
import Image from "next/image"
import { tourRoutesApi } from "@/lib/api"

export default function TourRoutesPage() {
  const [content, setContent] = useState<any>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    loadData()
  }, [])

  const loadData = async () => {
    try {
      const data = await tourRoutesApi.get()
      setContent(data)
    } catch (err) {
      console.error("Error loading tour routes:", err)
    } finally {
      setLoading(false)
    }
  }

  if (loading || !content) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-accent"></div>
      </div>
    )
  }
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
              src={content.heroImage || "/scenic-mountain-road-pakistan.jpg"}
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
                {content.heroBadge}
              </Badge>
              <h1 className="text-5xl md:text-6xl font-serif font-bold text-white">{content.heroTitle}</h1>
              <p className="text-xl text-white/90">
                {content.heroSubtitle}
              </p>
              <div className="flex flex-wrap gap-4 justify-center pt-4">
                <Button size="lg" asChild>
                  <a href={`tel:${content.heroPhone}`}>
                    <Phone className="mr-2 h-5 w-5" />
                    {content.heroPrimaryCTA}
                  </a>
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  asChild
                  className="bg-background/20 backdrop-blur-sm hover:bg-background/30"
                >
                  <a href={`https://wa.me/${content.heroWhatsApp}`} target="_blank" rel="noopener noreferrer">
                    <MessageCircle className="mr-2 h-5 w-5" />
                    {content.heroSecondaryCTA}
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
              <h2 className="font-serif text-3xl md:text-4xl font-bold text-center mb-12">{content.popularDestinationsTitle}</h2>
              <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
                {content.popularDestinations && content.popularDestinations.length > 0 ? (
                  content.popularDestinations.map((destination: string, index: number) => (
                    <Card
                      key={index}
                      className="p-4 text-center hover:shadow-lg transition-all hover:scale-105 cursor-pointer"
                    >
                      <MapPin className="h-6 w-6 mx-auto mb-2 text-accent" />
                      <p className="font-medium text-sm">{destination}</p>
                    </Card>
                  ))
                ) : null}
              </div>
            </div>
          </div>
        </section>

        {/* Tour Routes by Category */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="max-w-7xl mx-auto space-y-16">
              {content.routes && content.routes.map((category: any, idx: number) => (
                <div key={idx} className="space-y-6">
                  <div className="flex items-center gap-3">
                    <Car className="h-8 w-8 text-accent" />
                    <h2 className="font-serif text-3xl md:text-4xl font-bold">{category.category}</h2>
                  </div>
                  <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                    {category.routes.map((route: any, routeIdx: number) => (
                      <Card
                        key={routeIdx}
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
                          <a href={`tel:${content.heroPhone}`}>
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
              <h2 className="font-serif text-3xl md:text-5xl font-bold mb-6">{content.ctaTitle}</h2>
              <p className="text-lg text-muted-foreground mb-8">
                {content.ctaSubtitle}
              </p>
              <div className="flex flex-wrap gap-4 justify-center">
                <Button size="lg" asChild>
                  <a href={`tel:${content.ctaPhone}`}>
                    <Phone className="mr-2 h-5 w-5" />
                    {content.ctaPrimaryButton}
                  </a>
                </Button>
                <Button size="lg" variant="outline" asChild>
                  <a href="/contact">{content.ctaSecondaryButton}</a>
                </Button>
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  )
}
