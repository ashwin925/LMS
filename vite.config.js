import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/postcss'

export default defineConfig({
  plugins: [react()],
  server: {
    port: 5174,  // Explicitly set to 5174
  },build: {
    outDir: 'dist',
    emptyOutDir: true  // Clears old files on build
  },
  css: {
    postcss: {
      plugins: [tailwindcss()]
    }
  }
})