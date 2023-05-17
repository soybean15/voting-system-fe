<template>
     <div class="m-14 p-3 text-justify text-white">
      
        <div class="text-4xl font-bold mb-4" >Check your Email</div>
        <p class="text-base text-slate-200">We sent you a temporary code to verify your email</p>

        <form @submit.prevent="authStore.handleVerify">
            <div class="flex">
                <input v-model="authStore.form.code" class="text-black input-field w-40" type="text"/>
           
            <input class="btn btn-green h-10 ml-2" type="submit" value="Send"/>
            </div>
            

        </form>
        <div class="flex text-rose-400 text-sm p-2 pl-0" v-if="authStore.errors.message">{{ authStore.errors.message }}</div>
        <div v-if="authStore.errors.code">
                <span class="text-red-400 text-sm">{{ authStore.errors.code[0] }}</span>
        </div>
        <div class="flex items-center mt-2">
            <div>Didn't receive code?  </div>
            <div class="text-gray-400 pl-2" v-if="countdown !== '00:00'">{{countdown}}</div>
        <div v-else>
            <div class="text-cyan-500 pl-2 cursor-pointer hover:underline" @click="authStore.resendVerification">Resend</div>
            
        </div>
        </div>
   
       
        
        
    </div>
</template>

<script>
import { useAuthStore } from '@/stores/auth';
import { onMounted,ref } from 'vue';
export default {

    setup(){
        const authStore = useAuthStore()

        const countdown = ref('01:30');

    onMounted(() => {
      authStore.form.email = localStorage.getItem('email')
      const endTime = new Date();
    //   endTime.setMinutes(endTime.getMinutes() + 1);
    //   endTime.setSeconds(endTime.getSeconds() + 30);

      endTime.setSeconds(endTime.getSeconds() +5);

      updateCountdown(endTime);
      setInterval(() => updateCountdown(endTime), 1000);
    });

    const updateCountdown = (endTime) => {
      const now = new Date();
      const timeDifference = Math.max(endTime - now, 0);

      const minutes = Math.floor(timeDifference / 60000);
      const seconds = Math.floor((timeDifference % 60000) / 1000);

      const formattedTime = `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;

      countdown.value = formattedTime;
    };

    
       
        return {authStore,countdown}
    }
}
</script>

<style>
.input-field{
    color: rgb(56, 54, 54);
  
    border: 1px solid gray;
    border-radius: 5px;
}
.btn-submit{
   
    background-color: rgb(101 163 13);
    color: white;
    cursor: pointer;
    border-radius: 5px;
}
.btn-submit:hover{
    background-color: rgb(132 204 22);
}

</style>