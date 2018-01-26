import VCodemirror from './V-Codemirror.js'
import THEME from './config/theme'
import Codemirror from 'codemirror'
import {findMode} from './util'

function install(Vue) {
  Vue.component(VCodemirror.name, VCodemirror)
}

const findModeByMIME = Codemirror.findModeByMIME
const findModeByExtension = Codemirror.findModeByExtension
const findModeByFileName = Codemirror.findModeByFileName
const findModeByName = Codemirror.findModeByName

export {
  install as default,
  VCodemirror,
  THEME,
  findMode,
  findModeByMIME,
  findModeByExtension,
  findModeByFileName,
  findModeByName
}
