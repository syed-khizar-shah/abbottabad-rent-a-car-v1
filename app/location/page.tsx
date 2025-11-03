import type { Metadata } from "next"
import { generatePageMetadata } from "@/lib/metadata"
import LocationClient from "./location-client"

export const metadata: Metadata = generatePageMetadata({
  title: "Our Location",
  description:
    "Visit Abbottabad Rent A Car at Mansehra Rd, opposite Ayub Medical Complex, near Doctor Plaza, Abbottabad. Find directions, contact information, and business hours.",
  path: "/location",
  keywords: [
    "Abbottabad rent a car location",
    "car rental Abbottabad address",
    "Mansehra Road car rental",
    "Abbottabad luxury car rental location",
  ],
})

export default function LocationPage() {
  return <LocationClient />
}
