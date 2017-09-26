/**
 * find mode for CodeMirror
 *
 * @param mode
 * @returns {*}
 */
export function findMode(CodeMirror, mode) {
  let lang
  // mode string config
  if (typeof mode == 'string') {
    lang = CodeMirror.findModeByMIME(mode)
    mode = !lang ? lang : lang.mode

    // mode object config
  } else if (typeof mode == 'object') {
    if (mode.name) {
      lang = CodeMirror.findModeByName(mode.name)
      if (lang) {
        mode = lang.mode
      } else {
        mode = null
      }
    } else if (mode.ext) {
      lang = CodeMirror.findModeByExtension(mode.ext)
      if (lang) {
        mode = lang.mode
      } else {
        mode = null
      }
    } else if (mode.mime) {
      lang = CodeMirror.findModeByMIME(mode.mime)
      if (lang) {
        mode = lang.mode
      } else {
        mode = null
      }
    } else if (mode.filename) {
      lang = CodeMirror.findModeByFileName(mode.filename)
      if (lang) {
        mode = lang.mode
      } else {
        mode = null
      }
    }
  }
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
