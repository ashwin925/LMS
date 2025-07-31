import { defineConfig } from 'vite'
import tailwindcss from '@tailwindcss/postcss'

export default defineConfig({
  plugins: [],
  css: {
    postcss: {
      plugins: [tailwindcss()]
    }
  }
})