// vite.config.ts
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";

export default defineConfig(({ mode }) => {
  const isProd = mode === "production";

  return {
    plugins: [react()],

    resolve: {
      alias: {
        "@": path.resolve(__dirname, "./src"),
      },
    },

    build: {
      minify: "esbuild",
      target: ["es2020", "chrome87", "firefox78", "safari14", "edge88"],
      sourcemap: false,
      chunkSizeWarningLimit: 500,

      rollupOptions: {
        output: {
          // Estratégia SIMPLES e SEGURA
          manualChunks(id) {
            if (!id.includes("node_modules")) return;

            // Apenas separa React (crítico ficar junto)
            if (id.includes("react") || id.includes("scheduler")) {
              return "react";
            }

            // Ícones (geralmente grandes)
            if (id.includes("lucide")) {
              return "icons";
            }

            // Deixa o resto para o Vite otimizar automaticamente
          },
        },
      },
    },
  };
});