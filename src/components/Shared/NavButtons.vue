<template>
    <div>
    <v-speed-dial
      v-if="isAuthenticated"
      v-model="fab"
      absolute   
      right
      direction="bottom"
      open-on-hover
      transition="slide-y-reverse-transition">
      
      <v-btn
        slot="activator"
        v-model="fab"
        color="pink darken-2"
        dark
        fab
        large
        >
        <v-icon>account_circle</v-icon>
        <v-icon>close</v-icon>
      </v-btn>
      
      <v-tooltip left>
      <v-btn
        to="/edit/1234"
        slot="activator"
        fab
        dark
        small
        color="green">
        <v-icon>edit</v-icon>
      </v-btn>
      <span>Szerkesztés</span>
      </v-tooltip>
      
      <v-tooltip left>
      <v-btn
        to="/add"
        slot="activator"
        fab
        dark
        small
        color="indigo">
        <v-icon>add</v-icon>
      </v-btn>
      <span>Új ajánló</span>
      </v-tooltip>

      <v-tooltip left>
      <v-btn
        slot="activator"
        fab
        dark
        small
        color="red">
        <v-icon>delete</v-icon>
      </v-btn>
      <span>Kuka</span>
      </v-tooltip>

      <v-tooltip left>
      <v-btn
        to="/about"
        slot="activator"
        fab
        dark
        small
        color="yellow darken-4">
        <v-icon>account_circle</v-icon>
      </v-btn>
      <span>Rólam</span>
      </v-tooltip>

    </v-speed-dial>
        
        <!-- <v-btn
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
      </v-btn> -->

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
    </div> 
</template>

<script>
export default {
data () {
    return {
      mouseOver: false,
      isAuthenticated: true,
      fab: false
    }
  },
}
</script>

<style>

</style>
