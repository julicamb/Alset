<template>
  <div class="search">
    <h1 class="logo" @click="GoToPage('Home')">Alset</h1>
    <h3 class="subtitle">Add a car</h3>
    <form>
        <h2>What model is it?</h2>
        <select v-model="car.model">
            <option v-for="m in models" :key="m.name" :value="m.id">{{ m.name }}</option>
        </select>
        <h2>What is the submodel of the car?</h2>
        <input type='text' v-model="car.title" placeholder="ex. 90x, 100D, ...">
        <h2>What is the manufacturing year?</h2>
        <input type='number' v-model="car.year" placeholder="ex. 2016">
        <h2>What is the current mileage? (in km)</h2>
        <input type='number' v-model="car.mileage" placeholder="ex. 38450">
        <h2>What is the power output? (in kwh)</h2>
        <input type='number' v-model="car.power" placeholder="ex. 230">
        <h2>What is the range? (in km)</h2>
        <input type='number' v-model="car.range" placeholder="ex. 500">
        <h2>What is the top speed? (in km/h)</h2>
        <input type='number' v-model="car.speed" placeholder="ex. 240">
        <h2>What is the 0-100km/h acceleration? (in s)</h2>
        <input type='number' v-model="car.acceleration" placeholder="ex. 2,3">
        <h2>How many doors?</h2>
        <input type='number' v-model="car.doors" placeholder="ex. 5">
        <h2>How many seats?</h2>
        <input type='number' v-model="car.seats" placeholder="ex. 5">
        <h2>What price do you ask per day? (in €)</h2>
        <input type='number' v-model="car.price" placeholder="ex. 39,99">
        <h2>What is the general state of the car?</h2>
        <input type='text' v-model="car.state" placeholder="ex. Very clean">
        <h2>What is the pick-up location's address</h2>
        <input type='text' v-model="car.address" placeholder="ex. Veldstraat">
        <h2>What is the pick-up location's city?</h2>
        <input type='text' v-model="car.city" placeholder="ex. Ghent">
        <h2>What is the pick-up location's country?</h2>
        <input type='text' v-model="car.country" placeholder="ex. Belgium">
        <h2>Add a picture</h2>
        <input type='file' id="Picture">
    </form>
    <button @click="Upload()">Create</button>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  name: 'createcar',
  data () {
    return {
      models: [],
      car: {
        title: null,
        userId: null,
        acceleration: null,
        address: null,
        city: null,
        country: null,
        doors: null,
        mileage: null,
        model: null,
        power: null,
        price: null,
        range: null,
        seats: null,
        state: null,
        speed: null,
        year: null,
        image: null
      },
      APIurl: window.APIurl
    }
  },
  created () {
    if (localStorage.getItem('Active-User') !== null) {
      window.ActiveUser = JSON.parse(localStorage.getItem('Active-User'))
      this.car.userId = window.ActiveUser.current_user.uid
    }
  },
  mounted () {
    axios({ method: 'GET', url: window.APIurl + '/models' }).then(result => {
      this.models = result.data
    }, error => {
      console.error(error)
    })
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
        self.car.image = reader.result
        self.Reserve()
      }
    },
    Reserve () {
      this.car.title = this.car.title + ' ' + this.car.year
      axios({
        method: 'post',
        url: this.APIurl + '/node?_format=hal_json',
        headers: {
          'X-CSRF-Token': window.ActiveUser.csrf_token,
          'Content-Type': 'application/json'
        },
        data: {
          'type': [{'target_id': 'car'}],
          'title': [{'value': this.car.title}],
          'uid': [{'target_id': parseInt(this.car.userId)}],
          'field_0_100km_h': [{'value': parseFloat(this.car.acceleration)}],
          'field_address': [{'value': this.car.address}],
          'field_available': [{'value': true}],
          'field_city': [{'value': this.car.city}],
          'field_country': [{'value': this.car.country}],
          'field_doors': [{'value': parseInt(this.car.doors)}],
          'field_imagestring': [{'value': this.car.image}],
          'field_mileage': [{'value': parseInt(this.car.mileage)}],
          'field_model': [{'target_id': this.car.model}],
          'field_owner': [{'target_id': parseInt(this.car.userId)}],
          'field_power_output': [{'value': parseInt(this.car.power)}],
          'field_price_per_day': [{'value': parseFloat(this.car.price)}],
          'field_range': [{'value': parseInt(this.car.range)}],
          'field_rating': [{'value': 4}],
          'field_seats': [{'value': parseInt(this.car.seats)}],
          'field_state': [{'value': this.car.state}],
          'field_top_speed': [{'value': parseInt(this.car.speed)}],
          'field_year': [{'value': parseInt(this.car.year)}]
        }
      }).then(result => {
        this.$router.push('UserDetails')
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