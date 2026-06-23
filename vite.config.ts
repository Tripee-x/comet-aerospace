import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// Frontend-only build. Heavy 3D libs are split into their own chunk so the
// initial document paints fast and the WebGL bundle streams in behind it.
export default defineConfig({
  plugins: [react()],
  build: {
    target: "es2020",
    chunkSizeWarningLimit: 1600,
    rollupOptions: {
      output: {
        manualChunks: {
          three: ["three"],
          r3f: ["@react-three/fiber", "@react-three/drei", "@react-three/postprocessing"],
          motion: ["gsap", "lenis"],
        },
      },
    },
  },
});
