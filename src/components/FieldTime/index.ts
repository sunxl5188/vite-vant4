import FieldTime from './index.vue'
;(FieldTime as any).install = (Vue: any) => {
  Vue.component((FieldTime as any).extendOptions.name, FieldTime)
}
export default FieldTime
