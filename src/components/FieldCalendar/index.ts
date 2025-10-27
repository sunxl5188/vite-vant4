import FieldCalendar from './index.vue'
;(FieldCalendar as any).install = (Vue: any) => {
  Vue.component((FieldCalendar as any).extendOptions.name, FieldCalendar)
}
export default FieldCalendar
