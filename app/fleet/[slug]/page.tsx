import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { ArrowLeft, Users, Fuel, Gauge, Calendar, Shield, CheckCircle2, Phone, MessageCircle, Star } from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import { notFound } from "next/navigation"

// Mock car data - in a real app, this would come from a database
const cars = {
  "hyundai-elantra": {
    id: "hyundai-elantra",
    name: "Hyundai Elantra",
    category: "Middle Class Sedan",
    year: 2022,
    rating: 4.8,
    reviews: 24,
    images: [
      "/silver-hyundai-elantra-2022.jpg",
      "/hyundai-elantra-interior.jpg",
      "/hyundai-elantra-dashboard.jpg",
      "/hyundai-elantra-trunk.jpg",
    ],
    description:
      "The Hyundai Elantra combines sophisticated styling with advanced technology and exceptional fuel efficiency. Perfect for business trips, family outings, or exploring the scenic routes of Northern Pakistan in comfort and style.",
    specs: {
      seats: 5,
      fuelConsumption: "8 L / 100 km",
      transmission: "Automatic",
      engine: "1.6 L 128 hp",
      driveType: "Front-Wheel Drive",
      fuelType: "Petrol",
    },
    features: [
      "Premium leather interior",
      "Advanced safety features",
      "Bluetooth connectivity",
      "Backup camera",
      "Climate control",
      "Cruise control",
      "Keyless entry",
      "Push-button start",
      "Lane departure warning",
      "Blind spot monitoring",
    ],
    pricing: [
      { duration: "1-3 days", price: 8500, unit: "per day" },
      { duration: "4-9 days", price: 8000, unit: "per day" },
      { duration: "10-25 days", price: 7500, unit: "per day" },
      { duration: "26+ days", price: 7000, unit: "per day" },
    ],
    included: [
      "Comprehensive insurance",
      "24/7 roadside assistance",
      "Free delivery within city",
      "Professional chauffeur available",
      "GPS navigation system",
    ],
  },
  "rolls-royce-phantom": {
    id: "rolls-royce-phantom",
    name: "Rolls-Royce Phantom",
    category: "Ultra Luxury",
    year: 2023,
    rating: 5.0,
    reviews: 18,
    images: [
      "/black-rolls-royce-phantom.jpg",
      "/rolls-royce-phantom-interior-luxury.jpg",
      "/rolls-royce-phantom-dashboard.jpg",
      "/rolls-royce-phantom-rear-seats.jpg",
    ],
    description:
      "The pinnacle of automotive luxury, the Rolls-Royce Phantom represents the ultimate in prestige and refinement. With its iconic presence and unparalleled craftsmanship, it's the perfect choice for weddings, VIP events, and those who demand nothing but the best.",
    specs: {
      seats: 5,
      fuelConsumption: "18 L / 100 km",
      transmission: "Automatic",
      engine: "6.75 L V12 563 hp",
      driveType: "Rear-Wheel Drive",
      fuelType: "Petrol",
    },
    features: [
      "Handcrafted leather interior",
      "Starlight headliner",
      "Bespoke audio system",
      "Rear-seat entertainment",
      "Champagne cooler",
      "Massage seats",
      "Panoramic sunroof",
      "Night vision",
      "Adaptive cruise control",
      "Self-leveling suspension",
      "Umbrellas in doors",
      "Picnic tables",
    ],
    pricing: [
      { duration: "Per day", price: 85000, unit: "per day" },
      { duration: "Half day (4 hours)", price: 50000, unit: "per session" },
      { duration: "Wedding package", price: 120000, unit: "full day" },
      { duration: "Weekly rate", price: 550000, unit: "per week" },
    ],
    included: [
      "Professional chauffeur mandatory",
      "Premium insurance coverage",
      "Red carpet service",
      "Complimentary refreshments",
      "Decoration for weddings",
      "24/7 concierge support",
    ],
  },
}

