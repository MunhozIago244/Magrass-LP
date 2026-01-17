import { useEffect, lazy, Suspense } from "react";
import HeroSection from "@/components/landing/HeroSection";
import { SEOHead } from '@/components/landing/SEOHead';
import { CONFIG } from "@/config/siteConfig";

// Componentes carregados via Lazy Loading
const KineticTestimonial = lazy(() => import("@/components/landing/KineticTestimonial"));
const ServicesSection = lazy(() => import("@/components/landing/ServicesSection"));
const BenefitsSection = lazy(() => import("@/components/landing/BenefitsSection"));
const CTASection = lazy(() => import("@/components/landing/CTASection"));
const Footer = lazy(() => import("@/components/landing/Footer"));
const FloatingWhatsApp = lazy(() => 
  import("@/components/landing/FloatingWhatsApp").then(module => ({ default: module.FloatingWhatsApp }))
);

/**
 * Skeleton para transições de carregamento
 */
const SectionLoader = () => (
  <div className="w-full h-96 bg-[#F9F9F9] animate-pulse flex items-center justify-center">
    <div className="w-12 h-12 border-4 border-gold/20 border-t-gold rounded-full animate-spin" />
  </div>
);

const Index = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <SEOHead 
        title={`${CONFIG.footer.brand} | ${CONFIG.hero.badge}`} 
      />

      <main className="min-h-screen bg-[#F9F9F9] overflow-x-hidden selection:bg-gold/30">
        {/* Camada 1: Desejo (Imediato - Static Import) */}
        <HeroSection />

        <Suspense fallback={<SectionLoader />}>
          {/* Camada 2: Prova Social Cinética (Novo)
              Inserido aqui para validar a promessa da Hero antes de mostrar os serviços.
          */}
          <KineticTestimonial 
            testimonials={CONFIG.testimonials} 
            speed={1}
          />

          <div className="relative">
            {/* Camada 3: Solução */}
            <ServicesSection />
            
            {/* Camada 4: Autoridade */}
            <BenefitsSection />
            
            {/* Camada 5: Decisão */}
            <CTASection />
          </div>

          <Footer />
          
          <FloatingWhatsApp />
        </Suspense>
      </main>
    </>
  );
};

export default Index;