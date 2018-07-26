<template>
  <v-layout>
    <navbuttons/>
    <v-container class="showcase">
      <grid-element v-for="(review, index) in reviews" 
                    :key="index"
                    :review='review'/>     
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
    
  },
  computed: {
    reviews() {
      return this.$store.getters.featuredReviews
    }
  },
  components: {
    gridElement,
    Navbuttons
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
