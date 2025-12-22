import ThemeIcon from './ThemeIcon.vue'
import LocalIcon from './LocalIcon.vue'

const install = (Vue: any) => {
  Vue.component((ThemeIcon as any).extendOptions.name, ThemeIcon)
  Vue.component((LocalIcon as any).extendOptions.name, LocalIcon)
}
export { ThemeIcon, LocalIcon, install }
export default { install }
