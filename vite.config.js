import { fileURLToPath, URL } from 'node:url'
import { resolve } from 'path'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueDevTools from 'vite-plugin-vue-devtools'
// 自动导入配置
import AutoImport from 'unplugin-auto-import/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    vueDevTools(),
    AutoImport({
      imports: ['vue', 'vue-router', 'pinia'],
      dts: true, // 生成类型声明文件
    }),
  ],
  resolve: {
    alias: {
      '@': resolve('src'),
      '@assets': resolve('src', 'assets'),
      '@stores': resolve('src', 'stores'),
      '@views': resolve('src', 'views'),
      '@router': resolve('src', 'router'),
      '@styles': resolve('src', 'styles'),
      '@components': resolve('src', 'components'),
      // '@': fileURLToPath(new URL('./src', import.meta.url)),
      // '@assets': fileURLToPath(new URL('./src/assets', import.meta.url)),
      // '@stores': fileURLToPath(new URL('./src/stores', import.meta.url)),
      // '@views': fileURLToPath(new URL('./src/views', import.meta.url)),
      // '@router': fileURLToPath(new URL('./src/router', import.meta.url))
    },
  },
  css: {
    devSourcemap: true, // 启用源码映射
    preprocessorOptions: {
      scss: {
        additionalData: '@use "@styles/index.scss" as *;',
      },
    },
  },
})
