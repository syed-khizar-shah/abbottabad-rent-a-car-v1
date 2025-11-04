"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { authApi, categoriesApi } from "@/lib/api"
import { ArrowLeft, Plus, Edit, Trash2, Loader2 } from "lucide-react"
import Image from "next/image"

export default function AdminCategoriesPage() {
  const router = useRouter()
  const [loading, setLoading] = useState(true)
  const [categories, setCategories] = useState<any[]>([])
  const [deletingId, setDeletingId] = useState<string | null>(null)

  useEffect(() => {
    checkAuth()
    loadCategories()
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

  const loadCategories = async () => {
    try {
      const data = await categoriesApi.getAll()
      setCategories(data)
    } catch (err) {
      console.error("Error loading categories:", err)
    }
  }

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this category?")) return

    setDeletingId(id)
    try {
      await categoriesApi.delete(id)
      await loadCategories()
    } catch (err: any) {
      alert(err.message || "Failed to delete category")
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
            <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold font-serif">Manage Categories</h1>
          </div>
          <Button size="sm" asChild className="w-full sm:w-auto">
            <Link href="/admin/categories/new">
              <Plus className="mr-2 h-4 w-4" />
              Add Category
            </Link>
          </Button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
          {categories.map((category) => (
            <Card key={category._id} className="overflow-hidden hover:shadow-lg transition-shadow">
              <div className="relative h-40 sm:h-48 bg-muted">
                {category.image && (
                  <Image
                    src={category.image}
                    alt={category.name}
                    fill
                    className="object-cover"
                  />
                )}
              </div>
              <div className="p-3 sm:p-4 space-y-2 sm:space-y-3">
                <div>
                  <h3 className="font-bold text-base sm:text-lg line-clamp-1 mb-1">{category.name}</h3>
                  <p className="text-xs sm:text-sm text-muted-foreground line-clamp-2 min-h-[2.5rem] sm:min-h-0">{category.description}</p>
                </div>
                <div className="flex items-center justify-between pt-1">
                  <span className="text-base sm:text-lg lg:text-xl font-bold">${category.priceFrom}/day</span>
                </div>
                <div className="flex flex-col gap-2 pt-2">
                  <Button variant="outline" size="sm" asChild className="w-full text-xs sm:text-sm">
                    <Link href={`/admin/categories/${category._id}/cars`}>
                      View Cars
                    </Link>
                  </Button>
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm" asChild className="flex-1 text-xs sm:text-sm">
                      <Link href={`/admin/categories/${category._id}`}>
                        <Edit className="mr-1.5 sm:mr-2 h-3.5 w-3.5 sm:h-4 sm:w-4" />
                        Edit
                      </Link>
                    </Button>
                    <Button
                      variant="destructive"
                      size="sm"
                      onClick={() => handleDelete(category._id)}
                      disabled={deletingId === category._id}
                      className="flex-1 sm:flex-initial px-3 sm:px-3 text-xs sm:text-sm"
                      aria-label="Delete category"
                    >
                      {deletingId === category._id ? (
                        <Loader2 className="h-3.5 w-3.5 sm:h-4 sm:w-4 animate-spin" />
                      ) : (
                        <>
                          <Trash2 className="h-3.5 w-3.5 sm:h-4 sm:w-4 mr-1.5 sm:mr-0" />
                          <span className="hidden sm:inline ml-0 sm:ml-1.5">Delete</span>
                        </>
                      )}
                    </Button>
                  </div>
                </div>
              </div>
            </Card>
          ))}
        </div>

        {categories.length === 0 && (
          <Card className="p-6 sm:p-8 lg:p-12 text-center">
            <p className="text-sm sm:text-base text-muted-foreground mb-4">No categories found</p>
            <Button asChild size="sm" className="w-full sm:w-auto">
              <Link href="/admin/categories/new">Add Your First Category</Link>
            </Button>
          </Card>
        )}
      </div>
    </div>
  )
}

