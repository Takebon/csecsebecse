<template>
    <v-container>
        <v-btn
            to= "/"   
            type="submit"
            color="yellow darken-3"
            dark
            fixed
            right
            fab                                                                     
            >
            <v-icon>keyboard_return</v-icon>        
        </v-btn>
        <v-layout row>
            <v-flex xs12 sm6 offset-sm3>
                <v-card id="signInCard">
                    <v-card-text>
                        <v-container>
                            <h2 class="display-1 indigo--text" v-if="isAuthenticated">Belépve</h2>
                            <form @submit.prevent="onSignIn" v-if="!isAuthenticated">
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
                                <v-btn
                                    @click="onSignOut"     
                                    v-if="isAuthenticated"
                                    color="green darken-3"
                                    dark
                                    absolute     
                                    bottom
                                    right
                                    fab                                                                     
                                    >
                                    <v-icon>how_to_reg</v-icon>        
                                </v-btn>
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
        },
        onSignOut() {
            this.$store.dispatch('signOut')
        }
    },
    computed: {
        isAuthenticated() {
            return this.$store.getters.user !== null && this.$store.getters.user !== undefined
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
