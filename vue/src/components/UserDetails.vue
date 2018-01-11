<template>
  <div class="search">
    <h1 class="logo" @click="GoToPage('Home')">Alset</h1>
    <h3 class="subtitle" v-if="User !== null">{{ User.name[0].value }}</h3>
    <h3 class="subtitle"></h3>
      <img >
      <button class="tabButton" @click="tab = 1">Info</button>
      <button class="tabButton" @click="tab = 2">Reservations</button>
      <button class="tabButton" @click="tab = 3">Cars</button>
      <div v-if="tab==1">
      <div class="specs">
        <h2>Email:</h2>
        <h3>{{ User.mail[0].value }}</h3>
      </div>
      </div>
    <div v-if="tab==2">
        <div class="specs">
        <h2>Reservations</h2>
        <h3></h3>
      </div>
    </div>
    <div v-if="tab==3">
        <div class="specs">
        <h2>Cars</h2>
        <h3></h3>
      </div>
    </div>
  </div>
    
</template>

<script>
import axios from 'axios'

export default {
  name: 'userdetails',
  data () {
    return {
      User: [],
      tab: 1
    }
  },
  created () {
    if (localStorage.getItem('Active-User') !== null) {
      window.ActiveUser = JSON.parse(localStorage.getItem('Active-User'))
    }
  },
  methods: {
    GoToPage (page) {
      this.$router.push({name: page})
    }
  },
  mounted () {
    axios({
      method: 'GET',
      url: window.APIurl + '/user/' + window.ActiveUser.current_user.uid + '?_format=json'
    }).then(result => {
      this.User = result.data
    }, error => {
      console.error(error)
    })
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
.tabButton {
    background: rgba(255, 255, 255, 0.17);
    border: solid 1px white;
    height: 40px;
    width: 32%;
    margin: 0;
    margin-bottom: 20px;
    color: white;
    font-family: 'Raleway-ExtraLight';
    font-weight: 200;
    font-size: 16px;
}
</style>
