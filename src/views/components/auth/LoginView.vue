<template>
    <!-- <form @submit.prevent="authStore.onLogin(form)">
        <input v-model="form.email" type="email" name="email" placeholder="Email">
        <input v-model="form.password" type="password" name="password" placeholder="Password">
        <input  class="btn btn-blue" type="submit" name="submit">

    </form>
   -->
   <div class="login-container bg-neutral-800 border m-2">
    <div class=" text-2xl mt-4 font-bold">Login</div>
    <form>
        <div class="p-2">
            <div class="text-left pl-2"><label>Email</label></div>
            <div>
                <input  class="input-field" v-model="form.email" type="email" name="email">
            </div>
            
           
        </div>
        <div class="p-2">
            <div class="text-left pl-2"><label>Password</label></div>
            <div >  <input class="input-field" v-model="form.password" type="password" name="password"></div>

          
        </div>
        <div class="p-2">
            <input  class="btn-submit bg-lime-600" type="submit" value="Sign in">
        </div>
    </form>
    <div class="login-container border m-2">
    <div>No account yet? <a href="#">Register</a></div>
   </div>
   </div>
  
  


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

.login-container{
    
    border-radius: 5px;
    color: white;
    opacity: .9;
}
.input-field{
    color: rgb(56, 54, 54);
    width: 95%;
    border: 1px solid gray;
    border-radius: 5px;
}
.btn-submit{
    width: 95%;
    background-color: rgb(101 163 13);
    color: white;
    cursor: pointer;
    border-radius: 5px;
}
.btn-submit:hover{
    background-color: rgb(132 204 22);
}
</style>