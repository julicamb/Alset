<template>
  <div class="search">
    <h1 class="logo" @click="GoToPage('Home')">Alset</h1>
    <h3 class="subtitle" v-if="User !== null">{{ User.name[0].value }}</h3>
    <h3 class="subtitle"></h3>
      <img class="userPicture" v-if="User.user_picture !== null && User.user_picture.length > 0" :src="User.user_picture[0].url">
      <img class="userPicture" v-if="User.field_imagestring.length > 0" :src="User.field_imagestring[0].value">
      <button class="tabButton" @click="tab = 1">Info</button>
      <button class="tabButton" @click="tab = 2">Reservations</button>
      <button class="tabButton" @click="tab = 3">Cars</button>
      <div v-if="tab==1">
      <div class="specs" v-if="User.mail.length > 0">
        <h2>Email:</h2>
        <h3>{{ User.mail[0].value }}</h3>
      </div>
      <div class="specs" v-if="User.field_address.length > 0">
        <h2>Address:</h2>
        <h3>{{ User.field_address[0].value }}</h3>
      </div>
      <div class="specs" v-if="User.field_city.length > 0">
        <h2>City:</h2>
        <h3>{{ User.field_city[0].value }}</h3>
      </div>
      <div class="specs" v-if="User.field_country.length > 0">
        <h2>Country:</h2>
        <h3>{{ User.field_country[0].value }}</h3>
      </div>
      <div class="specs" v-if="User.field_phone_number.length > 0">
        <h2>Phone:</h2>
        <h3>0{{ User.field_phone_number[0].value }}</h3>
      </div>
      </div>
    <div v-if="tab==2">
        <router-link v-if="Reservations.length > 0" v-for="res in Reservations"  :key="res.nid.value" :to="{ name: 'ReservationDetails', params: { id: res.nid[0].value }}">
  <div class="card">
      <img :src="res.field_image_url[0].value">
      <h2><strong>{{res.title[0].value}}</strong></h2>
      <h3 v-if="res.field_days[0].value === 1">{{res.field_days[0].value}} day<br>{{res.field_start_date[0].value}}</h3>
      <h3 v-if="res.field_days[0].value !== 1">{{res.field_days[0].value}} days<br>{{res.field_start_date[0].value}}</h3>
      <h4 class="price"><strong>€{{res.field_price[0].value}}</strong></h4>
  </div>
    </router-link>
    </div>
    <div v-if="tab==3">
      <button class="resButton" @click="GoToPage('CreateCar')">Add a car</button>
        <router-link v-if="Cars.length > 0" v-for="car in Cars"  :key="car.nid.value" :to="{ name: 'DetailsView', params: { id: car.nid[0].value }}">
  <div class="card">
      <img v-if="car.field_image!==null && car.field_image.length > 0" :src="car.field_image[0].url">
      <img v-if="car.field_imagestring!==null && car.field_imagestring.length > 0" :src="car.field_imagestring[0].value">
      <h2><strong>{{car.title[0].value}}</strong></h2>
      <h3>{{car.field_range[0].value}}km range<br>{{car.field_seats[0].value}} seats</h3>
      <h4 class="price"><strong>€{{car.field_price_per_day[0].value}}</strong> <span class="smallText">per day</span></h4>
  </div>
    </router-link>
    </div>
  </div>
    
</template>

<script>
import axios from 'axios'
import moment from 'moment'

export default {
  name: 'userdetails',
  data () {
    return {
      User: [],
      tab: 1,
      Cars: [],
      Reservations: []
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
      axios({ method: 'GET', url: window.APIurl + '/cars?field_owner_target_id=' + this.User.uid[0].value }).then(result => {
        this.Cars = result.data
        axios({ method: 'GET', url: window.APIurl + '/reservation?field_customer_target_id=' + this.User.uid[0].value }).then(result => {
          this.Reservations = result.data
          this.Reservations.forEach(function (item) {
            item.field_start_date[0].value = moment(item.field_start_date[0].value).format('DD-MM-YYYY')
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
  }
}
</script>
<style scoped>
.subtitle {
    font-family: 'Raleway-ExtraLight';
    font-weight: 200;
    font-size: 25px;
    color: white;
    margin-top: 10px;
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
.userPicture {
 width: 30%;
 margin: 0;
 margin-left: 35%;
 margin-right: 35%;
 margin-bottom: 20px;
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
</style>
