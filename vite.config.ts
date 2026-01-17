import { defineConfig, type PluginOption, type UserConfig } from "vite";
import react from "@vitejs/plugin-react";
import imagemin from "vite-plugin-imagemin";
import { VitePWA } from "vite-plugin-pwa";
import { visualizer } from "rollup-plugin-visualizer";
import compression from "vite-plugin-compression";
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
    define: {
      "process.env.NODE_ENV": JSON.stringify(mode),
    },

    plugins: [
      react(),
      
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

      isProd && compression({
        algorithm: 'brotliCompress',
        ext: '.br',
        threshold: 1024,
      }),

      isProd && imageminPlugin && imageminPlugin({
        gifsicle: { optimizationLevel: 7 },
        optipng: { optimizationLevel: 7 },
        mozjpeg: { quality: 75 },
        pngquant: { quality: [0.65, 0.8], speed: 4 },
        svgo: { plugins: [{ name: "removeViewBox", active: false }] },
      }),

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
          pure_funcs: ['console.log', 'console.info'],
          passes: 2,
        },
        format: { comments: false },
        // Mantém nomes de classes e funções para evitar quebras em libs que dependem de reflexão
        keep_classnames: isProd,
        keep_fnames: isProd,
      },
      
      target: "esnext",
      sourcemap: false,
      cssCodeSplit: true,
      reportCompressedSize: true,
      chunkSizeWarningLimit: 800, // Aumentado levemente para acomodar o vendor unificado

      rollupOptions: {
        output: {
          chunkFileNames: "assets/js/[name]-[hash].js",
          entryFileNames: "assets/js/[name]-[hash].js",
          assetFileNames: "assets/[ext]/[name]-[hash].[ext]",

          manualChunks(id) {
            if (id.includes("node_modules")) {
              // UNIFICAÇÃO CORE: Agrupamos React + Motion + Lucide para evitar Circular Dependencies
              // O erro 'createContext' ocorre quando essas libs são separadas incorretamente
              if (
                id.includes("react") || 
                id.includes("react-dom") || 
                id.includes("scheduler") ||
                id.includes("framer-motion") ||
                id.includes("lucide-react") ||
                id.includes("clsx") ||
                id.includes("tailwind-merge")
              ) {
                return "vendor-framework";
              }

              // Outras bibliotecas de dados podem ficar separadas
              if (id.includes("@tanstack") || id.includes("query")) {
                return "vendor-data";
              }
              
              // O restante cai em um chunk comum, mas o Rollup agora tem um grafo mais simples
              return "vendor-lib";
            }
          },
        },
      },
    },

    optimizeDeps: {
      include: ["react", "react-dom", "framer-motion", "lucide-react"],
    },
  };
});