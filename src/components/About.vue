<template>
    <div>
        <v-btn
            @click="backToBabilon"   
            type="submit"
            color="yellow darken-3"
            dark
            fixed
            right
            fab                                                                     
            >
            <v-icon>keyboard_return</v-icon>        
        </v-btn>    
    <div class="about_container">
        <div class="portfolio" ref="portfolio">
            <section class="hero">
                <img src="../assets/profil.jpg" alt="">
                <div class="hero_content">
                    <h1>Horváthné Kopányi Eszter</h1>
                    <p> Könyvkereskedő édesapámnak és óvónő édesanyámnak köszönhetően születésemtől kezdve könyvek, történetek és mesék vesznek körül. Innen terelődtem felnőttként a könyvesbolt varázslatos világába, és ma is különleges élményt adnak az ifjúsági korosztálynak és a gyerekeknek írt és illusztrált olvasmányok. Bár ezeket az élményeket nehéz, szinte lehetetlen megosztani másokkal, mégis érdemes napról napra megpróbálni, hogy az olvasók által tovább élhessenek ezek a könyvek, történetek és mesék.</p>
                </div>
            </section>
        </div>
        <div class="message" ref="message">
            <section class="message_container">
                        <v-layout row >
                            <v-flex xs12 sm6 offset-sm3 lg4 offset-lg4 id="messageBackground" class="pa-5 mt-5">
                        <v-layout row >
                            <v-flex xs12>
                                <h2>Küldhetsz üzenetet is!</h2>
                            </v-flex>
                        </v-layout>
                        <v-divider></v-divider>
                        <v-layout row >
                            <v-flex xs12 >
                                <form @submit.prevent="onCreateMessage" >
                                    <v-layout row>
                                        <v-flex xs12>
                                            <v-text-field                                                                       
                                            name="name"
                                            label="Neved"
                                            v-model="name"
                                            id="name"
                                            required></v-text-field>
                                        </v-flex>
                                    </v-layout>

                                    <v-layout row>
                                        <v-flex xs12>
                                            <v-text-field                                                                       
                                            name="email"
                                            label="email címed"
                                            v-model="email"
                                            id="email"
                                            required></v-text-field>
                                        </v-flex>
                                    </v-layout>                                   

                                    <v-layout row>
                                        <v-flex xs12>
                                            <v-textarea                                                                     
                                            name="message"
                                            label="Üzenet"
                                            v-model="message"
                                            id="message"                                
                                            required></v-textarea>
                                        </v-flex>
                                    </v-layout>
                                    <v-layout row>
                                        <v-flex xs12>
                                            <v-btn fab color="green" type="submit" :disabled="!formIsValid"> <v-icon>send</v-icon> </v-btn>
                                        </v-flex>                        
                                    </v-layout>
                                </form>
                            </v-flex>
                        </v-layout>
                    </v-flex>
                </v-layout>
            </section>
        </div>
    </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            name: '',
            email: '',
            message: ''            
        }
    },
    computed: {
        formIsValid() {
            return this.name !== '' &&
                   this.email !== '' &&
                   this.message !== ''
        }
    },
    methods: {
        onCreateMessage() {
            this.$store.dispatch('createMessage', {
                name: this.name,
                email: this.email,
                message: this.message,
                date: Date.now()
            })            
            TweenMax.to(this.$refs.message, .5, {x: 1000 , 
                                                 y: -1000, 
                                                 scale: 0, 
                                                 repeat: 1, 
                                                 yoyo: true, 
                                                 rotation: 100, 
                                                 autoAlpha: 0})
            this.name = ''
            this.email = ''
            this.message = ''         
        },
        backToBabilon() {
            if (window.innerWidth < 800) {

            }
            const tl = new TimelineLite()
                tl.to(this.$refs.portfolio, .5, {ease: Power1.easeOut, x: -1000, autoAlpha: 0})
                if (window.innerWidth < 800) {
                    tl.to(this.$refs.message, .5, {ease: Power1.easeOut, x: -1000, autoAlpha: 0}, '-=.2')
                } else {
                     tl.to(this.$refs.message, .5, {ease: Power1.easeOut, y: -1000, autoAlpha: 0}, '-=.2')
                }
            setTimeout(() => {
                this.$router.push('/')
            }, 500)
        }
    },
    mounted() {
        const tl = new TimelineLite()
            tl.from(this.$refs.portfolio, .5, {ease: Power1.easeOut, x: -1000, autoAlpha: 0})
            if(window.innerWidth < 800) {
                tl.from(this.$refs.message, .5, {ease: Power1.easeOut, x: -1000, autoAlpha: 0}, '-=.2')
            } else {
                tl.from(this.$refs.message, .5, {ease: Power1.easeOut, y: -1000, autoAlpha: 0}, '-=.2')
            }
    }
}
</script>

<style>
#messageBackground {
    background: url('../assets/texture.png') no-repeat center;
    background-size: cover}
.portfolio {
    grid-area: portfolio;
}
.message {
    grid-area: message;      
}
.about_container {
    width: 100%;
    height: 100%;
    display: grid;
    grid-template-areas:
        "portfolio"
        "message";
    grid-template-columns: 1fr;    
    position: absolute;
    top: 0;
    left: 0;
}
.hero {
    display: flex;    
    align-items: center;
    flex-direction: column;
    background-color: rgb(49, 7, 7);
    padding: 30px 0;
    
}
.hero img {
    max-width: 150px;
    border-radius: 50%;
    margin: 10px 0;
}
.hero_content {    
    margin: 10px;
    color: white;
}
.hero_content h1{    
    text-align: center;
    margin-bottom: 10px;
    line-height: 200%;
}
.hero_content p{
    text-indent: 10px;
    letter-spacing: 2px;
    margin: 10px;
    line-height: 200%;
}
@media screen and (min-width: 800px) {
    .about_container {
    grid-template-areas:
        "portfolio message";        
    grid-template-columns: 1fr 2fr;
    }
    .hero {
        height: 100%;
    }
    .hero_content p{
        margin: 10px 30px;
    }
    .message {
        height: 100%;
    }
}
</style>
