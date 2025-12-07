import VirtualList from './index.vue'
;(VirtualList as any).install = (Vue: any) => {
  Vue.component((VirtualList as any).extendOptions.name, VirtualList)
}
export default VirtualList
