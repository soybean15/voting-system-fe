<template>
    <form @submit.prevent="authStore.onLogin(form)">
        <input v-model="form.email" type="email" name="email" placeholder="Email">
        <input v-model="form.password" type="password" name="password" placeholder="Password">
        <input  class="btn btn-blue" type="submit" name="submit">

    </form>
  
</template>

<script>
import { ref } from 'vue'
import {useAuthStore } from "@/stores/auth"
export default {
    setup(){

        const form = ref({
            email :'',
            password:''
        })
        const authStore = useAuthStore()






        return {form, authStore}
    }

}
</script>

<style>

</style>