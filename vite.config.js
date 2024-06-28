import { fileURLToPath, URL } from 'node:url'
import './src/assets/banner.png' // Import the image for Vite to recognize it

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import vsharp from 'vite-plugin-sharp'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    vueJsx(),
    vsharp({
      webp: {
        quality: 80,
        size: 1024
      }
    })
  ],
  build: {
    rollupOptions: {
      external: ['/src/assets/banner.png'] // Remove this line if you want vsharp to process the image
    }
  },
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  },
  // Add this section to configure file-loader
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: `@import "@/styles/variables.scss";`
      }
    }
  }
})
