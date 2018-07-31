import Vue from 'vue'
import Router from 'vue-router'
import Index from '@/components/Index'
import About from '@/components/About'
import AddReview from '@/components/Review/AddReview'
import EditReview from '@/components/Review/EditReview'
import ShowReview from '@/components/ShowReview'
import Admin from '@/components/Parts/Admin'
import firebase from 'firebase/app'
import 'firebase/auth'

Vue.use(Router)

let router = new Router({
  routes: [
    {
      path: '/',
      name: 'Index',
      component: Index
    },
    {
      path: '/about',
      name: 'About',
      component: About
    },
    {
      path: '/add',
      name: 'AddReview',
      component: AddReview,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/edit/:id',
      name: 'EditReview',
      component: EditReview,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/review/:id',
      name: 'ShowReview',
      props: true,
      component: ShowReview
    },
    {
      path: '/admin',
      name: 'Admin',
      component: Admin
    }
    
  ],
  mode: 'history'
})

router.beforeEach((to, from, next) => {
  if(to.matched.some(record => record.meta.requiresAuth)) {
    if (firebase.auth().currentUser) {
      next()
    } else {
      next('/')
    }
  } else {
    next()
  }
})

export default router