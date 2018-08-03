<template>
    <v-dialog width="350px" persistent v-model="editDialog">        
            <v-btn            
            slot="activator"
            color="green"
            dark
            small                                
            fab>                
            <v-icon>edit</v-icon>
            </v-btn>
            <v-card  color="yellow lighten-5">
                <v-container>
                    <v-layout row wrap>
                        <v-flex xs12>
                            <v-card-title>Szerkesztés</v-card-title>
                        </v-flex>
                    </v-layout>
                    <v-divider></v-divider>
                    <v-layout row wrap>
                        <v-flex xs12>
                            <v-card-text>
                                <v-text-field                                                           
                                name="author"
                                label="Szerző"
                                v-model="editedAuthor"
                                id="author"
                                required></v-text-field>                            
                            </v-card-text>
                        </v-flex>
                    </v-layout>
                    
                    <v-layout row wrap>
                        <v-flex xs12>
                            <v-card-text>
                                <v-text-field                                                            
                                name="title"
                                label="Könyv címe"
                                v-model="editedTitle"
                                id="title"
                                required></v-text-field>
                            </v-card-text>
                        </v-flex>
                    </v-layout>
                    
                    <v-layout row wrap>
                        <v-flex xs12>
                            <v-card-text>
                                <v-textarea                     
                                v-model="editedReview"                         
                                name="review"
                                label="Ajánló"                                
                                id="review"
                                rows="10"                     
                                required></v-textarea>
                            </v-card-text>
                        </v-flex>
                    </v-layout>
                <v-divider></v-divider>
                    <v-layout row wrap>
                        <v-flex xs12>
                            <v-card-actions>
                                <v-btn fab dark color="red" @click="editDialog = false"><v-icon>highlight_off</v-icon></v-btn>
                                <v-spacer></v-spacer>
                                <v-btn fab dark color="green" @click="onSaveChanges"><v-icon>done</v-icon></v-btn>
                            </v-card-actions>
                        </v-flex>
                    </v-layout>
                </v-container>
            </v-card>      
    </v-dialog>
</template>

<script>
export default {
    props: ['review'],
    data() {
        return {
            editDialog: false,
            editedAuthor: this.review.author,
            editedTitle: this.review.title,
            editedReview: this.review.review
        }
    },
    methods: {
        onSaveChanges() {
            if (this.editedAuthor.trim() === '' || this.editedTitle.trim() === '' || this.editedReview.trim() === '') {
                return
            }
            this.editDialog = false
            this.$store.dispatch('editReview', {
                title: this.editedTitle,
                author: this.editedAuthor,
                review: this.editedReview,
                id: this.review.id
            })

        }
    }
    

}
</script>

<style>

</style>
