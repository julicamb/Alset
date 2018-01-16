<template>
  <div class="search">
    <h1 class="logo" @click="GoToPage('Home')">Alset</h1>
    <h3 class="subtitle">Register</h3>
    <form>
        <h2>What is your name?</h2>
        <input type='text' v-model="user.name" placeholder="ex. John Doe">
        <h2>What is your password?</h2>
        <input type='password' v-model="user.pass">
        <h2>Confirm password</h2>
        <input type='password' v-model="user.pass2">
        <h1 v-if="user.pass!==user.pass2" class="error">Passwords don't match</h1>
        <h2>What is your Email?</h2>
        <input type='text' v-model="user.mail" placeholder="ex. john.doe@gmail.com">
        <h2>What is your address?</h2>
        <input type='text' v-model="user.address" placeholder="ex. Veldstraat">
        <h2>In what city do you live?</h2>
        <input type='text' v-model="user.city" placeholder="ex. Ghent">
        <h2>In what country do you live?</h2>
        <input type='text' v-model="user.country" placeholder="ex. Belgium">
        <h2>What is your phone number</h2>
        <input type='number' v-model="user.phone" placeholder="ex. 0493123456">
        <h2>Add a picture</h2>
        <input type='file' id="Picture">
    </form>
    <button @click="Upload()">Create</button>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  name: 'createuser',
  data () {
    return {
      user: {
        name: null,
        address: null,
        city: null,
        country: null,
        phone: null,
        image: null,
        mail: null,
        pass: null,
        pass2: null
      },
      APIurl: window.APIurl,
      token: null
    }
  },
  created () {
  },
  mounted () {
  },
  methods: {
    GoToPage (page) {
      this.$router.push({name: page})
    },
    Upload () {
      var self = this
      var file = document.querySelector('#Picture').files[0]
      var reader = new FileReader()
      reader.readAsDataURL(file)
      reader.onload = function () {
        self.user.image = reader.result
        self.MakeUser()
      }
    },
    MakeUser () {
      axios({ method: 'GET', url: window.APIurl + '/session/token' }).then(result => {
        this.token = result.data
        axios({
          method: 'post',
          url: this.APIurl + '/entity/user?_format=hal_json',
          headers: {
            'X-CSRF-Token': this.token,
            'Content-Type': 'application/json'
          },
          data: {
            'name': [{'value': this.user.name}],
            'pass': [{'value': this.user.pass}],
            'field_address': [{'value': this.user.address}],
            'field_city': [{'value': this.user.city}],
            'field_country': [{'value': this.user.country}],
            'timezone': [{'value': 'Europe/Brussels'}],
            'mail': [{'value': this.user.mail}],
            'init': [{'value': this.user.mail}],
            'field_phone_number': [{'value': parseInt(this.user.phone)}],
            'field_imagestring': [{'value': this.user.image}],
            'status': [{'value': true}]
          }
        }).then(result => {
          this.$router.push('Login')
        }, error => {
          console.error(error)
        })
      }, error => {
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
    margin-top: 20px;
}
.card {
    background: rgba(255, 255, 255, 0.17);
    border: solid 1px white;
    height: 104px;
    margin-bottom: 20px;
}
.card > img {
    float: left;
    height: 90px;
    margin-top: 7px;
    margin-left: 20px;
}
.card > h2 {
    color: white;
    font-family: 'ZELDA';
    letter-spacing: 8px;
    float: right;
    margin-right: 20px;
    font-size: 18px;
    margin-top: 43px;
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
.error {
  font-family: 'Raleway-ExtraLight';
  font-weight:200;
  color: orange;
  font-size: 20px;
}
form {
  width:80%;
  margin-left: 8%;
}
input, select {
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
h2 {
  color: white;
  font-family: 'Raleway-ExtraLight';
  font-weight: 200;
  font-size: 14px;
  width: 98%;
  text-align: left;
  padding-left: 10px;
}
</style>