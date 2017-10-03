import CodeMirror from 'codemirror'
import 'codemirror/lib/codemirror.css'
import 'codemirror/mode/meta'
import {findMode} from './util'
import DEFAULT_CONFIG from './config/default.json'
import THEME_CONFIG from '../src/config/theme.json'

export default {

  template: `<div class="V-Codemirror" style="height: 100%; width: 100%">
                <textarea ref="editor"></textarea>
            </div>`,

  name: 'V-Codemirror',

  props: {
    value: String,
    marker: Function,
    unseenLines: Array,
    options: Object
  },

  data() {
    return {
      opts: {
        showToolkit: true,
        theme: DEFAULT_CONFIG.theme,
        mode: DEFAULT_CONFIG.mode,
        tabSize: 2
      },
      themeList: THEME_CONFIG
    }
  },

  created() {
    this.setOption(this.options)
    this.loadDependencies(this.opts)
  },

  mounted () {
    this.initialize(this.opts)
  },

  beforeDestroy () {
    this.recycleEditor()
  },

  watch: {
    value (newVal) {
      if (newVal !== this.editor.getValue()) {
        var scrollInfo = this.editor.getScrollInfo()
        this.editor.setValue(newVal)
        this.value = newVal
        this.editor.scrollTo(scrollInfo.left, scrollInfo.top)
      }
      this.unseenLineMarkers()
    }
  },

  methods: {

    refresh() {
      this.editor.refresh()
    },

    undo() {
      this.editor.undo()
    },

    redo() {
      this.editor.redo()
    },

    setOption(opts) {
      if (typeof opts === 'object') {
        this.opts = Object.assign({}, this.opts, opts)
      } else if (arguments.length >= 2) {
        this.opts[arguments[0]] = arguments[1]
      } else {
        console.warn(`Invalid editor option: ${opts}`)
      }
    },

    updateEditor() {
      this.recycleEditor()
      this.loadDependencies(this.opts)
      this.initialize(this.opts)
    },

    recycleEditor() {
      const element = this.editor.doc.cm.getWrapperElement()
      if (element && element.remove) {
        element.remove()
      }
    },

    unseenLineMarkers () {
      if (this.unseenLines !== undefined && this.marker !== undefined) {
        this.unseenLines.forEach(line => {
          var info = this.editor.lineInfo(line)
          this.editor.setGutterMarker(line, 'breakpoints', info.gutterMarkers ? null : this.marker())
        })
      }
    },

    loadDependencies(opts) {
      const options = opts
      const isCustomMode = !!CodeMirror.modes[mode]
      let theme = options.theme
      let mode = options.mode

      // theme config
      if (theme && theme == 'solarized light') {
        theme = 'solarized'
      }

      mode = findMode(CodeMirror, mode)

      if ((!mode || mode == 'null') && !isCustomMode) {
        console.warn('CodeMirror language mode: ' + mode + ' configuration error (CodeMirror language mode configuration error，or unsupported language) refer to http://codemirror.net/mode/ for more details.')
      }

      // require language
      if (mode && mode !== 'null') {
        require('codemirror/mode/' + mode + '/' + mode + '.js')
      }

      // require theme
      if (theme) {
        require('codemirror/theme/' + theme + '.css')
      }
    },

    initialize(editorOpts) {
      this.editor = CodeMirror.fromTextArea(this.$refs.editor, editorOpts)
      this.editor.setValue(this.code || this.value)
      this.editor.on('change', (cm) => {
        //                    this.value = cm.getValue()
        let val = cm.getValue()
        if (this.$emit) {
          this.$emit('input', val)
          this.$emit('change', val)
        }
      })
      var events = [
        'changes',
        'beforeChange',
        'cursorActivity',
        'keyHandled',
        'inputRead',
        'electricInput',
        'beforeSelectionChange',
        'viewportChange',
        'swapDoc',
        'gutterClick',
        'gutterContextMenu',
        'focus',
        'blur',
        'refresh',
        'optionChange',
        'scrollCursorIntoView',
        'update'
      ]
      events.forEach(event => {
        this.editor.on(event, (a, b, c) => {
          this.$emit(event, a, b, c)
        })
      })
      this.$emit('ready', this.editor)
      this.unseenLineMarkers()

      // prevents funky dynamic rendering
      window.setTimeout(() => {
        this.editor.refresh()
      }, 0)
    }
  }
}