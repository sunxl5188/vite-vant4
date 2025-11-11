import XlUploader from './XlUploader.vue'
;(XlUploader as any).install = (Vue: any) => {
  Vue.component((XlUploader as any).extendOptions.name, XlUploader)
}
export default XlUploader
