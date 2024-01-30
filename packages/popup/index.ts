import popup from './popUp.vue'
;(popup as any).install = (Vue: any) => {
  Vue.component((popup as any).extendOptions.name, popup)
}
export default popup
