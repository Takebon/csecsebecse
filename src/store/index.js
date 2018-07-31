import Vue from 'vue'
import Vuex from 'vuex'
import firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/storage'
import db from '../firebase/init'
import router from '../router/index'

Vue.use(Vuex)

export const store = new Vuex.Store({
    state: {
        loadedReviews: [
        //     {date: 20180701 ,title: 'The Dharma Bums', image: "https://upload.wikimedia.org/wikipedia/en/6/63/DharmaBums.JPG", author: 'Jack Kerouac', id: 1, review: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Commodi maxime aliquid, corporis pariatur impedit sapiente dolorum nulla dolor veniam inventore!'},
        //     {date: 20180702 ,title: 'Tök Magda kalandjai', image: "https://s06.static.libri.hu/cover/22/d/4129634_5.jpg", author: 'Gáti István', id: 2, review: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Commodi maxime aliquid, corporis pariatur impedit sapiente dolorum nulla dolor veniam inventore!'},
        //     {date: 20180703 ,title: 'Édes mostoha', image: "https://s03.static.libri.hu/cover/59/f/3762729_5.jpg", author: 'Lakner Artúr', id: 3, review: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Commodi maxime aliquid, corporis pariatur impedit sapiente dolorum nulla dolor veniam inventore!'},
        //     {date: 20180704 ,title: 'FOUR', image: "https://source.unsplash.com/random/200x203", author: 'John Doe', id: 4, review: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Commodi maxime aliquid, corporis pariatur impedit sapiente dolorum nulla dolor veniam inventore!'},
        //     {date: 20180705 ,title: 'FIVE', image: "https://source.unsplash.com/random/200x204", author: 'John Doe', id: 5, review: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Commodi maxime aliquid, corporis pariatur impedit sapiente dolorum nulla dolor veniam inventore!'},
        //     {date: 20180706 ,title: 'SIX', image: "https://source.unsplash.com/random/200x205", author: 'John Doe', id: 6, review: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Commodi maxime aliquid, corporis pariatur impedit sapiente dolorum nulla dolor veniam inventore!'},
        //     {date: 20180707 ,title: 'SEVEN', image: "https://source.unsplash.com/random/200x206", author: 'John Doe', id: 7, review: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Commodi maxime aliquid, corporis pariatur impedit sapiente dolorum nulla dolor veniam inventore!'},
        //     {date: 20180708 ,title: 'EIGHT', image: "https://source.unsplash.com/random/200x207", author: 'John Doe', id: 8, review: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Commodi maxime aliquid, corporis pariatur impedit sapiente dolorum nulla dolor veniam inventore!'},
        //     {date: 20180709 ,title: 'NINE', image: "https://source.unsplash.com/random/200x208", author: 'John Doe', id: 9, review: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Commodi maxime aliquid, corporis pariatur impedit sapiente dolorum nulla dolor veniam inventore!'},
        //     {date: 20180710 ,title: 'THEN', image: "https://source.unsplash.com/random/200x209", author: 'John Doe', id: 10, review: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Commodi maxime aliquid, corporis pariatur impedit sapiente dolorum nulla dolor veniam inventore!'},
        //     {date: 20180711 ,title: 'ELEVEN', image: "https://source.unsplash.com/random/200x210", author: 'John Doe', id: 11, review: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Commodi maxime aliquid, corporis pariatur impedit sapiente dolorum nulla dolor veniam inventore!'},
        //     {date: 20180712 ,title: 'TWELVE', image: "https://source.unsplash.com/random/200x211", author: 'John Doe', id: 12, review: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Commodi maxime aliquid, corporis pariatur impedit sapiente dolorum nulla dolor veniam inventore!'}
         ],
        user: null,
        loading: false
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
        },
        loading(state) {
            return state.loading
        }
    },
    mutations: {
        createReview(state, payload) {                 
            state.loadedReviews.push(payload)
        },
        setUser(state, payload) {            
            state.user = payload
        },
        setLoading(state, payload) {
            state.loading = payload
        },
        setLoadedReviews(state, payload) {
            state.loadedReviews = payload
        },
        deleteReview(state, payload) {
            state.loadedReviews = state.loadedReviews.filter(review => {
                return review.id != payload
            })         
        }

    },
    actions: {
        loadReviews({commit}) {
            commit('setLoading', true)
            db.collection('reviews').get()
             .then(snapshot => {
                 let reviews = []
                 snapshot.forEach(doc => {
                     let review = {
                         title: doc.data().title,
                         image: doc.data().image,
                         author: doc.data().author,
                         review: doc.data().review,
                         id: doc.id,
                         date: doc.data().date,
                         imgExt: doc.data().imgExt
                     }
                    reviews.push(review)                    
                })
                commit('setLoading', false)
                commit('setLoadedReviews', reviews)
             })
        },
        createReview({commit}, payload) {
            commit('setLoading', true)
            const review = {
                title: payload.title,
                author: payload.author,
                review: payload.review,                
                date: payload.date             
            }
            //firestore
            let key
            let imageURL
            let ext
            db.collection('reviews').add(review)
                .then((res) => {
                    key = res.id
                    return key
                })
                .then(key => {
                    const filename = payload.image.name
                    ext = filename.slice(filename.lastIndexOf('.'))
                    return firebase.storage().ref('reviews/' + key + ext).put(payload.image)
                })
                .then(fileData => {
                    return firebase.storage().ref('reviews/' + key + ext).getDownloadURL()
                })
                .then(URL => {
                    imageURL = URL
                    db.collection('reviews').doc(key).update({
                        image: imageURL,
                        imgExt: ext
                    })
                })
                .then(() => {
                    commit('createReview', {
                        ...review,
                        image: imageURL,
                        id: key,
                        imgExt: ext
                    })
                    commit('setLoading', false)
                })
                .catch(err => {
                    commit('setLoading', false)
                    console.log(err)
                })
            
        },
        deleteReview({commit}, payload) {            
            commit('setLoading', true)
            firebase.storage().ref(`reviews/${payload.id}${payload.imgExt}`).delete()
                .then(() => {
                    db.collection('reviews').doc(payload.id).delete()
                        .then(() =>{
                            commit('deleteReview', payload.id)                            
                            commit('setLoading', false)                                               
                        })
                        .catch(err => {
                            commit('setLoading', false)
                            console.log(err)
                        })
                })
                .catch(err => {
                    commit('setLoading', false)
                    console.log(err)
                })            
        },
        signIn({commit}, payload) {
            commit('setLoading', true)
            firebase.auth().signInWithEmailAndPassword(payload.email, payload.password)
                .then(
                    cred => {
                        commit('setLoading', false)
                        const user = {
                            id: cred.user.uid,
                            email: cred.user.email
                        }
                        commit('setUser', user)
                    }
                )
                .catch(err => {
                    commit('setLoading', false)
                    console.log(err)
                })
        },
        signOut({commit}) {
            firebase.auth().signOut().then(commit('setUser', null))
        },
        autoSignIn({commit}, payload) {
            commit('setUser', {
                id: payload.uid,
                email: payload.email
            })
        }
    }
})