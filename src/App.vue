<template>
  <v-app>
    <div class="background"></div>   
    <v-toolbar app color="indigo" dark>
      <v-toolbar-title id="title"  class="headline">
        <router-link to="/" tag="span" style="cursor: pointer">
          Csecsebecse Könyves Blog
        </router-link>
      </v-toolbar-title>
      <navbuttons/>
    </v-toolbar>
    <v-content>
      <v-container fluid>    
        <router-view></router-view>
      </v-container>
    </v-content>
      <v-footer app></v-footer>
  </v-app>
</template>


<script>
import Navbuttons from './components/Shared/Navbuttons'
export default {
  data () {
    return {
      mouseOver: false,
      isAuthenticated: true
    }
  },
  components: {
   Navbuttons
  },
  name: 'App'
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
    background-size: cover;
    top: 0;
    left: 0;
    opacity: 0.5;
}

</style>

