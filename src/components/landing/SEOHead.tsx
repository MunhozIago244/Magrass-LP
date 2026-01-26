import { Helmet } from "react-helmet-async";
import { CONFIG } from "@/config/siteConfig";

interface SEOHeadProps {
  title?: string;
  description?: string;
  image?: string;
  url?: string;
}

export const SEOHead = ({
  title: _title = "Magrass Hortolândia | Estética Avançada e Emagrecimento",
  description = "Centro de estética premium em Hortolândia. Tratamentos corporais, emagrecimento, harmonização e protocolos exclusivos com tecnologia de ponta.",
  image = "https://magrass.com.br/og-image.jpg",
  url = "https://magrass.com.br",
}: SEOHeadProps) => {
  const { company, services } = CONFIG;

  // Schema 1: Organization
  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: company.name,
    url: url,
    logo: image,
    description: description,
    sameAs: [company.instagram],
    contactPoint: {
      "@type": "ContactPoint",
      contactType: "Sales",
      telephone: company.phone,
    },
  };

  // Schema 2: Local Business
  const localBusinessSchema = {
    "@context": "https://schema.org",
    "@type": "BeautySalon",
    "@id": url,
    name: `${company.name} ${company.unit}`,
    image: image,
    description: description,
    address: {
      "@type": "PostalAddress",
      streetAddress: company.address,
      addressLocality: company.unit,
      addressRegion: "SP",
      postalCode: "13184-600",
      addressCountry: "BR",
    },
    telephone: company.phone,
    url: url,
    priceRange: "$$-$$$",
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: "4.8",
      reviewCount: "150",
    },
    openingHoursSpecification: [
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
        opens: "09:00",
        closes: "19:00",
      },
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: "Saturday",
        opens: "08:00",
        closes: "12:00",
      },
    ],
    sameAs: [company.instagram, `https://wa.me/${company.phone.replace(/\D/g, "")}`],
  };

  // Schema 3: Multiple Services
  const servicesSchema = services.slice(0, 5).map((_service, _index) => ({
    "@context": "https://schema.org",
    "@type": "BeautyService",
    name: _service.title,
    description: _service.description,
    provider: {
      "@type": "BeautySalon",
      name: `${company.name} ${company.unit}`,
      url: url,
    },
    areaServed: {
      "@type": "City",
      name: company.unit,
    },
    image: image,
  }));

  return (
    <Helmet>
      <title>{_title}</title>
      <meta name="description" content={description} />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />

      {/* Open Graph */}
      <meta property="og:title" content={_title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={image} />
      <meta property="og:url" content={url} />
      <meta property="og:type" content="business.business" />
      <meta property="og:locale" content="pt_BR" />

      {/* Twitter Card */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={_title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={image} />

      {/* Additional SEO */}
      <link rel="canonical" href={url} />
      <meta name="robots" content="index, follow" />
      <meta name="language" content="Portuguese" />
      <meta name="revisit-after" content="7 days" />

      {/* Structured Data - Organization */}
      <script type="application/ld+json">{JSON.stringify(organizationSchema)}</script>

      {/* Structured Data - Local Business */}
      <script type="application/ld+json">{JSON.stringify(localBusinessSchema)}</script>

      {/* Structured Data - Services */}
      <script type="application/ld+json">
        {JSON.stringify({
          "@context": "https://schema.org",
          "@type": "ItemList",
          itemListElement: servicesSchema,
        })}
      </script>
    </Helmet>
  );
};
