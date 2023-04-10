<template>
  
  <div class="header">
    
    <div class="flex flex-col nav md:flex-row bg-green-400 overflow-visible">
      <div class=" md:hidden">expand</div>
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
              :class="{ hidden: !navItem.visible }"
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
              <router-link :to="{ name: auth.route_name }">{{
                auth.name
              }}</router-link>
            </div>
          </div>
        </div>
        <div class="flex items-center" v-else>
          <div
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
import { ref, onMounted } from "vue";
export default {
  setup() {
    const authStore = useAuthStore();
    //   const isLogged  =ref(authStore.user)

    const navItems = [
      { route_name: "home", name: "Home", route: "/", visible: true },
      {
        route_name: "about",
        name: "Admin",
        route: "/about",
        visible: authStore.user,
      },
      { route_name: "home", name: "Results", route: "/", visible: true },
      { route_name: "about", name: "About", route: "/about", visible: true },
    ];

    const navAuth = [
      { route_name: "login", name: "Login" },
      { route_name: "register", name: "Register" },
    ];
    return {
      authStore,
      navItems,
      navAuth,
    };
  },
};
</script>

<style>
.nav {
  height: 100%;
 
}


@media only screen and (min-width: 768px) {
  /* For desktop: */
  .nav {
    height: 5.6rem;
    display: block;
  }


}
</style>