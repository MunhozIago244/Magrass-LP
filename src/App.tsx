import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Suspense, lazy, useEffect } from "react";
import { reportWebVitals } from "@/lib/analytics";
import { HelmetProvider } from "react-helmet-async";

// Lazy Loading
const Index = lazy(() => import("./pages/Index"));
const NotFound = lazy(() => import("./pages/NotFound"));

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5,
      retry: 1,
      refetchOnWindowFocus: false,
    },
  },
});

const App = () => {
  // Inicializa o monitoramento de Core Web Vitals (LCP, CLS, INP)
  useEffect(() => {
    reportWebVitals();
  }, []);

  return (
    <HelmetProvider>
      <QueryClientProvider client={queryClient}>
        <TooltipProvider delayDuration={300}>
          <Toaster />
          <Sonner position="top-right" closeButton />

          <BrowserRouter 
            future={{
              v7_startTransition: true,
              v7_relativeSplatPath: true,
            }}
          >
            {/* O Suspense gerencia o estado de carregamento dos componentes Lazy */}
            <Suspense
              fallback={
                <div className="h-screen w-full flex items-center justify-center bg-[#F9F9F9]">
                  <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#C5A059]"></div>
                </div>
              }
            >
              <Routes>
                <Route path="/" element={<Index />} />
                {/* Rota de Fallback (404) */}
                <Route path="*" element={<NotFound />} />
              </Routes>
            </Suspense>
          </BrowserRouter>
        </TooltipProvider>
      </QueryClientProvider>
    </HelmetProvider>
  );
};

export default App;