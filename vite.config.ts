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
import postcssPxToViewport from 'postcss-px-to-viewport-8-plugin'

// https://vite.dev/config/
export default ({ mode }: { mode: any }) => {
  const env = loadEnv(mode, process.cwd(), '')
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
      },
      postcss: {
        plugins: [
          postcssPxToViewport({
            viewportWidth: 16 * 100, // 设计稿的视口宽度
            unitPrecision: 5, // 单位转换后保留的精度
            propList: ['*'], // 能转化为vw的属性列表
            viewportUnit: 'rem', // 希望使用的视口单位
            fontViewportUnit: 'rem', // 字体使用的视口单位
            selectorBlackList: [], // 需要忽略的CSS选择器，不会转为视口单位，使用原有的px等单位。
            minPixelValue: 1, // 设置最小的转换数值，如果为1的话，只有大于1的值会被转换
            mediaQuery: true, // 媒体查询里的单位是否需要转换单位
            replace: true, //  是否直接更换属性值，而不添加备用属性
            include: undefined, // 如果设置了include，那将只有匹配到的文件才会被转换
            landscape: false, // 是否添加根据 landscapeWidth 生成的媒体查询条件 @media (orientation: landscape)
            landscapeUnit: 'rem', // 横屏时使用的单位
            landscapeWidth: 568, // 横屏时使用的视口宽度
            unitToConvert: 'px', // 要转化的单位
            exclude: /node_modules/ // 忽略某些文件夹下的文件或特定文件，例如 'node_modules' 下的文件
          })
        ]
      }
    },
    plugins: [
      vue(),
      tsconfigPaths({ loose: true }),
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
