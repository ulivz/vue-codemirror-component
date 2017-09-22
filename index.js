/*!
 * V-Codemirror v1.0.0
 * (c) 2016-2017 ulivz <Luke Chen>
 * Released under the MIT License.
 */
import VCodemirror from './src/V-Codemirror.vue'

function install(Vue) {
	Vue.component(VCodemirror.name, VCodemirror)
}

export {install as default, VCodemirror}
