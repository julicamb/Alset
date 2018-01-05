<template>
  <div id="app">
    <main>
      <router-view></router-view>
    </main>
  </div>
</template>

<script>
window.APIurl = 'http://cmsdev.localhost:8080'
export default {
  name: 'app'
}
</script>
<style>
.logo {
  color: white;
  font-family: 'ZELDA';
  src: url('assets/fonts/ZELDA.otf');
  font-size: 20px;
  letter-spacing: 5px;
  padding-left: 5px;
}
#app {
  text-align: center;
}
body {
  height: 100vh;
  background: linear-gradient(rgb(0, 0, 0), rgb(150, 29, 19));
  margin: 0;
}
</style>