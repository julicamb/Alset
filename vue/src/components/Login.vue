<template>
  <div class="search">
    <h1 class="logo" @click="GoToPage('Home')">Alset</h1>
    <h3 class="subtitle">Log in to continue</h3>
     <form>
        <input type='text' id='username' v-model="Username" placeholder='Username'>
        <input type='password' id='password' v-model="Password" placeholder='Password'>
    </form>
    <button class='login button2' @click="Login()">Log In</button>
      <h2>Don't have an account yet?</h2>
    <button class='login' @click="GoToPage('CreateUser')">Register</button>
  </div>
    
</template>

<script>
import axios from 'axios'

export default {
  name: 'login',
  data () {
    return {
      results: [],
      APIurl: window.APIurl,
      Username: null,
      Password: null,
      CarId: null
    }
  },
  mounted () {
    if (localStorage.getItem('Active-User') !== null) {
      window.ActiveUser = JSON.parse(localStorage.getItem('Active-User'))
      console.log(window.ActiveUser)
    }
    if (this.$route.params.id !== null) {
      this.carId = this.$route.params.id
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
          name: this.Username,
          pass: this.Password
        }
      }).then(response => {
        localStorage.setItem('Active-User', JSON.stringify(response.data))
        if (localStorage.getItem('Active-User') !== null) {
          window.ActiveUser = JSON.parse(localStorage.getItem('Active-User'))
          console.log(window.ActiveUser)
        }
        console.log(window.ActiveUser.current_user.name + ' is now logged in')
        if (this.carId == null) {
          this.$router.push({ name: 'Home' })
        } else {
          this.$router.push({ name: 'DetailsView', params: { id: this.carId } })
        }
      }).catch(error => {
        console.error(error)
      })
    }
  }
}
</script>
<style scoped>
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
.button2{
  background: rgba(46, 204, 113, 0.2);
}
h2 {
  color: white;
  font-family: 'Raleway-ExtraLight';
  font-weight: 200;
  font-size: 14px;
  width: 98%;
  text-align: center;
  padding-left: 10px;
  margin-top: 40px;
  margin-bottom: 0;
}
</style>
