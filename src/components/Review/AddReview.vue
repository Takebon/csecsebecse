<template>
    <v-container>
        <v-layout row >
            <v-flex xs12 sm6 offset-sm3 lg4 offset-lg4 id="addPageBackground" class="pa-5">
            <v-layout row >
                <v-flex xs12>
                    <h2>Új ajánló</h2>
                </v-flex>
            </v-layout>
            <v-layout row >
                <v-flex xs12 >
                    <form @submit.prevent="onCreateReview" >
                        <v-layout row>
                            <v-flex xs12>
                                <v-text-field
                                :rules="reqRules"                            
                                name="author"
                                label="Szerző"
                                v-model="author"
                                id="author"
                                required></v-text-field>
                            </v-flex>
                        </v-layout>

                        <v-layout row>
                            <v-flex xs12>
                                <v-text-field
                                :rules="reqRules"                            
                                name="title"
                                label="Könyv címe"
                                v-model="title"
                                id="title"
                                required></v-text-field>
                            </v-flex>
                        </v-layout>

                        <v-layout row>
                            <v-flex xs12>
                                <v-btn raised class="primary" @click="onPickFile">Upload Image</v-btn>
                                <input type="file" 
                                    style="display: none" 
                                    ref="fileInput" 
                                    accept="image/*"
                                    @change="onFilePicked"
                                    >
                            </v-flex>
                        </v-layout>
                        <v-layout row>
                            <v-flex xs12>
                                <img :src="imageURL" height="150">
                            </v-flex>
                        </v-layout>

                        <v-layout row>
                            <v-flex xs12>
                                <v-textarea                            
                                :rules="reqRules"                            
                                name="review"
                                label="Ajánló"
                                v-model="review"
                                id="review"                                
                                required></v-textarea>
                            </v-flex>
                        </v-layout>
                        <v-layout row>
                            <v-flex xs12>
                                <v-btn class="primary" type="submit" :disabled="!formIsValid">Ajánló mentése</v-btn>
                            </v-flex>                        
                        </v-layout>
                    </form>
                </v-flex>
            </v-layout>
                    </v-flex>
        </v-layout>
    </v-container>
</template>

<script>
export default {
    data() {
        return {
            author: '',
            title: '',
            review: '',
            imageURL: '',
            image: null,
            reqRules: [
                v => !!v || 'Valamit muszáj beírni!'
            ],
            alert: null
        }
    },
    computed: {
        formIsValid() {
            return this.author !== '' &&
                   this.title !== '' &&
                   this.review !== '' &&
                   this.image !== ''
        }
    },
    methods: {
        onCreateReview() {
            if (!this.formIsValid) {
                return
            }
            if (!this.image) {
                return
            }
            const reviewData = {
                author: this.author,
                title: this.title,
                review: this.review,
                image: this.image,
                date: Date.now()
            }
            this.$store.dispatch('createReview', reviewData)
            this.$router.push('/')
        },
        onPickFile() {
            this.$refs.fileInput.click()
        },
        onFilePicked(event) {
            const files = event.target.files
            let filename = files[0].name
            if(filename.lastIndexOf('.') <= 0) {
                this.alert = 'Valami nem kerek!'
                return
            }
            const fileReader = new FileReader()
            fileReader.addEventListener('load', () => {
                this.imageURL = fileReader.result
            })
            fileReader.readAsDataURL(files[0])
            this.image = files[0]
        }
    }
}
</script>

<style>
#addPageBackground {
    background: url('../../assets/texture.png') no-repeat center;
    background-size: cover
    
}
</style>
