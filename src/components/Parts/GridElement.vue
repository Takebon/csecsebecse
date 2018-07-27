<template>
    <div class="grid_item" @click="showItem"
                           @mouseenter="initMove"
                           @mousemove="move"
                           @mouseout="stopMove">        
        <div class="grid_frame" ><img src="../../assets/frame1.png" alt="" ref="grid_frame"></div>
        <div class="grid_container">
            <div class="grid_text">
                <div class="grid_title" ref="grid_title">{{ review.title }}</div>
                <div class="grid_author" ref="grid_author">{{ review.author }}</div>
            </div>            
            <div class="grid_img" ref="grid_img"><img :src="review.image" alt=""></div>                      
        </div>
    </div>

</template>

<script>
export default {
    props: ['review'],
    data() {
        return {
            animatable: {},
            bounds: '',
            runing: false
        }
    },
    methods: {
        showItem() {
            this.runing = false
            this.$router.push(`/review/${ this.review.id }`)
        },       
        initMove(e) {
            if(this.runing) {
                return
            } else {
                let bounds =e.target.getBoundingClientRect()
                this.bounds = bounds
                setTimeout(() => {this.runing = true}, 40)
            }
        },
        move(e) {
            if (!this.runing) {
                return
            } else {                
                let mousePos = this.$helpers.move(e, this.bounds, this.runing)       
                for (let key in this.animatable) {
                let element = this.$helpers.getAnimProps(key, mousePos.x, mousePos.y, this.bounds)
                if(this.animatable[key] === 'null') {return}
                TweenMax.to(this.animatable[key], 1.5, {
                    ease: Power1.easeOut,
                    x: element.x,
                    y: element.y,
                    z: element.z,
                    rotationX: element.rX,
                    rotationY: element.rY,
                    rotationZ: element.rZ
                    })
                }
            }
        },
        stopMove() {
        if(!this.runing) {
            return
        } else {        
            setTimeout(() => {
                for (let key in this.animatable) {
                    TweenMax.to(this.animatable[key], 1.5, {
                    ease: Power1.easeOut,
                    x: 0,
                    y: 0,
                    z: 0,
                    rotationX: 0,
                    rotationY: 0,
                    rotationZ: 0
                    })
                }
                this.runing = false
                this.bounds = ''          
                }, 40)
        }
        }
    },
    mounted() {
        this.animatable = this.$refs
    }

}
</script>




<style>
@import url('https://fonts.googleapis.com/css?family=Pangolin');
.grid_item {
    width: 300px;
    height: 350px;  
    background: rgba(214, 20, 20, 0.2);
    border-radius: 20px;
    transition: background .5s,
                filer .5s,
                box-shadow .3s;
    position: relative; 
    filter: grayscale(1);
}
.grid_item:hover{
    background: rgba(214, 20, 20, 0.4);
    filter: grayscale(0);
    box-shadow: 2px 2px 15px;
}
.grid_item:hover .grid_img img {
    box-shadow: 5px 5px 10px;
}
.grid_item:nth-child(even) {
    background: rgba(65, 255, 65, 0.2);
}
.grid_item:nth-child(even):hover {
    background: rgba(65, 255, 65, 0.4)
}
.grid_bg img {
    position: absolute;
    width: 80%;
    height: 80%;
}
.grid_frame img {
    position: absolute;
    width: 100%;
    height: 100%;
    z-index: 1000;
}
.grid_container {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    position: absolute;
    width: 100%;
    height: 100%;
}
.grid_text {   
    text-align: center;
    top: 15%;
    max-width: 60%;
    font-family: 'Pangolin', cursive;    
}
.grid_title {
    font-family: 'Pangolin', cursive;
    font-size: 1.8em;
    line-height: 1em;
    margin-bottom: 5px;
}
.grid_img img{
    max-height: 150px;  
    border: 1px solid black;  
    transition: box-shadow .3s;
}

</style>
