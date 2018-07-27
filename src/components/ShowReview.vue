<template>
    <div>
        <div class="showReviewSide">
            <div class="reviewBg">
                <div class="showReviewContainer">       
                    <div class="showReviewImage">
                        <img :src="review.image" alt="" >
                    </div>
                    <div class="showReviewTitle">
                        <h1>{{ review.title }}</h1>
                        <h3>{{ review.author }}</h3>
                    </div>
                    <div class="showReviewText">
                        <p class="body-2">{{ review.review }}</p>
                    </div>
                </div>
            </div>
        </div>     
        <v-btn
            to= "/"
            color="pink"
            dark
            large            
            fixed
            top
            right
            fab
            class="animated"
            @mouseover="mouseOver = true"
            @mouseout="mouseOver = false"
            :class="{tada: mouseOver}">
        
            <v-icon>arrow_back</v-icon>
        </v-btn>    
    </div>
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
.showReviewSide {
    font-family: 'Pangolin', cursive;  
    position: absolute;
    left: 10px;
    right: 10px;
    top:0px;
    bottom: 0px;    
    display: flex;
    justify-content: center;
    align-items: center;
    
}
.reviewBg{
    background: url(../assets/texture.png) no-repeat;
    background-position: center;
    background-size: cover;
}
.showReviewContainer {
    padding: 10px;
    display: grid;
    grid-gap: 10px;
    max-width: 800px;
    max-height: 100%;
    grid-template-columns: 1fr 1fr 1fr;
    grid-template-rows: auto;
    grid-template-areas: 
     "image title title"
     "image text text"; 
}
.showReviewImage {
    grid-area: image;
    padding: 10px;
    
}
.showReviewTitle {
    grid-area: title;
    align-self: center;
    text-align: center;
    
}
.showReviewTitle h1{
    margin-bottom: 5px;
    
}
.showReviewText {
    grid-area: text;
    padding: 10px;
    
}

.showReviewImage img{
   max-height: 400px;
   margin-left: 10px; 
   box-shadow: 4px 1px 15px black;
}

@media screen and (max-width: 600px) {
.showReviewContainer {
    grid-template-areas: 
     "image title title"
     "text text text";
   
}
.showReviewImage img{
   max-height: 200px;
   margin-top: 10px;    
}
}
</style>
