import FieldUpload from './index.vue'
;(FieldUpload as any).install = (Vue: any) => {
  Vue.component((FieldUpload as any).extendOptions.name, FieldUpload)
}
export default FieldUpload
