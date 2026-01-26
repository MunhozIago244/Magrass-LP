import { onCLS, onFCP, onLCP, onTTFB, onINP, type Metric } from "web-vitals";

// Placeholder function for sending metrics to a backend
const sendMetricToBackend = (metric: Metric) => {
  if (import.meta.env.PROD) {
    // Replace with actual backend integration (e.g., fetch('/api/vitals', { method: 'POST', body: JSON.stringify(metric) }))
    console.log("[Web Vitals - Production Backend Placeholder]:", metric);
  }
};

/**
 * Envia métricas de performance para o console ou analytics externo.
 * INP substituiu FID para medir interatividade de forma mais precisa.
 */
export const reportWebVitals = (onPerfEntry?: (metric: Metric) => void) => {
  // Only report Web Vitals in production environment
  if (!import.meta.env.PROD) {
    return;
  }

  if (onPerfEntry && onPerfEntry instanceof Function) {
    onCLS(onPerfEntry);
    onFCP(onPerfEntry);
    onLCP(onPerfEntry);
    onTTFB(onPerfEntry);
    onINP(onPerfEntry); // Substituição de onFID
  } else {
    // Fallback padrão: log no console em desenvolvimento, ou placeholder para backend em produção
    const log = (metric: Metric) => {
      if (import.meta.env.DEV) {
        console.log("[Web Vital - Development]:", metric);
      } else {
        sendMetricToBackend(metric);
      }
    };
    onCLS(log);
    onFCP(log);
    onLCP(log);
    onTTFB(log);
    onINP(log);
  }
};
