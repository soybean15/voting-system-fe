<template>

  <div class=" header">
    
    <div @click="onHideNav" class="menu w-6 h-6 onhide  "><img class="w-6 h-6 cursor-pointer" src="@/assets/img/icon/burger-menu.svg"></div>
    <div  class="flex flex-col nav w-32 md:w-full md:flex-row  bg-primary overflow-visible" :class="{hide: onMobile && hideNav}"> 
      <div class="relative md:hidden w-full  ">
        <div @click="onHideNav" class="menu "><img class="w-5  cursor-pointer " src="@/assets/img/icon/burger-menu.svg"></div>
      </div>
     
      <div class="md:flex items-center pt-10 md:pt-0 ">
        <div class="ml-4 md:h-24 font-sans flex md:items-end md:pl-12 md:pb-4 text-base text-gray-100 font-semibold"></div>
        <div class="ml-1 md:h-24 font-sans flex md:items-end pl-2 md:pl-0 md:pb-4 text-sm md:text-base text-gray-100 font-semibold"><img width="23" src="@/assets/img/icon/vote-logo.svg"/>Polling-point.net</div>
      </div>
      <div class="flex-grow  mt-4 md:mt-0 md:flex items-center">
        <div v-for="navItem in navItems" :key="navItem.name">
          <router-link  :to="{ name: navItem.route_name }">
            <div
              class="ml-4 md:h-24 font-sans flex md:items-end md:pl-12 pb-1 md:pb-4 text-sm md:text-base text-gray-100 font-semibold"
              :class="{ hidden: navItem.name == 'Admin' && !authStore.isAdmin  }"
            >
              {{ navItem.name }}  
            </div>
          
          </router-link>
        </div>
      </div>
      <div class="flex pr-4">
        <div class="md:flex pb-6 md:pb-0 items-center" v-if="!authStore.user">
          <div v-for="auth in navAuth" :key="auth.route_name">
            <div
              class="ml-4 md:h-24 flex items-end md:pl-1 md:pb-4 text-base text-gray-100 font-semibold"
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
            class=" cursor-pointer ml-4 md:h-24 flex items-end md:pl-1 md:pb-2 text-xl text-gray-100 semi-bold"
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
import { ref, watch,onMounted } from "vue";
export default {
  setup() {
    const authStore = useAuthStore();
    // authStore.checkRole()
    onMounted( 
    //   async ()=>{
    //   await authStore.getUser()

    // }
    )
    const hideNav = ref(true)

   
    

    const onHideNav= ()=>{
      hideNav.value = !hideNav.value 
    }

    const navItems = [
      { route_name: "home", name: "Home", route: "/"},
      {
        route_name: "admin",
        name: "Admin",
        route: "/admin",
       
      },
      { route_name: "result", name: "Results", route: "/result"},
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
  z-index: 999 ;
  
}
.menu.onhide{
  left: 0;
  top: 0;
  z-index: 0;
}
.nav {
  height:100%;
  position: fixed;
  box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
  top: 0;
  left: 0;
  transition: transform 0.3s ease-out; /* Add a transition effect */
  transform: translateX(0%); /* Move the nav off screen by default */
  z-index: 999 ;
  
 
}
.nav.hide{
  
  transition: transform 0.3s ease-out; /* Add a transition effect */
  transform: translateX(-100%); /* Move the nav off screen by default */

}




@media only screen and (min-width: 768px) {
  /* For desktop: */
  .nav {
    height: 5rem;
    display: block;
    position:static;
  }


}
</style>