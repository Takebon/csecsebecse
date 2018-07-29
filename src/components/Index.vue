<template>
  <v-layout>
    <navbuttons/>
    <v-container class="showcase">
      <grid-element v-for="(review, index) in reviews" 
                    :key="index"
                    :review='review'
                    ref="grid_element"
                    @showSingleComponent="showSingleItem($event)"/>     
    </v-container>
  </v-layout>
</template>

<script>
import Navbuttons from '../components/Parts/Navbuttons'
import gridElement from './Parts/GridElement'
export default {
  data() {
    return {
      
    }
  },
  methods: {
    showSingleItem(id) {
      for (let key in this.$refs.grid_element) {
        for (let element in this.$refs.grid_element[key].$refs) {
          let bounds = this.$refs.grid_element[key].$refs[element].getBoundingClientRect()
          TweenMax.to(this.$refs.grid_element[key].$refs[element], 1, {
                  ease: Elastic.easeOut.config(.5, 0.7),
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
        this.$router.push(`/review/${ id }`)
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
    Navbuttons
  },
  mounted() {
    for (let key in this.$refs.grid_element) {
      for (let element in this.$refs.grid_element[key].$refs) {
        let bounds = this.$refs.grid_element[key].$refs[element].getBoundingClientRect()
         TweenMax.from(this.$refs.grid_element[key].$refs[element], 2, {
                ease: Elastic.easeOut.config(.5, 0.7),
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
