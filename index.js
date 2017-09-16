/*!
 * V-Codemirror v1.0.0
 * (c) 2016-2017 ulivz
 * Released under the MIT License.
 */
import VCodemirror from './src/V-Codemirror.vue'

if (typeof window !== 'undefined' && window.Vue) {
  window.Vue.component(VCodemirror.name, VCodemirror)
}

export default VCodemirror