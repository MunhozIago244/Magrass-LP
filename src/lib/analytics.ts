import { onCLS, onFCP, onLCP, onTTFB, onINP, type Metric } from 'web-vitals';

/**
 * Envia métricas de performance para o console ou analytics externo.
 * INP substituiu FID para medir interatividade de forma mais precisa.
 */
export const reportWebVitals = (onPerfEntry?: (metric: Metric) => void) => {
  if (onPerfEntry && onPerfEntry instanceof Function) {
    onCLS(onPerfEntry);
    onFCP(onPerfEntry);
    onLCP(onPerfEntry);
    onTTFB(onPerfEntry);
    onINP(onPerfEntry); // Substituição de onFID
  } else {
    // Fallback padrão para log no console em desenvolvimento
    const log = (metric: Metric) => console.log('[Web Vital]:', metric);
    onCLS(log);
    onFCP(log);
    onLCP(log);
    onTTFB(log);
    onINP(log);
  }
};