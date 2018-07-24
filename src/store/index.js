import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export const store = new Vuex.Store({
    state: {
        loadedReviews: [
            {date:'2018-07-01',title: 'ONE', image: "https://source.unsplash.com/random/200x200", author: 'John Doe', id:1, review: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Commodi maxime aliquid, corporis pariatur impedit sapiente dolorum nulla dolor veniam inventore!'},
            {date:'2018-07-02',title: 'TWO', image: "https://source.unsplash.com/random/200x201", author: 'John Doe', id:2, review: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Commodi maxime aliquid, corporis pariatur impedit sapiente dolorum nulla dolor veniam inventore!'},
            {date:'2018-07-03',title: 'THREE', image: "https://source.unsplash.com/random/200x202", author: 'John Doe', id:3, review: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Commodi maxime aliquid, corporis pariatur impedit sapiente dolorum nulla dolor veniam inventore!'},
            {date:'2018-07-04',title: 'FOUR', image: "https://source.unsplash.com/random/200x203", author: 'John Doe', id:4, review: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Commodi maxime aliquid, corporis pariatur impedit sapiente dolorum nulla dolor veniam inventore!'},
            {date:'2018-07-05',title: 'FIVE', image: "https://source.unsplash.com/random/200x204", author: 'John Doe', id:5, review: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Commodi maxime aliquid, corporis pariatur impedit sapiente dolorum nulla dolor veniam inventore!'},
            {date:'2018-07-06',title: 'SIX', image: "https://source.unsplash.com/random/200x205", author: 'John Doe', id:6, review: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Commodi maxime aliquid, corporis pariatur impedit sapiente dolorum nulla dolor veniam inventore!'},
            {date:'2018-07-07',title: 'SEVEN', image: "https://source.unsplash.com/random/200x206", author: 'John Doe', id:7, review: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Commodi maxime aliquid, corporis pariatur impedit sapiente dolorum nulla dolor veniam inventore!'},
            {date:'2018-07-08',title: 'EIGHT', image: "https://source.unsplash.com/random/200x207", author: 'John Doe', id:8, review: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Commodi maxime aliquid, corporis pariatur impedit sapiente dolorum nulla dolor veniam inventore!'},
            {date:'2018-07-09',title: 'NINE', image: "https://source.unsplash.com/random/200x208", author: 'John Doe', id:9, review: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Commodi maxime aliquid, corporis pariatur impedit sapiente dolorum nulla dolor veniam inventore!'},
            {date:'2018-07-10',title: 'THEN', image: "https://source.unsplash.com/random/200x209", author: 'John Doe', id:10, review: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Commodi maxime aliquid, corporis pariatur impedit sapiente dolorum nulla dolor veniam inventore!'},
            {date:'2018-07-11',title: 'ELEVEN', image: "https://source.unsplash.com/random/200x210", author: 'John Doe', id:11, review: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Commodi maxime aliquid, corporis pariatur impedit sapiente dolorum nulla dolor veniam inventore!'},
            {date:'2018-07-12',title: 'TWELVE', image: "https://source.unsplash.com/random/200x211", author: 'John Doe', id:12, review: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Commodi maxime aliquid, corporis pariatur impedit sapiente dolorum nulla dolor veniam inventore!'}
        ]
    },
    getters: {
        loadedReviews(state) {
            return state.loadedReviews.sort((reviewA, reviewB) => {
                return reviewA.date > reviewB.date
            }) 
        },
        featuredReviews(state, getters) {
            return getters.loadedReviews.slice(0, 10)
        },
        loadedReview(state) {
            return (reviewId) => {
                return state.loadedReviews.find((review) => {
                    return review.id === reviewId
                })
            }
        }
    },
    mutations: {

    },
    actions: {

    }
})