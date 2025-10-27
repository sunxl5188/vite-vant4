import FieldDateTimeGroup from './index.vue'
;(FieldDateTimeGroup as any).install = (Vue: any) => {
  Vue.component(
    (FieldDateTimeGroup as any).extendOptions.name,
    FieldDateTimeGroup
  )
}
export default FieldDateTimeGroup
