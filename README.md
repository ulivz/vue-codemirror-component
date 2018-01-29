<p align="center">
  <img alt="vue-codemirror-logo" width="300" src=".media/logo.png">
</p>

<p align="center" style="color: #d73a49">
  A <b>@vuejs</b> component for <b>@codemirror</b> that natively supports the code splitting.
</p>

<br/>

## Why need code splitting?

[codemirror](http://codemirror.net/) itself is a very powerful package that does not bundle into a single file when it's released. This is also because many users are most likely to load only some of them, **loading all at once is not elegant enough.** so that we can combine the [dynamic import](https://webpack.js.org/guides/code-splitting/#dynamic-imports) feature of webpack2+ to achieve the goal of reducing the size effectively.

## Quick Start

As above mentioned, to use this component, you need to use **_webpack2_** and above version.

<details>
<summary>Click here to open webpack configuration</summary>

1. Install webpack, css-loader and style-loader.

  ```bash
  npm i install webpack -D
  ```

2. Config in `webpack.config.js`:

  ```js
  module.exports = {
    module: {
      rules: [
        {
          test: /\.css$/,
          use: [ 'style-loader', 'css-loader' ]
        }
      ]
    }
  }
  ```

</details>

<br>

Then, show you the usage code:

If you want to register `vue-codemirror` as a global component, you can use:

```js
import VueCodemirror from 'vue-codemirror-component'
Vue.use(VueCodemirror, options)
```

Or if you don't want to pollute the global scope, you can register it when you want to use it:

```js
  import { createComponent } from 'vue-codemirror-component'
  export default {
    name: 'app',
    components: {
      'vue-codemirror': createComponent(options)
    }
  }  
```

## API

### Default export

  default export is the install function for this component.

  ```js
  import VueCodemirror from 'vue-codemirror-component'
  Vue.use(VueCodemirror, options)
  ```
  
#### options.loadTheme

- Type: `(theme: string): Promise<void>`
- Required: `true`

  Runs when the editor's theme changes, you can use the `import()` syntax, and also supports a third-party asynchronous load library.
  
  ```js
  loadTheme(theme) {
    return import('codemirror/theme/' + theme + '.css')
  }
  ```

#### options.loadMode

- Type: `(mode: string): Promise<void>`
- Required: `true`

  Runs when the editor's mode changes, the usage is same to _**options.loadTheme**_.
  
  ```js
  loadTheme(theme) {
    return import('codemirror/theme/' + theme + '.css')
  }
  ```


## Example

A full usage example as follows:

```vue
<template>
  <div class="simple-editor">
    <div class="editor">
      <vue-codemirror v-model="code" :options="editorOpts"></vue-codemirror>
    </div>
    <div class="preview">
      <pre v-html="code"></pre>
    </div>
  </div>
</template>

<script>
  import { createComponent } from 'vue-codemirror-component'
  
  const vueCodemiiror = createComponent({
    loadTheme(theme) {
      return import('codemirror/theme/' + theme + '.css')
    },
    loadMode(mode) {
      return import('codemirror/mode/' + mode + '/' + mode + '.js')
    }
  })  


  export default {
    components: {
      vueCodemiiror
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

Property `v-model` and `value` are forced alternative.

## event

Some useful event are listed:

Event Name| Description | Callback Value
---|---|---
`change` | Fires every time the content of the editor content is changed. | Current code string

The detailed event list and their docs can refer to [codemirror-event](http://codemirror.net/doc/manual.html#events)

