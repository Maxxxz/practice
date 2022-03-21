import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig({
  build: {
    rollupOptions: {
      input: {
        default: './index.html',
        ssr: './ssr.html'
      }
    }
  },
  plugins: [vue()]
})
