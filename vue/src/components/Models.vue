<template>
  <div class="search">
    <h1 class="logo" @click="GoToPage('Home')">Alset</h1>
    <h3 class="subtitle">Choose a model</h3>
    <router-link v-for="model in results" :key="model.id" :to="{ name: 'Cars', params: { id: model.id }}">
  <div class="card" :id="model.id">
      <img :src="APIurl + model.field_image">
      <h2>{{model.name}}</h2>
  </div>
    </router-link>
  </div>
    
</template>

<script>
import axios from 'axios'

export default {
  name: 'models',
  data () {
    return {
      results: [],
      APIurl: window.APIurl
    }
  },
  mounted () {
    axios({ method: 'GET', url: window.APIurl + '/models' }).then(result => {
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
</style>
