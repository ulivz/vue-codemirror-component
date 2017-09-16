# v-codemirror
> A laconic codemirror component for Vue.js


## Quick Start

A simple usage example as follows:

```vue
<template>
  <div class="simple-editor">
    <div class="editor">
      <V-Codemirror v-model="code" :options="editorOpts"></V-Codemirror>
    </div>
    <div class="preview">
      <pre v-html="code"></pre>
    </div>
  </div>
</template>

<script>
  import VCodemirror from 'v-codemirror'

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
```

## API

### props

Name|Required|Type|Description|Default
---|:---:|:---:|---|:---:
`v-model`|N|_String_| Code string value, It will work on two-way data binding, so you needn't watch the code value's change |-
`value`|N|_String_| Code string value, If you use `value` mode, you need to watch the value's change manually |-
`options`|N|_Object_| Editor config, please move to [codemirror-config](http://codemirror.net/doc/manual.html#config) to get detailed configuration list | `{tabSize: 2, mode: 'text/javascript', theme: 'monokai'}`

> Property `v-model` and `value` are forced alternative.

## event

Some useful event are listed:

Event Name| Description | Callback Value
---|---|---
`change` | Fires every time the content of the editor content is changed. | Current code string

> The detailed event list and their docs can refer to [codemirror-event](http://codemirror.net/doc/manual.html#events)

