import { defineConfig, type PluginOption } from 'vite';
import react from '@vitejs/plugin-react';
import imagemin from 'vite-plugin-imagemin';
import path from 'path';

// Abordagem Sênior: Resolvemos a incompatibilidade e o Lint
const getImageminPlugin = () => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const plugin = (imagemin as any).default || imagemin;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  return plugin as (options: any) => PluginOption;
};

export default defineConfig(({ mode }) => {
  const isProd = mode === 'production';
  const imageminPlugin = getImageminPlugin();

  return {
    plugins: [
      react(),
      // Configuração condicional segura para produção
      isProd && imageminPlugin({
        gifsicle: { optimizationLevel: 7 },
        optipng: { optimizationLevel: 7 },
        mozjpeg: { quality: 80 },
        pngquant: { quality: [0.8, 0.9], speed: 4 },
        svgo: {
          plugins: [{ name: 'removeViewBox', active: false }]
        }
      })
    ].filter(Boolean) as PluginOption[],
    resolve: {
      alias: {
        "@": path.resolve(__dirname, "./src"),
      },
    },
    build: {
      rollupOptions: {
        output: {
          manualChunks: {
            'vendor-react': ['react', 'react-dom'],
            'vendor-lib': ['framer-motion', 'lucide-react'],
          }
        }
      }
    }
  };
});