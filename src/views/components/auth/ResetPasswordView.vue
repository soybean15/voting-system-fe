<template>
    <div class="m-4">    
        <form @submit.prevent="authStore.handleResetPassword(form)">
            {{ form.token }}
        <input type="password" v-model="form.password"/>
        <input type="password" v-model="form.password_confirmation"/>
        
        <input type="submit"/>
    </form>

    </div>

  
</template>

<script>
import { useAuthStore } from '@/stores/auth';
import { ref } from 'vue';
import { useRoute } from 'vue-router';
export default {

    setup(){   
         const route = useRoute()
         const authStore = useAuthStore()

         const form =ref({
            password:"",
            password_confirmation:"",
            email: route.query.email,
            token :route.params.token
         })

         return {form, authStore}

    }


}
</script>

<style>

</style>