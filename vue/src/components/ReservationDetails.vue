<template>
  <div class="search">
    <h1 class="logo" @click="GoToPage('Home')">Alset</h1>
    <h3 class="subtitle">{{reservation.title[0].value}}</h3>
      <img class="carImage" :src="car.field_image[0].url">
      <button class="tabButton" @click="tab = 1">Info</button>
      <button class="tabButton" @click="tab = 2">Car</button>
      <button class="tabButton" @click="tab = 3">Owner</button>
    <div v-if="tab==1">
      <div class="specs">
        <h2>Status:</h2>
        <h3 v-if="reservation.field_canceled[0].value">Canceled</h3>
        <h3 v-if="!reservation.field_canceled[0].value">Active</h3>
      </div>
      <div class="specs">
        <h2>Days:</h2>
        <h3 v-if="reservation.field_days[0].value===1">{{reservation.field_days[0].value}} day</h3>
        <h3 v-if="reservation.field_days[0].value!==1">{{reservation.field_days[0].value}} days</h3>
      </div>
      <div class="specs">
        <h2>Total Price:</h2>
        <h3>€ {{reservation.field_price[0].value}}</h3>
      </div>
      <div class="specs">
        <h2>Start Date:</h2>
        <h3>{{reservation.field_start_date[0].value}}</h3>
      </div>
    </div>
      <div v-if="tab==2">
      <div class="specs">
        <h2>Car:</h2>
        <h3>{{car.title[0].value}}</h3>
      </div>
      <div class="specs">
        <h2>Address:</h2>
        <h3>{{car.field_address[0].value}}</h3>
      </div>
      <div class="specs">
        <h2>City:</h2>
        <h3>{{car.field_city[0].value}}</h3>
      </div>
      <div class="specs">
        <h2>Country:</h2>
        <h3>{{car.field_country[0].value}}</h3>
      </div>
    
      <router-link :to="{ name: 'DetailsView', params: { id: car.nid[0].value }}">      
          <button class="resButton" >More...</button>
    </router-link>

      <gmap-map
    :center="center"
    :zoom="16"
    style="width: 100vw; height: 300px"
  >
    <gmap-marker
      :key="index"
      v-for="(m, index) in markers"
      :position="m.position"
      :clickable="true"
      :draggable="true"
      @click="center=m.position"
    ></gmap-marker>
  </gmap-map>
      </div>
      <div v-if="tab==3">
      <div class="specs">
        <h2>Owner:</h2>
        <h3>{{user.name[0].value}}</h3>
      </div>
      <div class="specs">
        <h2>Mail:</h2>
        <h3>{{user.mail[0].value}}</h3>
      </div>
      <div class="specs">
        <h2>Phone number:</h2>
        <h3>{{user.field_phone_number[0].value}}</h3>
      </div>
      <router-link :to="{ name: 'Profile', params: { id: user.uid[0].value }}">      
          <button class="resButton" >More...</button>
    </router-link>
      </div>
  </div>
</template>
<script>
import axios from 'axios'
import * as VueGoogleMaps from 'vue2-google-maps'
import Vue from 'vue'
import moment from 'moment'

Vue.use(VueGoogleMaps, {
  load: {
    key: 'AIzaSyAfM4locjRU0mhbasoXUbklbbb-6-EFRSk'
  }
})
export default {
  name: 'reservationdetails',
  data () {
    return {
      car: [],
      APIurl: window.APIurl,
      tab: 1,
      user: [],
      center: {lat: 10.0, lng: 10.0},
      markers: [{
        position: {lat: 10.0, lng: 10.0}
      }],
      reservation: [],
      reservationId: null
    }
  },
  mounted () {
    this.reservationId = this.$route.params.id
    // this.reservationId = 17
    axios({ method: 'GET', url: window.APIurl + '/reservation?nid=' + this.reservationId }).then(result => {
      this.reservation = result.data[0]
      this.reservation.field_start_date[0].value = moment(this.reservation.field_start_date[0].value).format('DD-MM-YYYY')
      axios({ method: 'GET', url: window.APIurl + '/cars?nid=' + this.reservation.field_car[0].target_id }).then(result => {
        this.car = result.data[0]
        axios({ method: 'GET', url: window.APIurl + '/user/' + this.car.field_owner[0].target_id + '?_format=json' }).then(result => {
          this.user = result.data
          axios({
            method: 'GET',
            url: 'https://maps.googleapis.com/maps/api/geocode/json?address=' + this.car.field_address[0].value + '&key=AIzaSyB57L9Tj6zNQzhGmiP9D7SICJjfqRrQMXI'
          }).then(result => {
            this.markers[0].position.lat = result.data.results[0].geometry.location.lat
            this.markers[0].position.lng = result.data.results[0].geometry.location.lng
            this.center.lat = result.data.results[0].geometry.location.lat
            this.center.lng = result.data.results[0].geometry.location.lng
          }, error => {
            console.error(error)
          })
        }, error => {
          console.error(error)
        })
      }, error => {
        console.error(error)
      })
    }, error => {
      console.error(error)
    })
  },
  components: {
    Map
  },
  methods: {
    GoToPage (page) {
      this.$router.push({name: page})
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
.smallText {
    font-size: 10px;
}
.carImage {
 width: 100vw;
 margin: 0;
}
.specs {
  clear: both;
  overflow: auto;
  border-bottom: solid 1px white;
}
.specs > h2 {
  color: white;
  font-family: 'Raleway-ExtraLight';
  font-weight: 200;
  font-size: 14px;
  width: 30%;
  text-align: right;
  float: left;
  margin: 0;
  padding: 10px 5px 10px 0;
}
.specs > h3 {
  color: white;
  font-family: 'Raleway-ExtraLight';
  font-weight: 200;
  font-size: 14px;
  width: 66%;
  float: right;
  margin: 0;
  padding: 10px 0 10px 5px;
  text-align: center;
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
    border-radius: 0;
}
.resButton {
    background: rgba(255, 255, 255, 0.2);
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
map {
  width:100%;
  height: 600px;
  display: block;
}
</style>
