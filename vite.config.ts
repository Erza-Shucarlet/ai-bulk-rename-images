import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { version } from './package.json'
import { resolve } from 'path'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  define: {
    __APP_VERSION__: JSON.stringify(version),
  },
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
        privacy: resolve(__dirname, 'privacy.html'),
      },
    },
  },
})
