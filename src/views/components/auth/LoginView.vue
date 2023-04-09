<template>
    <form @submit.prevent="onLogin">
        <input v-model="form.email" type="email" name="email" placeholder="Email">
        <input v-model="form.password" type="password" name="password" placeholder="Password">
        <input  class="btn btn-blue" type="submit" name="submit">

    </form>
  
</template>

<script>
import { ref } from 'vue'
import axios from 'axios';
export default {
    setup(){

        axios.defaults.withCredentials =true
        const form = ref({
            email:'',
            password:''
        })


        const onLogin =async ()=>{
        await axios.get("/sanctum/csrf-cookie")
        await axios.post("/login",{
            email: form.value.email,
            password: form.value.password
        })
        
        
        }


        return {form, onLogin}
    }

}
</script>

<style>

</style>