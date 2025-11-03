"use client"

import { motion } from "framer-motion"
import { Mail } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Eye, Database, UserCheck, Shield } from "lucide-react"

export default function PrivacyClientPage() {
  const sections = [
    {
      icon: Database,
      title: "Information We Collect",
      content: [
        "Personal identification information (name, email, phone number, address)",
        "Driver's license details and identification documents",
        "Payment and billing information",
        "Rental history and preferences",
        "Vehicle usage data and GPS location (when applicable)",
      ],
    },
    {
      icon: Eye,
      title: "How We Use Your Information",
      content: [
        "To process your rental bookings and provide our services",
        "To communicate with you about your reservations and account",
        "To improve our services and customer experience",
        "To comply with legal obligations and prevent fraud",
        "To send promotional offers and updates (with your consent)",
      ],
    },
    {
      icon: Shield,
      title: "Data Protection & Security",
      content: [
        "We implement industry-standard security measures to protect your data",
        "All payment information is encrypted using secure SSL technology",
        "Access to personal data is restricted to authorized personnel only",
        "We regularly review and update our security practices",
        "Your data is stored on secure servers with backup systems",
      ],
    },
    {
      icon: UserCheck,
      title: "Your Rights",
      content: [
        "Right to access your personal information we hold",
        "Right to request correction of inaccurate data",
        "Right to request deletion of your data (subject to legal requirements)",
        "Right to opt-out of marketing communications",
        "Right to lodge a complaint with data protection authorities",
      ],
    },
  ]

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative h-[40vh] min-h-[400px] flex items-center justify-center overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: "url('/luxury-car-rental-customer-service-concierge-desk.jpg')",
          }}
        >
          <div className="absolute inset-0 bg-gradient-to-br from-navy-900/95 via-navy-800/90 to-navy-900/95" />
        </div>

        <div className="relative z-10 container mx-auto px-4 text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <Badge variant="secondary" className="mb-4 bg-amber-500/20 text-amber-300 border-amber-500/30">
              Your Privacy Matters
            </Badge>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif font-bold text-white mb-6">Privacy Policy</h1>
            <p className="text-lg md:text-xl text-white/90 max-w-3xl mx-auto leading-relaxed">
              We are committed to protecting your privacy and handling your data with care and transparency
            </p>
          </motion.div>
        </div>
      </section>

      {/* Content Section */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4 max-w-5xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="prose prose-lg max-w-none mb-12"
          >
            <p className="text-muted-foreground text-lg leading-relaxed">
              Last Updated: {new Date().toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" })}
            </p>
            <p className="text-foreground leading-relaxed">
              At Abbottabad Rent A Car, we respect your privacy and are committed to protecting your personal
              information. This Privacy Policy explains how we collect, use, disclose, and safeguard your information
              when you use our services.
            </p>
          </motion.div>

          <div className="space-y-8">
            {sections.map((section, index) => (
              <motion.div
                key={section.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="bg-card border border-border rounded-2xl p-6 md:p-8 hover:shadow-lg transition-shadow"
              >
                <div className="flex items-start gap-4 mb-4">
                  <div className="w-12 h-12 rounded-xl bg-amber-500/10 flex items-center justify-center shrink-0">
                    <section.icon className="w-6 h-6 text-amber-500" />
                  </div>
                  <div>
                    <h2 className="text-2xl font-serif font-bold mb-4">{section.title}</h2>
                    <ul className="space-y-3">
                      {section.content.map((item, i) => (
                        <li key={i} className="flex items-start gap-3 text-muted-foreground leading-relaxed">
                          <div className="w-1.5 h-1.5 rounded-full bg-amber-500 shrink-0 mt-2" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Additional Information */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="mt-12 space-y-8"
          >
            <div className="bg-muted/50 border border-border rounded-2xl p-6 md:p-8">
              <h2 className="text-2xl font-serif font-bold mb-6">Third-Party Services</h2>
              <p className="text-muted-foreground leading-relaxed">
                We may use third-party service providers to help us operate our business and provide services to you.
                These providers have access to your personal information only to perform specific tasks on our behalf
                and are obligated to protect your information.
              </p>
            </div>

            <div className="bg-muted/50 border border-border rounded-2xl p-6 md:p-8">
              <h2 className="text-2xl font-serif font-bold mb-6">Cookies & Tracking</h2>
              <p className="text-muted-foreground leading-relaxed">
                We use cookies and similar tracking technologies to enhance your experience on our website. You can
                control cookie settings through your browser preferences. Some features may not function properly if
                cookies are disabled.
              </p>
            </div>

            <div className="bg-amber-500/10 border border-amber-500/30 rounded-2xl p-6 md:p-8">
              <div className="flex items-start gap-4">
                <Mail className="w-6 h-6 text-amber-500 shrink-0 mt-1" />
                <div>
                  <h2 className="text-2xl font-serif font-bold mb-4">Contact Us About Privacy</h2>
                  <p className="text-muted-foreground leading-relaxed mb-4">
                    If you have questions or concerns about our privacy practices, please contact us:
                  </p>
                  <div className="space-y-2 text-muted-foreground">
                    <p>Email: privacy@abbottabadrentacar.com</p>
                    <p>Phone: +92 300 1234567</p>
                    <p>Address: Main Mansehra Road, Abbottabad, KPK, Pakistan</p>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  )
}
