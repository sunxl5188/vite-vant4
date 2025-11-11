import { defineConfig, loadEnv } from 'vite'
import vue from '@vitejs/plugin-vue'
import eslintPlugin from 'vite-plugin-eslint'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { VantResolver } from '@vant/auto-import-resolver'
import VueSetupExtend from 'vite-plugin-vue-setup-extend'
import tsconfigPaths from 'vite-tsconfig-paths'
import { viteVConsole } from 'vite-plugin-vconsole'
import tailwindcss from '@tailwindcss/vite'
import { fileURLToPath, URL } from 'node:url'
import vitePluginStyleToVw from 'vite-plugin-style-to-vw'

// https://vite.dev/config/
export default ({ mode }: { mode: any }) => {
  const env = loadEnv(mode, process.cwd(), '')
  console.log('🚀 ~ env:', env)

  return defineConfig({
    resolve: {
      alias: {
        // '@': resolve(__dirname, 'src')
        '@': fileURLToPath(new URL('./src', import.meta.url))
      }
    },
    css: {
      preprocessorOptions: {
        scss: {
          // 两种方式都可以
          //additionalData: '@import "@/assets/scss/global.scss";'
          // additionalData: '@use "@/assets/scss/global.scss" as *;'
        },
        less: {}
      }
    },
    plugins: [
      vitePluginStyleToVw({
        allReplace: false,
        unitToConvert: 'px',
        viewportWidth: 16 * 100,
        unitPrecision: 5,
        viewportUnit: 'rem',
        fontViewportUnit: 'rem',
        minPixelValue: 1,
        attributeList: []
      }),
      vue(),
      tsconfigPaths({ loose: true }),
      //todo-xl vconsole只在开发环境使用
      viteVConsole({
        entry: fileURLToPath(new URL('./src/main.ts', import.meta.url)),
        enabled: env.NODE_ENV === 'development', // 可自行结合 mode 和 command 进行判断
        config: {
          maxLogNumber: 1000,
          theme: 'dark'
        }
      }),
      tailwindcss(),
      Components({
        resolvers: [VantResolver()]
      }),
      AutoImport({
        // 自动导入 Vue 相关函数，如：ref, reactive, toRef 等
        imports: ['vue', 'vue-router', 'pinia', 'vue-i18n'],
        // eslint 报错解决：'ref' is not defined
        eslintrc: {
          // 默认 false, true 启用生成。生成一次就可以，避免每次工程启动都生成，一旦生成配置文件之后，最好把 enable 关掉，即改成 false。
          // 否则这个文件每次会在重新加载的时候重新生成，这会导致 eslint 有时会找不到这个文件。当需要更新配置文件的时候，再重新打开
          enabled: true
          // filepath: './.eslintrc-auto-import.json', // 默认就是 ./.eslintrc-auto-import.json
          // globalsPropValue: true, // 默认 true
        }
      }),
      VueSetupExtend(),
      eslintPlugin({
        // 这里配置项的含义和 .eslintrc 中的配置项是一样的
        failOnWarning: true,
        include: [
          'src/**/*.ts',
          'src/**/*.tsx',
          'src/**/*.vue',
          'src/*.ts',
          'src/*.tsx',
          'src/*.vue'
        ],
        exclude: ['node_modules', 'dist']
      })
    ],
    server: {
      host: '0.0.0.0',
      port: 8080,
      strictPort: false,
      hmr: { overlay: false },
      proxy: {
        [`^${env.VITE_API}`]: {
          target: env.VITE_TARGET,
          changeOrigin: true,
          // 带选项写法：http://localhost:5173/api/bar -> http://jsonplaceholder.typicode.com/bar
          rewrite: (path: any) => path.replace(RegExp(`^${env.VITE_API}`), '')
        }
      }
    }
  })
}
