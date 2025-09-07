import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  base: "/",
  plugins: [
    react(),
  ],
  resolve: {
    alias: [
      { find: '@', replacement: '/src' },
    ],
  },
  server: {
    host: true,
    allowedHosts: true
  }
})
