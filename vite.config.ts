import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  base: "/react-playground/",
  build: {
    // Ensure assets are properly handled for GitHub Pages
    assetsDir: "assets",
    rollupOptions: {
      output: {
        // Ensure consistent file naming for GitHub Pages
        entryFileNames: "assets/[name].[hash].js",
        chunkFileNames: "assets/[name].[hash].js",
        assetFileNames: "assets/[name].[hash].[ext]",
      },
    },
  },
  server: {
    port: 3003,
  },
});
