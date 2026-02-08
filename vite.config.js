import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

/** SPA fallback: serve index.html for client routes (fixes 404 on refresh) */
function spaFallback() {
  return {
    name: 'spa-fallback',
    configureServer(server) {
      server.middlewares.stack.unshift({
        route: '',
        handle: (req, res, next) => {
          const url = req.url?.split('?')[0] ?? ''
          const isAsset = url.includes('.') || url.startsWith('/@') || url.startsWith('/node_modules')
          if (url !== '/' && url !== '' && !isAsset) {
            req.url = '/'
          }
          next()
        }
      })
    }
  }
}

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss(), spaFallback()],
  build: {
    // Optimize bundle size
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['react', 'react-dom']
        }
      }
    },
    // Enable minification
    minify: 'esbuild',
    // Optimize chunk size
    chunkSizeWarningLimit: 1000
  },
  // Enable gzip compression
  server: {
    compress: true
  }
})
