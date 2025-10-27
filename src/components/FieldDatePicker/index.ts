import FieldDatePicker from './index.vue'
;(FieldDatePicker as any).install = (Vue: any) => {
  Vue.component((FieldDatePicker as any).extendOptions.name, FieldDatePicker)
}
export default FieldDatePicker
