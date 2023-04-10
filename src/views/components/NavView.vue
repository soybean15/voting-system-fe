<template>
  <div class="flex flex-col nav md:flex-row bg-green-400 overflow-visible">
    <div class="p-2 m-2">
      <img class="w-24 border border-green-400 h-24 object-cover rounded-full" src="@/assets/img/vote-logo.jpeg"/>
    </div>
    <div class="flex-grow flex items-center">
      <div v-for="navItem in navItems" :key="navItem.name">
        <router-link :to="{name:navItem.route_name}">
          <div class="h-24 flex items-end md:pl-12 text-xl hover:text-2xl text-gray-100 semi-bold">{{ navItem.name }}</div>
        </router-link>
      </div>
    </div>
    <div>signin</div>
  </div>
</template>

<script>
import { useAuthStore } from "@/stores/auth";
export default {
  setup() {
    const authStore = useAuthStore();


    const navItems = [
      {route_name:'home', name:'Home',route:'/'},
      {route_name:'about',name:'Admin',route:'/'},
      {route_name:'home',name:'Results',route:'/'},

    ]
    return { authStore,navItems };
  },
};
</script>

<style>
.nav{
  height: 5.6rem;
}
</style>