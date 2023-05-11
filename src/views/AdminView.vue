<template>
  <div class="flex flex-col h-full ">

  
    <div class="text-white mt-4 w-full flex justify-end">
        <div></div>
        <div class="flex p-2 w-64 rounded-tl-lg drop-shadow-lg  rounded-bl-lg text-left bg-onSurface tracking-widest font-thin font-sans" >
            <span class="pr-2 "><img width="20"  src="@/assets/img/icon/admin.svg" /></span>
            Admin
        </div>
    </div>
    <div class="admin flex rounded-tl-lg  rounded-bl-lg drop-shadow-lg  w-full h-full bg-onSurface m-4 ">
      <div class="admin-sidenav">
        <div class="flex flex-col  text-sm font-light" >
          <div class="text-white border-b  border-slate-800  p-2 tracking-widest admin-side-tab" v-for="nav in sideNav" :key="nav.name" :class="{'active': nav.active}"  >
            <router-link @click="onSelectedNav(nav)" :to="{ name: nav.route }">{{nav.name}} </router-link>
          </div>
        </div>
      </div>
      <div class="admin-body w-full">
        <router-view></router-view>
      </div>
    </div>
  </div>
</template>

<script>
import PositionsView from "@/views/components/admin/PositionsView";
import {useAuthStore} from '@/stores/auth'
import { onMounted } from 'vue';
export default {
  components: { PositionsView },
  setup() {

    const authStore = useAuthStore()
   
    authStore.checkRole()

    

    
    
  //  authStore.checkRole()

    let selectedNav = null
   
    const sideNav = [
        { name: "Dashboard", route: 'dashboard', active: false },
        { name: "Positions", route: 'positions' , active: false},
        { name: "Partylist", route: 'partylist', active: false },
        { name: "Canditates", route: 'candidates', active: false },
        { name: "Settings", route: 'settings', active: false },
    ];

    const onSelectedNav=(item)=>{
      if(selectedNav !=null){
        selectedNav.active = false
      }
      item.active =true
      selectedNav = item
    }

   

    return {sideNav,authStore, onSelectedNav}
  },
};
</script>

<style>
.admin-sidenav {
  width: 15%;
}
.admin-side-tab:hover{
    background-color: #101318;
}
.admin{
  z-index: 0;
}
.active {
  background-color: #101318;
}

</style>