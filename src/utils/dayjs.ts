import dayjs from 'dayjs'
import 'dayjs/locale/zh-cn' //加载中文语言包
import relativeTime from 'dayjs/plugin/relativeTime'
dayjs.locale('zh-cn') //全局使用
// 配置相对时间插件
dayjs.extend(relativeTime)

export default {
  install(Vue: any) {
    Vue.config.globalProperties.$dayjs = dayjs
  }
}
