import FieldCode from './index.vue'
;(FieldCode as any).install = (Vue: any) => {
  Vue.component((FieldCode as any).extendOptions.name, FieldCode)
}
export default FieldCode
