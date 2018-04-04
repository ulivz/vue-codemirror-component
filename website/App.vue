<template>
    <div id="app">
        <header>
            <h1>vue-codemirror-component</h1>
            <div class="tool-box">
                Choose a theme:
                <select v-model="theme">
                    <option v-for="theme in themes">{{ theme }}</option>
                </select>
                &nbsp;&nbsp;&nbsp;
                Choose a mode:
                <select v-model="mode">
                    <option v-for="mode in modes">{{ mode.name }}</option>
                </select>
            </div>
        </header>
        <div class="editor-wrap">
            <vue-codemirror v-model="code"
                            :theme="theme"
                            :mode="mode"
                            :options="editorOpts">
            </vue-codemirror>
        </div>
    </div>
</template>

<script>
  import { themes, modes } from '../src/index'

  export default {
    name: 'app',
    data () {
      return {
        code: require('!raw-loader!../config/poi.common.config.js'),
        themes,
        modes,
        mode: 'JavaScript',
        theme: 'monokai',
        editorOpts: {
          styleActiveLine: true,
          line: true,
//          lineNumbers: true,
          autoCloseTags: true,
          foldGutter: true,
          gutters: ['CodeMirror-linenumbers', 'CodeMirror-foldgutter'],
          styleSelectedText: true,
          highlightSelectionMatches: { showToken: /\w/, annotateScrollbar: true },
          hintOptions: {
            completeSingle: false
          }
        },
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

    header {
        padding: 0 20px;
        .tool-box {
            height: 40px;
        }
    }

    .editor-wrap {
        box-sizing: border-box;
        height: calc(100% - 110px);
        .CodeMirror {
            height: 100%;
            padding: 45px;
            box-sizing: border-box;
            font-size: 16px;
            font-weight: lighter;
        }
    }
</style>
