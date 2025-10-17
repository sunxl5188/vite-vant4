import XlVirtuallyList from './XlVirtuallyList.vue'
;(XlVirtuallyList as any).install = (Vue: any) => {
  Vue.component((XlVirtuallyList as any).extendOptions.name, XlVirtuallyList)
}
export default XlVirtuallyList
