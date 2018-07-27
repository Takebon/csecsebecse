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
      mouseOver: false         
    }
  } 
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

</style>

