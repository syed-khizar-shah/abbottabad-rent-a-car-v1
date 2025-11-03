"use client"

import { motion } from "framer-motion"
import { MapPin, Phone, Mail, Clock, Navigation, Car } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import Link from "next/link"

export default function LocationClient() {
  const businessInfo = {
    name: "Abbottabad Rent A Car",
    address: "Mansehra Rd, opposite Ayub Medical Complex, near Doctor Plaza",
    city: "Abbottabad",
    postalCode: "22010",
    country: "Pakistan",
    phone: "+92 300 1234567",
    email: "info@abbottabadrentacar.com",
    coordinates: {
      lat: 34.2031195,
      lng: 73.2390944,
    },
  }

  const businessHours = [
    { day: "Monday - Friday", hours: "8:00 AM - 8:00 PM" },
    { day: "Saturday", hours: "9:00 AM - 6:00 PM" },
    { day: "Sunday", hours: "10:00 AM - 4:00 PM" },
  ]

  const landmarks = [
    { name: "Ayub Medical Complex", distance: "Opposite" },
    { name: "Doctor Plaza", distance: "Near" },
    { name: "Mansehra Road", distance: "On Main Road" },
  ]

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative h-[50vh] min-h-[400px] flex items-center justify-center overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: `url('/luxury-car-rental-customer-service-concierge-desk.jpg')`,
          }}
        >
          <div className="absolute inset-0 bg-gradient-to-b from-navy-900/90 via-navy-900/80 to-navy-900/90" />
        </div>

        <div className="relative z-10 container mx-auto px-4 text-center">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
            <span className="inline-block px-4 py-2 bg-amber-500/20 border border-amber-500/30 rounded-full text-amber-400 text-sm font-medium mb-6">
              Visit Us Today
            </span>
            <h1 className="font-serif text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-6">Our Location</h1>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Conveniently located on Mansehra Road in the heart of Abbottabad
            </p>
          </motion.div>
        </div>
      </section>

      {/* Map and Info Section */}
      <section className="py-20 bg-gradient-to-b from-background to-navy-50">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-start">
            {/* Map */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="relative"
            >
              <div className="relative rounded-2xl overflow-hidden shadow-2xl border border-navy-200">
                <iframe
                  src={`https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3307.8!2d${businessInfo.coordinates.lng}!3d${businessInfo.coordinates.lat}!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x38de31e0862c305b%3A0x37c9fb9a927a10e8!2sAbbottabad%20luxury%20Ride%20Tours%20%26%20rent%20a%20car%20quick%20classy%20service!5e0!3m2!1sen!2s!4v1234567890123!5m2!1sen!2s`}
                  width="100%"
                  height="500"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  className="w-full"
                />
              </div>

              {/* Get Directions Button */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="mt-6"
              >
                <Button
                  asChild
                  size="lg"
                  className="w-full bg-amber-500 hover:bg-amber-600 text-navy-900 font-semibold"
                >
                  <a
                    href={`https://www.google.com/maps/dir/?api=1&destination=${businessInfo.coordinates.lat},${businessInfo.coordinates.lng}`}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Navigation className="mr-2 h-5 w-5" />
                    Get Directions
                  </a>
                </Button>
              </motion.div>
            </motion.div>

            {/* Contact Information */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="space-y-8"
            >
              {/* Address Card */}
              <Card className="p-8 bg-white border-navy-200 shadow-lg hover:shadow-xl transition-shadow duration-300">
                <div className="flex items-start gap-4">
                  <div className="p-3 bg-amber-500/10 rounded-lg">
                    <MapPin className="h-6 w-6 text-amber-500" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-serif text-2xl font-bold text-navy-900 mb-3">Visit Our Office</h3>
                    <p className="text-gray-700 leading-relaxed">
                      {businessInfo.address}
                      <br />
                      {businessInfo.city}, {businessInfo.postalCode}
                      <br />
                      {businessInfo.country}
                    </p>
                  </div>
                </div>
              </Card>

              {/* Contact Details Card */}
              <Card className="p-8 bg-white border-navy-200 shadow-lg hover:shadow-xl transition-shadow duration-300">
                <h3 className="font-serif text-2xl font-bold text-navy-900 mb-6">Contact Details</h3>
                <div className="space-y-4">
                  <div className="flex items-center gap-4">
                    <div className="p-2 bg-amber-500/10 rounded-lg">
                      <Phone className="h-5 w-5 text-amber-500" />
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">Phone</p>
                      <a
                        href={`tel:${businessInfo.phone}`}
                        className="text-navy-900 font-semibold hover:text-amber-500 transition-colors"
                      >
                        {businessInfo.phone}
                      </a>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="p-2 bg-amber-500/10 rounded-lg">
                      <Mail className="h-5 w-5 text-amber-500" />
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">Email</p>
                      <a
                        href={`mailto:${businessInfo.email}`}
                        className="text-navy-900 font-semibold hover:text-amber-500 transition-colors"
                      >
                        {businessInfo.email}
                      </a>
                    </div>
                  </div>
                </div>
              </Card>

              {/* Business Hours Card */}
              <Card className="p-8 bg-white border-navy-200 shadow-lg hover:shadow-xl transition-shadow duration-300">
                <div className="flex items-start gap-4 mb-6">
                  <div className="p-3 bg-amber-500/10 rounded-lg">
                    <Clock className="h-6 w-6 text-amber-500" />
                  </div>
                  <h3 className="font-serif text-2xl font-bold text-navy-900">Business Hours</h3>
                </div>
                <div className="space-y-3">
                  {businessHours.map((schedule, index) => (
                    <div
                      key={index}
                      className="flex justify-between items-center py-2 border-b border-gray-200 last:border-0"
                    >
                      <span className="text-gray-700 font-medium">{schedule.day}</span>
                      <span className="text-navy-900 font-semibold">{schedule.hours}</span>
                    </div>
                  ))}
                </div>
              </Card>

              {/* Nearby Landmarks */}
              <Card className="p-8 bg-white border-navy-200 shadow-lg hover:shadow-xl transition-shadow duration-300">
                <h3 className="font-serif text-2xl font-bold text-navy-900 mb-6">Nearby Landmarks</h3>
                <div className="space-y-3">
                  {landmarks.map((landmark, index) => (
                    <div key={index} className="flex items-center gap-3">
                      <div className="w-2 h-2 bg-amber-500 rounded-full" />
                      <span className="text-gray-700">{landmark.name}</span>
                      <span className="text-sm text-gray-500">({landmark.distance})</span>
                    </div>
                  ))}
                </div>
              </Card>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Premium CTA Section */}
      <section className="py-20 md:py-28 bg-gradient-to-br from-primary/5 via-accent/10 to-primary/5 relative overflow-hidden">
        {/* Decorative elements */}
        <div className="absolute inset-0 bg-grid-white/[0.02] bg-[size:60px_60px]" />
        <motion.div
          className="absolute top-20 right-20 w-96 h-96 bg-accent/10 rounded-full blur-3xl"
          animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.5, 0.3] }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        />

        <div className="container mx-auto px-4 sm:px-6 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="max-w-4xl mx-auto text-center"
          >
            <motion.div
              whileHover={{ scale: 1.1, rotate: 360 }}
              transition={{ duration: 0.6 }}
              className="inline-flex items-center justify-center w-16 h-16 md:w-20 md:h-20 rounded-2xl bg-gradient-to-br from-accent/20 to-accent/10 mb-6"
            >
              <Car className="h-10 w-10 md:h-12 md:w-12 text-accent" />
            </motion.div>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-serif font-bold mb-4 md:mb-6">
              Ready to Experience Luxury?
            </h2>
            <p className="text-lg md:text-xl text-muted-foreground mb-8 max-w-2xl mx-auto leading-relaxed">
              Visit our showroom today or contact us to reserve your premium vehicle
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Button asChild size="lg" className="bg-accent hover:bg-accent/90 text-accent-foreground shadow-xl hover:shadow-2xl">
                  <Link href="/fleet">View Our Fleet</Link>
                </Button>
              </motion.div>
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Button
                  asChild
                  size="lg"
                  variant="outline"
                  className="border-2 hover:bg-accent hover:text-accent-foreground hover:border-accent transition-all duration-300 shadow-lg hover:shadow-xl"
                >
                  <Link href="/contact">Contact Us</Link>
                </Button>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  )
}
