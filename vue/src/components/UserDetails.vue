<template>
  <div class="search">
    <h1 class="logo" @click="GoToPage('Home')">Alset</h1>
    <h3 class="subtitle" v-if="User !== null">UserDetails - {{ User.current_user.name }}</h3>
    <button class='logout' @click="Logout()">Logout</button>
  </div>
    
</template>

<script>
import axios from 'axios'

export default {
  name: 'userdetails',
  data () {
    return {
      User: {}
    }
  },
  created () {
    if (localStorage.getItem('Active-User') !== null) {
      window.ActiveUser = JSON.parse(localStorage.getItem('Active-User'))
    }
    this.User = window.ActiveUser
  },
  methods: {
    GoToPage (page) {
      this.$router.push({name: page})
    },
    Logout () {
      axios({
        method: 'get',
        url: 'http://cmsdev.localhost:8080?q=user/logout?_format=json'
      }).then(response => {
        console.log(window.ActiveUser.current_user.name + ' is now logged out')
        localStorage.removeItem('Active-User')
        this.$router.push({name: 'Home'})
      }).catch(error => {
        console.error(error)
      })
    }
  }
}
</script>
<style>
.subtitle {
    font-family: 'Raleway-ExtraLight';
    font-weight: 200;
    font-size: 25px;
    color: white;
    margin-top: 100px;
}
</style>
