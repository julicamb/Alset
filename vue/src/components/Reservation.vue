<template>
  <div class="search">
    <h1 class="logo" @click="GoToPage('Home')">Alset</h1>
    <h3 class="subtitle">Reservation</h3>
    <form>
    <h2>Car: {{ this.car.title[0].value }}</h2>
        <h2>You can choose a cutsom title</h2>
        <input type='text' v-model="resTitle" placeholder='Title (Optional)'>
        <h2>How many days?</h2>
        <select v-model="resDays" @change="getTotal()">
            <option v-for="n in 10" :key="n" :value="n">{{ n }}</option>
        </select>
        <h2>Price per day is: {{ resPrice }}</h2>
        <h2>Total price is: {{ totalPrice }}</h2>
        <h2>When will your rental start?</h2>
        <input type='date' v-model="resStartDate">
    </form>
    <button @click="Reserve()">Reserve</button>
  </div>
</template>

<script>
import axios from 'axios'
import moment from 'moment'

export default {
  name: 'reservation',
  data () {
    return {
      car: null,
      APIurl: window.APIurl,
      carId: this.$route.params.id,
      resTitle: null,
      resDays: 1,
      resPrice: null,
      totalPrice: null,
      resStartDate: moment(new Date()).format('YYYY-MM-DD')
    }
  },
  created () {
    if (localStorage.getItem('Active-User') !== null) {
      window.ActiveUser = JSON.parse(localStorage.getItem('Active-User'))
    }
  },
  mounted () {
    axios({ method: 'GET', url: window.APIurl + '/cars?nid=' + this.carId }).then(result => {
      this.car = result.data[0]
      this.resPrice = this.car.field_price_per_day[0].value
      this.getTotal()
    }, error => {
      console.error(error)
    })
  },
  methods: {
    GoToPage (page) {
      this.$router.push({name: page})
    },
    getTotal () {
      this.totalPrice = this.resPrice * this.resDays
    },
    Reserve () {
      if (this.resTitle === null) {
        this.resTitle = moment(new Date(this.resStartDate)).format('L') + ' Reservation'
      }
      this.resStartDate = moment(this.resStartDate).format()
      axios({
        method: 'post',
        url: this.APIurl + '/node?_format=hal_json',
        headers: {
          'X-CSRF-Token': window.ActiveUser.csrf_token
        },
        data: {
          'type': [{ 'target_id': 'reservation' }],
          'title': [{ 'value': this.resTitle }],
          'field_car': [{ 'target_id': this.carId }],
          'field_customer': [{ 'target_id': window.ActiveUser.current_user.uid }],
          'field_days': [{ 'value': this.resDays }],
          'field_price': [{ 'value': this.totalPrice }],
          'field_start_date': [{ 'value': this.resStartDate }],
          'field_image_url': [{ 'value': this.car.field_image[0].url }]
        }
      }).then(result => {
        this.$router.push({'name': 'Home'})
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