<template>
  <div class="search">
    <h1 class="logo" @click="GoToPage('Home')">Alset</h1>
    <h3 class="subtitle">Log in to continue</h3>
     <form>
        <input type='text' id='username' placeholder='Username'>
        <input type='password' id='password' placeholder='Password'>
    </form>
    <button class='login' @click="Login()">Log In</button>
  </div>
    
</template>

<script>
import axios from 'axios'

export default {
  name: 'login',
  data () {
    return {
      results: [],
      APIurl: window.APIurl
    }
  },
  mounted () {
    if (localStorage.getItem('Active-User') !== null) {
      window.ActiveUser = JSON.parse(localStorage.getItem('Active-User'))
      console.log(window.ActiveUser)
    }
  },
  methods: {
    GoToPage (page) {
      this.$router.push({name: page})
    },
    Login () {
      axios({
        method: 'post',
        url: this.APIurl + '/user/login?_format=json',
        data: {
          name: 'cmsdev-user',
          pass: 'cmsdev-pass'
        }
      }).then(response => {
        localStorage.setItem('Active-User', JSON.stringify(response.data))
        if (localStorage.getItem('Active-User') !== null) {
          window.ActiveUser = JSON.parse(localStorage.getItem('Active-User'))
          console.log(window.ActiveUser)
        }
        console.log(window.ActiveUser.current_user.name + ' is now logged in')
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
form {
  width:80%;
  margin-left: 8%;
}
input {
  font-family: 'Raleway-ExtraLight';
  font-weight:200;
  background: transparent;
  border: 1px solid white;
  margin-bottom: 10px;
  color: white;
  width:100%;
  padding: 8px 0 8px 16px;
  height:36px;
  font-size:16px;
}
button{
  width: 200px;
  border-radius: 100px;
  background: transparent;
  border: 1px solid white;
  margin-top: 20px;
  padding: 8px 16px;
  color: white;
}
</style>
