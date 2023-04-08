<template>
    <form @submit.prevent="onLogin">
        <input v-model="form.email" type="email" name="email" placeholder="Email">
        <input v-model="form.passsword" type="password" name="password" placeholder="Password">
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
        await axios.get("http://localhost:8000/sanctum/csrf-cookie")
        await axios.post("http://localhost:8000/login",{
            email: form.value.email,
            password: form.value.password
        })
        
        let {data} = await axios.get("http://localhost:8000/api/user")
        user.value = data
        }


        return {form, onLogin}
    }

}
</script>

<style>

</style>