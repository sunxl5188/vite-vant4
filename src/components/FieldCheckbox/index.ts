import FieldCheckbox from './index.vue'
;(FieldCheckbox as any).install = (Vue: any) => {
  Vue.component((FieldCheckbox as any).extendOptions.name, FieldCheckbox)
}
export default FieldCheckbox
