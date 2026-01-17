// src/main.tsx
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';

// ============================================================
// CONFIGURAÇÃO DE AMBIENTE
// ============================================================
const isDev = import.meta.env.DEV;
const isProd = import.meta.env.PROD;

// ============================================================
// LOGGER UTILITÁRIO
// ============================================================
const logger = {
  info: (message: string, ...args: unknown[]) => {
    if (isDev) console.log(`[App] ${message}`, ...args);
  },
  warn: (message: string, ...args: unknown[]) => {
    console.warn(`[App] ${message}`, ...args);
  },
  error: (message: string, ...args: unknown[]) => {
    console.error(`[App] ${message}`, ...args);
  },
};

// ============================================================
// TRATAMENTO DE ERROS GLOBAL
// ============================================================
function setupGlobalErrorHandlers(): void {
  // Erros não capturados
  window.addEventListener('error', (event) => {
    logger.error('Erro não tratado:', {
      message: event.message,
      filename: event.filename,
      lineno: event.lineno,
      colno: event.colno,
    });
  });

  // Promises rejeitadas não tratadas
  window.addEventListener('unhandledrejection', (event) => {
    logger.error('Promise rejeitada não tratada:', event.reason);
  });
}

// ============================================================
// SERVICE WORKER (PWA)
// ============================================================
async function registerServiceWorker(): Promise<void> {
  // Só registra em produção ou se explicitamente habilitado
  if (!('serviceWorker' in navigator)) {
    logger.warn('Service Worker não suportado neste navegador');
    return;
  }

  try {
    const { registerSW } = await import('virtual:pwa-register');

    const updateSW = registerSW({
      immediate: false, // Não força atualização imediata

      onRegisteredSW(swUrl, registration) {
        logger.info('Service Worker registrado:', swUrl);

        // Verifica atualizações periodicamente (a cada hora)
        if (registration && isProd) {
          setInterval(
            () => {
              registration.update().catch(logger.error);
            },
            60 * 60 * 1000
          );
        }
      },

      onNeedRefresh() {
        // UI mais elegante que confirm() nativo
        const shouldUpdate = window.confirm(
          '🚀 Nova versão disponível!\n\nDeseja atualizar agora?'
        );

        if (shouldUpdate) {
          updateSW(true);
        }
      },

      onOfflineReady() {
        logger.info('✅ App disponível offline');

        // Notificação visual opcional (não intrusiva)
        if (isProd && 'Notification' in window && Notification.permission === 'granted') {
          new Notification('Magrass', {
            body: 'App pronto para uso offline!',
            icon: '/favicon.svg',
          });
        }
      },

      onRegisterError(error) {
        logger.error('Falha ao registrar Service Worker:', error);
      },
    });
  } catch (error) {
    // Falha silenciosa - PWA é enhancement, não requisito
    logger.warn('PWA não disponível:', error);
  }
}

// ============================================================
// WEB VITALS (MÉTRICAS DE PERFORMANCE)
// ============================================================
async function reportWebVitals(): Promise<void> {
  if (!isProd) return;

  try {
    const { onCLS, onINP, onFCP, onLCP, onTTFB } = await import('web-vitals');

    const sendToAnalytics = (metric: { name: string; value: number; id: string }) => {
      logger.info(`[Vitals] ${metric.name}:`, metric.value.toFixed(2));
      
      // Exemplo: enviar para endpoint customizado
      // navigator.sendBeacon('/api/vitals', JSON.stringify(metric));
    };

    onCLS(sendToAnalytics);   // Cumulative Layout Shift
    onINP(sendToAnalytics);   // Interaction to Next Paint (substitui FID)
    onFCP(sendToAnalytics);   // First Contentful Paint
    onLCP(sendToAnalytics);   // Largest Contentful Paint
    onTTFB(sendToAnalytics);  // Time to First Byte
  } catch {
    // web-vitals é opcional
  }
}

// ============================================================
// RENDERIZAÇÃO DO APP
// ============================================================
function renderApp(): void {
  const rootElement = document.getElementById('root');

  // Validação crítica
  if (!rootElement) {
    throw new Error(
      'Elemento root não encontrado. Verifique se existe <div id="root"></div> no index.html'
    );
  }

  // Evita renderização dupla em HMR
  if (rootElement.hasChildNodes() && isDev) {
    logger.warn('Root já possui conteúdo, pulando renderização duplicada');
    return;
  }

  const root = ReactDOM.createRoot(rootElement);

  root.render(
    <React.StrictMode>
      <App />
    </React.StrictMode>
  );

  logger.info(`App iniciado em modo ${isDev ? 'desenvolvimento' : 'produção'}`);
}

// ============================================================
// INICIALIZAÇÃO
// ============================================================
async function bootstrap(): Promise<void> {
  // 1. Configura handlers de erro primeiro
  setupGlobalErrorHandlers();

  // 2. Renderiza o app (prioridade máxima)
  renderApp();

  // 3. Registra SW após renderização (não bloqueia)
  registerServiceWorker();

  // 4. Inicia coleta de métricas
  reportWebVitals();

  // 5. Marca como totalmente carregado
  if (isProd) {
    window.addEventListener('load', () => {
      // Remove splash screen se existir
      const splash = document.getElementById('splash-screen');
      if (splash) {
        splash.style.opacity = '0';
        setTimeout(() => splash.remove(), 300);
      }

      // Performance mark para debug
      performance.mark('app-fully-loaded');
    });
  }
}

// Inicia a aplicação
bootstrap().catch(logger.error);