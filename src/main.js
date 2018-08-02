
import Vue from 'vue'
import App from './App'
import firebase from 'firebase/app'
import router from './router'
import Vuetify from 'vuetify'
import 'vuetify/dist/vuetify.min.css'
import { store } from './store/index'
import moveHelper from './helpers/move_helper'
import {TweenMax} from 'gsap/TweenMax'
import './firebase/init'
import 'firebase/auth'


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
    firebase.auth().onAuthStateChanged(user => {
      if(user) {
        this.$store.dispatch('autoSignIn', user)
      }
    })
    this.$store.dispatch('loadReviews')
    this.$store.dispatch('loadMessages')
  }
})


