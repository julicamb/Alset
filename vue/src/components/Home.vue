<template>
  <div class="home">
    <h1 class="homeLogo">Alset</h1>
    <button class="button1" @click="GoToPage('Models')">Find a Car</button><br>
    <button class="button2" @click="AuthCheck()">{{ BtnTwo }}</button><br>
    <button class="button2" @click="GoToPage('Stations')">Charging stations</button>
  </div>
    
</template>

<script>
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
