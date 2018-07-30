import Vue from 'vue'
import Router from 'vue-router'
import Index from '@/components/Index'
import About from '@/components/About'
import AddReview from '@/components/Review/AddReview'
import EditReview from '@/components/Review/EditReview'
import ShowReview from '@/components/ShowReview'
import Admin from '@/components/Parts/Admin'

Vue.use(Router)

export default new Router({
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
      component: AddReview
    },
    {
      path: '/edit/:id',
      name: 'EditReview',
      component: EditReview
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
