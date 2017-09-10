<template>
    <div id="app">
        <div class="editor-wrap">
            <evue ref='baseEditor' id="codemirror" v-model="editCode" :options="editorOption"></evue>
            <div class="evue-tool">
                <span class="set-theme">Set theme: </span>
                <select v-model="theme" @change="handleThemeChange">
                    <option v-for="themeItem in themeConfig" v-bind:value="themeItem">
                        {{ themeItem }}
                    </option>
                </select>
            </div>
        </div>
        <div class="preview-wrap">
            <div class="markdown-body"></div>
        </div>
    </div>
</template>

<script>
  import evue from '../src/BaseEditor.vue'
  import THEME_CONFIG from '../src/config/theme.json'
  import DEFAULT_CONFIG from '../src/config/default.json'
  export default {
    name: 'app',
    components: {
      evue
    },
    data () {
      return {
        editCode: 'Welcome to Your Vue.js App',
        theme: DEFAULT_CONFIG.theme,
        editorOption: {
          tabSize: 4,
          styleActiveLine: true,
          lineNumbers: true,
          autoCloseTags: true,
          line: true,
          extraKeys: { 'Ctrl': 'autocomplete' },
          // 代码折叠
          foldGutter: true,
          gutters: ['CodeMirror-linenumbers', 'CodeMirror-foldgutter'],
          // 选中文本自动高亮，及高亮方式
//          styleSelectedText: true,
          highlightSelectionMatches: { showToken: /\w/, annotateScrollbar: true },
          // more codemirror options...
          // 如果有hint方面的配置，也应该出现在这里
          hintOptions: {
            completeSingle: false
          }
        },
        themeConfig: THEME_CONFIG
      }
    },
    methods: {
      handleThemeChange() {
        this.$refs.baseEditor.setTheme(this.theme)
      }
    }
  }
</script>

<style lang="scss">
    html,
    body {
        margin: 0px;
        padding: 0px;
        height: 100%;
        -ms-text-size-adjust: 100%;
        -webkit-text-size-adjust: 100%;
        line-height: 1.5;
        color: #333;
        font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol";
        font-size: 16px;
        line-height: 1.5;
        word-wrap: break-word;
    }

    #app {
        height: 100%;
    }

    .editor-wrap {
        position: relative;
        float: left;
        width: 50%;
        height: 100%;
        overflow: auto;
        .CodeMirror {
            font-size: 18px;
            height: 100%;
        }
    }

    .preview-wrap {
        float: left;
        width: 50%;
        height: 100%;
        overflow: auto;
        .markdown-body {
            box-sizing: border-box;
            width: 100%;
            max-width: 980px;
            padding: 45px;
            font-size: 18px;
            ul > li {
                list-style-type: disc;
            }
            ol > li {
                list-style-type: lower-roman;
            }
        }
    }

    .evue-tool {
        position: absolute;
        top: 20px;
        right: 20px;
        z-index: 1000;
        .set-theme {
            color: #fff;
        }
    }
</style>
