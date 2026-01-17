import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';
import { registerSW } from 'virtual:pwa-register';

/**
 * Configuração Sênior de Service Worker:
 * 'autoUpdate' garante que o usuário sempre tenha a versão mais recente
 * sem precisar fechar todas as abas.
 */
const updateSW = registerSW({
  onNeedRefresh() {
    if (confirm('Nova versão disponível! Deseja atualizar agora para ver as novidades?')) {
      updateSW(true);
    }
  },
  onOfflineReady() {
    console.log('[PWA] Conteúdo em cache. Pronto para uso offline.');
  },
});

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);