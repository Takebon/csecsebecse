<template>
  <v-app>  
    <v-toolbar app color="indigo" dark>
      <v-toolbar-title id="title"  class="headline">
        <router-link to="/" tag="span" style="cursor: pointer">
          Csecsebecse Könyves Blog
        </router-link>
      </v-toolbar-title>

      <v-btn
      v-if="isAuthenticated"
        to="/add"
        color="pink darken-2"
        dark
        large
        absolute
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

      <v-btn
        v-if="!isAuthenticated"
        to="about"
        color="green darken-3"
        dark
        large
        absolute
        bottom
        right
        fab
        class="animated"
        @mouseover="mouseOver = true"
        @mouseout="mouseOver = false"
        :class="{tada: mouseOver}"
        >
        <v-icon>account_circle</v-icon>        
      </v-btn>     

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
export default {
  data () {
    return {
      mouseOver: false,
      isAuthenticated: true
    }
  },
  components: {
   
  },
  name: 'App'
}
</script>

<style>
@import url('https://fonts.googleapis.com/css?family=Gaegu');
#title {
font-family: 'Gaegu', cursive !important;
/* font-size: 2em; */

}
</style>

