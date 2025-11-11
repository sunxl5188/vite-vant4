import FieldSwitch from './index.vue'
;(FieldSwitch as any).install = (Vue: any) => {
  Vue.component((FieldSwitch as any).extendOptions.name, FieldSwitch)
}
export default FieldSwitch
