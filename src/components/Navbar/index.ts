import Navbar from './index.vue'
;(Navbar as any).install = (Vue: any) => {
  Vue.component((Navbar as any).extendOptions.name, Navbar)
}
export default Navbar
