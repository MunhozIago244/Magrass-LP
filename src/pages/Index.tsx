import { useEffect, lazy, Suspense } from "react";
// HeroSection é importada estaticamente para não atrasar a primeira pintura (LCP)
import HeroSection from "@/components/landing/HeroSection";
import { SEOHead } from '@/components/landing/SEOHead';
import { CONFIG } from "@/config/siteConfig";

// Componentes abaixo da dobra são carregados via Lazy Loading para leveza no mobile
const ServicesSection = lazy(() => import("@/components/landing/ServicesSection"));
const BenefitsSection = lazy(() => import("@/components/landing/BenefitsSection"));
const CTASection = lazy(() => import("@/components/landing/CTASection"));
const Footer = lazy(() => import("@/components/landing/Footer"));
const FloatingWhatsApp = lazy(() => 
  import("@/components/landing/FloatingWhatsApp").then(module => ({ default: module.FloatingWhatsApp }))
);

/**
 * Componente Skeleton para transições suaves de carregamento
 */
const SectionLoader = () => (
  <div className="w-full h-96 bg-[#F9F9F9] animate-pulse flex items-center justify-center">
    <div className="w-12 h-12 border-4 border-[#C5A059]/20 border-t-[#C5A059] rounded-full animate-spin" />
  </div>
);

const Index = () => {
  useEffect(() => {
    // Scroll restoration para anúncios e campanhas
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      {/* SEO e Meta tags no topo para indexação prioritária */}
      <SEOHead 
        title={`${CONFIG.footer.brand} | ${CONFIG.hero.badge}`} 
      />

      <main className="min-h-screen bg-[#F9F9F9] overflow-x-hidden selection:bg-[#C5A059]/30">
        {/* Camada 1: Desejo (Imediato) */}
        <HeroSection />

        {/* As seções abaixo são carregadas de forma assíncrona. 
            Isso reduz o bundle inicial de ~182kB para algo muito mais leve,
            melhorando a nota no Google PageSpeed Mobile.
        */}
        <Suspense fallback={<SectionLoader />}>
          <div className="relative">
            {/* Camada 2: Solução */}
            <ServicesSection />
            
            {/* Camada 3: Autoridade */}
            <BenefitsSection />
            
            {/* Camada 4: Decisão */}
            <CTASection />
          </div>

          <Footer />
          
          {/* Componente flutuante carregado por último */}
          <FloatingWhatsApp />
        </Suspense>
      </main>
    </>
  );
};

export default Index;