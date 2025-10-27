import BaseForm from './index.vue'
;(BaseForm as any).install = (Vue: any) => {
  Vue.component((BaseForm as any).extendOptions.name, BaseForm)
}
export default BaseForm
