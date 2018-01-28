import CodeMirror from 'codemirror'

const {
  findModeByName,
  findModeByMIME,
  findModeByExtension,
  findModeByFileName
} = CodeMirror

export function normalizeModeName(mode) {
  let modeOb
  // mode string config
  if (typeof mode == 'string') {
    modeOb = findModeByName(mode)
      || findModeByMIME(mode)
      || findModeByExtension(mode)
      || findModeByFileName(mode)

  } else if (typeof mode == 'object') {
    if (mode.name) {
      modeOb = findModeByName(mode.name)

    } else if (mode.ext) {
      modeOb = findModeByExtension(mode.ext)

    } else if (mode.mime) {
      modeOb = findModeByMIME(mode.mime)

    } else if (mode.filename) {
      modeOb = findModeByFileName(mode.filename)
    }
  }
  return modeOb && modeOb.mode
}
