<template>
  <v-app id="app">
    <div class="background"></div>

    <v-toolbar app color="orange darken-4" dark @click.ctrl="goToAdmin">
      <v-toolbar-title   class="headline">
        <router-link to="/" tag="span" style="cursor: pointer" class="headbarText">
          Csecsebecse Könyves Blog
        </router-link>
      </v-toolbar-title>             
    </v-toolbar>

    <v-btn
        v-if="isAuthenticated"    
        to="/add"
        color="pink darken-3"
        dark        
        fixed
        bottom
        right
        fab
        class="animated"
        @mouseover="mouseOver = true"
        @mouseout="mouseOver = false"
        :class="{tada: mouseOver}"
        >
        <v-icon>add</v-icon>        
      </v-btn>
   
    <v-content>
      <v-container fluid>        
        <router-view></router-view>       
      </v-container>
    </v-content>

    <v-footer app color="orange darken-4" dark></v-footer>
  </v-app>
</template>


<script>

export default {
  name: 'App',
  data () {
    return {      
      mouseOver: false      
    }
  },
  methods: {
    goToAdmin() {
      this.$router.push('/admin')
    }
  },
  computed: {
    isAuthenticated() {
      return this.$store.getters.user !== null && this.$store.getters.user !== undefined
    },
    user() {
      return this.$store.getters.user
    }   
  }
}
</script>

<style>
  *,
  *::after,
  *::before {
    box-sizing: border-box;
    font-family: 'Pangolin', cursive; 
  }
  #app {
    background-color: rgb(100, 100, 100);
  }

  .headbarText {
  font-family: 'Gaegu', cursive !important;
  }

  .background {
      position: fixed;
      height: 100%;
      width: 100%;          
      background: url(./assets/bg.jpg) no-repeat;
      background-position: center;
      background-size: cover;   
      opacity: 0.8;
  } 

</style>

