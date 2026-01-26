import { Helmet } from "react-helmet-async";
import { CONFIG } from "@/config/siteConfig";

interface SEOHeadProps {
  title?: string;
  description?: string;
  keywords?: string[];
  image?: string;
  url?: string;
  type?: "website" | "article" | "business.business";
}

export const SEOHead = ({
  title = "Magrass Hortolândia | Estética Avançada e Emagrecimento",
  description = "Centro de estética premium em Hortolândia. Tratamentos corporais, emagrecimento, harmonização e protocolos exclusivos com tecnologia de ponta.",
  keywords,
  image,
  url,
  type = "business.business",
}: SEOHeadProps) => {
  const { company, services, seo } = CONFIG;

  // Valores com fallback
  const pageUrl = url || seo.siteUrl;
  const ogImage = image || `${seo.siteUrl}${seo.ogImage}`;
  const siteKeywords = keywords || seo.keywords;

  // Normalize URL (remove trailing slash)
  const normalizedUrl = pageUrl.endsWith("/") ? pageUrl.slice(0, -1) : pageUrl;

  // Schema 1: Organization
  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: company.name,
    url: normalizedUrl,
    logo: ogImage,
    description: description,
    sameAs: [company.instagram],
    contactPoint: {
      "@type": "ContactPoint",
      contactType: "Customer Service",
      telephone: `+${company.phone}`,
      availableLanguage: ["Portuguese"],
    },
  };

  // Schema 2: Local Business
  const localBusinessSchema = {
    "@context": "https://schema.org",
    "@type": "BeautySalon",
    "@id": normalizedUrl,
    name: `${company.name} ${company.unit}`,
    image: ogImage,
    description: description,
    address: {
      "@type": "PostalAddress",
      streetAddress: company.address.split(" - ")[0],
      addressLocality: seo.business.city,
      addressRegion: seo.business.state,
      postalCode: seo.business.zipCode,
      addressCountry: seo.business.country,
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: seo.coordinates.latitude,
      longitude: seo.coordinates.longitude,
    },
    telephone: `+${company.phone}`,
    url: normalizedUrl,
    priceRange: seo.business.priceRange,
    paymentAccepted: seo.business.paymentMethods.join(", "),
    currenciesAccepted: seo.business.currencies.join(", "),
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: seo.business.rating.value,
      reviewCount: seo.business.rating.count,
      bestRating: "5",
      worstRating: "1",
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
    hasMap: `https://www.google.com/maps?q=${seo.coordinates.latitude},${seo.coordinates.longitude}`,
    sameAs: [company.instagram, `https://wa.me/${company.phone}`],
  };

  // Schema 3: Multiple Services
  const servicesSchema = services.slice(0, 8).map((service) => ({
    "@context": "https://schema.org",
    "@type": "Service",
    serviceType: service.title,
    name: service.title,
    description: service.description,
    provider: {
      "@type": "BeautySalon",
      name: `${company.name} ${company.unit}`,
      url: normalizedUrl,
    },
    areaServed: {
      "@type": "City",
      name: seo.business.city,
      containedInPlace: {
        "@type": "State",
        name: "São Paulo",
      },
    },
    offers: {
      "@type": "Offer",
      availability: "https://schema.org/InStock",
      priceCurrency: "BRL",
    },
  }));

  // Schema 4: BreadcrumbList
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: normalizedUrl,
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "Serviços",
        item: `${normalizedUrl}#servicos`,
      },
      {
        "@type": "ListItem",
        position: 3,
        name: "Depoimentos",
        item: `${normalizedUrl}#depoimentos`,
      },
    ],
  };

  return (
    <Helmet>
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={siteKeywords.join(", ")} />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <meta name="theme-color" content={seo.themeColor} />
      <meta name="msapplication-TileColor" content={seo.themeColor} />

      {/* Geo Tags para SEO Local */}
      <meta name="geo.region" content={`${seo.business.country}-${seo.business.state}`} />
      <meta name="geo.placename" content={seo.business.city} />
      <meta
        name="geo.position"
        content={`${seo.coordinates.latitude};${seo.coordinates.longitude}`}
      />
      <meta name="ICBM" content={`${seo.coordinates.latitude}, ${seo.coordinates.longitude}`} />

      {/* Open Graph */}
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={ogImage} />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta property="og:image:alt" content={`${company.name} ${company.unit}`} />
      <meta property="og:url" content={normalizedUrl} />
      <meta property="og:type" content={type} />
      <meta property="og:locale" content="pt_BR" />
      <meta property="og:site_name" content={seo.siteName} />

      {/* Twitter Card */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={ogImage} />
      <meta name="twitter:image:alt" content={`${company.name} ${company.unit}`} />
      {seo.twitterHandle && <meta name="twitter:site" content={seo.twitterHandle} />}

      {/* Apple Mobile Web App */}
      <meta name="apple-mobile-web-app-capable" content="yes" />
      <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
      <meta name="apple-mobile-web-app-title" content={seo.siteName} />
      <link rel="apple-touch-icon" href={`${seo.siteUrl}/apple-touch-icon.png`} />

      {/* Additional SEO */}
      <link rel="canonical" href={normalizedUrl} />
      <meta
        name="robots"
        content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1"
      />
      <meta name="googlebot" content="index, follow" />
      <meta name="language" content="pt-BR" />
      <meta name="revisit-after" content="7 days" />
      <meta name="author" content={company.name} />

      {/* Preconnect para Performance */}
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      <link rel="dns-prefetch" href="https://www.google-analytics.com" />
      <link rel="dns-prefetch" href="https://www.googletagmanager.com" />

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

      {/* Structured Data - Breadcrumb */}
      <script type="application/ld+json">{JSON.stringify(breadcrumbSchema)}</script>
    </Helmet>
  );
};
