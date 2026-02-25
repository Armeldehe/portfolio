import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    chunkSizeWarningLimit: 3000,
    rollupOptions: {
      output: {
        manualChunks: {
          three:  ["three"],
          r3f:    ["@react-three/fiber", "@react-three/drei"],
          vendor: ["react", "react-dom", "framer-motion", "react-router-dom"],
        },
      },
    },
  },
})

