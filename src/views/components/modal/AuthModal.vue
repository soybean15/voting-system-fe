<template>
    <!-- <form @submit.prevent="authStore.onLogin(form)">
        <input v-model="form.email" type="email" name="email" placeholder="Email">
        <input v-model="form.password" type="password" name="password" placeholder="Password">
        <input  class="btn btn-blue" type="submit" name="submit">

    </form>
   -->

   <div class="modal-overlay">
  
    <div class="relative modal ">
        <div class="absolute close-button "> <img class="h-7" src="../../../assets/img/icon/close-icon.svg"></div>
        <LoginView/>
       
    </div> 

   </div>
</template>

<script>
import LoginView from '@/views/components/auth/LoginView.vue'

export default {
    components:{LoginView},
    setup(){

    
    }

}
</script>

<style>
.modal{
  
    width:20rem;
    border-radius: 5px;
}
.close-button{
    
    cursor: pointer;
   
    right: 15px;
    top:10px;
}

</style>