import Vue from 'vue'
import App from './App.vue'
import '../src/polyfill'

new Vue({
  el: '#app',
  render: h => h(App)
})
