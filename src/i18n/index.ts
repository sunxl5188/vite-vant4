import { createI18n } from 'vue-i18n'
import zhCn from './locale/zh-cn.json'
import enUs from './locale/en-us.json'

type MessageSchema = typeof zhCn
const appStore = localStorage.getItem(`appStore${__APP_VERSION__}`) || '{}'
const { language } = JSON.parse(appStore)
const i18n = createI18n<[MessageSchema], 'en-US' | 'zh-CN'>({
  locale: language || 'zh-CN', // 设置默认语言
  globalInjection: true, // 如果设置true, $t() 函数将注册到全局，实际测试不加好像也能直接使用$t获取到值
  legacy: false,
  messages: {
    'zh-CN': { ...zhCn },
    'en-US': { ...enUs }
  },
  /**
   * @日期格式化
   * weekday	"narrow", "short", "long"
   * era	"narrow", "short", "long"
   * year	"2-digit", "numeric"
   * month	"2-digit", "numeric", "narrow", "short", "long"
   * day	"2-digit", "numeric"
   * hour	"2-digit", "numeric"
   * minute	"2-digit", "numeric"
   * second	"2-digit", "numeric"
   * timeZoneName	"short", "long"
   */
  datetimeFormats: {
    'zh-CN': {
      default: {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit'
      },
      //短日期格式 YYYY年M月D日
      short: {
        year: 'numeric',
        month: 'short',
        day: 'numeric'
      },
      //长日期格式 YYYY年M月D日 星期X HH:mm
      long: {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        weekday: 'long',
        hour: 'numeric',
        minute: 'numeric'
      }
    },
    'en-US': {
      default: {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit'
      },
      short: {
        year: 'numeric',
        month: 'short',
        day: 'numeric'
      },
      long: {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        weekday: 'long',
        hour: 'numeric',
        minute: 'numeric'
      }
    }
  },
  numberFormats: {
    'zh-CN': {
      currency: {
        style: 'currency',
        currency: 'CNY',
        currencyDisplay: 'symbol',
        localeMatcher: 'best fit',
        formatMatcher: 'basic',
        minimumIntegerDigits: 1,
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
      }
    },
    'en-US': {
      currency: {
        style: 'currency',
        currency: 'USD',
        currencyDisplay: 'symbol',
        minimumIntegerDigits: 1,
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
      }
    }
  }
})

export default i18n
