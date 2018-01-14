<template>
  <div id="app">
    <main>
      <router-view></router-view>
    </main>
  </div>
</template>

<script>
window.APIurl = 'http://cmsdev.localhost:8080'
window.ActiveUser = null
export default {
  name: 'app',
  created () {
    if (localStorage.getItem('Active-User') !== null) {
      window.ActiveUser = JSON.parse(localStorage.getItem('Active-User'))
    }
  }
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
  margin: 0;
  padding: 15px 0;
}
#app {
  text-align: center;
}
body {
  height: 100vh;
  background: linear-gradient(rgb(0, 0, 0), rgb(150, 29, 19));
  margin: 0;
  background-attachment: fixed;
}
a {
  text-decoration: none;
}
a:hover {
  text-decoration: none;
}
a:visited {
  text-decoration: none;
}
</style>