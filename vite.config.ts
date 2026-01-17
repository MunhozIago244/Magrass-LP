import { defineConfig, type PluginOption, type UserConfig } from "vite";
import react from "@vitejs/plugin-react-swc"; // Use SWC para build mais rápido
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
    options: ImageminOptions,
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
          maximumFileSizeToCacheInBytes: 3000000, // 3MB
          runtimeCaching: [
            {
              urlPattern: /^https:\/\/fonts\.(?:googleapis|gstatic)\.com\/.*/i,
              handler: "CacheFirst",
              options: {
                cacheName: "google-fonts",
                expiration: {
                  maxEntries: 10,
                  maxAgeSeconds: 60 * 60 * 24 * 365,
                },
              },
            },
            {
              urlPattern: /\.(?:png|jpg|jpeg|svg|gif|webp)$/,
              handler: "CacheFirst",
              options: {
                cacheName: "images",
                expiration: {
                  maxEntries: 50,
                  maxAgeSeconds: 60 * 60 * 24 * 30,
                },
              },
            },
          ],
        },
        manifest: {
          name: "Magrass Landing Page",
          short_name: "Magrass",
          theme_color: "#10b981",
          background_color: "#ffffff",
          display: "standalone",
          icons: [
            {
              src: "/icon-192.png",
              sizes: "192x192",
              type: "image/png",
            },
            {
              src: "/icon-512.png",
              sizes: "512x512",
              type: "image/png",
            },
          ],
        },
      }),

      isProd &&
        compression({
          algorithm: "brotliCompress",
          ext: ".br",
          threshold: 1024,
          deleteOriginFile: false,
          compressionOptions: {
            level: 11,
          },
        }),

      isProd &&
        compression({
          algorithm: "gzip",
          ext: ".gz",
          threshold: 1024,
          deleteOriginFile: false,
        }),

      isProd &&
        imageminPlugin &&
        imageminPlugin({
          gifsicle: { optimizationLevel: 7 },
          optipng: { optimizationLevel: 7 },
          mozjpeg: { quality: 80 },
          pngquant: { quality: [0.7, 0.85], speed: 4 },
          svgo: {
            plugins: [
              { name: "removeViewBox", active: false },
              { name: "removeEmptyAttrs", active: true },
            ],
          },
        }),

      isProd &&
        (visualizer({
          filename: "./dist/stats.html",
          open: false,
          gzipSize: true,
          brotliSize: true,
          template: "treemap", // sunburst, treemap, network
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
          drop_console: isProd,
          drop_debugger: isProd,
          pure_funcs: isProd
            ? ["console.log", "console.info", "console.debug", "console.warn"]
            : [],
          passes: 3,
          unsafe_arrows: true,
          unsafe_methods: true,
          toplevel: true,
        },
        mangle: {
          toplevel: true,
          safari10: true,
        },
        format: {
          comments: false,
          ecma: 2020,
        },
        // Remove keep_classnames e keep_fnames para melhor minificação
      },

      target: "esnext",
      sourcemap: false,
      cssCodeSplit: true,
      reportCompressedSize: true,
      chunkSizeWarningLimit: 600,

      // Otimizações adicionais
      cssMinify: true,
      assetsInlineLimit: 4096, // Inline assets < 4KB

      rollupOptions: {
        output: {
          chunkFileNames: "assets/js/[name]-[hash].js",
          entryFileNames: "assets/js/[name]-[hash].js",
          assetFileNames: (assetInfo) => {
            const info = assetInfo.name?.split(".") || [];
            const ext = info[info.length - 1];
            if (/png|jpe?g|svg|gif|tiff|bmp|ico|webp/i.test(ext)) {
              return `assets/images/[name]-[hash][extname]`;
            } else if (/woff|woff2|eot|ttf|otf/i.test(ext)) {
              return `assets/fonts/[name]-[hash][extname]`;
            }
            return `assets/[ext]/[name]-[hash][extname]`;
          },

          manualChunks: {
            // Core React (separado para melhor cache)
            "vendor-react": ["react", "react-dom", "react/jsx-runtime"],

            // Router (carregamento sob demanda)
            "vendor-router": ["react-router-dom"],

            // Framer Motion (geralmente o maior chunk)
            "vendor-motion": ["framer-motion"],

            // UI Utils
            "vendor-ui": ["lucide-react", "clsx", "tailwind-merge"],
          },
        },

        // Otimizações de tree-shaking
        treeshake: {
          moduleSideEffects: "no-external",
          propertyReadSideEffects: false,
          tryCatchDeoptimization: false,
        },
      },
    },

    optimizeDeps: {
      include: [
        "react",
        "react-dom",
        "react-router-dom",
        "framer-motion",
        "lucide-react",
      ],
      exclude: ["@vite/client", "@vite/env"],
    },

    // Performance
    server: {
      hmr: {
        overlay: true,
      },
    },

    // Otimizações de preview
    preview: {
      port: 4173,
      strictPort: true,
      host: true,
    },
  };
});
