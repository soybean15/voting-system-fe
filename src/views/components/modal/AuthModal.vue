<template>
    <!-- <form @submit.prevent="authStore.onLogin(form)">
        <input v-model="form.email" type="email" name="email" placeholder="Email">
        <input v-model="form.password" type="password" name="password" placeholder="Password">
        <input  class="btn btn-blue" type="submit" name="submit">

    </form>
   -->

   <div class="modal-overlay flex">
  
    <div class="relative modal mt-20 md:m-20 ">
  
        <div @click="authStore.onCloseAuthModal" class="absolute close-button"> <img class="h-7" src="../../../assets/img/icon/close-icon.svg"></div>
       
        <div v-if="register=='true'">
           <RegisterView/>
        </div>
        <div v-else-if="register=='forgot'">
           <ForgotPasswordView/>
        </div>
        <div v-else>
           <LoginView @onClickRegister="onClickRegister" @onClickForgotPassword="onClickForgotPassword"/>
        </div>
        
       
    </div> 

   </div>
</template>

<script>
import LoginView from '@/views/components/auth/LoginView.vue'
import RegisterView from '@/views/components/auth/RegisterView.vue'
import ResetPasswordView from '@/views/components/auth/ResetPasswordView.vue'
import ForgotPasswordView from '@/views/components/auth/ForgotPasswordView.vue'
import {useAuthStore } from "@/stores/auth"

import { onBeforeRouteLeave,useRoute } from 'vue-router';
import { ref } from 'vue';

export default {
    components:{
        LoginView, 
        RegisterView,
        ResetPasswordView,
        ForgotPasswordView
    },
   
    setup(){
        const authStore = useAuthStore()
        authStore.checkUser()
        const route = useRoute();
        const register =ref(route.query.register)
        authStore.resetErrors()

        let previousRoute =''

        onBeforeRouteLeave((to, from) => {
        previousRoute = from.path;
      
        });





      
        const onClickRegister=()=>{
            register.value = 'true'
            authStore.routeToRegister
        }

        const onClickForgotPassword=()=>{
            register.value = 'forgot'
            authStore.routeToForgotPassword
        }


   
    
        return {
            authStore,
            register,
            onClickRegister,
            onClickForgotPassword
        }
    
    }

}
</script>

<style>
.modal{
  
    height: 50%;
    width:20rem;
    border-radius: 5px;
}
.close-button{   
    cursor: pointer;
    right: 15px;
    top:10px;
    z-index: 1;
}

</style>