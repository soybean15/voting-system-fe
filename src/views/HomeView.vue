<template>
  <div class="home w-5/6 h-full m-auto">
<!-- 
    <ElectionView /> -->
    <div class="home-content h-full flex flex-col justify-center items-center">
      <div class="font-extrabold text-8xl text-white text-slate-50 underline decoration-sky-500">Vote.com</div>
      <div class=" text-xl text-gray-300 mt-2 font-mono">Introducing our new voting web app – designed to make your voting experience more convenient and accurate than ever before. Say goodbye to long queues and confusing ballot papers – our intuitive interface and secure voting system ensure a seamless and stress-free voting process.</div>
      <div class="flex">
        <button class="mt-4 btn btn-blue drop-shadow-lg">Get Started</button>
   
      </div>
    </div>
    
    <!-- <StatusView/> -->
    <!-- <AdminView/> -->
    

  </div>

</template>

<script>

import ElectionView from "./components/election/ElectionView";

import StatusView from "@/views/components/status/StatusView";
import AdminView from "./AdminView.vue"

import { ref ,onMounted} from 'vue';
import {useAuthStore, userAuthStore} from '@/stores/auth'

export default {
  name: "HomeView",
  components: {

    ElectionView,
    StatusView,
    AdminView
    
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

<style>

</style>
