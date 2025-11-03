import { siteConfig } from "@/lib/metadata"

export function StructuredData({ type, data }: { type: string; data: any }) {
  const schema = {
    "@context": "https://schema.org",
    "@type": type,
    ...data,
  }

  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
}

export function LocalBusinessSchema() {
  const schema = {
    name: siteConfig.name,
    description: siteConfig.description,
    url: siteConfig.url,
    telephone: siteConfig.contact.phone,
    email: siteConfig.contact.email,
    address: {
      "@type": "PostalAddress",
      streetAddress: "Main Mansehra Road",
      addressLocality: "Abbottabad",
      addressRegion: "Khyber Pakhtunkhwa",
      postalCode: "22010",
      addressCountry: "PK",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: "34.1495",
      longitude: "73.2195",
    },
    openingHoursSpecification: [
      {
        dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
        opens: "00:00",
        closes: "23:59",
      },
    ],
    priceRange: "PKR 3,000 - PKR 50,000",
    areaServed: siteConfig.serviceAreas.map((area) => ({
      "@type": "City",
      name: area,
    })),
    sameAs: [siteConfig.social.facebook, siteConfig.social.instagram, siteConfig.social.twitter],
  }

  return <StructuredData type="AutoRental" data={schema} />
}

export function ProductSchema({ car }: { car: any }) {
  const schema = {
    name: car.name,
    description: car.description,
    image: car.image,
    brand: {
      "@type": "Brand",
      name: car.brand,
    },
    offers: {
      price: car.price,
      priceCurrency: "PKR",
      availability: "https://schema.org/InStock",
      seller: {
        "@type": "Organization",
        name: siteConfig.name,
      },
    },
    aggregateRating: {
      ratingValue: car.rating || "4.8",
      reviewCount: car.reviews || "150",
    },
  }

  return <StructuredData type="Product" data={schema} />
}

export function FAQSchema({ faqs }: { faqs: Array<{ question: string; answer: string }> }) {
  const schema = {
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  }

  return <StructuredData type="FAQPage" data={schema} />
}

export function BreadcrumbSchema({ items }: { items: Array<{ name: string; url: string }> }) {
  const schema = {
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: `${siteConfig.url}${item.url}`,
    })),
  }

  return <StructuredData type="BreadcrumbList" data={schema} />
}
