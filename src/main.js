import Vue from 'vue'
import App from './App.vue'
import './../node_modules/bulma/css/bulma.css';


Vue.config.productionTip = false

Vue.component('ListItem', {
  template: '\
    <li>\
      {{ title }}\
      <button v-on:click="$emit(\'remove\')">Remove</button>\
    </li>\
  ',
  props: ['title']
})

new Vue({
  render: h => h(App),
}).$mount('#app')
