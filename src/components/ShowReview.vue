<template>
    <div>
        <div class="showReviewSide" ref="showReviewSide">
            <div class="reviewBg">
                <div class="showReviewContainer">       
                    <div class="showReviewImage"  @click="goBack">
                        <img :src="review.image" alt="" >
                    </div>
                    <div class="showReviewTitle">
                        <h1>{{ review.title }}</h1>
                        <h3>{{ review.author }}</h3>
                    </div>
                    <div class="showReviewText">
                        <p class="body-2">{{ review.review }}</p>
                        <v-tooltip bottom>
                            <edit-review :review="review" v-if="isAuthenticated" slot="activator"/>
                        <span>Szerkeszt</span>
                        </v-tooltip>                       
                        <v-tooltip bottom>                    
                            <v-btn
                            @click="deleteReview"
                            v-if="isAuthenticated"
                            slot="activator"
                            color="red"
                            dark
                            small                                
                            fab>                
                            <v-icon>delete</v-icon>
                            </v-btn>
                            <span>Kukába</span>
                        </v-tooltip>                 
                    </div>                   
                </div>                
            </div>            
        </div>     
        <v-btn
            @click="goBack"
            color="pink"
            dark                       
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
import editReview from './Review/EditReview'
export default {

    props: ['id'],
    data() {
        return {
            mouseOver: false,            
        }
    },
    computed: {
        review() {           
            return this.$store.getters.loadedReview(this.id)
        },
        isAuthenticated() {
        return this.$store.getters.user !== null && this.$store.getters.user !== undefined
        }
    },
    components: {
        editReview
    },
    methods: {
        goBack() {
            TweenMax.to(this.$refs.showReviewSide, .5, {
                ease: Power1.easeOut,
                x: 1000,               
                rotationZ: 180,
                autoAlpha: 0
            })            
            setTimeout(() => {
                this.$router.push('/')
            }, 400)
        },
        deleteReview() {
            if (confirm("Biztos törlöd?")) {
            this.$store.dispatch('deleteReview', {id: this.id, imgExt: this.review.imgExt})
            this.$router.push('/')
            }
        }
    },
    mounted() {        
        if (window.innerWidth > 700)  {           
            TweenMax.from(this.$refs.showReviewSide, .5, {
                ease: Power1.easeOut,
                x: 1500,                
                rotationZ: 45,
                autoAlpha: 0    
            })
        } else {
            TweenMax.from(this.$refs.showReviewSide, 1, {
            ease: Power1.easeOut,           
            autoAlpha: 0,            
            })
        }
    }
}
</script>

<style>
.showReviewSide {
    position: absolute;
    left: 10px;
    right: 10px;
    top:10%;       
    display: flex;
    justify-content: center;
    align-items: top;    
}
.reviewBg{
    background: url(../assets/texture.png) no-repeat;
    background-position: center;
    background-size: cover;
    padding-top: 20px; 
    padding-right: 20px; 
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
    padding: 15px;
    white-space: pre-wrap;
}
.showReviewImage img{
   max-height: 400px;
   margin-left: 10px;
   max-width: 200px;
   box-shadow: 4px 1px 15px black;
}

@media screen and (max-width: 600px) {
.showReviewContainer {
    grid-template-areas: 
     "image image image"
     "title title title"
     "text text text";
   
}
.showReviewImage img{
   max-height: 200px;
   margin-top: 10px;
   max-width: 100px;    
}
.showReviewText {    
    padding-bottom: 25px;    
}
}
</style>
