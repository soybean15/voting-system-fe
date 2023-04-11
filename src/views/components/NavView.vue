<template>
  
  <div class=" header">
    
    <div @click="onHideNav" class="menu onhide"><img class="w-5 cursor-pointer" src="@/assets/img/icon/burger-menu.svg"></div>
    <div  class="flex flex-col nav md:flex-row bg-green-400 overflow-visible" :class="{hide: onMobile && hideNav}"> 
      <div class="relative md:hidden w-full ">
        <div @click="onHideNav" class="menu"><img class="w-5  cursor-pointer" src="@/assets/img/icon/burger-menu.svg"></div>
      </div>
     
      <div class="p-2 m-2">
        <img
          class="w-24 border border-green-400 h-24 object-cover rounded-full"
          src="@/assets/img/vote-logo.jpeg"
        />
      </div>
      <div class="flex-grow md:flex items-center">
        <div v-for="navItem in navItems" :key="navItem.name">
          <router-link :to="{ name: navItem.route_name }">
            <div
              class="ml-4 md:h-24 flex md:items-end md:pl-12 md:pb-2 text-xl text-gray-100 semi-bold"
              :class="{ hidden: navItem.name == 'Admin' && !authStore.user }"
            >
              {{ navItem.name }}
            </div>
          </router-link>
        </div>
      </div>
      <div class="flex pr-4">
        <div class="md:flex items-center" v-if="!authStore.user">
          <div v-for="auth in navAuth" :key="auth.route_name">
            <div
              class="ml-4 md:h-24 flex items-end md:pl-1 md:pb-2 text-xl text-gray-100 semi-bold"
            >
              <router-link :to="{ name: auth.route_name, query:{register:auth.register} }">{{
                auth.name
              }}</router-link>
            </div>
          </div>
        </div>
        <div class="flex items-center" v-else>
          <div
          @click="authStore.handleLogout"
            class="ml-4 md:h-24 flex items-end md:pl-1 md:pb-2 text-xl text-gray-100 semi-bold"
          >
            Logout
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { useAuthStore } from "@/stores/auth";
import { ref, watch } from "vue";
export default {
  setup() {
    const authStore = useAuthStore();
    const user = ref(authStore.user)
   
    const hideNav = ref(true)

    const onHideNav= ()=>{
      hideNav.value = !hideNav.value 
    }

    const navItems = [
      { route_name: "home", name: "Home", route: "/"},
      {
        route_name: "about",
        name: "Admin",
        route: "/about",
       
      },
      { route_name: "home", name: "Results", route: "/"},
      { route_name: "about", name: "About", route: "/about" },
    ];

    const navAuth = [
      { route_name: "login", name: "Login" ,register:false},
      { route_name: "register", name: "Register" ,register:true},
    ];



    const onMobile = ref(window.innerWidth<768)

    
    window.addEventListener("resize", function () {
      onMobile.value = window.innerWidth < 768;
     
      console.log("Opneing")
    });


    return {
      authStore,
      navItems,
      navAuth,
      hideNav,
      onHideNav,
      onMobile
    };
  },
};
</script>

<style>
.header{
  height: 100%;
}

.menu{
  position: absolute;
  right: 0;
  top: 0;
  z-index: 1;
}
.menu.onhide{
  left: 0;
  top: 0;
  z-index: 0;
}
.nav {
  height: 100%;
  position: fixed;
 
  top: 0;
  left: 0;
  transition: transform 0.3s ease-out; /* Add a transition effect */
  transform: translateX(0%); /* Move the nav off screen by default */
 
}
.nav.hide{
  
  transition: transform 0.3s ease-out; /* Add a transition effect */
  transform: translateX(-100%); /* Move the nav off screen by default */

}




@media only screen and (min-width: 768px) {
  /* For desktop: */
  .nav {
    height: 5.6rem;
    display: block;
    position:static;
  }


}
</style>