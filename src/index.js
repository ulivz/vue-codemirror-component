import createComponent from './vue-codemirror.js'
import themes from './config/theme'
import { normalizeModeName } from './util'
import codemirror from 'codemirror'

function install(Vue, options = {}) {
  const VueCodemirrorComponent = createComponent(options)
  Vue.component(VueCodemirrorComponent.name, VueCodemirrorComponent)
}

const modeInfo = codemirror.modeInfo

export {
  install as default,
  modeInfo as modes, // All available modes
  themes, // All available themes
  createComponent,
  normalizeModeName,
}
