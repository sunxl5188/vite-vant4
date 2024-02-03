import cascader from './XlCascaDer.vue'
;(cascader as any).install = (Vue: any) => {
  Vue.component((cascader as any).extendOptions.name, cascader)
}
export default cascader
