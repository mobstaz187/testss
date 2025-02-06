import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  base: '/testss/',
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
    rollupOptions: {
      input: {
        main: path.resolve(__dirname, 'index.html'),
      },
      output: {
        assetFileNames: (assetInfo) => {
          const info = assetInfo.name.split('.')
          const ext = info[info.length - 1]
          if (/png|jpe?g|svg|gif|tiff|bmp|ico|mp4/i.test(ext)) {
            return `assets/${assetInfo.name}`
          }
          return `assets/[name]-[hash][extname]`
        },
        chunkFileNames: 'assets/[name]-[hash].js',
        entryFileNames: 'assets/[name]-[hash].js',
      },
    },
  },
  publicDir: 'public',
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  envPrefix: 'VITE_',
  server: {
    headers: {
      'Content-Security-Policy': [
        "default-src 'self'",
        "style-src 'self' 'unsafe-inline' https://db.onlinewebfonts.com",
        "font-src 'self' https://db.onlinewebfonts.com",
        "img-src 'self' data: https: http:",
        "media-src 'self' https: http:",
        "connect-src 'self' https://tbkutkyeiweflkzwwrap.supabase.co https://discord.com",
        "frame-src 'self' https://discord.com",
        "script-src 'self' 'unsafe-inline' 'unsafe-eval'",
      ].join('; ')
    }
  }
})