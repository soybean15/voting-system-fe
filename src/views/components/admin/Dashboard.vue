<template>
    <div class="w-full flex flex-col ">
        <span class="text-left pl-6 text-xl text-white font-bold pt-2">Hello {{ authStore.user.name }}</span>

        <div class="flex p-4 justify-start ">
            <div class="admin-card relative w-40 h-20 m-2">
                <div class="absolute top-1 left-1 text-sm text-white">Registered Voters</div>

            </div>

            <div class="admin-card relative w-40 h-20  m-2">
                <div class="absolute top-1 left-1 text-sm text-white">Party List</div>
                
            </div>
            <div class="admin-card relative  w-40 h-20 m-2">
                <div class="absolute top-1 left-1 text-sm text-white">Positions</div>
                
            </div>
            <div class="admin-card relative  w-40 h-20 m-2">
                <div class="absolute top-1 left-1 text-sm text-white">Candidates</div>
                
            </div>
        </div>
    </div>
  
</template>

<script>
import {useAuthStore} from '@/stores/auth'
export default {
    

    setup(){
        const authStore = useAuthStore()
   

        return {authStore}
        

    }

}
</script>

<style>
.admin-card{
    background-color: #452d72;
    border-radius: 10px;
    box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
}

</style>