"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { ArrowLeft, Users, Fuel, Gauge, Calendar, Shield, CheckCircle2, Phone, MessageCircle, Star, Loader2 } from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import { useParams } from "next/navigation"
import { carsApi, contactApi } from "@/lib/api"
import { notFound } from "next/navigation"

export default function CarDetailPage() {
  const params = useParams()
  const slug = params?.slug as string
  const [loading, setLoading] = useState(true)
  const [car, setCar] = useState<any>(null)
  const [phoneNumber, setPhoneNumber] = useState("+923001234567")

  useEffect(() => {
    if (slug) {
      loadCar()
      loadContactInfo()
    }
  }, [slug])

  const loadCar = async () => {
    if (!slug) return
    
    try {
      setLoading(true)
      const carData = await carsApi.getOne(slug)
      setCar(carData)
    } catch (err: any) {
      console.error("Error loading car:", err)
      // If car not found, set to null so notFound() is called
      setCar(null)
    } finally {
      setLoading(false)
    }
  }

  const loadContactInfo = async () => {
    try {
      const contactData = await contactApi.get()
      if (contactData?.phoneNumber) {
        setPhoneNumber(contactData.phoneNumber.replace(/[^\d+]/g, ''))
      }
    } catch (err) {
      console.error("Error loading contact info:", err)
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-accent" />
      </div>
    )
  }

  if (!car) {
    notFound()
  }

  // Format pricing for display
  const pricing = car.pricing || {}
  const pricingArray = [
    { duration: "1-3 days", price: pricing["1-3"] || car.price },
    { duration: "4-9 days", price: pricing["4-9"] || car.price },
    { duration: "10-25 days", price: pricing["10-25"] || car.price },
    { duration: "26+ days", price: pricing["26+"] || car.price },
  ].filter((p) => p.price)

  // Default included features
  const included = [
    "Comprehensive insurance",
    "24/7 roadside assistance",
    "Free delivery within city",
    "Professional chauffeur available",
    "GPS navigation system",
  ]

  // Use car image or images array
  const mainImage = car.images?.[0] || car.image || "/placeholder.svg"
  const additionalImages = car.images?.slice(1, 4) || []

  return (
    <div className="flex flex-col">
      {/* Breadcrumb */}
      <div className="border-b border-border bg-muted/30">
        <div className="container mx-auto px-4 py-4">
          <Link
            href="/fleet"
            className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Fleet
          </Link>
        </div>
      </div>

      {/* Hero Image Section */}
      <div className="relative h-[40vh] sm:h-[50vh] lg:h-[60vh] w-full overflow-hidden">
        <Image src={mainImage} alt={car.name} fill className="object-cover" priority />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/60 to-background/20" />

        {/* Hero Content */}
        <div className="absolute inset-0 flex items-end">
          <div className="container mx-auto px-4 pb-12">
            <div className="max-w-3xl">
              <Badge variant="secondary" className="mb-3 bg-background/80 backdrop-blur-sm">
                {car.categoryName || car.category?.name || "Uncategorized"}
              </Badge>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-serif font-bold mb-4 text-balance">{car.name}</h1>
              <div className="flex items-center gap-4 text-sm">
                <div className="flex items-center gap-1 bg-background/80 backdrop-blur-sm px-3 py-1.5 rounded-full">
                  <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                  <span className="font-bold">{car.rating || 4.5}</span>
                  <span className="text-muted-foreground">({car.reviews || 0} reviews)</span>
                </div>
                {car.specs?.year && (
                  <div className="flex items-center gap-1 bg-background/80 backdrop-blur-sm px-3 py-1.5 rounded-full text-muted-foreground">
                    <Calendar className="h-4 w-4" />
                    <span>{car.specs.year}</span>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-8 lg:py-12">
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 max-w-7xl mx-auto">
          {/* Left Column - Images */}
          <div className="space-y-4">
            {additionalImages.length > 0 && (
              <div className="grid grid-cols-3 gap-4">
                {additionalImages.map((image: string, index: number) => (
                  <div key={index} className="relative aspect-[4/3] rounded-lg overflow-hidden cursor-pointer group">
                    <Image
                      src={image || mainImage}
                      alt={`${car.name} view ${index + 2}`}
                      fill
                      className="object-cover group-hover:scale-110 transition-transform duration-300"
                    />
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Right Column - Details */}
          <div className="space-y-6">
            {/* Description */}
            {car.description && (
              <div>
                <h2 className="text-xl font-bold mb-3">About This Vehicle</h2>
                <p className="text-muted-foreground leading-relaxed">{car.description}</p>
              </div>
            )}

            <Separator />

            {/* Specifications */}
            <Card className="p-6">
              <h3 className="font-bold mb-4">Specifications</h3>
              <div className="grid grid-cols-2 gap-4">
                {(car.specs?.passengers || car.specs?.seats) && (
                  <div className="flex items-center gap-3">
                    <Users className="h-5 w-5 text-muted-foreground" />
                    <div>
                      <div className="text-xs text-muted-foreground">Seats</div>
                      <div className="font-medium">{car.specs.passengers || car.specs.seats}</div>
                    </div>
                  </div>
                )}
                {car.specs?.fuel && (
                  <div className="flex items-center gap-3">
                    <Fuel className="h-5 w-5 text-muted-foreground" />
                    <div>
                      <div className="text-xs text-muted-foreground">Fuel</div>
                      <div className="font-medium">{car.specs.fuel}</div>
                    </div>
                  </div>
                )}
                {car.specs?.transmission && (
                  <div className="flex items-center gap-3">
                    <Gauge className="h-5 w-5 text-muted-foreground" />
                    <div>
                      <div className="text-xs text-muted-foreground">Transmission</div>
                      <div className="font-medium">{car.specs.transmission}</div>
                    </div>
                  </div>
                )}
                {(car.specs?.power || car.specs?.engine) && (
                  <div className="flex items-center gap-3">
                    <Shield className="h-5 w-5 text-muted-foreground" />
                    <div>
                      <div className="text-xs text-muted-foreground">Engine</div>
                      <div className="font-medium text-sm">{car.specs.power || car.specs.engine}</div>
                    </div>
                  </div>
                )}
              </div>
            </Card>

            {/* Pricing */}
            {pricingArray.length > 0 && (
              <Card className="p-6 bg-accent text-accent-foreground">
                <h3 className="font-bold mb-4">Rental Rates</h3>
                <div className="space-y-3">
                  {pricingArray.map((tier, index) => (
                    <div key={index} className="flex justify-between items-center">
                      <span className="text-sm">{tier.duration}</span>
                      <span className="font-bold text-lg">
                        Rs. {tier.price.toLocaleString()}
                        <span className="text-sm font-normal opacity-80"> / day</span>
                      </span>
                    </div>
                  ))}
                </div>
              </Card>
            )}

            {/* Contact Buttons */}
            <div className="grid grid-cols-2 gap-4">
              <Button size="lg" className="w-full" asChild>
                <a href={`tel:${phoneNumber}`}>
                  <Phone className="mr-2 h-5 w-5" />
                  Call Now
                </a>
              </Button>
              <Button size="lg" variant="outline" className="w-full bg-transparent" asChild>
                <Link href="/contact">
                  <MessageCircle className="mr-2 h-5 w-5" />
                  Contact
                </Link>
              </Button>
            </div>

            {/* Book Now Button */}
            <Button size="lg" className="w-full bg-accent hover:bg-accent/90" asChild>
              <a href={`tel:${phoneNumber}`}>
                <Phone className="mr-2 h-5 w-5" />
                Book Now
              </a>
            </Button>
          </div>
        </div>

        {/* Features Section */}
        {car.features && car.features.length > 0 && (
          <div className="max-w-7xl mx-auto mt-12">
            <Card className="p-6 sm:p-8">
              <h2 className="text-2xl font-serif font-bold mb-6">Features & Amenities</h2>
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {car.features.map((feature: string, index: number) => (
                  <div key={index} className="flex items-center gap-3">
                    <CheckCircle2 className="h-5 w-5 text-green-600 flex-shrink-0" />
                    <span className="text-sm">{feature}</span>
                  </div>
                ))}
              </div>
            </Card>
          </div>
        )}

        {/* What's Included */}
        <div className="max-w-7xl mx-auto mt-8">
          <Card className="p-6 sm:p-8">
            <h2 className="text-2xl font-serif font-bold mb-6">What's Included</h2>
            <div className="grid sm:grid-cols-2 gap-4">
              {included.map((item, index) => (
                <div key={index} className="flex items-start gap-3">
                  <CheckCircle2 className="h-5 w-5 text-secondary flex-shrink-0 mt-0.5" />
                  <span className="text-sm text-muted-foreground">{item}</span>
                </div>
              ))}
            </div>
          </Card>
        </div>

        {/* CTA Section */}
        <div className="max-w-7xl mx-auto mt-12">
          <Card className="p-8 sm:p-12 text-center bg-muted">
            <h3 className="text-2xl sm:text-3xl font-serif font-bold mb-4">Ready to Book This Vehicle?</h3>
            <p className="text-lg text-muted-foreground mb-6 max-w-2xl mx-auto">
              Contact us today to check availability and reserve your {car.name}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" asChild>
                <a href={`tel:${phoneNumber}`}>
                  <Phone className="mr-2 h-5 w-5" />
                  Book Now - Call {phoneNumber}
                </a>
              </Button>
              <Button size="lg" variant="outline" asChild>
                <Link href="/contact">Send Inquiry</Link>
              </Button>
            </div>
          </Card>
        </div>
      </div>
    </div>
  )
}
