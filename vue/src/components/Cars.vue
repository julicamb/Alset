<template>
  <div class="search">
    <h1 class="logo" @click="GoToPage('Home')">Alset</h1>
    <h3 class="subtitle">Choose a car</h3>
    <button class="resButton" @click="filterVisible=true" v-if="filterVisible==false">Filter</button>
    <form v-if="filterVisible==true">
      <div class="filterDiv">
        <h2>Maximum Price per Day</h2>
        <input type='number' v-model="filterPrice" placeholder='ex. 30'>
      </div>
      <div class="filterDiv">
        <h2>Minimum Range</h2>
        <input type='number' v-model="filterRange" placeholder='ex. 500'>
      </div>
      <div class="filterDiv">
        <h2>Minimum Seats</h2>
        <input type='number' v-model="filterSeats" placeholder='ex. 5'>
      </div>
    <button class="resButton2" @click.prevent="filterSeats=null; filterPrice=null; filterRange=null" v-if="filterVisible==true">Reset</button>
    <button class="resButton2" @click.prevent="filterVisible=false" v-if="filterVisible==true">Close</button>
    </form>
    <router-link v-for="car in results"  :key="car.nid.value" :to="{ name: 'DetailsView', params: { id: car.nid[0].value }}"
    v-if="
    (filterPrice===null || car.field_price_per_day[0].value < filterPrice || filterPrice==='')
    && (filterRange===null || car.field_range[0].value >= filterRange || filterRange==='') 
    && (filterSeats===null || car.field_seats[0].value >= filterSeats || filterSeats==='')
    && car.field_available[0].value
    && car.field_owner[0].target_id != UserId
    ">
  <div class="card" :id="car.nid.value">
      <img v-if="car.field_image!==null && car.field_image.length > 0" :src="car.field_image[0].url">
      <img v-if="car.field_imagestring!==null && car.field_imagestring.length > 0" :src="car.field_imagestring[0].value">
      <h2>{{car.title[0].value}}</h2>
      <h3>{{car.field_range[0].value}}km range<br>{{car.field_seats[0].value}} seats</h3>
      <h4 class="price"><strong>€{{car.field_price_per_day[0].value}}</strong> <span class="smallText">per day</span></h4>
  </div>
    </router-link>
  </div>
    
</template>

<script>
import axios from 'axios'

export default {
  name: 'cars',
  data () {
    return {
      results: [],
      APIurl: window.APIurl,
      filterVisible: false,
      filterPrice: null,
      filterRange: null,
      filterSeats: null,
      UserId: null
    }
  },
  mounted () {
    if (localStorage.getItem('Active-User') !== null) {
      window.ActiveUser = JSON.parse(localStorage.getItem('Active-User'))
      this.UserId = window.ActiveUser.current_user.uid
    }
    // this.modelId = this.$route.params.id
    this.modelId = this.$route.params.id
    axios({ method: 'GET', url: window.APIurl + '/cars?field_model_target_id=' + this.modelId }).then(result => {
      this.results = result.data
    }, error => {
      console.error(error)
    })
  },
  methods: {
    GoToPage (page) {
      this.$router.push({name: page})
    },
    resetFilter () {
      this.filterRange = ''
      this.filterSeats = ''
      this.filterPrice = ''
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
    width: 150px;
    object-fit: cover;
    margin-top: 7px;
    margin-left: 20px;
}
a > .card > h2 {
    color: white;
    font-family: 'Raleway';
    font-weight: 200;
    letter-spacing: 2px;
    text-align: center;
    font-size: 14px;
    margin-top: 7px;
    margin-bottom: 30px;
}
a > .card > h4 {
    color: white;
    font-family: 'Raleway';
    font-weight: 200;
    letter-spacing: 2px;
    text-align: right;
    margin-right: 20px;
    font-size: 18px;
    margin-top: 7px;
}
a > .card > h3 {
    text-align: left;
    color: white;
    font-family: 'Raleway';
    font-weight: 200;
    letter-spacing: 2px;
    float: left;
    margin-left: 20px;
    font-size: 12px;
    margin-top: -10px;
}
.smallText {
    font-size: 10px;
}
.resButton {
    background: rgba(46, 204, 113, 0.2);
    border: solid 1px white;
    height: 40px;
    width: 98%;
    margin: 0;
    margin-bottom: 10px;
    margin-top: 10px;
    color: white;
    font-family: 'Raleway-ExtraLight';
    font-weight: 200;
    font-size: 16px;
    border-radius: 0;
}
.resButton2 {
    height: 40px;
    width: 48%;
    margin: 0;
    margin-bottom: 10px;
    margin-top: 10px;
    color: white;
    font-family: 'Raleway-ExtraLight';
    font-weight: 200;
    font-size: 16px;
}
form {
  width:80%;
  margin-left: 10%;
  background: rgba(46, 204, 113, 0.2);
  border: solid 1px white;
  margin-bottom: 10px;
  margin-top: 10px;
  border-radius: 0;
}
.filterDiv {
  width: 30%;
  margin: 2px;
  clear: both;
  display: inline-block;
}
::-webkit-input-placeholder {
  color: rgba(255, 255, 255, 0.7)
}
input {
  font-family: 'Raleway-ExtraLight';
  font-weight:200;
  background: transparent;
  border: 1px solid white;
  margin-bottom: 10px;
  color: white;
  width:80%;
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
