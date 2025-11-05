"use client"

import { useEffect, useState } from "react"
import { useRouter, useParams } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { authApi, categoriesApi, carsApi } from "@/lib/api"
import { ArrowLeft, Car, Loader2, Star } from "lucide-react"
import Image from "next/image"

export default function CategoryCarsPage() {
  const router = useRouter()
  const params = useParams()
  const categoryId = params.id as string
  const [loading, setLoading] = useState(true)
  const [category, setCategory] = useState<any>(null)
  const [cars, setCars] = useState<any[]>([])

  useEffect(() => {
    checkAuth()
    loadData()
  }, [categoryId])

  const checkAuth = async () => {
    try {
      await authApi.me()
    } catch {
      router.push("/admin/login")
    }
  }

  const loadData = async () => {
    try {
      const [categoryData, allCars] = await Promise.all([
        categoriesApi.getOne(categoryId),
        carsApi.getAll()
      ])
      
      setCategory(categoryData)
      // Filter cars that belong to this category
      const categoryCars = allCars.filter((car: any) => 
        car.category?._id === categoryId || 
        car.category === categoryId ||
        car.categoryName === categoryData.name
      )
      setCars(categoryCars)
    } catch (err) {
      console.error("Error loading data:", err)
      alert("Failed to load category data")
      router.push("/admin/categories")
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-accent" />
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 sm:px-6 py-4 sm:py-8">
        <div className="flex items-center gap-4 mb-6">
          <Button variant="ghost" asChild>
            <Link href="/admin/categories">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Categories
            </Link>
          </Button>
          <div>
            <h1 className="text-3xl font-bold font-serif">Cars in {category?.name}</h1>
            <p className="text-muted-foreground mt-1">{cars.length} {cars.length === 1 ? 'car' : 'cars'} in this category</p>
          </div>
        </div>

        {cars.length === 0 ? (
          <Card className="p-12 text-center">
            <Car className="h-16 w-16 mx-auto text-muted-foreground/50 mb-4" />
            <p className="text-muted-foreground mb-4">No cars found in this category</p>
            <Button asChild>
              <Link href="/admin/cars/new">Add a Car to This Category</Link>
            </Button>
          </Card>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {cars.map((car) => (
              <Card key={car._id} className="overflow-hidden hover:shadow-lg transition-shadow">
                <div className="relative h-48 bg-muted">
                  {car.image && (
                    <Image
                      src={car.image}
                      alt={car.name}
                      fill
                      className="object-cover"
                    />
                  )}
                </div>
                <div className="p-4 space-y-3">
                  <div>
                    <h3 className="font-bold text-lg">{car.name}</h3>
                    <p className="text-sm text-muted-foreground">{car.categoryName}</p>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-2xl font-bold">Rs{car.price}/day</span>
                    <div className="flex items-center gap-1">
                      <Star className="h-4 w-4 fill-accent text-accent" />
                      <span className="text-sm font-medium">{car.rating || 4.5}</span>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm" asChild className="flex-1">
                      <Link href={`/admin/cars/${car._id}`}>
                        Edit
                      </Link>
                    </Button>
                    <Button size="sm" asChild className="flex-1">
                      <Link href={`/fleet/${car.slug || car._id}`}>
                        View
                      </Link>
                    </Button>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

