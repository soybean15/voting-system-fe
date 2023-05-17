<template>

    <div class="m-14 p-3 text-justify text-white">
        <!-- <div class="text-4xl font-bold mb-4" >{{authStore.status.title}}</div>
        <p class="text-base text-slate-200">{{ authStore.status.status }}</p> -->
        <div class="text-4xl font-bold mb-4" >{{status.title}}</div>
        <p class="text-base text-slate-200">{{ status.message }} </p>
        
        <div v-if="status.notVerified"><div @click="authStore.resendVerification" class="pt-25 text-cyan-500" >Resend Verification</div></div>
        <div v-if="status.login"><div class="pt-25 text-cyan-500" ><router-link to="/login">Login</router-link> </div></div>
        <router-link class="pt-25 text-cyan-500" :to="{name:'home'}">Back to Home</router-link>
    </div>
  
</template>

<script> 
import {useAuthStore } from "@/stores/auth"
import  {getStatus}  from "@/data/status"
export default {
    props:['title','status'],
    setup(){
        const authStore = useAuthStore()
        const status = getStatus
 

        return {authStore,status}
    }

}
</script>

<style>

</style>