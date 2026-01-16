import { Helmet } from "react-helmet-async";
import { CONFIG } from "@/config/siteConfig";

interface SEOHeadProps {
  title?: string;
  description?: string;
  image?: string;
  url?: string;
}

export const SEOHead = ({
  title = "Magrass Hortolândia | Estética Avançada e Emagrecimento",
  description = "Centro de estética premium em Hortolândia. Tratamentos corporais, emagrecimento, harmonização e protocolos exclusivos com tecnologia de ponta.",
  image = "https://magrass.com.br/og-image.jpg",
  url = "https://magrass.com.br"
}: SEOHeadProps) => {
  const { company } = CONFIG;

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "BeautySalon",
    "name": "Magrass Hortolândia",
    "image": image,
    "description": description,
    "address": {
      "@type": "PostalAddress",
      "streetAddress": company.address,
      "addressLocality": "Hortolândia",
      "addressRegion": "SP",
      "addressCountry": "BR"
    },
    "telephone": company.phone,
    "url": url,
    "priceRange": "$$-$$$",
    "openingHoursSpecification": [
      {
        "@type": "OpeningHoursSpecification",
        "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
        "opens": "09:00",
        "closes": "19:00"
      },
      {
        "@type": "OpeningHoursSpecification",
        "dayOfWeek": "Saturday",
        "opens": "08:00",
        "closes": "12:00"
      }
    ],
    "sameAs": [
      company.instagram,
      // CORREÇÃO TÉCNICA: Usando 'phone' já que 'whatsapp' não está tipado no objeto company
      `https://wa.me/${company.phone.replace(/\D/g, '')}`
    ]
  };

  return (
    <Helmet>
      {/* ... meta tags permanecem as mesmas */}
      <script type="application/ld+json">
        {JSON.stringify(structuredData)}
      </script>
      {/* ... restante do componente */}
    </Helmet>
  );
};