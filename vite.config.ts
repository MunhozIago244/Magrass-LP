import { defineConfig, type PluginOption, type UserConfig } from 'vite';
import react from '@vitejs/plugin-react';
import imagemin from 'vite-plugin-imagemin';
import path from 'path';
import { visualizer } from 'rollup-plugin-visualizer';

// CORREÇÃO SÊNIOR: O plugin imagemin é exportado de forma inconsistente entre ambientes.
// Fazemos uma verificação robusta para garantir que pegamos a função correta.
const getImageminPlugin = () => {
  if (!imagemin) return null;
  
  // Tenta várias formas de exportação comuns em pacotes legados
  const fn = (imagemin as any).default || imagemin;
  
  if (typeof fn !== 'function') {
    // Se ainda não for uma função, pode estar dentro de outro nível (comum no ambiente Vercel)
    return (fn as any).default || fn;
  }
  
  return fn;
};

export default defineConfig(({ mode }): UserConfig => {
  const isProd = mode === 'production';
  const imageminPlugin = getImageminPlugin();

  return {
    plugins: [
      react(),
      // Mudança técnica: Verificamos se imageminPlugin é de fato uma função antes de chamar
      isProd && typeof imageminPlugin === 'function' && imageminPlugin({
        gifsicle: { optimizationLevel: 7 },
        optipng: { optimizationLevel: 7 },
        mozjpeg: { quality: 80 },
        pngquant: { quality: [0.7, 0.85], speed: 4 },
        svgo: {
          plugins: [{ name: 'removeViewBox', active: false }]
        }
      }),
      isProd && (visualizer({
        filename: './dist/stats.html',
        gzipSize: true,
      }) as PluginOption)
    ].filter(Boolean) as PluginOption[],

    resolve: {
      alias: {
        "@": path.resolve(__dirname, "./src"),
      },
    },

    build: {
      minify: 'terser',
      terserOptions: {
        compress: {
          drop_console: true,
          drop_debugger: true,
          pure_funcs: ['console.info', 'console.debug'],
        },
        output: {
          comments: false,
        },
      },
      target: 'esnext',
      rollupOptions: {
        output: {
          manualChunks(id) {
            if (id.includes('node_modules')) {
              if (id.includes('react')) return 'vendor-core';
              if (id.includes('lucide-react')) return 'vendor-ui-icons';
              if (id.includes('framer-motion')) return 'vendor-ui-animation';
              return 'vendor-libs';
            }
          }
        }
      },
      chunkSizeWarningLimit: 1000,
      reportCompressedSize: true
    }
  };
});