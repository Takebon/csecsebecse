<template>
  <v-layout>
    <v-flex xs12 sm4 offset-sm3>
      <v-card >
        <v-card-media
          src="https://cdn.vuetifyjs.com/images/cards/desert.jpg"
          height="200px"
          width="300px"
          contain
          @click="goReview"
        ></v-card-media>

        <v-card-title primary-title>
          <div>
            <h3 class="headline mb-0">Kangaroo Valley Safari</h3>
            <div>Located two hours south of Sydney in the <br>Southern Highlands of New South Wales, ...</div>
          </div>
        </v-card-title>

        <v-card-actions>
          <v-btn flat color="orange">Share</v-btn>
          <v-btn flat color="orange">Explore</v-btn>
        </v-card-actions>
      </v-card>
    </v-flex>
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
  }
}

</script>

<style>

  
</style>
