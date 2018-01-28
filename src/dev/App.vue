<template>
    <div id="app">
        <div class="editor-wrap">
            <select name="" id="" v-model="theme">
                <option v-for="theme in themes" value="">{{ theme }}</option>
            </select>
            <V-Codemirror v-model="code"
                          :theme="theme"
                          :options="editorOpts"
                          @change="handleCodeChange">
            </V-Codemirror>
        </div>
        <div class="preview-wrap">
            <div class="markdown-body">
                <pre>{{ code }}</pre>
            </div>
        </div>
    </div>
</template>

<script>
  import { VCodemirror, themes, mimeModes } from '../index'

  export default {
    name: 'app',
    components: {
      'V-Codemirror': VCodemirror
    },
    data () {
      return {
        code: 'I am a codemirror demo',
        themes,
        theme: '3024-day',
        editorOpts: {
          showToolkit: true,
          styleActiveLine: true,
//          keyMap: "sublime",
//          extraKeys: { 'Ctrl': 'autocomplete' },
          line: true,
          lineNumbers: true,
          autoCloseTags: true,
          // 代码折叠
          foldGutter: true,
          gutters: ['CodeMirror-linenumbers', 'CodeMirror-foldgutter'],
          // 选中文本自动高亮，及高亮方式
          styleSelectedText: true,
          highlightSelectionMatches: { showToken: /\w/, annotateScrollbar: true },
          // more codemirror options...
          // 如果有hint方面的配置，也应该出现在这里
          hintOptions: {
            completeSingle: false
          }
        },
      }
    },
    methods: {
      handleCodeChange(val) {
        console.log(val)
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

    .hidden {
        display: none;
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
            padding: 45px;
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
            pre {
                margin: 0;
            }
        }
    }
</style>
