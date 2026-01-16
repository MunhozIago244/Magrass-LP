import { defineConfig, type PluginOption, type UserConfig } from 'vite';
import react from '@vitejs/plugin-react';
import imagemin from 'vite-plugin-imagemin';
import path from 'path';
import { visualizer } from 'rollup-plugin-visualizer';

// Definimos uma interface para o plugin de imagem para evitar o 'any' do ESLint
interface ImageminOptions {
  gifsicle?: { optimizationLevel?: number };
  optipng?: { optimizationLevel?: number };
  mozjpeg?: { quality?: number };
  pngquant?: { quality?: [number, number]; speed?: number };
  svgo?: { plugins?: Array<{ name: string; active?: boolean }> };
}

const getImageminPlugin = () => {
  const plugin = (imagemin as unknown as (options: ImageminOptions) => PluginOption);
  return plugin;
};

export default defineConfig(({ mode }): UserConfig => {
  const isProd = mode === 'production';
  const imageminPlugin = getImageminPlugin();

  return {
    plugins: [
      react(),
      isProd && imageminPlugin({
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
      // Correção do Erro 2769: O Vite espera TerserOptions diretamente 
      // e não um objeto aninhado incorretamente.
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