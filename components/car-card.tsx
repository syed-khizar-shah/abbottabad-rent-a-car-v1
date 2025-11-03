import Image from "next/image"
import { Star, Users, Fuel, Gauge, Cog, CarIcon } from "lucide-react"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"

interface PricingTier {
  days: string
  price: string
}

interface CarCardProps {
  name: string
  category: string
  rating: number
  reviews: number
  image: string
  year: number
  seats: number
  fuelConsumption: string
  transmission: string
  engine: string
  driveType: string
  pricing: PricingTier[]
}

export function CarCard({
  name,
  category,
  rating,
  reviews,
  image,
  year,
  seats,
  fuelConsumption,
  transmission,
  engine,
  driveType,
  pricing,
}: CarCardProps) {
  return (
    <Card className="overflow-hidden transition-all duration-300 hover:shadow-xl hover:-translate-y-1 group border-border/50">
      {/* Image */}
      <div className="relative h-52 overflow-hidden bg-muted/50">
        <Image
          src={image || "/placeholder.svg"}
          alt={name}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        <Badge className="absolute top-4 left-4 bg-background/95 backdrop-blur-sm text-foreground shadow-md border-0">
          {category}
        </Badge>
        <div className="absolute top-4 right-4 flex items-center gap-1.5 bg-background/95 backdrop-blur-sm px-2.5 py-1.5 rounded-full shadow-md">
          <Star className="h-3.5 w-3.5 fill-accent text-accent" />
          <span className="text-xs font-semibold">{rating}</span>
        </div>
      </div>

      <CardContent className="p-5 md:p-6 space-y-5">
        {/* Title and Rating */}
        <div className="space-y-2">
          <h3 className="font-serif text-xl md:text-2xl font-bold leading-tight">{name}</h3>
          <div className="flex items-center gap-2.5">
            <div className="flex items-center gap-1.5">
              <Star className="h-4 w-4 fill-accent text-accent" />
              <span className="text-sm font-semibold">{rating}</span>
            </div>
            <span className="text-sm text-muted-foreground">({reviews} reviews)</span>
          </div>
        </div>

        {/* Specifications */}
        <div className="grid grid-cols-2 gap-3 text-sm py-3 border-y border-border/50">
          <div className="flex items-center gap-2.5 text-muted-foreground group-hover:text-foreground transition-colors">
            <CarIcon className="h-4 w-4 text-accent/70 shrink-0" />
            <span className="text-xs md:text-sm">{year}</span>
          </div>
          <div className="flex items-center gap-2.5 text-muted-foreground group-hover:text-foreground transition-colors">
            <Users className="h-4 w-4 text-accent/70 shrink-0" />
            <span className="text-xs md:text-sm">{seats} Seats</span>
          </div>
          <div className="flex items-center gap-2.5 text-muted-foreground group-hover:text-foreground transition-colors">
            <Fuel className="h-4 w-4 text-accent/70 shrink-0" />
            <span className="text-xs md:text-sm">{fuelConsumption}</span>
          </div>
          <div className="flex items-center gap-2.5 text-muted-foreground group-hover:text-foreground transition-colors">
            <Cog className="h-4 w-4 text-accent/70 shrink-0" />
            <span className="text-xs md:text-sm">{transmission}</span>
          </div>
          <div className="flex items-center gap-2.5 text-muted-foreground col-span-2 group-hover:text-foreground transition-colors">
            <Gauge className="h-4 w-4 text-accent/70 shrink-0" />
            <span className="text-xs md:text-sm">
              {engine} • {driveType}
            </span>
          </div>
        </div>

        {/* Pricing */}
        <div className="space-y-3 pt-2">
          <h4 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Rental Prices</h4>
          <div className="grid grid-cols-2 gap-3 text-xs">
            {pricing.map((tier, index) => (
              <div 
                key={index} 
                className="flex justify-between items-center p-2 rounded-md bg-muted/30 group-hover:bg-accent/5 transition-colors"
              >
                <span className="text-muted-foreground text-xs">{tier.days}</span>
                <span className="font-bold text-foreground">{tier.price}</span>
              </div>
            ))}
          </div>
        </div>
      </CardContent>

      <CardFooter className="p-5 md:p-6 pt-0">
        <Button 
          className="w-full shadow-sm hover:shadow-md transition-all duration-200 group-hover:bg-accent group-hover:text-accent-foreground" 
          size="lg"
        >
          Rent Now
        </Button>
      </CardFooter>
    </Card>
  )
}
