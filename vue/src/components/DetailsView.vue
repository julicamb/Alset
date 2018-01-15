<template>
  <div class="search">
    <h1 class="logo" @click="GoToPage('Home')">Alset</h1>
    <h3 class="subtitle">{{car.title[0].value}}</h3>
      <img class="carImage" v-if="car.field_image.length > 0" :src="car.field_image[0].url">
      <img class="carImage" v-if="car.field_imagestring.length > 0" :src="car.field_imagestring[0].value">
      <router-link v-if="car.field_owner[0].target_id != currentUser.current_user.uid" :to="{ name: 'Reservation', params: { id: car.nid[0].value }}">
      <button class="resButton">Reserve this car</button>
    </router-link>
    <router-link v-if="car.field_owner[0].target_id == currentUser.current_user.uid" :to="{ name: 'EditCar', params: { id: car.nid[0].value }}">
      <button class="resButton">Edit</button>
    </router-link>
      <button class="tabButton" @click="tab = true">Informations</button>
      <button class="tabButton" @click="tab = false">Specifications</button>
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

      <router-link :to="{ name: 'Profile', params: { id: user.uid[0].value }}">      
          <button class="resButton whithy" >{{user.name[0].value}}'s Profile</button>
    </router-link>
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
      tab: true,
      user: [],
      center: {lat: 10.0, lng: 10.0},
      markers: [{
        position: {lat: 10.0, lng: 10.0}
      }],
      currentUser: null
    }
  },
  created () {
  },
  mounted () {
    if (localStorage.getItem('Active-User') !== null) {
      this.currentUser = JSON.parse(localStorage.getItem('Active-User'))
    }
    // this.modelId = this.$route.params.id
    this.modelId = this.$route.params.id
    axios({ method: 'GET', url: window.APIurl + '/cars?nid=' + this.modelId }).then(result => {
      this.car = result.data[0]
      axios({
        method: 'GET',
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
          console.log(this.car.field_owner[0].target_id)
          console.log(this.currentUser.current_user.uid)
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
    width: 49%;
    margin: 0;
    margin-bottom: 20px;
    color: white;
    font-family: 'Raleway-ExtraLight';
    font-weight: 200;
    font-size: 16px;
    border-radius: 0;
}
.resButton {
    background: rgba(46, 204, 113, 0.5);
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
.whithy {
    background: rgba(255, 255, 255, 0.2);
}
map {
  width:100%;
  height: 600px;
  display: block;
}
</style>
