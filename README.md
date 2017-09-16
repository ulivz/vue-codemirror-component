# v-codemirror
A laconic codemirror component for Vue.js

> A editor

## Quick Start

A simple usage example as follows:

```vue
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

Name|Is Required|Type|Description|Default
---|:---:|:---:|---|:---:
v-model|N|_String_|Code string value, It will work on two-way data binding, so you needn't watch the code value's change|-
value|N|_String_|Code string value, If you use `value` mode, you need to watch the value's change manually|-
options|N|_Object_|Editor config, please refer to [codemirror config](http://codemirror.net/doc/manual.html#config) 

## event

Some useful event are listed:

Event Name| Description
---|---
change | Fires every time the content of the editor is changed. 
changes | Like the "change" event, but batched per operation.

The detailed event list and their docs can refer to [codemirror-event](http://codemirror.net/doc/manual.html#events)

