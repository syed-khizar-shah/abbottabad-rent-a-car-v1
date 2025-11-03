"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { authApi, adminApi } from "@/lib/api"
import { LogOut, Car, Tag, FileText, BarChart3, Loader2 } from "lucide-react"

export default function AdminDashboardPage() {
  const router = useRouter()
  const [loading, setLoading] = useState(true)
  const [stats, setStats] = useState({
    totalCars: 0,
    totalCategories: 0,
    featuredCars: 0,
    availableCars: 0
  })

  useEffect(() => {
    checkAuth()
    loadStats()
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

  const loadStats = async () => {
    try {
      const data = await adminApi.getStats()
      setStats(data)
    } catch (err) {
      console.error("Error loading stats:", err)
    }
  }

  const handleLogout = async () => {
    try {
      await authApi.logout()
      router.push("/admin/login")
    } catch (err) {
      console.error("Error logging out:", err)
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
      {/* Main Content */}
      <main className="container mx-auto px-4 sm:px-6 py-8">
        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground mb-1">Total Cars</p>
                <p className="text-3xl font-bold">{stats.totalCars}</p>
              </div>
              <Car className="h-12 w-12 text-accent opacity-50" />
            </div>
          </Card>
          <Card className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground mb-1">Categories</p>
                <p className="text-3xl font-bold">{stats.totalCategories}</p>
              </div>
              <Tag className="h-12 w-12 text-accent opacity-50" />
            </div>
          </Card>
          <Card className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground mb-1">Featured Cars</p>
                <p className="text-3xl font-bold">{stats.featuredCars}</p>
              </div>
              <BarChart3 className="h-12 w-12 text-accent opacity-50" />
            </div>
          </Card>
          <Card className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground mb-1">Available</p>
                <p className="text-3xl font-bold">{stats.availableCars}</p>
              </div>
              <Car className="h-12 w-12 text-green-500 opacity-50" />
            </div>
          </Card>
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Link href="/admin/cars">
            <Card className="p-6 hover:shadow-lg transition-shadow cursor-pointer h-full">
              <Car className="h-10 w-10 text-accent mb-4" />
              <h2 className="text-xl font-bold mb-2">Manage Cars</h2>
              <p className="text-muted-foreground">Add, edit, or remove vehicles from your fleet</p>
            </Card>
          </Link>
          <Link href="/admin/categories">
            <Card className="p-6 hover:shadow-lg transition-shadow cursor-pointer h-full">
              <Tag className="h-10 w-10 text-accent mb-4" />
              <h2 className="text-xl font-bold mb-2">Manage Categories</h2>
              <p className="text-muted-foreground">Organize vehicles into categories</p>
            </Card>
          </Link>
          <Link href="/admin/homepage">
            <Card className="p-6 hover:shadow-lg transition-shadow cursor-pointer h-full">
              <FileText className="h-10 w-10 text-accent mb-4" />
              <h2 className="text-xl font-bold mb-2">Homepage Content</h2>
              <p className="text-muted-foreground">Customize homepage text and sections</p>
            </Card>
          </Link>
        </div>
      </main>
    </div>
  )
}

