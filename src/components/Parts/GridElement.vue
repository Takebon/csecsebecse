<template>
    <div class="grid_item">        
        <div class="grid_frame" ref="grid_frame"><img src="../../assets/frame1.png" alt=""></div>
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
    props: ['review']

}
</script>




<style>
@import url('https://fonts.googleapis.com/css?family=Pangolin');
.grid_item {
    width: 300px;
    height: 350px;  
    background: rgba(252, 174, 174, 0.2);
    border-radius: 20px;
    transition: background .5s,
                filer .5s,
                box-shadow .3s;
    position: relative; 
    filter: grayscale(1);
}
.grid_item:hover{
    background: rgba(245, 164, 164, 0.4);
    filter: grayscale(0);
    box-shadow: 2px 2px 15px;
}
.grid_item:hover .grid_img img {
    box-shadow: 5px 5px 10px;
}
.grid_item:nth-child(even) {
    background: rgba(144, 238, 144, .2);
}
.grid_item:nth-child(even):hover {
    background: rgba(144, 238, 144, .4)
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
