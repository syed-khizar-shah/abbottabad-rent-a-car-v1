"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { authApi, faqsApi } from "@/lib/api"
import { ArrowLeft, Plus, Edit, Trash2, Loader2 } from "lucide-react"

export default function AdminFAQsPage() {
  const router = useRouter()
  const [loading, setLoading] = useState(true)
  const [faqs, setFaqs] = useState<any[]>([])
  const [deletingId, setDeletingId] = useState<string | null>(null)

  useEffect(() => {
    checkAuth()
    loadFAQs()
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

  const loadFAQs = async () => {
    try {
      const data = await faqsApi.getAll()
      setFaqs(data.faqs || [])
    } catch (err) {
      console.error("Error loading FAQs:", err)
    }
  }

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this FAQ?")) return

    setDeletingId(id)
    try {
      await faqsApi.delete(id)
      await loadFAQs()
    } catch (err: any) {
      alert(err.message || "Failed to delete FAQ")
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

  // Group FAQs by category
  const faqsByCategory = faqs.reduce((acc, faq) => {
    const cat = faq.category || "general"
    if (!acc[cat]) acc[cat] = []
    acc[cat].push(faq)
    return acc
  }, {} as Record<string, any[]>)

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
            <h1 className="text-3xl font-bold font-serif">Manage FAQs</h1>
          </div>
          <Button asChild>
            <Link href="/admin/faqs/new">
              <Plus className="mr-2 h-4 w-4" />
              Add FAQ
            </Link>
          </Button>
        </div>

        <div className="space-y-6">
          {Object.keys(faqsByCategory).map((category) => (
            <Card key={category} className="p-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-bold capitalize">
                  {category.replace(/-/g, " ")}
                </h2>
                <Badge variant="secondary">{faqsByCategory[category].length}</Badge>
              </div>
              <div className="space-y-3">
                {faqsByCategory[category].map((faq) => (
                  <div
                    key={faq._id}
                    className="flex items-start justify-between p-4 border rounded-lg hover:bg-muted/50 transition-colors"
                  >
                    <div className="flex-1">
                      <h3 className="font-semibold mb-1">{faq.question}</h3>
                      <p className="text-sm text-muted-foreground line-clamp-2">{faq.answer}</p>
                    </div>
                    <div className="flex gap-2 ml-4">
                      <Button variant="outline" size="sm" asChild>
                        <Link href={`/admin/faqs/${faq._id}`}>
                          <Edit className="h-4 w-4" />
                        </Link>
                      </Button>
                      <Button
                        variant="destructive"
                        size="sm"
                        onClick={() => handleDelete(faq._id)}
                        disabled={deletingId === faq._id}
                      >
                        {deletingId === faq._id ? (
                          <Loader2 className="h-4 w-4 animate-spin" />
                        ) : (
                          <Trash2 className="h-4 w-4" />
                        )}
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          ))}
        </div>

        {faqs.length === 0 && (
          <Card className="p-12 text-center">
            <p className="text-muted-foreground mb-4">No FAQs found</p>
            <Button asChild>
              <Link href="/admin/faqs/new">Add Your First FAQ</Link>
            </Button>
          </Card>
        )}
      </div>
    </div>
  )
}

