"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { authApi, carsApi, categoriesApi } from "@/lib/api"
import { ArrowLeft, Plus, Edit, Trash2, Loader2 } from "lucide-react"
import Image from "next/image"

export default function AdminCarsPage() {
  const router = useRouter()
  const [loading, setLoading] = useState(true)
  const [cars, setCars] = useState<any[]>([])
  const [deletingId, setDeletingId] = useState<string | null>(null)

  useEffect(() => {
    checkAuth()
    loadCars()
  }, [])

  const checkAuth = async () => {
    try {
      await authApi.me()
    } catch {
      router.push("/admin/login")
    } finally {
      setLoading(false)
    }
  }

  const loadCars = async () => {
    try {
      const data = await carsApi.getAll()
      setCars(data)
    } catch (err) {
      console.error("Error loading cars:", err)
    }
  }

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this car?")) return

    setDeletingId(id)
    try {
      await carsApi.delete(id)
      await loadCars()
    } catch (err: any) {
      alert(err.message || "Failed to delete car")
    } finally {
      setDeletingId(null)
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
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
          <div className="flex items-center gap-2 sm:gap-4">
            <Button variant="ghost" size="sm" asChild className="lg:flex">
              <Link href="/admin/dashboard">
                <ArrowLeft className="mr-2 h-4 w-4" />
                <span className="hidden sm:inline">Back</span>
              </Link>
            </Button>
            <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold font-serif">Manage Cars</h1>
          </div>
          <Button size="sm" asChild className="w-full sm:w-auto">
            <Link href="/admin/cars/new">
              <Plus className="mr-2 h-4 w-4" />
              Add Car
            </Link>
          </Button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          {cars.map((car) => (
            <Card key={car._id} className="overflow-hidden">
              <div className="relative h-40 sm:h-48 bg-muted">
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
                  <h3 className="font-bold text-base sm:text-lg line-clamp-1">{car.name}</h3>
                  <p className="text-xs sm:text-sm text-muted-foreground">{car.categoryName}</p>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-xl sm:text-2xl font-bold">Rs{car.price}/day</span>
                  {car.isFeatured && (
                    <Badge variant="default" className="text-xs">Featured</Badge>
                  )}
                </div>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm" asChild className="flex-1 text-xs sm:text-sm">
                    <Link href={`/admin/cars/${car._id}`}>
                      <Edit className="mr-1 sm:mr-2 h-3 w-3 sm:h-4 sm:w-4" />
                      Edit
                    </Link>
                  </Button>
                  <Button
                    variant="destructive"
                    size="sm"
                    onClick={() => handleDelete(car._id)}
                    disabled={deletingId === car._id}
                    className="px-2 sm:px-3"
                  >
                    {deletingId === car._id ? (
                      <Loader2 className="h-3 w-3 sm:h-4 sm:w-4 animate-spin" />
                    ) : (
                      <Trash2 className="h-3 w-3 sm:h-4 sm:w-4" />
                    )}
                  </Button>
                </div>
              </div>
            </Card>
          ))}
        </div>

        {cars.length === 0 && (
          <Card className="p-8 sm:p-12 text-center">
            <p className="text-sm sm:text-base text-muted-foreground mb-4">No cars found</p>
            <Button asChild size="sm">
              <Link href="/admin/cars/new">Add Your First Car</Link>
            </Button>
          </Card>
        )}
      </div>
    </div>
  )
}

