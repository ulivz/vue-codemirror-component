import Vue from 'vue'
import App from './App.vue'
import VueCodemirror from '../../dist/vue-codemirror-component.es'

Vue.use(VueCodemirror, {
  loadTheme(theme) {
    return import('codemirror/theme/' + theme + '.css')
  },
  loadMode(mode) {
    return import('codemirror/mode/' + mode + '/' + mode + '.js')
  }
})

new Vue({
  el: '#app',
  render: h => h(App)
})