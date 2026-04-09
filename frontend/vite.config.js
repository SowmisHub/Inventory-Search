import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/search': 'http://localhost:5000',
      '/inventory': 'http://localhost:5000',
      '/supplier': 'http://localhost:5000',
      '/suppliers': 'http://localhost:5000'
    }
  }
})