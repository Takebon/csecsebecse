
import Vue from 'vue'
import App from './App'
import router from './router'
import Vuetify from 'vuetify'
import 'vuetify/dist/vuetify.min.css'
import { store } from './store/index'
import moveHelper from './helpers/move_helper'
import {TweenMax} from 'gsap/TweenMax'

Vue.use(moveHelper)

Vue.use(Vuetify)

Vue.config.productionTip = false

new Vue({
  el: '#app',
  router,
  store,
  TweenMax,
  components: { App },
  template: '<App/>'
})
