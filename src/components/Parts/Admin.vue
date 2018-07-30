<template>
    <v-container>
        <v-layout row>
            <v-flex xs12 sm6 offset-sm3>
                <v-card id="signInCard">
                    <v-card-text>
                        <v-container>
                            <form @submit.prevent="onSignIn">
                                <v-layout row>                                    
                                    <v-flex xs12>
                                        <v-text-field
                                        name="email"
                                        label="Mail"                                   
                                        id="email"
                                        v-model="email"
                                        type="email"
                                        required></v-text-field>
                                    </v-flex>                                    
                                </v-layout>
                                <v-layout row>
                                    <v-flex xs12>
                                        <v-text-field
                                        name="password"
                                        label="Password"                                  
                                        id="password"
                                        v-model="password"
                                        type="password"
                                        required></v-text-field>
                                    </v-flex>
                                </v-layout>
                                <v-btn        
                                    type="submit"
                                    color="green darken-3"
                                    dark
                                    absolute     
                                    bottom
                                    right
                                    fab                                                                     
                                    >
                                    <v-icon>how_to_reg</v-icon>        
                                </v-btn>
                            </form>
                        </v-container>
                    </v-card-text>
                </v-card>
            </v-flex>
        </v-layout>
    </v-container>
</template>

<script>
export default {
    data() {
        return {
            email: '',
            password: ''
        }
    },
    methods: {
        onSignIn() {
            this.$store.dispatch('signIn', {email: this.email, password: this.password})
        }
    }
}
</script>

<style>
#signInCard {
    border-radius: 10px;
    box-shadow: 5px 5px 15px black;
}

</style>
