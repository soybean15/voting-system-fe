<template>

    <form @submit.prevent="authStore.handleForgotPassword(email)">
        <input v-model="email" type="email" placeholder="forgot password"/>
        {{ email }}
        <input type="submit"/>
    </form>
  
</template>

<script>
import { useAuthStore } from '@/stores/auth';
import { ref } from 'vue';
export default {
    setup(){

        const authStore = useAuthStore()
        const email = ref()
        

        return {authStore,email}
    }

}
</script>

<style>

</style>