<template>
  <v-app id="app">
    <div class="background"></div>

    <v-toolbar app color="orange darken-4" dark>
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

    <v-footer app class="pt-3 pr-5" color="orange darken-4">
      <router-link to="/admin" style="text-decoration: none" >
      <v-icon style="margin-bottom: 15px" color="orange darken-1">build</v-icon>
      </router-link>
      
      <v-spacer></v-spacer>
      <p style="color: orange">TakebonCog &copy; 2018</p>
      </v-footer>



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
    },
    resized() {
      console.log('helleo')
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
      
  }
  .background::after {
    position: absolute;
    content: '';
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: #000;
    opacity: .2;
  }

</style>

