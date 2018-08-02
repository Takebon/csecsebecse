<template>
  <v-layout>
    <v-btn
        @click="goAway()"        
        color="green darken-3"
        dark        
        fixed
        top
        right
        fab
        class="animated"
        @mouseover="mouseOver = true"
        @mouseout="mouseOver = false"
        :class="{tada: mouseOver}"
        >
        <v-icon>account_circle</v-icon>        
      </v-btn>
    <v-container class="showcase">
      <grid-element v-for="(review, index) in reviews" 
                    :key="index"
                    :review='review'
                    ref="grid_element"
                    @showSingleComponent="goAway($event)"/>     
    </v-container>
  </v-layout>
</template>

<script>
import gridElement from './Parts/GridElement'
export default {
  data() {
    return {
      mouseOver: false
    }
  },
  methods: {
    goAway(id) {
      for (let key in this.$refs.grid_element) {
        for (let element in this.$refs.grid_element[key].$refs) {
          let bounds = this.$refs.grid_element[key].$refs[element].getBoundingClientRect()
          TweenMax.to(this.$refs.grid_element[key].$refs[element], .5, {
                  ease: Power1.easeOut,
                  x: -1*(bounds.x + bounds.width),
                  y: (this.$helpers.getRandomInteger(0, 1000)),
                  z: 0,
                  rotationX: 0,
                  rotationY: 0,
                  rotationZ: this.$helpers.getRandomInteger(0, 60),
                  autoAlpha: 0
          })
        }
      }
      setTimeout(() => {
        if (id) {
          this.$router.push(`/review/${ id }`)
        } else {
          this.$router.push(`/about`)
        }
        
      }, 400)        
    }    
  },
  computed: {
    reviews() {
      return this.$store.getters.featuredReviews
    }
  },
  components: {
    gridElement,   
  },
  mounted() {
    for (let key in this.$refs.grid_element) {
      for (let element in this.$refs.grid_element[key].$refs) {
        let bounds = this.$refs.grid_element[key].$refs[element].getBoundingClientRect()
         TweenMax.from(this.$refs.grid_element[key].$refs[element], .5, {
                ease: Power1.easeOut,
                x: -1*(bounds.x + bounds.width),
                y: (this.$helpers.getRandomInteger(0, 1000)),
                z: 0,
                rotationX: 0,
                rotationY: 0,
                rotationZ: this.$helpers.getRandomInteger(0, 60),
                autoAlpha: 0
          })
      }
    }
  }
}

</script>

<style>
.showcase {
  display: grid;
  grid-gap: 20px;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
}  
</style>
