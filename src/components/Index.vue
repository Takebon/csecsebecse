<template>
  <v-layout>
    <v-container class="showcase">
      <div class="grid_item" v-for="(review, index) in reviews" :key="index">{{ review.title }}</div>
     
    </v-container>
  </v-layout>
</template>

<script>
export default {
  data() {
    return {
      
    }
  },
  methods: {
    goReview() {      
      this.$router.push('/review/1236363')
    }
  },
  computed: {
    reviews() {
      return this.$store.getters.featuredReviews
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
.grid_item {
  width: 300px;
  height: 350px;  
  background: lightcoral
}
.grid_item:nth-child(even) {
  background: lightgreen;
}
  
</style>
