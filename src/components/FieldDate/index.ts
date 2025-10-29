import FieldDate from './index.vue'
;(FieldDate as any).install = (Vue: any) => {
  Vue.component((FieldDate as any).extendOptions.name, FieldDate)
}
export default FieldDate
