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
                            <div v-if="errorMsg" class="errorMsg">{{ errorMsg }}</div>
                            <div v-if="isAuthenticated">                                     
                            <h1 class="subheading indigo--text">Üzenetek:</h1>
                            <v-divider></v-divider>
                            <div v-for="(message, index) in messages" :key="index">
                                <div class="message_box">
                                    <div class="message_text">
                                        <h2 class="subheading">{{message.name}} ({{ message.email }})</h2>
                                        <p class="caption">{{ message.message }}</p>
                                    </div>
                                    <div class="message_icon">                                        
                                        <v-icon style="cursor: pointer" @click="deleteMessage(message.id)">delete</v-icon>
                                    </div>
                                </div>                       
                                <v-divider></v-divider>
                            </div>
                            </div> 
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
                                <v-tooltip right> 
                                <v-btn
                                    @click="onSignOut"     
                                    v-if="isAuthenticated"
                                    color="red darken-3"
                                    dark
                                    slot="activator"
                                    top
                                    right
                                    fab                                                                     
                                    >
                                    <v-icon>remove_circle_outline</v-icon>        
                                </v-btn>
                                <span>Kilépés</span>
                        </v-tooltip> 
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
        },
        deleteMessage(id) {
            this.$store.dispatch('deleteMessage', id)            
        }
    },
    computed: {
        isAuthenticated() {
            return this.$store.getters.user !== null && this.$store.getters.user !== undefined
        },
        messages() {
            return this.$store.getters.loadMessages
        },
        errorMsg() {
            return this.$store.getters.errorMsg
        }
    }
}
</script>

<style>
#signInCard {
    border-radius: 10px;
    box-shadow: 5px 5px 15px black;
}
.message_box {
    display: grid;
    grid-template-columns: auto 20px;
    margin: 0 10px;
}
.errorMsg {
    background: lightcoral;
}

</style>
