/**
 * find mode for CodeMirror
 *
 * @param mode
 * @returns {*}
 */
export function findMode(CodeMirror, mode) {
  // mode string config
  if (typeof mode == 'string') {
    var lang = CodeMirror.findModeByMIME(mode)
    console.log(lang)
    mode = !lang ? lang : lang.mode
    console.log(mode)

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
  console.log(mode)
  return mode
}

/**
 * transform array-like to array
 *
 * @param arrayLike
 * @return {*}
 */

export function toArray(arrayLike) {
  return [].slice.call(arrayLike)
}
