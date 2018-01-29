import createComponent from './V-Codemirror.js'
import themes from './config/theme'
import { normalizeModeName } from './util'
import { modeInfo } from 'codemirror'

function install(Vue, options = {}) {
  const VueCodemirrorComponent = createComponent(options)
  Vue.component(VueCodemirrorComponent.name, VueCodemirrorComponent)
}

export {
  install as default,
  modeInfo as modes, // All available modes
  themes, // All available themes
  createComponent,
  normalizeModeName,
}
