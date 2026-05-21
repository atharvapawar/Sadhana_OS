import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import path from "path";

const serverPort = Number(process.env.PORT || 5173);
const previewPort = Number(process.env.PREVIEW_PORT || 4173);

export default defineConfig({
  base: "/",
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      "@": path.resolve(import.meta.dirname, "src"),
      "@assets": path.resolve(import.meta.dirname, "public"),
    },
    dedupe: ["react", "react-dom"],
  },
  build: {
    outDir: "dist",
    emptyOutDir: true,
  },
  server: {
    port: serverPort,
    host: "0.0.0.0",
    strictPort: false,
    allowedHosts: true,
  },
  preview: {
    port: previewPort,
    host: "0.0.0.0",
    allowedHosts: true,
  },
});
