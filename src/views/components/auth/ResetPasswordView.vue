<template>
    reset
  
</template>

<script>
import { useAuthStore } from '@/stores/auth';
import { ref } from 'vue';
import { useRoute } from 'vue-router';
export default {

    setup(){   
         const route = useRoute()
         const authStore = useAuthStore()

    }


}
</script>

<style>

</style>