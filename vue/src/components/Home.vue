<template>
  <div class="home">
    <h1 class="homeLogo">Alset</h1>
    <button class="button1" @click="GoToPage('Models')">Find a Car</button><br>
    <button class="button2" @click="AuthCheck()">{{ BtnTwo }}</button><br>
    <button class="button2" @click="GoToPage('Stations')">Charging stations</button><br>
    <button class='button2' v-if="UserLoggedIn === true" @click="Logout()">Logout</button>
  </div>
    
</template>

<script>
import axios from 'axios'

export default {
  name: 'home',
  data () {
    return {
      UserLoggedIn: false,
      BtnTwo: 'Login'
    }
  },
  created () {
    if (localStorage.getItem('Active-User') !== null) {
      window.ActiveUser = JSON.parse(localStorage.getItem('Active-User'))
      this.UserLoggedIn = true
      this.BtnTwo = 'My Account'
    }
  },
  methods: {
    GoToPage (page) {
      this.$router.push({name: page})
    },
    AuthCheck () {
      if (this.UserLoggedIn) {
        this.$router.push('UserDetails')
      } else {
        this.$router.push('Login')
      }
    },
    Logout () {
      axios({
        method: 'get',
        url: 'http://cmsdev.localhost:8080?q=user/logout?_format=json'
      }).then(response => {
        console.log(window.ActiveUser.current_user.name + ' is now logged out')
        localStorage.removeItem('Active-User')
        this.$router.go({name: 'Home'})
      }).catch(error => {
        console.error(error)
      })
    }
  }
}
</script>
<style>
.homeLogo {
  color: white;
  font-family: 'ZELDA';
  src: url('../assets/fonts/ZELDA.otf');
  font-size: 70px;
  letter-spacing: 30px;
  padding-left: 30px;
}
button{
  width: 200px;
  border-radius: 100px;
  background: transparent;
  border: 1px solid white;
  padding: 8px 16px;
  color: white;
}
.button1 {
  margin-top: 300px;
}
.button2 {
  margin-top: 20px;
}
</style>
