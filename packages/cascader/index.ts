import cascader from './cascaDer.vue'
;(cascader as any).install = (Vue: any) => {
  Vue.component((cascader as any).extendOptions.name, cascader)
}
export default cascader
