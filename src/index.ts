import XlDatePicker from '../packages/date-picker'
import XlPopup from '../packages/popup'
import XlCascaDer from '../packages/cascader'
import XlPicker from '../packages/picker'
import XlPullRefresh from '../packages/pull-refresh'
import XlPickerGroup from '../packages/picker-group'
import XlPickerDateGroup from '../packages/picker-date-group'

// 存储组件列表
const components = [
  XlDatePicker,
  XlPopup,
  XlCascaDer,
  XlPicker,
  XlPullRefresh,
  XlPickerGroup,
  XlPickerDateGroup
]

// 定义 install 方法，接收 Vue 作为参数。如果使用 use 注册插件，则所有的组件都将被注册
const install: any = function (Vue: any, opts: any = {}): void {
  console.log(opts)

  // 判断是否安装
  if (install.installed) return
  // 遍历注册全局组件
  components.forEach((component: any) => {
    console.log(component.name)
    Vue.component(component.name, component)
  })
}
// 判断是否是直接引入文件
if (typeof window !== 'undefined' && window.Vue) {
  install(window.Vue)
}

export default {
  version: '0.1.0',
  install,
  // 以下是单个导出的组件
  XlDatePicker,
  XlPopup,
  XlCascaDer,
  XlPicker,
  XlPullRefresh,
  XlPickerGroup,
  XlPickerDateGroup
}
