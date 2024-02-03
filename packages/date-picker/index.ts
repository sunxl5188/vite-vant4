import DatePicker from './XlDatePicker.vue'
;(DatePicker as any).install = (Vue: any) => {
  Vue.component((DatePicker as any).extendOptions.name, DatePicker)
}
export default DatePicker
