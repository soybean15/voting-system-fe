<template>

    <div class="m-14 p-3 text-justify text-white">
        <div class="text-4xl font-bold mb-4" >{{authStore.status.title}}</div>
        <p class="text-base text-slate-200">{{ authStore.status.status }}</p>
    </div>
  
</template>

<script> 
import {useAuthStore } from "@/stores/auth"
export default {
    setup(){
        const authStore = useAuthStore()
        console.l

        return {authStore}
    }

}
</script>

<style>

</style>