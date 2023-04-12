<template>

    <div class="fg-container bg-neutral-800 border m-2">
        <div class=" text-2xl mt-4 font-bold">Forgot Password</div>
        <form @submit.prevent="authStore.handleForgotPassword(email)">
            <div class="p-2">

            <div  class="text-left pl-2"><label>Email</label></div>
                <input class="input-field" v-model="email" type="email" />
            </div>
            <div v-if="authStore.errors.email">
                <span class="text-red-400 text-xs">{{ authStore.errors.email[0] }}</span>
            </div>
           
          

            <div class="p-2">
                <input class="btn-submit bg-lime-600" type="submit" value="Submit"/>
            </div>
            
        </form>

    </div>

  
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
.fg-container{
    border-radius: 5px;
    color: white;
    opacity: .9;
}
</style>