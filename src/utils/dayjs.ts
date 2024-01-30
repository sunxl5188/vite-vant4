import { AppContext } from 'vue'
import dayjs from 'dayjs'
import 'dayjs/locale/zh-cn' //加载中文语言包
import relativeTime from 'dayjs/plugin/relativeTime'
import arraySupport from 'dayjs/plugin/arraySupport'
import toArray from 'dayjs/plugin/toArray'

dayjs.locale('zh-cn') //全局使用
// 配置相对时间插件
dayjs.extend(relativeTime)
dayjs.extend(arraySupport)
dayjs.extend(toArray)

export default {
  install(app: AppContext['app']) {
    app.config.globalProperties.$dayjs = dayjs
  }
}
