"use client"

import { useState, useEffect } from "react"
import { useRouter, useParams } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { authApi, faqsApi } from "@/lib/api"
import { ArrowLeft, Loader2 } from "lucide-react"

export default function EditFAQPage() {
  const router = useRouter()
  const params = useParams()
  const faqId = params.id as string
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [faq, setFaq] = useState<any>(null)
  const [formData, setFormData] = useState({
    category: "booking",
    question: "",
    answer: "",
    order: "0",
    isActive: true,
  })

  useEffect(() => {
    checkAuth()
    loadFAQ()
  }, [faqId])

  const checkAuth = async () => {
    try {
      await authApi.me()
    } catch {
      router.push("/admin/login")
    }
  }

  const loadFAQ = async () => {
    try {
      const faqData = await faqsApi.getOne(faqId)
      setFaq(faqData)
      setFormData({
        category: faqData.category || "booking",
        question: faqData.question || "",
        answer: faqData.answer || "",
        order: faqData.order?.toString() || "0",
        isActive: faqData.isActive !== false,
      })
    } catch (err) {
      console.error("Error loading FAQ:", err)
      alert("Failed to load FAQ data")
      router.push("/admin/faqs")
    } finally {
      setLoading(false)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setSaving(true)

    try {
      await faqsApi.update(faqId, {
        category: formData.category,
        question: formData.question,
        answer: formData.answer,
        order: parseInt(formData.order),
        isActive: formData.isActive,
      })
      router.push("/admin/faqs")
    } catch (err: any) {
      alert(err.message || "Failed to update FAQ")
    } finally {
      setSaving(false)
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
      <div className="container mx-auto px-4 sm:px-6 py-8 max-w-2xl">
        <Button variant="ghost" asChild className="mb-6">
          <Link href="/admin/faqs">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to FAQs
          </Link>
        </Button>

        <Card className="p-6">
          <h1 className="text-3xl font-bold font-serif mb-6">Edit FAQ</h1>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-2">Category *</label>
                <select
                  value={formData.category}
                  onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                  className="w-full px-3 py-2 border rounded-lg"
                  required
                >
                  <option value="booking">Booking & Reservations</option>
                  <option value="pricing">Pricing & Payment</option>
                  <option value="insurance">Insurance & Safety</option>
                  <option value="vehicles">Vehicles & Features</option>
                  <option value="policies">Policies & Terms</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Order</label>
                <input
                  type="number"
                  value={formData.order}
                  onChange={(e) => setFormData({ ...formData, order: e.target.value })}
                  className="w-full px-3 py-2 border rounded-lg"
                  min="0"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Question *</label>
              <input
                type="text"
                value={formData.question}
                onChange={(e) => setFormData({ ...formData, question: e.target.value })}
                className="w-full px-3 py-2 border rounded-lg"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Answer *</label>
              <textarea
                value={formData.answer}
                onChange={(e) => setFormData({ ...formData, answer: e.target.value })}
                className="w-full px-3 py-2 border rounded-lg"
                rows={6}
                required
              />
            </div>

            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                id="isActive"
                checked={formData.isActive}
                onChange={(e) => setFormData({ ...formData, isActive: e.target.checked })}
                className="w-4 h-4"
              />
              <label htmlFor="isActive" className="text-sm font-medium">
                Active
              </label>
            </div>

            <div className="flex gap-4">
              <Button type="submit" disabled={saving} className="flex-1">
                {saving ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Saving...
                  </>
                ) : (
                  "Save Changes"
                )}
              </Button>
              <Button type="button" variant="outline" onClick={() => router.push("/admin/faqs")}>
                Cancel
              </Button>
            </div>
          </form>
        </Card>
      </div>
    </div>
  )
}

