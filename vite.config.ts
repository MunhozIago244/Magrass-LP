// vite.config.ts
import { defineConfig, type PluginOption } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";

// ============================================================
// CONFIGURAÇÃO PRINCIPAL
// ============================================================
export default defineConfig(({ mode }) => {
  const isDev = mode === "development";
  const isProd = mode === "production";
  const isAnalyze = process.env.ANALYZE === "true";

  return {
    // --------------------------------------------------------
    // PLUGINS
    // --------------------------------------------------------
    plugins: [
      react({
        // Otimiza refresh em desenvolvimento
        fastRefresh: true,
      }),

      // Visualizer apenas quando ANALYZE=true
      isAnalyze && loadVisualizer(),
    ].filter(Boolean) as PluginOption[],

    // --------------------------------------------------------
    // RESOLUÇÃO DE PATHS
    // --------------------------------------------------------
    resolve: {
      alias: {
        "@": path.resolve(__dirname, "./src"),
      },
    },

    // --------------------------------------------------------
    // DEFINIÇÕES GLOBAIS
    // --------------------------------------------------------
    define: {
      // Remove checagens de dev do React em produção
      ...(isProd && {
        "process.env.NODE_ENV": JSON.stringify("production"),
      }),
    },

    // --------------------------------------------------------
    // SERVIDOR DE DESENVOLVIMENTO
    // --------------------------------------------------------
    server: {
      port: 5173,
      strictPort: false,
      open: false,
      cors: true,
      // Proxy para API (ajuste conforme seu backend)
      // proxy: {
      //   '/api': {
      //     target: 'http://localhost:3000',
      //     changeOrigin: true,
      //   },
      // },
    },

    // --------------------------------------------------------
    // SERVIDOR DE PREVIEW (pós-build)
    // --------------------------------------------------------
    preview: {
      port: 4173,
      strictPort: false,
    },

    // --------------------------------------------------------
    // BUILD DE PRODUÇÃO
    // --------------------------------------------------------
    build: {
      // esbuild é 10-100x mais rápido que Terser
      minify: "esbuild",
      
      // Target moderno mas com suporte razoável
      target: ["es2020", "edge88", "firefox78", "chrome87", "safari14"],

      // Sourcemaps apenas em análise (não expõe código em prod)
      sourcemap: isAnalyze,

      // CSS em arquivos separados para melhor cache
      cssCodeSplit: true,

      // Assets < 4kb viram base64 inline
      assetsInlineLimit: 4096,

      // Alerta se chunk > 500kb (padrão saudável)
      chunkSizeWarningLimit: 500,

      // Mostra tamanho gzip no build
      reportCompressedSize: true,

      // Configuração do Rollup
      rollupOptions: {
        output: {
          // Nomes com hash para cache busting
          chunkFileNames: isProd 
            ? "assets/js/[name]-[hash].js" 
            : "assets/js/[name].js",
          entryFileNames: isProd 
            ? "assets/js/[name]-[hash].js" 
            : "assets/js/[name].js",
          assetFileNames: isProd
            ? "assets/[ext]/[name]-[hash].[ext]"
            : "assets/[ext]/[name].[ext]",

          // Separação inteligente de chunks
          manualChunks: createManualChunks(),
        },
      },
    },

    // --------------------------------------------------------
    // OTIMIZAÇÃO DE DEPENDÊNCIAS
    // --------------------------------------------------------
    optimizeDeps: {
      include: [
        "react",
        "react-dom",
        "react-router-dom",
        // Adicione libs pesadas que usa frequentemente
      ],
      exclude: [
        // Libs que não devem ser pre-bundled
      ],
    },

    // --------------------------------------------------------
    // CONFIGURAÇÃO DE CSS
    // --------------------------------------------------------
    css: {
      devSourcemap: isDev,
      modules: {
        localsConvention: "camelCase",
      },
    },
  };
});

// ============================================================
// ESTRATÉGIA DE CHUNKS
// ============================================================
function createManualChunks() {
  // Mapa de dependências -> nome do chunk
  const vendorChunks: Record<string, string[]> = {
    // Core React (sempre junto para evitar circular deps)
    "vendor-react": [
      "react",
      "react-dom",
      "react-router-dom",
      "scheduler",
    ],

    // UI Components (Radix, etc)
    "vendor-ui": [
      "@radix-ui",
      "class-variance-authority",
      "clsx",
      "tailwind-merge",
    ],

    // Ícones (geralmente grande)
    "vendor-icons": [
      "lucide-react",
    ],

    // Animações
    "vendor-motion": [
      "framer-motion",
    ],

    // Data fetching
    "vendor-query": [
      "@tanstack/react-query",
      "axios",
    ],

    // Formulários
    "vendor-forms": [
      "react-hook-form",
      "@hookform/resolvers",
      "zod",
    ],

    // Utilitários
    "vendor-utils": [
      "date-fns",
      "lodash",
      "clsx",
    ],
  };

  return (id: string) => {
    if (!id.includes("node_modules")) return;

    // Procura match nas dependências mapeadas
    for (const [chunkName, deps] of Object.entries(vendorChunks)) {
      if (deps.some((dep) => id.includes(`node_modules/${dep}`) || id.includes(`node_modules/@${dep}`))) {
        return chunkName;
      }
    }

    // Fallback: outras dependências
    return "vendor-misc";
  };
}

// ============================================================
// LOADER CONDICIONAL DO VISUALIZER
// ============================================================
async function loadVisualizer(): Promise<PluginOption | null> {
  try {
    const { visualizer } = await import("rollup-plugin-visualizer");
    return visualizer({
      filename: "./dist/bundle-stats.html",
      open: true,
      gzipSize: true,
      brotliSize: true,
      template: "treemap", // ou "sunburst", "network"
    }) as PluginOption;
  } catch {
    console.warn("⚠️  rollup-plugin-visualizer não instalado. Pulando análise.");
    return null;
  }
}