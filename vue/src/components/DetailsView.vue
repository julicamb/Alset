<template>
  <div class="search">
    <h1 class="logo">Alset</h1>
    <h3 class="subtitle">{{car.title[0].value}}</h3>
      <img :src="car.field_image[0].url">
      <button class="tabButton" @click="tab = true">Info</button>
      <button class="tabButton" @click="tab = false">specs</button>
      <div v-if="tab==false">
      <div class="specs">
        <h2>Year:</h2>
        <h3>{{car.field_year[0].value}}</h3>
      </div>
      <div class="specs">
        <h2>Mileage:</h2>
        <h3>{{car.field_mileage[0].value}} km</h3>
      </div>
      <div class="specs">
        <h2>Power Output:</h2>
        <h3>{{car.field_power_output[0].value}} kwh</h3>
      </div>
      <div class="specs">
        <h2>Range:</h2>
        <h3>{{car.field_range[0].value}} km</h3>
      </div>
      <div class="specs">
        <h2>Top Speed:</h2>
        <h3>{{car.field_top_speed[0].value}} km/h</h3>
      </div>
      <div class="specs">
        <h2>0-100km/h:</h2>
        <h3>{{car.field_0_100km_h[0].value}} s</h3>
      </div>
      <div class="specs">
        <h2>Doors:</h2>
        <h3>{{car.field_doors[0].value}}</h3>
      </div>
      <div class="specs">
        <h2>Seats:</h2>
        <h3>{{car.field_seats[0].value}}</h3>
      </div>
      </div>
    <div v-if="tab==true">
      <div class="specs">
        <h2>Price per day:</h2>
        <h3>€ {{car.field_price_per_day[0].value}}</h3>
      </div>
      <div class="specs">
        <h2>Location:</h2>
        <h3>{{car.field_city[0].value}}</h3>
      </div>
      <div class="specs">
        <h2>Shared by:</h2>
        <h3>{{user.name[0].value}}</h3>
      </div>
      <div class="specs">
        <h2>State of the car:</h2>
        <h3>{{car.field_state[0].value}}</h3>
      </div>
      <div class="specs">
        <h2>Available:</h2>
        <h3>{{car.field_available[0].value}}</h3>
      </div>
      <div class="specs">
        <h2>Ratings:</h2>
        <h3>{{car.field_rating[0].value}}</h3>
      </div>
      <gmap-map
    :center="center"
    :zoom="10"
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
  </div>
</template>
<script>
import axios from 'axios'
import * as VueGoogleMaps from 'vue2-google-maps'
import Vue from 'vue'

Vue.use(VueGoogleMaps, {
  load: {
    key: 'AIzaSyAfM4locjRU0mhbasoXUbklbbb-6-EFRSk'
  }
})
export default {
  name: 'detailsview',
  data () {
    return {
      car: [],
      APIurl: window.APIurl,
      tab: false,
      user: [],
      center: {lat: 10.0, lng: 10.0},
      markers: [{
        position: {lat: 10.0, lng: 10.0}
      }]
    }
  },
  mounted () {
    // this.modelId = this.$route.params.id
    this.modelId = this.$route.params.id
    axios({ method: 'GET', url: window.APIurl + '/cars?nid=' + this.modelId }).then(result => {
      this.car = result.data[0]
      axios({
        method: 'GET',
        headers: {'Authorization': 'Basic Y21zZGV2LXVzZXI6Y21zZGV2LXBhc3M='},
        url: window.APIurl + '/user/' + this.car.field_owner[0].target_id + '?_format=json'
      }).then(result => {
        this.user = result.data
        axios({
          method: 'GET',
          url: 'https://maps.googleapis.com/maps/api/geocode/json?address=' + this.car.field_city[0].value + '&key=AIzaSyB57L9Tj6zNQzhGmiP9D7SICJjfqRrQMXI'
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
  },
  components: {
    Map
  }
}
</script>

<style>
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
img {
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
  width: 48%;
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
  width: 48%;
  float: right;
  text-align: left;
  margin: 0;
  padding: 10px 0 10px 5px;
}
.tabButton {
    background: rgba(255, 255, 255, 0.17);
    border: solid 1px white;
    height: 40px;
    width: 49%;
    margin: 0;
    margin-bottom: 20px;
    color: white;
    font-family: 'Raleway-ExtraLight';
    font-weight: 200;
    font-size: 16px;
}
map {
  width:100%;
  height: 600px;
  display: block;
}
</style>
