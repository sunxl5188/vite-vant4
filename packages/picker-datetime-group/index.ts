import XlPickerDateTimeGroup from './XlPickerDateTimeGroup.vue'
;(XlPickerDateTimeGroup as any).install = (Vue: any) => {
  Vue.component(
    (XlPickerDateTimeGroup as any).extendOptions.name,
    XlPickerDateTimeGroup
  )
}
export default XlPickerDateTimeGroup