export default function CarDetailPage({ params }: { params: { slug: string } }) {
  const car = cars[params.slug as keyof typeof cars]

  if (!car) {
    notFound()
  }

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
        <Image src={car.images[0] || "/placeholder.svg"} alt={car.name} fill className="object-cover" priority />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/60 to-background/20" />

        {/* Hero Content */}
        <div className="absolute inset-0 flex items-end">
          <div className="container mx-auto px-4 pb-12">
            <div className="max-w-3xl">
              <Badge variant="secondary" className="mb-3 bg-background/80 backdrop-blur-sm">
                {car.category}
              </Badge>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-serif font-bold mb-4 text-balance">{car.name}</h1>
              <div className="flex items-center gap-4 text-sm">
                <div className="flex items-center gap-1 bg-background/80 backdrop-blur-sm px-3 py-1.5 rounded-full">
                  <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                  <span className="font-bold">{car.rating}</span>
                  <span className="text-muted-foreground">({car.reviews} reviews)</span>
                </div>
                <div className="flex items-center gap-1 bg-background/80 backdrop-blur-sm px-3 py-1.5 rounded-full text-muted-foreground">
                  <Calendar className="h-4 w-4" />
                  <span>{car.year}</span>
                </div>
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
            {/* Thumbnail Grid */}
            <div className="grid grid-cols-3 gap-4">
              {car.images.slice(1, 4).map((image, index) => (
                <div key={index} className="relative aspect-[4/3] rounded-lg overflow-hidden cursor-pointer group">
                  <Image
                    src={image || "/placeholder.svg"}
                    alt={`${car.name} view ${index + 2}`}
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-300"
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Right Column - Details */}
          <div className="space-y-6">
            {/* Description */}
            <div>
              <h2 className="text-xl font-bold mb-3">About This Vehicle</h2>
              <p className="text-muted-foreground leading-relaxed">{car.description}</p>
            </div>

            <Separator />

            {/* Specifications */}
            <Card className="p-6">
              <h3 className="font-bold mb-4">Specifications</h3>
              <div className="grid grid-cols-2 gap-4">
                <div className="flex items-center gap-3">
                  <Users className="h-5 w-5 text-muted-foreground" />
                  <div>
                    <div className="text-xs text-muted-foreground">Seats</div>
                    <div className="font-medium">{car.specs.seats}</div>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Fuel className="h-5 w-5 text-muted-foreground" />
                  <div>
                    <div className="text-xs text-muted-foreground">Fuel</div>
                    <div className="font-medium">{car.specs.fuelConsumption}</div>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Gauge className="h-5 w-5 text-muted-foreground" />
                  <div>
                    <div className="text-xs text-muted-foreground">Transmission</div>
                    <div className="font-medium">{car.specs.transmission}</div>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Shield className="h-5 w-5 text-muted-foreground" />
                  <div>
                    <div className="text-xs text-muted-foreground">Engine</div>
                    <div className="font-medium text-sm">{car.specs.engine}</div>
                  </div>
                </div>
              </div>
            </Card>

            {/* Pricing */}
            <Card className="p-6 bg-accent text-accent-foreground">
              <h3 className="font-bold mb-4">Rental Rates</h3>
              <div className="space-y-3">
                {car.pricing.map((tier, index) => (
                  <div key={index} className="flex justify-between items-center">
                    <span className="text-sm">{tier.duration}</span>
                    <span className="font-bold text-lg">
                      Rs. {tier.price.toLocaleString()}
                      <span className="text-sm font-normal opacity-80"> / {tier.unit}</span>
                    </span>
                  </div>
                ))}
              </div>
            </Card>

            {/* Contact Buttons */}
            <div className="grid grid-cols-2 gap-4">
              <Button size="lg" className="w-full" asChild>
                <a href="tel:+923001234567">
                  <Phone className="mr-2 h-5 w-5" />
                  Call Now
                </a>
              </Button>
              <Button size="lg" variant="outline" className="w-full bg-transparent" asChild>
                <a href="https://wa.me/923001234567" target="_blank" rel="noopener noreferrer">
                  <MessageCircle className="mr-2 h-5 w-5" />
                  WhatsApp
                </a>
              </Button>
            </div>
          </div>
        </div>

        {/* Features Section */}
        <div className="max-w-7xl mx-auto mt-12">
          <Card className="p-6 sm:p-8">
            <h2 className="text-2xl font-serif font-bold mb-6">Features & Amenities</h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {car.features.map((feature, index) => (
                <div key={index} className="flex items-center gap-3">
                  <CheckCircle2 className="h-5 w-5 text-green-600 flex-shrink-0" />
                  <span className="text-sm">{feature}</span>
                </div>
              ))}
            </div>
          </Card>
        </div>

        {/* What's Included */}
        <div className="max-w-7xl mx-auto mt-8">
          <Card className="p-6 sm:p-8">
            <h2 className="text-2xl font-serif font-bold mb-6">What's Included</h2>
            <div className="grid sm:grid-cols-2 gap-4">
              {car.included.map((item, index) => (
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
                <a href="tel:+923001234567">
                  <Phone className="mr-2 h-5 w-5" />
                  Call +92 300 1234567
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
