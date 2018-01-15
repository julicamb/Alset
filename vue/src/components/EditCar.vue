<template>
  <div class="search">
    <h1 class="logo" @click="GoToPage('Home')">Alset</h1>
    <h3 class="subtitle">Edit </h3>
    <form>
        <h2>Available:</h2>
        <input type="checkbox" v-model="car.field_available[0].value">
        <h2>Submodel:</h2>
        <input type='text' v-model="car.title[0].value" placeholder="ex. 90x, 100D, ...">
        <h2>Manufacturing Year:</h2>
        <input type='number' v-model="car.field_year[0].value" placeholder="ex. 2016">
        <h2>Current Mileage (in km):</h2>
        <input type='number' v-model="car.field_mileage[0].value" placeholder="ex. 38450">
        <h2>Power Output (in kwh):</h2>
        <input type='number' v-model="car.field_power_output[0].value" placeholder="ex. 230">
        <h2>Range (in km):</h2>
        <input type='number' v-model="car.field_range[0].value" placeholder="ex. 500">
        <h2>Top Speed (in km/h):</h2>
        <input type='number' v-model="car.field_top_speed[0].value" placeholder="ex. 240">
        <h2>0-100km/h Acceleration (in s):</h2>
        <input type='number' v-model="car.field_0_100km_h[0].value" placeholder="ex. 2,3">
        <h2>Doors:</h2>
        <input type='number' v-model="car.field_doors[0].value" placeholder="ex. 5">
        <h2>Seats:</h2>
        <input type='number' v-model="car.field_seats[0].value" placeholder="ex. 5">
        <h2>Price per Day (in €):</h2>
        <input type='number' v-model="car.field_price_per_day[0].value" placeholder="ex. 39,99">
        <h2>State of the Car:</h2>
        <input type='text' v-model="car.field_state[0].value" placeholder="ex. Very clean">
        <h2>Pick-Up Location Address:</h2>
        <input type='text' v-model="car.field_address[0].value" placeholder="ex. Veldstraat">
        <h2>Pick-Up Location City:</h2>
        <input type='text' v-model="car.field_city[0].value" placeholder="ex. Ghent">
        <h2>Pick-Up Location Country:</h2>
        <input type='text' v-model="car.field_country[0].value" placeholder="ex. Belgium">
    </form>
    <button @click="Update()">Update</button>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  name: 'createcar',
  data () {
    return {
      car: [],
      APIurl: window.APIurl,
      carId: null
    }
  },
  created () {
    if (localStorage.getItem('Active-User') !== null) {
      window.ActiveUser = JSON.parse(localStorage.getItem('Active-User'))
    }
  },
  mounted () {
    this.carId = this.$route.params.id
    // this.carId = 32
    axios({ method: 'GET', url: window.APIurl + '/cars?nid=' + this.carId }).then(result => {
      this.car = result.data[0]
    }, error => {
      console.error(error)
    })
  },
  methods: {
    GoToPage (page) {
      this.$router.push({name: page})
    },
    Update () {
      axios({
        method: 'PATCH',
        url: window.APIurl + '/node/' + this.carId + '?_format=json',
        headers: {
          'X-CSRF-Token': window.ActiveUser.csrf_token,
          'Content-Type': 'application/json'
        },
        data: {
          'type': [{'target_id': 'car'}],
          'title': [{'value': this.car.title[0].value}],
          'field_0_100km_h': [{'value': parseFloat(this.car.field_0_100km_h[0].value)}],
          'field_address': [{'value': this.car.field_address[0].value}],
          'field_available': [{'value': this.car.field_available[0].value}],
          'field_city': [{'value': this.car.field_city[0].value}],
          'field_country': [{'value': this.car.field_country[0].value}],
          'field_doors': [{'value': parseInt(this.car.field_doors[0].value)}],
          'field_mileage': [{'value': parseInt(this.car.field_mileage[0].value)}],
          'field_power_output': [{'value': parseInt(this.car.field_power_output[0].value)}],
          'field_price_per_day': [{'value': parseFloat(this.car.field_price_per_day[0].value)}],
          'field_range': [{'value': parseInt(this.car.field_range[0].value)}],
          'field_seats': [{'value': parseInt(this.car.field_seats[0].value)}],
          'field_state': [{'value': this.car.field_state[0].value}],
          'field_top_speed': [{'value': parseInt(this.car.field_top_speed[0].value)}],
          'field_year': [{'value': parseInt(this.car.field_year[0].value)}]
        }
      }).then(response => {
        this.$router.push({name: 'DetailsView', params: { id: this.car.nid[0].value }})
      }).catch(error => {
        console.log(error)
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