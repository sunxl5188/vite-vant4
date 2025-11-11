import Uploader from './index.vue'
;(Uploader as any).install = (Vue: any) => {
  Vue.component((Uploader as any).extendOptions.name, Uploader)
}
export default Uploader
