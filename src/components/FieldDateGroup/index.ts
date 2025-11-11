import FieldDateGroup from './index.vue'
;(FieldDateGroup as any).install = (Vue: any) => {
  Vue.component((FieldDateGroup as any).extendOptions.name, FieldDateGroup)
}
export default FieldDateGroup
