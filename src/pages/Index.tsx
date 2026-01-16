import { useEffect } from "react";
import HeroSection from "@/components/landing/HeroSection";
import ServicesSection from "@/components/landing/ServicesSection";
import BenefitsSection from "@/components/landing/BenefitsSection";
import CTASection from "@/components/landing/CTASection";
import Footer from "@/components/landing/Footer";
import { FloatingWhatsApp } from "@/components/landing/FloatingWhatsApp";
import { CONFIG } from "@/config/siteConfig";
import { SEOHead } from '@/components/landing/SEOHead';

const Index = () => {
  // Efeito para garantir que a página sempre carregue no topo (Scroll Restoration)
  // Essencial para Landing Pages vindas de anúncios
  useEffect(() => {
    window.scrollTo(0, 0);
    
    // Otimização de SEO dinâmico para a Unidade Hortolândia
    document.title = `${CONFIG.footer.brand} | ${CONFIG.hero.badge}`;
  }, []);

  return (
    <main className="min-h-screen bg-[#F9F9F9] overflow-x-hidden selection:bg-[#C5A059]/30">
      {/* Cada componente abaixo é uma 'camada' (layer) independente.
        A ordem foi pensada no funil de vendas:
        1. Desejo (Hero) 
        2. Solução (Services)
        3. Autoridade (Benefits)
        4. Decisão (CTA)
      */}
      
      <HeroSection /> 
      <SEOHead />
      
      <div className="space-y-0"> {/* Container para controle de espaçamento entre seções se necessário */}
        <ServicesSection />
        
        <BenefitsSection />
        
        <CTASection />
      </div>

      <Footer />

      {/* Camada de Interação Flutuante */}
      <FloatingWhatsApp />
    </main>
  );
};

export default Index;