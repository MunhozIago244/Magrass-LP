import { useEffect, lazy, Suspense, memo, type ReactNode } from "react";
import { ErrorBoundary, type FallbackProps } from "react-error-boundary";
import HeroSection from "@/components/landing/HeroSection";
import { SEOHead } from "@/components/landing/SEOHead";
import { CONFIG } from "@/config/siteConfig";


// ============================================================
// LAZY IMPORTS
// ============================================================
const KineticTestimonial = lazy(() => import("@/components/landing/KineticTestimonial"));
const ServicesSection = lazy(() => import("@/components/landing/ServicesSection"));
const BenefitsSection = lazy(() => import("@/components/landing/BenefitsSection"));
const CTASection = lazy(() => import("@/components/landing/CTASection"));
const Footer = lazy(() => import("@/components/landing/Footer"));
const FloatingWhatsApp = lazy(() =>
  import("@/components/landing/FloatingWhatsApp").then((m) => ({ default: m.FloatingWhatsApp }))
);

// ============================================================
// LOADING STATES
// ============================================================
interface SectionLoaderProps {
  height?: string;
  label?: string;
}

const SectionLoader = memo(({ height = "h-96", label = "Carregando seção" }: SectionLoaderProps) => (
  <div
    className={`w-full ${height} bg-[#F9F9F9] animate-pulse flex items-center justify-center`}
    role="status"
    aria-label={label}
    aria-busy="true"
  >
    <div className="flex flex-col items-center gap-3">
      <div
        className="w-10 h-10 border-3 border-gold/20 border-t-gold rounded-full animate-spin"
        aria-hidden="true"
      />
      <span className="sr-only">{label}</span>
    </div>
  </div>
));

SectionLoader.displayName = "SectionLoader";

// ============================================================
// ERROR FALLBACK (Corrigido para FallbackProps)
// ============================================================
const ErrorFallback = ({ error, resetErrorBoundary }: FallbackProps) => {
  const errorMessage = error instanceof Error ? error.message : "Erro desconhecido";
  
  return (
    <div
      role="alert"
      className="w-full py-16 px-4 bg-red-50 flex flex-col items-center justify-center gap-4"
    >
      <p className="text-red-600 font-medium">Algo deu errado ao carregar esta seção.</p>
      <button
        onClick={resetErrorBoundary}
        className="px-6 py-2 bg-gold text-white rounded-lg hover:bg-gold/90 transition-colors focus:outline-none focus:ring-2 focus:ring-gold focus:ring-offset-2"
      >
        Tentar novamente
      </button>
      {import.meta.env.DEV && (
        <pre className="mt-4 p-4 bg-red-100 rounded text-xs text-red-800 max-w-md overflow-auto">
          {errorMessage}
        </pre>
      )}
    </div>
  );
};

// ============================================================
// SUSPENSE WRAPPER COM ERROR BOUNDARY
// ============================================================
interface SafeSuspenseProps {
  children: ReactNode;
  fallback?: ReactNode;
  label?: string;
}

const SafeSuspense = ({ children, fallback, label }: SafeSuspenseProps) => (
  <ErrorBoundary FallbackComponent={ErrorFallback}>
    <Suspense fallback={fallback ?? <SectionLoader label={label} />}>
      {children}
    </Suspense>
  </ErrorBoundary>
);

// ============================================================
// PREFETCH DOS CHUNKS
// ============================================================
const prefetchComponents = () => {
  const prefetch = (importFn: () => Promise<unknown>) => {
    if ("requestIdleCallback" in window) {
      requestIdleCallback(() => importFn());
    } else {
      setTimeout(importFn, 200);
    }
  };

  prefetch(() => import("@/components/landing/KineticTestimonial"));
  prefetch(() => import("@/components/landing/ServicesSection"));
  prefetch(() => import("@/components/landing/BenefitsSection"));
  prefetch(() => import("@/components/landing/CTASection"));
  prefetch(() => import("@/components/landing/Footer"));
  prefetch(() => import("@/components/landing/FloatingWhatsApp"));
};

// ============================================================
// MAIN COMPONENT
// ============================================================
const Index = () => {
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" });
    prefetchComponents();
  }, []);

  const pageTitle = `${CONFIG.footer.brand} | ${CONFIG.hero.badge}`;

  return (
    <>
      <SEOHead title={pageTitle} />

      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 focus:px-4 focus:py-2 focus:bg-gold focus:text-white focus:rounded-lg"
      >
        Pular para o conteúdo principal
      </a>

      <main
        id="main-content"
        className="min-h-screen bg-[#F9F9F9] overflow-x-hidden selection:bg-gold/30"
      >
        <HeroSection />

        <SafeSuspense label="Carregando depoimentos">
          <KineticTestimonial />
        </SafeSuspense>

        <div className="relative">
          <SafeSuspense label="Carregando serviços">
            <ServicesSection />
          </SafeSuspense>

          <SafeSuspense label="Carregando benefícios">
            <BenefitsSection />
          </SafeSuspense>

          <SafeSuspense label="Carregando chamada para ação">
            <CTASection />
          </SafeSuspense>
        </div>

        <SafeSuspense label="Carregando rodapé">
          <Footer />
        </SafeSuspense>

        <SafeSuspense fallback={null}>
          <FloatingWhatsApp />
        </SafeSuspense>
      </main>
    </>
  );
};

export default Index;