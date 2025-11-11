import FieldPickerTag from './index.vue'
;(FieldPickerTag as any).install = (Vue: any) => {
  Vue.component((FieldPickerTag as any).extendOptions.name, FieldPickerTag)
}
export default FieldPickerTag
