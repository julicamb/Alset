import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/Home'
import Models from '@/components/Models'
import Cars from '@/components/Cars'
import DetailsView from '@/components/DetailsView'
import Stations from '@/components/Stations'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home
    },
    {
      path: '/models',
      name: 'Models',
      component: Models
    },
    {
      path: '/cars',
      name: 'Cars',
      component: Cars
    },
    {
      path: '/detailsview',
      name: 'DetailsView',
      component: DetailsView
    },
    {
      path: '/stations',
      name: 'Stations',
      component: Stations
    }
  ]
})
