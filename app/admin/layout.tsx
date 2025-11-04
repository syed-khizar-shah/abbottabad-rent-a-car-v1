"use client"

import { useEffect, useState } from "react"
import { useRouter, usePathname } from "next/navigation"
import Link from "next/link"
import { authApi } from "@/lib/api"
import { 
  LayoutDashboard, 
  Car, 
  Tag, 
  FileText, 
  MapPin,
  Users,
  Star,
  HelpCircle,
  LogOut,
  Menu,
  X,
  Phone,
  Map
} from "lucide-react"
import { Button } from "@/components/ui/button"

const menuItems = [
  { icon: LayoutDashboard, label: "Dashboard", href: "/admin/dashboard" },
  { icon: Car, label: "Manage Cars", href: "/admin/cars" },
  { icon: Tag, label: "Manage Categories", href: "/admin/categories" },
  { icon: FileText, label: "Homepage Content", href: "/admin/homepage" },
  { icon: MapPin, label: "Tour Routes", href: "/admin/tour-routes" },
  { icon: Users, label: "About Us", href: "/admin/about" },
  { icon: Star, label: "Reviews", href: "/admin/reviews" },
  { icon: HelpCircle, label: "FAQs", href: "/admin/faqs" },
  { icon: Phone, label: "Contact", href: "/admin/contact" },
  { icon: Map, label: "Location", href: "/admin/location" },
]

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const router = useRouter()
  const pathname = usePathname()
  const [loading, setLoading] = useState(true)
  const [sidebarOpen, setSidebarOpen] = useState(true)

  useEffect(() => {
    checkAuth()
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

  const handleLogout = async () => {
    try {
      await authApi.logout()
      router.push("/admin/login")
    } catch (err) {
      console.error("Error logging out:", err)
    }
  }

  // Don't show sidebar on login page
  if (pathname === "/admin/login" || loading) {
    return <>{children}</>
  }

  return (
    <div className="min-h-screen bg-background flex">
      {/* Sidebar */}
      <aside
        className={`${
          sidebarOpen ? "w-64" : "w-20"
        } bg-background border-r border-border transition-all duration-300 flex flex-col fixed h-screen z-50 lg:static lg:h-auto`}
      >
        {/* Sidebar Header */}
        <div className="p-4 border-b border-border flex items-center justify-between">
          {sidebarOpen && (
            <h2 className="text-xl font-bold font-serif">Admin Panel</h2>
          )}
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="lg:hidden"
          >
            {sidebarOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </Button>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="hidden lg:flex"
          >
            {sidebarOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </Button>
        </div>

        {/* Navigation Menu */}
        <nav className="flex-1 p-4 space-y-2 overflow-y-auto">
          {menuItems.map((item) => {
            const Icon = item.icon
            const isActive = pathname === item.href || pathname.startsWith(item.href + "/")
            
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200 ${
                  isActive
                    ? "bg-accent text-accent-foreground shadow-md"
                    : "text-muted-foreground hover:bg-muted hover:text-foreground"
                }`}
              >
                <Icon className="h-5 w-5 shrink-0" />
                {sidebarOpen && (
                  <span className="font-medium">{item.label}</span>
                )}
              </Link>
            )
          })}
        </nav>

        {/* Sidebar Footer */}
        <div className="p-4 border-t border-border">
          <Button
            variant="ghost"
            className="w-full justify-start"
            onClick={handleLogout}
          >
            <LogOut className="h-5 w-5 mr-3 shrink-0" />
            {sidebarOpen && <span>Logout</span>}
          </Button>
          {sidebarOpen && (
            <Link
              href="/"
              className="block mt-2 text-sm text-muted-foreground hover:text-foreground text-center"
            >
              View Site
            </Link>
          )}
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-w-0 lg:ml-0">
        {/* Mobile overlay */}
        {sidebarOpen && (
          <div
            className="fixed inset-0 bg-black/50 z-40 lg:hidden"
            onClick={() => setSidebarOpen(false)}
          />
        )}
        <main className="flex-1 overflow-y-auto lg:ml-0">{children}</main>
      </div>
    </div>
  )
}

