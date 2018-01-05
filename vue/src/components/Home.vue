<template>
  <div class="home">
    <h1 class="homeLogo">Alset</h1>
    <button class="button1" @click="GoToPage('Models')">Find a Car</button><br>
    <button class="button2">My account</button><br>
    <button class="button2">Charging stations</button>
  </div>
    
</template>

<script>
export default {
  name: 'home',
  data () {
    return {
    }
  },
  methods: {
    GoToPage (page) {
      this.$router.push({name: page})
    }
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
