import type { Metadata } from "next"
import ClientTermsPage from "./client-terms-page"

export const metadata: Metadata = {
  title: "Terms & Conditions | Abbottabad Rent A Car",
  description:
    "Read our terms and conditions for renting luxury vehicles in Abbottabad, Pakistan. Understand your rights and responsibilities.",
  keywords: "terms and conditions, rental agreement, car rental terms, Abbottabad",
}

export default function TermsPage() {
  return <ClientTermsPage />
}
