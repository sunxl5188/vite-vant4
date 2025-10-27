import FieldPicker from './index.vue'
;(FieldPicker as any).install = (Vue: any) => {
  Vue.component((FieldPicker as any).extendOptions.name, FieldPicker)
}
export default FieldPicker
