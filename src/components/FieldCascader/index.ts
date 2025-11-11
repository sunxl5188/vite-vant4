import FieldCascader from './index.vue'
;(FieldCascader as any).install = (Vue: any) => {
  Vue.component((FieldCascader as any).extendOptions.name, FieldCascader)
}
export default FieldCascader
