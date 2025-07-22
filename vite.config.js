import { fileURLToPath, URL } from 'node:url'
import { resolve } from 'path'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueDevTools from 'vite-plugin-vue-devtools'

// https://vite.dev/config/
export default defineConfig({
  plugins: [vue(), vueDevTools()],
  resolve: {
    alias: {
      '@': resolve('src'),
      '@assets': resolve('src', 'assets'),
      '@stores': resolve('src', 'stores'),
      '@views': resolve('src', 'views'),
      '@router': resolve('src', 'router'),
      // '@': fileURLToPath(new URL('./src', import.meta.url)),
      // '@assets': fileURLToPath(new URL('./src/assets', import.meta.url)),
      // '@stores': fileURLToPath(new URL('./src/stores', import.meta.url)),
      // '@views': fileURLToPath(new URL('./src/views', import.meta.url)),
      // '@router': fileURLToPath(new URL('./src/router', import.meta.url))
    },
  },
})
