import ServicesClient from "./ServicesClient"
import type { Metadata } from "next"
import { generateMetadata } from "@/lib/metadata"

export const metadata: Metadata = generateMetadata({
  title: "Car Rental Services in Abbottabad",
  description:
    "Comprehensive car rental services in Abbottabad, Pakistan. Wedding cars, corporate rentals, airport transfers, tourism packages, self-drive and chauffeur-driven options. 24/7 service across KPK.",
  keywords: [
    "car rental services Abbottabad",
    "wedding car rental",
    "corporate car hire",
    "airport transfer Abbottabad",
    "tourism car rental",
    "self drive rental",
    "chauffeur service Abbottabad",
  ],
  path: "/services",
})

export default function ServicesPage() {
  return <ServicesClient />
}
