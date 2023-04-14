<template>
  <div class="home w-5/6 h-full m-auto">

    <ElectionView />
   <!-- <div v-if="authStore.user">
    <div>{{authStore.user.name}}</div>
    <div>{{authStore.user.email}}</div>
  
  </div>
  <div v-else>
    <h1>Login </h1>
  </div> -->
  </div>

</template>

<script>
// @ is an alias to /src
import HelloWorld from "@/components/HelloWorld.vue";
import ElectionView from "./components/election/ElectionView";

import { ref ,onMounted} from 'vue';
import {useAuthStore, userAuthStore} from '@/stores/auth'

export default {
  name: "HomeView",
  components: {
    HelloWorld,
    ElectionView,
    
  },
  setup(){
    const authStore = useAuthStore()

    onMounted( async ()=>{
      await authStore.getUser()

    })

    return {authStore}

  }
 
};
</script>
