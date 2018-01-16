import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/Home'
import Models from '@/components/Models'
import Cars from '@/components/Cars'
import DetailsView from '@/components/DetailsView'
import Stations from '@/components/Stations'
import Login from '@/components/Login'
import UserDetails from '@/components/UserDetails'
import Reservation from '@/components/Reservation'
import ReservationDetails from '@/components/ReservationDetails'
import Profile from '@/components/Profile'
import CreateCar from '@/components/CreateCar'
import EditCar from '@/components/EditCar'
import CreateUser from '@/components/CreateUser'

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
    },
    {
      path: '/login',
      name: 'Login',
      component: Login
    },
    {
      path: '/userdetails',
      name: 'UserDetails',
      component: UserDetails
    },
    {
      path: '/reservation',
      name: 'Reservation',
      component: Reservation
    },
    {
      path: '/reservationdetails',
      name: 'ReservationDetails',
      component: ReservationDetails
    },
    {
      path: '/profile',
      name: 'Profile',
      component: Profile
    },
    {
      path: '/createcar',
      name: 'CreateCar',
      component: CreateCar
    },
    {
      path: '/editcar',
      name: 'EditCar',
      component: EditCar
    },
    {
      path: '/createuser',
      name: 'CreateUser',
      component: CreateUser
    }
  ]
})
