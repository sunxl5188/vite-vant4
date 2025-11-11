import radio from './index.vue'
;(radio as any).install = (Vue: any) => {
  Vue.component((radio as any).extendOptions.name, radio)
}
export default radio
