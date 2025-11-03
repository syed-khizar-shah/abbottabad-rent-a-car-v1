"use client"

import { motion } from "framer-motion"
import { Shield, FileText, AlertCircle, CheckCircle } from "lucide-react"
import { Badge } from "@/components/ui/badge"

export default function ClientTermsPage() {
  const sections = [
    {
      icon: FileText,
      title: "Rental Agreement",
      content: [
        "By renting a vehicle from Abbottabad Rent A Car, you agree to comply with all terms and conditions outlined in this agreement.",
        "The rental agreement becomes effective upon vehicle pickup and remains valid until the vehicle is returned and accepted by our staff.",
        "All drivers must be at least 21 years old with a valid driver's license held for a minimum of 2 years.",
        "Additional drivers must be registered and approved before operating the vehicle.",
      ],
    },
    {
      icon: Shield,
      title: "Insurance & Liability",
      content: [
        "All vehicles are covered by comprehensive insurance as per Pakistani law.",
        "The renter is responsible for any damage to the vehicle during the rental period, subject to the insurance deductible.",
        "Third-party liability insurance is included in all rental packages.",
        "Additional coverage options are available at the time of booking for enhanced protection.",
      ],
    },
    {
      icon: AlertCircle,
      title: "Vehicle Use & Restrictions",
      content: [
        "Vehicles must be used only for lawful purposes and within Pakistan's borders unless prior written approval is obtained.",
        "Smoking, transportation of illegal substances, and use for racing or competitions are strictly prohibited.",
        "The vehicle must not be subleased or used for commercial purposes without authorization.",
        "Off-road driving is not permitted unless specifically approved for designated vehicles.",
      ],
    },
    {
      icon: CheckCircle,
      title: "Payment & Deposits",
      content: [
        "Full payment or a deposit is required at the time of booking confirmation.",
        "Security deposits are refundable upon vehicle return in satisfactory condition.",
        "Late returns will incur additional charges as per our hourly/daily rates.",
        "Fuel policy: Vehicles are provided with a full tank and must be returned with a full tank, or refueling charges will apply.",
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
              Legal Information
            </Badge>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif font-bold text-white mb-6">
              Terms & Conditions
            </h1>
            <p className="text-lg md:text-xl text-white/90 max-w-3xl mx-auto leading-relaxed">
              Please read these terms carefully before renting a vehicle from Abbottabad Rent A Car
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
              Welcome to Abbottabad Rent A Car. These Terms and Conditions govern your use of our vehicle rental
              services in Abbottabad, Pakistan. By renting a vehicle from us, you acknowledge that you have read,
              understood, and agree to be bound by these terms.
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
                          <CheckCircle className="w-5 h-5 text-amber-500 shrink-0 mt-0.5" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Additional Terms */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="mt-12 bg-muted/50 border border-border rounded-2xl p-6 md:p-8"
          >
            <h2 className="text-2xl font-serif font-bold mb-6">Additional Terms</h2>
            <div className="space-y-4 text-muted-foreground leading-relaxed">
              <p>
                <strong className="text-foreground">Cancellation Policy:</strong> Cancellations made 48 hours before the
                rental start time are eligible for a full refund. Cancellations within 48 hours may incur charges.
              </p>
              <p>
                <strong className="text-foreground">Modifications:</strong> We reserve the right to modify these terms
                at any time. Changes will be effective immediately upon posting on our website.
              </p>
              <p>
                <strong className="text-foreground">Governing Law:</strong> These terms are governed by the laws of
                Pakistan. Any disputes shall be resolved in the courts of Abbottabad, KPK.
              </p>
              <p>
                <strong className="text-foreground">Contact:</strong> For questions about these terms, please contact us
                at info@abbottabadrentacar.com or call +92 300 1234567.
              </p>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  )
}
