import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Suspense, lazy, useEffect } from "react";
import { reportWebVitals } from "@/lib/analytics";
import { HelmetProvider } from "react-helmet-async";

// PWA: Hook para gerenciar atualizações do Service Worker
import { useRegisterSW } from 'virtual:pwa-register/react';
import { toast } from "sonner";

// Lazy Loading Granular para reduzir o bundle inicial
const Index = lazy(() => import("./pages/Index"));
const NotFound = lazy(() => import("./pages/NotFound"));

// Configuração Sênior do QueryClient: Foco em estabilidade e cache
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5, // 5 minutos de dados "frescos"
      retry: (failureCount, error: any) => {
        // Não repete se for erro de autenticação ou 404
        if (error?.status === 404 || error?.status === 401) return false;
        return failureCount < 2;
      },
      refetchOnWindowFocus: false,
    },
  },
});

const App = () => {
  // 1. Monitoramento de Core Web Vitals
  useEffect(() => {
    reportWebVitals();
  }, []);

  // 2. Registro e Ciclo de Vida do PWA/Service Worker
  const {
    offlineReady: [offlineReady, setOfflineReady],
    needRefresh: [needRefresh, setNeedRefresh],
    updateServiceWorker,
  } = useRegisterSW({
    onRegistered(r) {
      console.log('[PWA] Service Worker registrado com sucesso.');
      // Verifica atualizações a cada horar && setInterval(() => r.update(), 60 * 60 * 1000);
    },
    onRegisterError(error) {
      console.error('[PWA] Erro no registro do SW:', error);
    },
  });

  // 3. Toasts informativos para o ciclo de vida do PWA
  useEffect(() => {
    if (offlineReady) {
      toast.success("Site pronto para uso offline!");
      setOfflineReady(false);
    }
    if (needRefresh) {
      toast("Nova versão disponível!", {
        description: "Atualize para ver os novos tratamentos e preços.",
        action: {
          label: "Atualizar",
          onClick: () => updateServiceWorker(true),
        },
        duration: Infinity, // Mantém o aviso até o usuário agir
      });
    }
  }, [offlineReady, needRefresh, setOfflineReady, updateServiceWorker]);

  return (
    <HelmetProvider>
      <QueryClientProvider client={queryClient}>
        <TooltipProvider delayDuration={300}>
          {/* Provedores de Feedback Visual */}
          <Toaster />
          <Sonner 
            position="top-right" 
            closeButton 
            richColors 
            expand={false}
          />

          <BrowserRouter 
            future={{
              v7_startTransition: true,
              v7_relativeSplatPath: true,
            }}
          >
            <Suspense
              fallback={
                <div className="h-screen w-full flex flex-col items-center justify-center bg-[#F9F9F9]">
                  {/* Spinner elegante com as cores da Magrass */}
                  <div className="relative">
                    <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-[#C5A059] border-opacity-20"></div>
                    <div className="absolute top-0 animate-spin rounded-full h-16 w-16 border-t-4 border-[#C5A059] border-transparent"></div>
                  </div>
                  <p className="mt-4 text-[#C5A059] font-medium animate-pulse">
                    Carregando experiência Magrass...
                  </p>
                </div>
              }
            >
              <Routes>
                <Route path="/" element={<Index />} />
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