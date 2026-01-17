import { defineConfig, type PluginOption, type UserConfig } from "vite";
import react from "@vitejs/plugin-react";
import imagemin from "vite-plugin-imagemin";
import { VitePWA } from "vite-plugin-pwa";
import { visualizer } from "rollup-plugin-visualizer";
import compression from "vite-plugin-compression"; // Otimização de entrega
import path from "path";

interface ImageminOptions {
  gifsicle?: { optimizationLevel?: number };
  optipng?: { optimizationLevel?: number };
  mozjpeg?: { quality?: number };
  pngquant?: { quality?: [number, number]; speed?: number };
  svgo?: { plugins?: Array<{ name: string; active?: boolean }> };
}

const getImageminPlugin = () => {
  if (!imagemin) return null;
  const untyped = imagemin as unknown;
  const fn = ((untyped as { default?: object }).default || untyped) as (
    options: ImageminOptions
  ) => PluginOption;
  return typeof fn === "function" ? fn : null;
};

export default defineConfig(({ mode }): UserConfig => {
  const isProd = mode === "production";
  const imageminPlugin = getImageminPlugin();

  return {
    // Definição de constantes globais para otimização de tree-shaking
    define: {
      "process.env.NODE_ENV": JSON.stringify(mode),
    },

    plugins: [
      react(),
      
      // 1. PWA & Service Worker (Cache Agressivo)
      VitePWA({
        registerType: "autoUpdate",
        injectRegister: "auto",
        workbox: {
          globPatterns: ["**/*.{js,css,html,ico,png,svg,webp,woff2}"],
          cleanupOutdatedCaches: true,
          clientsClaim: true,
          skipWaiting: true,
          runtimeCaching: [
            {
              urlPattern: /^https:\/\/fonts\.(?:googleapis|gstatic)\.com\/.*/i,
              handler: "CacheFirst",
              options: { 
                cacheName: "google-fonts",
                expiration: { maxEntries: 10, maxAgeSeconds: 60 * 60 * 24 * 365 }
              },
            },
          ],
        },
      }),

      // 2. Compressão (Brotli): Reduz o payload em até 80% comparado ao Gzip comum
      isProd && compression({
        algorithm: 'brotliCompress',
        ext: '.br',
        threshold: 1024, // Apenas arquivos > 1kb
      }),

      // 3. Imagemin (Otimização de Assets)
      isProd && imageminPlugin && imageminPlugin({
        gifsicle: { optimizationLevel: 7 },
        optipng: { optimizationLevel: 7 },
        mozjpeg: { quality: 75 }, // Reduzido levemente para ganho massivo de performance
        pngquant: { quality: [0.65, 0.8], speed: 4 },
        svgo: { plugins: [{ name: "removeViewBox", active: false }] },
      }),

      // 4. Analisador de Bundle
      isProd && (visualizer({
        filename: "./dist/stats.html",
        gzipSize: true,
        brotliSize: true,
      }) as PluginOption),
    ].filter(Boolean) as PluginOption[],

    resolve: {
      alias: {
        "@": path.resolve(__dirname, "./src"),
      },
    },

    build: {
      minify: "terser",
      terserOptions: {
        compress: {
          drop_console: true,
          drop_debugger: true,
          pure_funcs: ['console.log', 'console.info'], // Remove chamadas específicas
          passes: 2, // Segunda passada para minificação agressiva
        },
        format: { comments: false },
      },
      
      target: "esnext",
      sourcemap: false, // Desativado em prod para segurança e tamanho
      cssCodeSplit: true, // CSS menor e carregado por página
      reportCompressedSize: true,
      chunkSizeWarningLimit: 600,

      rollupOptions: {
        output: {
          // Organização de arquivos para Cache de Borda (Edge) eficiente
          chunkFileNames: "assets/js/[name]-[hash].js",
          entryFileNames: "assets/js/[name]-[hash].js",
          assetFileNames: "assets/[ext]/[name]-[hash].[ext]",

          manualChunks(id) {
            if (id.includes("node_modules")) {
              // Separação por domínio de responsabilidade
              if (id.includes("react") || id.includes("scheduler")) return "vendor-core";
              if (id.includes("framer-motion")) return "vendor-motion";
              if (id.includes("lucide")) return "vendor-ui";
              if (id.includes("@tanstack") || id.includes("query")) return "vendor-data";
              
              return "vendor-others";
            }
          },
        },
      },
    },

    // Otimização de pré-processamento de dependências
    optimizeDeps: {
      include: ["react", "react-dom", "framer-motion", "lucide-react"],
    },
  };
});