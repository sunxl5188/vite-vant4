import FieldCheckboxButton from './index.vue'
;(FieldCheckboxButton as any).install = (Vue: any) => {
  Vue.component(
    (FieldCheckboxButton as any).extendOptions.name,
    FieldCheckboxButton
  )
}
export default FieldCheckboxButton
