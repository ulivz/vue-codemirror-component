<template>
    <textarea></textarea>
</template>

<script>
  import CodeMirror from 'codemirror'
  import 'codemirror/lib/codemirror.css'
  import 'codemirror/mode/meta'
  import {findMode, toArray} from './util'
  import DEFAULT_CONFIG from './config/default.json'
  window.CodeMirror = CodeMirror

  const EDITOR_OPTIONS = {
    lineNumbers: true,
    lineWrapping: false,
    theme: DEFAULT_CONFIG.theme,
    mode: DEFAULT_CONFIG.mode,
  }

  export default {
    name: 'evue',
    data() {
      return {
        content: ''
      }
    },
    props: {
      code: String,
      unseenLines: Array,
      marker: Function,
      loadtheme: {
        type: Boolean,
        default: () => true
      },
      debugger: {
        type: Boolean,
        default: () => true
      },
      options: {
        type: Object,
        required: true
      },
    },
    computed: {
      theme() {
        return this.unoinOptions().theme
      }
    },
    created: function () {
      this.loadDependencies(this.unoinOptions())
    },
    mounted: function () {
      this.initialize(this.unoinOptions())
    },
    beforeDestroy: function () {
     this.recycleEditor()
    },
    watch: {
      // dynamic set options
      options: {
        deep: true,
        handler(options, oldOptions) {
          console.log(options)
          var key
          for (key in options) {
            this.editor.setOption(key, options[key])
          }
        }
      },
      code: function (newVal, oldVal) {
        if (newVal !== this.editor.getValue()) {
          var scrollInfo = this.editor.getScrollInfo()
          this.editor.setValue(newVal)
          this.content = newVal
          this.editor.scrollTo(scrollInfo.left, scrollInfo.top)
        }
        this.unseenLineMarkers()
      }
    },
    methods: {
      refresh() {
        this.editor.refresh()
      },
      recycleEditor() {
        // garbage cleanup
        const element = this.editor.doc.cm.getWrapperElement()
        if (element && element.remove) {
          element.remove()
        }
      },
      unseenLineMarkers () {
        if (this.unseenLines !== undefined && this.marker !== undefined) {
          this.unseenLines.forEach(line => {
            console.warn(line)
            var info = this.editor.lineInfo(line)
            this.editor.setGutterMarker(line, "breakpoints", info.gutterMarkers ? null : this.marker())
          })
        }
      },
      unoinOptions(ob) {
        return Object.assign({}, EDITOR_OPTIONS, this.options, ob || {})
      },
      setTheme(theme) {
        if (theme !== this.theme) {
          let options = this.unoinOptions({ theme })
          this.recycleEditor()
          this.loadDependencies(options)
          this.initialize(options)
        }
      },
      loadDependencies(editorOptions) {
        let options = editorOptions;
        let theme = options.theme
        let mode = options.mode
        let openDebugger = this.debugger
        let loadTheme = this.loadtheme
        let isCustomMode = !!CodeMirror.modes[mode]

        // theme config
        if (theme && theme == 'solarized light') {
          theme = 'solarized'
        }

        mode = findMode(mode)

        if ((!mode || mode == 'null') && openDebugger && !isCustomMode) {
          console.warn('CodeMirror language mode: ' + mode + ' configuration error (CodeMirror language mode configuration error，or unsupported language) refer to http://codemirror.net/mode/ for more details.')
          // return false
        }

        // require language
        if (mode && mode !== 'null') {
          require('codemirror/mode/' + mode + '/' + mode + '.js')
        }

        // require theme
        if (theme && loadTheme) {
          require('codemirror/theme/' + theme + '.css')
        }
      },
      initialize(editorOptions) {
        this.editor = CodeMirror.fromTextArea(this.$el, editorOptions)
        this.editor.setValue(this.code || this.content)
        this.editor.on('change', (cm) => {
          this.content = cm.getValue()
          if (!!this.$emit) {
            this.$emit('input', this.content)
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
</script>
