import * as React from "react";

/**
 * Breakpoint padrão seguindo a convenção do Tailwind (md: 768px)
 * Ajustamos para 768 para garantir consistência com as classes utilitárias.
 */
const MOBILE_BREAKPOINT = 768;

export function useIsMobile() {
  // Inicializamos como undefined para evitar conflitos de renderização no lado do servidor (SSR)
  const [isMobile, setIsMobile] = React.useState<boolean>(false);

  React.useLayoutEffect(() => {
    // Usamos useLayoutEffect para detectar o tamanho antes da pintura da tela,
    // evitando o "flicker" (piscada) de layout no mobile.
    
    const mql = window.matchMedia(`(max-width: ${MOBILE_BREAKPOINT - 1}px)`);
    
    // Handler otimizado
    const onChange = (e: MediaQueryListEvent | MediaQueryList) => {
      setIsMobile(e.matches);
    };

    // Adiciona o listener de forma moderna
    mql.addEventListener("change", onChange);
    
    // Define o estado inicial corretamente
    setIsMobile(mql.matches);

    return () => mql.removeEventListener("change", onChange);
  }, []);

  return isMobile;
}