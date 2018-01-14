<template>
  <div class="search">
    <h1 class="logo" @click="GoToPage('Home')">Alset</h1>
    <h3 class="subtitle">Choose a car</h3>
    <router-link v-for="car in results"  :key="car.nid.value" :to="{ name: 'DetailsView', params: { id: car.nid[0].value }}">
  <div class="card" :id="car.nid.value">
      <img :src="car.field_image[0].url">
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
      APIurl: window.APIurl
    }
  },
  mounted () {
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
</style>
