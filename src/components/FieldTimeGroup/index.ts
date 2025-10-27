import FieldTimeGroup from './index.vue'
;(FieldTimeGroup as any).install = (Vue: any) => {
  Vue.component((FieldTimeGroup as any).extendOptions.name, FieldTimeGroup)
}
export default FieldTimeGroup
