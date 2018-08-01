import Vue from 'vue'
import Vuex from 'vuex'
import firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/storage'
import db from '../firebase/init'


Vue.use(Vuex)

export const store = new Vuex.Store({
    state: {
        loadedReviews: [],
        user: null,
        loading: false
        },
        //-------------------------------------------------------------
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
    //-----------------------------------------------------------------
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
        },
        updateReview(state, payload) {
            const review = state.loadedReviews.find(review => {
                return review.id === payload.id
            })
            if (payload.author) {
                review.author = payload.author
            }
            if (payload.title) {
                review.title = payload.title
            }
            if (payload.review) {
                review.review = payload.review
            }
        }
    },
    //-----------------------------------------------------------------
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
                commit('setLoadedReviews', reviews)
                commit('setLoading', false)
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
        editReview({commit}, payload) {
            commit('setLoading', true)
            db.collection('reviews').doc(payload.id).update({
                author: payload.author,
                title: payload.title,
                review: payload.review
            })
            .then(() => {
                commit('updateReview', payload)
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