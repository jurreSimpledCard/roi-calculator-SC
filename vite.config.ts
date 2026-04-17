import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    // Output directory for static build
    outDir: 'dist',
    // Generate sourcemaps for debugging
    sourcemap: false,
    // Minify for production
    minify: 'esbuild',
  },
  // Base path for GitHub Pages
  base: '/roi-calculator-SC/',
})
