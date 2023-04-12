<template>
   
  <div class="reg-container bg-neutral-800 border m-2">
    <div class=" text-2xl mt-4 font-bold">Register</div>
    <form @submit.prevent="authStore.handleRegister(form)">

        <div class="p-2"> 

            <div  class="text-left pl-2"><label>Name</label></div>
            <input v-model="form.name" class="input-field" type="text" name="name">

            <div v-if="authStore.errors.name">
                <span class="text-red-400 text-xs">{{ authStore.errors.name[0] }}</span>
            </div>
                                
        </div>

        <div class="p-2">
            <div  class="text-left pl-2"><label >Email</label></div>
            <input v-model="form.email" class="input-field" type="email" name="password">
            

            <div v-if="authStore.errors.email">
                <span class="text-red-400 text-xs">{{ authStore.errors.email[0] }}</span>
            </div>
                           
        </div>

        <div class="p-2">
            <div  class="text-left pl-2"><label >Password</label></div>
            <input v-model="form.password" class="input-field" type="password" name="password">
            


            <div v-if="authStore.errors.password">
                <span class="text-red-400 text-xs">{{ authStore.errors.password[0] }}</span>
            </div>
        </div>
        <div class="p-2">
            <div  class="text-left pl-2"><label>Confirm Password</label></div>
            <input v-model="form.password_confirmation" class="input-field" type="password" name="password">
            
        </div>



        <div class="p-2">
            <input  class="btn-submit bg-lime-600" type="submit" value="Sign up">
        </div>
    </form>
  </div>
</template>

<script>
import { ref, watch, watchEffect } from "vue";
import { useAuthStore } from "@/stores/auth";
export default {
  setup() {
    const authStore = useAuthStore()

    const form = ref({
        name:'',
        email:'',
        password:'',
        password_confirmation:''
    })

    
    watchEffect(()=>{

    })
    return {form,authStore};
  },
};
</script>

<style>
.reg-container{
    border-radius: 5px;
    color: white;
    opacity: .9;
}
</style>