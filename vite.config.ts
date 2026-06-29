import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// Frontend-only build. The hero is a canvas frame-scrub (no WebGL libs);
// gsap + lenis are split into their own chunk.
export default defineConfig({
  plugins: [react()],
  build: {
    target: "es2020",
    chunkSizeWarningLimit: 1600,
    rollupOptions: {
      output: {
        manualChunks: {
          motion: ["gsap", "lenis"],
        },
      },
    },
  },
});
