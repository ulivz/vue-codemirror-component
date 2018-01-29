import CodeMirror from 'codemirror'
import 'codemirror/lib/codemirror.css'
import 'codemirror/mode/meta'
import { normalizeModeName } from './util'
import defaultConfig from './config/default'
import themes from './config/theme'
import events from './config/events'

const DEFAULT_OPTIONS = {
  theme: defaultConfig.theme,
  mode: defaultConfig.mode,
  tabSize: 2
}

export default function createComponent({
                                          loadTheme,
                                          loadMode
                                        }) {
  return {
    template: `<div class="vue-codemirror" style="height: 100%; width: 100%">
                <textarea ref="editor"></textarea>
            </div>`,

    name: 'vue-codemirror',

    props: {
      value: String,
      marker: Function,
      theme: String,
      mode: String,
      unseenLines: Array,
      options: Object
    },

    data() {
      return {
        code: this.value,
        themes
      }
    },

    created() {
      this.loadPromises = Promise.all([
        this.loadMode(),
        this.loadTheme()
      ])
    },

    mounted () {
      this.loadPromises.then(() => {
        this.initializeEditor(this.editorOptions)
      })
    },

    beforeDestroy () {
      this.recycleEditor()
    },

    computed: {
      editorOptions() {
        return Object.assign(DEFAULT_OPTIONS, this.options, {
          theme: this.theme || DEFAULT_OPTIONS.theme,
          mode: normalizeModeName(this.mode) || DEFAULT_OPTIONS.mode,
        })
      }
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
      },
      theme(theme) {
        this.editor.setOption('theme', theme)
        this.loadTheme()
          .then(() => this.editor.refresh())
      },
      mode(mode) {
        mode = normalizeModeName(mode)
        this.editor.setOption('mode', mode)
        this.loadMode()
          .then(() => this.editor.refresh())
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

      updateEditor() {
        this.recycleEditor()
        this.initializeEditor()
      },

      recycleEditor() {
        const element = this.editor.getWrapperElement()
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

      loadTheme() {
        let { theme } = this.editorOptions
        // theme config
        if (theme && theme == 'solarized light') {
          theme = 'solarized'
        }
        if (theme) {
          return loadTheme && loadTheme(theme)
        }
      },

      loadMode() {
        let { mode } = this.editorOptions
        const isCustomMode = !!CodeMirror.modes[mode]

        if (!mode && !isCustomMode) {
          console.log(`Unknown mode: '${this.mode}', refer to http://codemirror.net/mode/ for more details.`)
        }

        if (mode) {
          return loadMode && loadMode(mode)
        }
      },

      initializeEditor() {
        this.editor = CodeMirror.fromTextArea(this.$refs.editor, this.editorOptions)
        this.editor.setValue(this.code)

        this.editor.on('change', (cm) => {
          this.code = cm.getValue()
          const value = cm.getValue()
          this.$emit('input', value)
          this.$emit('change', value)
        })

        events.forEach(event => {
          this.editor.on(event, (...args) => {
            this.$emit(event, ...args)
          })
        })

        this.$emit('ready', this.editor)

        this.unseenLineMarkers()

        // prevents funky dynamic rendering
        this.$nextTick(() => {
          this.editor.refresh()
        }, 0)
      }
    }
  }
}
