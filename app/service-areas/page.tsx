import type { Metadata } from "next"
import { generateMetadata } from "@/lib/metadata"
import ServiceAreasClient from "./_components/ServiceAreasClient"

export const metadata: Metadata = generateMetadata({
  title: "Service Areas - Car Rental Coverage in KPK",
  description:
    "Abbottabad Rent A Car serves Abbottabad, Mansehra, Haripur, Nathia Gali, Murree, Islamabad, and all major cities in KPK. 24/7 car rental service across northern Pakistan.",
  keywords: [
    "car rental Abbottabad",
    "car rental Mansehra",
    "car rental Haripur",
    "car rental Nathia Gali",
    "car rental Murree",
    "car rental Islamabad",
    "car rental KPK",
    "northern areas car rental",
  ],
  path: "/service-areas",
})

export default function ServiceAreasPage() {
  return <ServiceAreasClient />
}
