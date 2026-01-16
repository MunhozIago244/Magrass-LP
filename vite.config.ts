import { defineConfig, type PluginOption, type UserConfig } from 'vite';
import react from '@vitejs/plugin-react';
import imagemin from 'vite-plugin-imagemin';
import path from 'path';
import { visualizer } from 'rollup-plugin-visualizer';

interface ImageminOptions {
  gifsicle?: { optimizationLevel?: number };
  optipng?: { optimizationLevel?: number };
  mozjpeg?: { quality?: number };
  pngquant?: { quality?: [number, number]; speed?: number };
  svgo?: { plugins?: Array<{ name: string; active?: boolean }> };
}

const getImageminPlugin = () => {
  if (!imagemin) return null;
  const untypedImagemin = imagemin as unknown;
  const fn = (
    (untypedImagemin as { default?: object }).default || untypedImagemin
  ) as (options: ImageminOptions) => PluginOption;
  return typeof fn === 'function' ? fn : null;
};

export default defineConfig(({ mode }): UserConfig => {
  const isProd = mode === 'production';
  const imageminPlugin = getImageminPlugin();

  return {
    plugins: [
      react(),
      isProd && imageminPlugin && imageminPlugin({
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
        // CORREÇÃO DO ERRO TERSER: Terser v5+ prefere 'format' em vez de 'output'
        format: {
          comments: false,
        },
      },
      target: 'esnext',
      rollupOptions: {
        output: {
          // CORREÇÃO DA CIRCULARIDADE: Simplificamos a separação.
          // O erro ocorreu porque bibliotecas em 'vendor-libs' dependiam do core e vice-versa.
          manualChunks(id) {
            if (id.includes('node_modules')) {
              // Agrupamos o core e libs fundamentais em um único chunk robusto
              if (id.includes('react') || id.includes('scheduler') || id.includes('object-assign')) {
                return 'vendor-core';
              }
              // Ícones e Animações costumam ser independentes
              if (id.includes('lucide-react')) return 'vendor-ui-icons';
              if (id.includes('framer-motion')) return 'vendor-ui-animation';
              
              // Tudo mais que for dependência externa
              return 'vendor-utils';
            }
          }
        }
      },
      chunkSizeWarningLimit: 1000,
      reportCompressedSize: true
    }
  };
});