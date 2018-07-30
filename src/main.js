
import Vue from 'vue'
import App from './App'
import * as firebase from 'firebase'
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
  template: '<App/>',
  created() {
    firebase.initializeApp({
      apiKey: 'AIzaSyA_wO5E0YxSeyxMfSDdQrvaGhnwjKv8m7g',
      authDomain: 'csecsebecsekonyvesblog.firebaseapp.com',
      databaseURL: 'https://csecsebecsekonyvesblog.firebaseio.com',
      projectId: 'csecsebecsekonyvesblog',
      storageBucket: 'csecsebecsekonyvesblog.appspot.com',
    })
  }
})
