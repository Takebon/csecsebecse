<template>
    <v-container>
        <img :src="review.image" alt="">
        <div>
            <h1>{{ review.title }}</h1>
            <h3>{{ review.author }}</h3>
            <p>{{ review.review }}</p>
        </div>

        <v-btn
              to= "/"
              color="pink"
              dark
              large            
              absolute
              top
              right
              fab
              class="animated"
              @mouseover="mouseOver = true"
              @mouseout="mouseOver = false"
              :class="{tada: mouseOver}">
            
              <v-icon>arrow_back</v-icon>
            </v-btn>
    </v-container>
</template>

<script>
export default {
    props: ['id'],
    data() {
        return {
            mouseOver: false
        }
    },
    computed: {
        review() {           
            return this.$store.getters.loadedReview(this.id)
        }
    }
}
</script>

<style>

</style>
