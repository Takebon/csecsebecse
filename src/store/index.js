import Vue from 'vue'
import Vuex from 'vuex'
import firebase from 'firebase/app'
import 'firebase/auth'

Vue.use(Vuex)

export const store = new Vuex.Store({
    state: {
        loadedReviews: [
            {date: 20180701 ,title: 'The Dharma Bums', image: "https://upload.wikimedia.org/wikipedia/en/6/63/DharmaBums.JPG", author: 'Jack Kerouac', id: 1, review: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Commodi maxime aliquid, corporis pariatur impedit sapiente dolorum nulla dolor veniam inventore!'},
            {date: 20180702 ,title: 'Tök Magda kalandjai', image: "https://s06.static.libri.hu/cover/22/d/4129634_5.jpg", author: 'Gáti István', id: 2, review: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Commodi maxime aliquid, corporis pariatur impedit sapiente dolorum nulla dolor veniam inventore!'},
            {date: 20180703 ,title: 'Édes mostoha', image: "https://s03.static.libri.hu/cover/59/f/3762729_5.jpg", author: 'Lakner Artúr', id: 3, review: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Commodi maxime aliquid, corporis pariatur impedit sapiente dolorum nulla dolor veniam inventore!'},
            {date: 20180704 ,title: 'FOUR', image: "https://source.unsplash.com/random/200x203", author: 'John Doe', id: 4, review: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Commodi maxime aliquid, corporis pariatur impedit sapiente dolorum nulla dolor veniam inventore!'},
            {date: 20180705 ,title: 'FIVE', image: "https://source.unsplash.com/random/200x204", author: 'John Doe', id: 5, review: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Commodi maxime aliquid, corporis pariatur impedit sapiente dolorum nulla dolor veniam inventore!'},
            {date: 20180706 ,title: 'SIX', image: "https://source.unsplash.com/random/200x205", author: 'John Doe', id: 6, review: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Commodi maxime aliquid, corporis pariatur impedit sapiente dolorum nulla dolor veniam inventore!'},
            {date: 20180707 ,title: 'SEVEN', image: "https://source.unsplash.com/random/200x206", author: 'John Doe', id: 7, review: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Commodi maxime aliquid, corporis pariatur impedit sapiente dolorum nulla dolor veniam inventore!'},
            {date: 20180708 ,title: 'EIGHT', image: "https://source.unsplash.com/random/200x207", author: 'John Doe', id: 8, review: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Commodi maxime aliquid, corporis pariatur impedit sapiente dolorum nulla dolor veniam inventore!'},
            {date: 20180709 ,title: 'NINE', image: "https://source.unsplash.com/random/200x208", author: 'John Doe', id: 9, review: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Commodi maxime aliquid, corporis pariatur impedit sapiente dolorum nulla dolor veniam inventore!'},
            {date: 20180710 ,title: 'THEN', image: "https://source.unsplash.com/random/200x209", author: 'John Doe', id: 10, review: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Commodi maxime aliquid, corporis pariatur impedit sapiente dolorum nulla dolor veniam inventore!'},
            {date: 20180711 ,title: 'ELEVEN', image: "https://source.unsplash.com/random/200x210", author: 'John Doe', id: 11, review: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Commodi maxime aliquid, corporis pariatur impedit sapiente dolorum nulla dolor veniam inventore!'},
            {date: 20180712 ,title: 'TWELVE', image: "https://source.unsplash.com/random/200x211", author: 'John Doe', id: 12, review: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Commodi maxime aliquid, corporis pariatur impedit sapiente dolorum nulla dolor veniam inventore!'}
        ],
        user: null
        },
     getters: {
        loadedReviews(state) {
            return state.loadedReviews.sort((reviewA, reviewB) => {
                return reviewA.date - reviewB.date
            }) 
        },
        featuredReviews(state, getters) {
            return getters.loadedReviews.slice(0, 15)
        },
        loadedReview(state) {
            return (reviewId) => {                
                return state.loadedReviews.find((review) => {
                    return review.id == reviewId
                })
            }
        },
        user(state) {
            return state.user
        }
    },
    mutations: {
        createReview(state, payload) {            
            state.loadedReviews.push(payload)
        },
        setUser(state, payload) {
            
            state.user = payload
        }

    },
    actions: {
        createReview({commit}, payload) {
            const review = {
                title: payload.title,
                author: payload.author,
                review: payload.review,
                image: payload.image,
                date: payload.date,
                id: 'jhspoiu65498454'
            }
            //firebase coming here
            commit('createReview', review)
        },
        signIn({commit}, payload) {
            firebase.auth().signInWithEmailAndPassword(payload.email, payload.password)
                .then(
                    cred => {
                        const user = {
                            id: cred.user.uid,
                            email: cred.user.email
                        }
                        commit('setUser', user)
                    }
                )
                .catch(err => console.log(err))
        }
    }
})