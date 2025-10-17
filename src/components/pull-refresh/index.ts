import XlPullRefsh from './XlPullRefresh.vue'
;(XlPullRefsh as any).install = (Vue: any) => {
  Vue.component((XlPullRefsh as any).extendOptions.name, XlPullRefsh)
}
export default XlPullRefsh
