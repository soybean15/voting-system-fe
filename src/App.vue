<template>
  <div class="flex flex-col h-full">
    <!-- <nav>
      <router-link to="/">Home</router-link> |
      <router-link to="/about">About</router-link>|
      <router-link to="/login">Login</router-link>|
      <router-link to="/register">Register</router-link>
      <router-link to="/register">Logout</router-link>
     </nav> -->
     <NavView></NavView>

    <div class="grow" ><router-view/></div>
     <div class="footer"></div>

  </div>

</template>
<script>
import NavView from './views/components/NavView.vue';
export default{
  components:{NavView}
}

</script>
<style>



@import '@/assets/css/style.css';
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  
  position: absolute;
    top: 0; right: 0; bottom: 0; left: 0;
    
}

html, body {margin: 0; height: 100%; overflow: hidden}

nav {
  padding: 30px;
}

nav a {
  font-weight: bold;
  color: #2c3e50;
}

nav a.router-link-exact-active {
  color: #42b983;
}
.footer{
  background: red;
  height: 5px;
}


</style>
