import FieldDateRangeGroup from './index.vue'
;(FieldDateRangeGroup as any).install = (Vue: any) => {
  Vue.component(
    (FieldDateRangeGroup as any).extendOptions.name,
    FieldDateRangeGroup
  )
}
export default FieldDateRangeGroup
