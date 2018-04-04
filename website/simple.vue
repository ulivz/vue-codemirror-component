<template>
  <div class="simple-editor">
    <div class="editor">
      <V-Codemirror v-model="code" :options="editorOpts">
      </V-Codemirror>
    </div>
    <div class="preview">
      <pre v-html="code"></pre>
    </div>
  </div>
</template>

<script>
  import VCodemirror from '../src/V-Codemirror.vue'

  export default {
    name: 'simple',
    components: {
      'V-Codemirror': VCodemirror
    },
    data () {
      return {
        code: '<h1>V-Codemirror</h1>',
        editorOpts: {
          mode: 'text/html'
        },
      }
    }
  }
</script>

