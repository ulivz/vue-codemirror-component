import CodeMirror from 'codemirror'

/**
 * find mode for CodeMirror
 *
 * @param mode
 * @returns {*}
 */
export function findMode(mode) {

  // mode string config
  if (typeof mode == 'string') {
    var lang = CodeMirror.findModeByMIME(mode)
    mode = !lang ? lang : lang.mode

    // mode object config
  } else if (typeof mode == 'object') {

    if (mode.name) {
      var lang = CodeMirror.findModeByName(mode.name)
      if (lang) {
        mode = lang.mode
      } else {
        mode = null
      }
    } else if (mode.ext) {
      var lang = CodeMirror.findModeByExtension(mode.ext)
      if (lang) {
        mode = lang.mode
      } else {
        mode = null
      }
    } else if (mode.mime) {
      var lang = CodeMirror.findModeByMIME(mode.mime)
      if (lang) {
        mode = lang.mode
      } else {
        mode = null
      }
    } else if (mode.filename) {
      var lang = CodeMirror.findModeByFileName(mode.filename)
      if (lang) {
        mode = lang.mode
      } else {
        mode = null
      }
    }
  }
  return mode;
}

/**
 * Shadow extend
 * The {from}'s properties will cover the {to}'s properties
 *
 * @param to
 * @param from
 */
export function extend(to, from) {
  for (let key of Object.keys(from)) {
    to[key] = from[key]
  }
}

export function toArray(arrayLike) {
  return [].slice.call(arrayLike)
}




