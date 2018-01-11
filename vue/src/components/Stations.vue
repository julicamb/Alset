<template>
  <div class="home">
    <h1 class="logo" @click="GoToPage('Home')">Alset</h1>
    <gmap-map
    :center="center"
    :zoom="13"
    style="width: 100vw; height: 92vh"
  >
    <gmap-marker
      v-for="(m) in markers"
      :key="m.name"
      :position="m.position"
      :clickable="true"
      :draggable="true"
      @click="center=m.position"
    ></gmap-marker>
  </gmap-map>
  </div>
</template>

<script>
import axios from 'axios'
// import * as VueGoogleMaps from 'vue2-google-maps'
// import Vue from 'vue'

export default {
  name: 'home',
  data () {
    return {
      stations: [],
      center: {lat: 51.0543, lng: 3.7174},
      markers: [],
      Mapsurl: null,
      Geolocation: null
    }
  },
  created () {
    var self = this
    getLocation()
    console.log('created', this)
    function getLocation () {
      if (navigator.geolocation) {
        self.Geolocation = true
        navigator.geolocation.getCurrentPosition(showPosition)
      } else {
        self.Geolocation = false
        console.log('Geolocation is not supported by this browser.')
        self.GetStations()
      }
    }
    function showPosition (position) {
      console.log(position.coords.latitude + ' ' + position.coords.longitude)
      self.center.lat = position.coords.latitude
      self.center.lng = position.coords.longitude
      self.GetStations()
    }
  },
  methods: {
    GoToPage (page) {
      this.$router.push({name: page})
    },
    GetStations () {
      this.Mapsurl = 'https://cors-anywhere.herokuapp.com/https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=' +
      this.center.lat +
      ',' +
      this.center.lng +
      '&radius=6000&keyword=electric+charging+stations&key=AIzaSyB57L9Tj6zNQzhGmiP9D7SICJjfqRrQMXI'
      axios({
        method: 'GET',
        url: this.Mapsurl
      }).then(result => {
        console.log(result)
        this.stations = result.data.results
        var self = this
        this.stations.forEach(function (item) {
          self.markers.push({
            position: {lat: item.geometry.location.lat, lng: item.geometry.location.lng}
          })
        })
      }, error => {
        console.error(error)
      })
    }
  },
  mounted () {
  },
  components: {
    Map
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