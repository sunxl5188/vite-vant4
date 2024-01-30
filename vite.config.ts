import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import eslintPlugin from 'vite-plugin-eslint'
import Components from 'unplugin-vue-components/vite'
import { VantResolver } from '@vant/auto-import-resolver'
import VueSetupExtend from 'vite-plugin-vue-setup-extend'
import { resolve } from 'path'

// https://vitejs.dev/config/
export default defineConfig({
  resolve: {
    alias: {
      '@': resolve(__dirname, './src'),
      'vue-i18n': 'vue-i18n/dist/vue-i18n.cjs.js'
    }
  },
  css: {
    preprocessorOptions: {
      scss: {
        // 两种方式都可以
        //additionalData: '@import "@/assets/scss/global.scss";'
        // additionalData: '@use "@/assets/scss/global.scss" as *;'
      }
    }
  },
  plugins: [
    vue(),
    VueSetupExtend(),
    eslintPlugin({
      include: ['src/**/*.js', 'src/**/*.vue', 'src/*.js', 'src/*.vue']
    }),
    Components({
      resolvers: [VantResolver()]
    })
  ],
  server: {
    host: 'localhost', //0.0.0.0
    port: 8080,
    strictPort: false,
    proxy: {
      '/api': {
        target: 'http://localhost:81/',
        changeOrigin: true,
        // 带选项写法：http://localhost:5173/api/bar -> http://jsonplaceholder.typicode.com/bar
        rewrite: path => path.replace(/^\/api/, '')
      }
    }
  }
})
