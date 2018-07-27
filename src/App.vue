<template>
  <v-app>
    <div class="background"></div>

    <v-toolbar app color="indigo" dark>
      <v-toolbar-title id="title"  class="headline">
        <router-link to="/" tag="span" style="cursor: pointer">
          Csecsebecse Könyves Blog
        </router-link>
      </v-toolbar-title>      
    </v-toolbar>

    <v-content>
      <v-container fluid>
        
        <router-view></router-view>        
        
      </v-container>
    </v-content>

    <v-footer app color="indigo" dark></v-footer>
  </v-app>
</template>


<script>

export default {
  name: 'App',
  data () {
    return {
      isAuthenticated: true,
      mouseOver: false,
      animSchema: "rightToLeft"
    }
  },
  
}
</script>

<style>

  @import url('https://fonts.googleapis.com/css?family=Gaegu');

  #title {
  font-family: 'Gaegu', cursive !important;
  }

  .background {
      position: fixed;
      height: 100%;
      width: 100%;          
      background: url(./assets/bg.jpg);
      background-position: center;
      background-size: cover;   
      opacity: 0.3;
  }

  /* .rightToLeft-enter {
    opacity: 0;
  }
  .rightToLeft-enter-active {
    animation: slide-in 1s ease-out forwards;
    transition: opacity .5s; 
  }
  .rightToLeft-leave-active {
    animation: slide-out 1s ease-out forwards;
    transition: opacity .8s;
    opacity: 0;
  }
  @keyframes slide-in {
  from {
    transform: translateX(200px);
    
  }
  to {
    transform: translateX(0);
   
  }
}
@keyframes slide-out {
  from {
    transform: translateX(0);
  }
  to {
    transform: translateX(200px)
  }
} */
</style>

