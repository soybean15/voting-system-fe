<template>
    <div class="w-full flex flex-col ">
        <span class="text-left pl-6 text-xl text-white font-bold pt-2" v-if="authStore.user">Hello Admin {{ authStore.user.name }}</span>

        <div class="flex p-4 justify-start ">
            <div class="admin-card relative w-40 h-20 m-2">
                <div class="absolute top-1 left-1 text-sm text-white">Registered Voters</div>

            </div>

            <div class="admin-card relative w-40 h-20  m-2">
                <div class="absolute top-1 left-1 text-sm text-white">Party List</div>
                <div class="absolute bottom-5 left-1 text-xl text-stone-300" v-if="voteStore.dashboard">{{voteStore.dashboard.partylist.length}}</div>
                
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
import {useVoteStore} from '@/stores/partylist'
import { onMounted } from 'vue'
export default {
    

    setup(){
        const authStore = useAuthStore()
        const voteStore = useVoteStore()
        voteStore.getDashboard()
       

        onMounted(()=>{
            //authStore.getUser()
        })

        return {authStore,voteStore}
        

    }

}
</script>

<style>
.admin-card{
    background-color: #452d72;
    border-radius: 10px;
    box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
    font-weight: bolder;
}

</style>