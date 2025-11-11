import PullRefresh from './index.vue'
;(PullRefresh as any).install = (Vue: any) => {
  Vue.component((PullRefresh as any).extendOptions.name, PullRefresh)
}
export default PullRefresh
