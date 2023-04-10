<template>
  <div class="flex flex-col nav md:flex-row bg-green-400 overflow-visible">
    <div class="p-2 m-2">
      <img class="w-24 border border-green-400 h-24 object-cover rounded-full" src="@/assets/img/vote-logo.jpeg"/>
    </div>
    <div class="flex-grow flex items-center">
      <div v-for="navItem in navItems" :key="navItem.name">
        <router-link :to="{name:navItem.route_name}">
          <div class="h-24 flex items-end md:pl-12 md:pb-2 text-xl  text-gray-100 semi-bold">{{ navItem.name }}</div>
        </router-link>
      </div>
    </div>
    <div>
      <div v-if="isLogged" >
        <div class="flex items-center" v-for="auth in navAuth" :key="auth.route_name">
          <router-link :to="{name:auth.route_name}">
            <div class="h-24 flex items-end md:pl-2 md:pb-2 text-xl  text-gray-100 semi-bold"  >
            {{navAuth.name}}

            </div>
          </router-link>
        
        </div>
      </div>
      <div v-else>
        <div  class="h-24 flex items-end md:pl-2 md:pb-2 text-xl  text-gray-100 semi-bold">
          Log out
        </div>
        
      </div>
    </div>
  </div>
</template>

<script>
import { useAuthStore } from "@/stores/auth";
import { ref } from 'vue';
export default {
  setup() {
    const authStore = useAuthStore();
    const isLogged  =ref(authStore.user)

    

    const navItems = [
      {route_name:'home', name:'Home',route:'/'},
      {route_name:'about',name:'Admin',route:'/about'},
      {route_name:'home',name:'Results',route:'/'},

    ]

    
    const navAuth=[
      {route_name:'login', name:'Home'},
      {route_name:'register',name:'Admin'},
    

    ]
    return { 
      authStore,
      navItems,
      navAuth ,
      isLogged};
  },
};
</script>

<style>
.nav{
  height: 5.6rem;
}

</style>