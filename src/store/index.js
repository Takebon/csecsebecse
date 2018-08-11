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
        messages: [],
        user: null,
        loading: false,
        errorMsg: null
        },
        //-------------------------------------------------------------
     getters: {
        loadedReviews(state) {
            return state.loadedReviews.sort((a, b) => (a.date > b.date ? -1 : 1)) 
        },
        featuredReviews(state, getters) {
            return getters.loadedReviews.slice(0, 50)
        },
        loadedReview(state) {
            return (reviewId) => {                
                return state.loadedReviews.find((review) => {
                    return review.id == reviewId
                })
            }
        },
        loadMessages(state) {
            return state.messages.sort((messageA, messageB) => {
                return messageA.date < messageB.date
            })
        },
        user(state) {
            return state.user
        },
        loading(state) {
            return state.loading
        },
        errorMsg(state) {
            return state.errorMsg
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
        },
        createMessage(state, payload) {
            state.messages.push(payload)
        },
        setLoadedMessages(state, payload) {
            state.messages = payload
        },
        deleteMessage(state, payload) {
            state.messages = state.messages.filter(message => {
                return message.id != payload
            })
        },
        setErrorMsg(state, payload) {
            state.errorMsg = payload
        },
        clearErrorMsg(state) {
            state.errorMsg = null
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
            commit('clearErrorMsg')
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
                    commit('setErrorMsg', err.message)
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
        },
        createMessage({commit}, payload) {
            commit('setLoading', true)
            const message = {
                name: payload.name,
                email: payload.email,
                message: payload.message,
                date: payload.date
            }
            db.collection('messages').add(message)
                .then(req => {
                    commit('setLoading', false)
                    commit('createMessage', {
                        ...message,
                        id: req.id
                    })
                })
                .catch(err => {
                    commit('setLoading', false)
                    console.log(err)
                })
        },
        loadMessages({commit}) {
            commit('setLoading', true)
            db.collection('messages').get()
             .then(snapshot => {
                 let messages = []
                 snapshot.forEach(doc => {
                     let message = {
                         name: doc.data().name,
                         email: doc.data().email,
                         message: doc.data().message,
                         date: doc.data().date,
                         id: doc.id                         
                     }
                    messages.push(message)                    
                })
                commit('setLoadedMessages', messages)
                commit('setLoading', false)
             }).catch(err => {
                commit('setLoading', false)
                console.log(err)
            })
        },
        deleteMessage({commit}, payload) {
            db.collection('messages').doc(payload).delete()
                .then(() => {
                    commit('deleteMessage', payload)
                }).catch(err => {                    
                    console.log(err)
                })
        }
    }
})