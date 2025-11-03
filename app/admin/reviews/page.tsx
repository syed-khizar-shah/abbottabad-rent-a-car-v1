"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { authApi, reviewsApi } from "@/lib/api"
import { ArrowLeft, Plus, Edit, Trash2, Loader2, Star } from "lucide-react"
import Image from "next/image"

export default function AdminReviewsPage() {
  const router = useRouter()
  const [loading, setLoading] = useState(true)
  const [reviews, setReviews] = useState<any[]>([])
  const [deletingId, setDeletingId] = useState<string | null>(null)

  useEffect(() => {
    checkAuth()
    loadReviews()
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

  const loadReviews = async () => {
    try {
      const data = await reviewsApi.getAll({ category: undefined })
      setReviews(data.reviews || [])
    } catch (err) {
      console.error("Error loading reviews:", err)
    }
  }

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this review?")) return

    setDeletingId(id)
    try {
      await reviewsApi.delete(id)
      await loadReviews()
    } catch (err: any) {
      alert(err.message || "Failed to delete review")
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
      <div className="container mx-auto px-4 sm:px-6 py-8">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-4">
            <Button variant="ghost" asChild>
              <Link href="/admin/dashboard">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back
              </Link>
            </Button>
            <h1 className="text-3xl font-bold font-serif">Manage Reviews</h1>
          </div>
          <Button asChild>
            <Link href="/admin/reviews/new">
              <Plus className="mr-2 h-4 w-4" />
              Add Review
            </Link>
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {reviews.map((review) => (
            <Card key={review._id} className="overflow-hidden">
              <div className="p-4 space-y-3">
                <div className="flex items-start gap-3">
                  <div className="relative w-12 h-12 rounded-full overflow-hidden shrink-0">
                    {review.image ? (
                      <Image
                        src={review.image}
                        alt={review.name}
                        fill
                        className="object-cover"
                      />
                    ) : (
                      <div className="w-full h-full bg-muted flex items-center justify-center">
                        <span className="text-lg font-bold">
                          {review.name?.charAt(0) || "?"}
                        </span>
                      </div>
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-bold text-sm truncate">{review.name}</h3>
                    <p className="text-xs text-muted-foreground truncate">{review.location}</p>
                    <div className="flex items-center gap-1 mt-1">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`h-3 w-3 ${
                            i < review.rating
                              ? "fill-accent text-accent"
                              : "text-muted-foreground"
                          }`}
                        />
                      ))}
                    </div>
                  </div>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground mb-1">Vehicle: {review.vehicle}</p>
                  <p className="text-sm text-muted-foreground line-clamp-2">{review.review}</p>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex gap-2">
                    {review.verified && (
                      <Badge variant="secondary" className="text-xs">Verified</Badge>
                    )}
                    {review.category && (
                      <Badge variant="outline" className="text-xs">{review.category}</Badge>
                    )}
                  </div>
                  <span className="text-xs text-muted-foreground">{review.date}</span>
                </div>
                <div className="flex gap-2 pt-2 border-t">
                  <Button variant="outline" size="sm" asChild className="flex-1">
                    <Link href={`/admin/reviews/${review._id}`}>
                      <Edit className="mr-2 h-4 w-4" />
                      Edit
                    </Link>
                  </Button>
                  <Button
                    variant="destructive"
                    size="sm"
                    onClick={() => handleDelete(review._id)}
                    disabled={deletingId === review._id}
                  >
                    {deletingId === review._id ? (
                      <Loader2 className="h-4 w-4 animate-spin" />
                    ) : (
                      <Trash2 className="h-4 w-4" />
                    )}
                  </Button>
                </div>
              </div>
            </Card>
          ))}
        </div>

        {reviews.length === 0 && (
          <Card className="p-12 text-center">
            <p className="text-muted-foreground mb-4">No reviews found</p>
            <Button asChild>
              <Link href="/admin/reviews/new">Add Your First Review</Link>
            </Button>
          </Card>
        )}
      </div>
    </div>
  )
}

