import { fileURLToPath, URL } from 'node:url'
import './src/assets/banner.png'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import viteSharp from 'vite-plugin-sharp'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue(), vueJsx(), viteSharp()],
  build: {
    rolloupOptions: {
      external: ['/src/assets/banner.png']
    }
  },
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  }
})
