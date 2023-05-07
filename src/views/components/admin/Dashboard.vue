<template>
    <div class="w-full flex flex-col ">
        <span class="text-left pl-6 text-xl text-white font-bold pt-2" v-if="authStore.user">Hello Admin {{ authStore.user.name }}</span>

        <div class="flex p-4 justify-start ">
            <div class="admin-card relative w-40 h-20 m-2">
                <div class="absolute top-1 left-1 text-sm text-white">Registered Voters</div>
                <div class="absolute bottom-4 left-5 text-3xl text-stone-300">{{ dashboardStore.dashboard.user_count }}</div>
                <div class="absolute bottom-0 right-0 text-3xl text-stone-300">
                    <img class="w-16 opacity-40 h-16" src="@/assets/img/icon/user-icon.svg"/>
                </div>
            </div>

            <div class="admin-card relative w-40 h-20  m-2">
                <div class="absolute top-1 left-1 text-sm text-white">Party List</div>
                <div class="absolute bottom-4 left-5 text-3xl text-stone-300">{{ dashboardStore.dashboard.partylist_count }}</div>
                <div class="absolute bottom-0 right-1 text-3xl text-stone-300">
                    <img class="w-16 opacity-40 h-16" src="@/assets/img/icon/partylist-icon.svg"/>
                </div>
            </div>
            <div class="admin-card relative  w-40 h-20 m-2">
                <div class="absolute top-1 left-1 text-sm text-white">Positions</div>
                <div class="absolute bottom-4 left-5 text-3xl text-stone-300">{{ dashboardStore.dashboard.positions_count }}</div>
                <div class="absolute bottom-2 right-1 text-3xl text-stone-300">
                    <img class="w-16 opacity-40 h-16" src="@/assets/img/icon/position-icon.svg"/>
                </div>
            </div>
            <div class="admin-card relative  w-40 h-20 m-2">
                <div class="absolute top-1 left-1 text-sm text-white">Candidates</div>
                <div class="absolute bottom-4 left-5 text-3xl text-stone-300">{{ dashboardStore.dashboard.candidate_count }}</div>
                <div class="absolute bottom-2 right-1 text-3xl text-stone-300">
                    <img class="w-16 opacity-40 h-16" src="@/assets/img/icon/candidate-icon.svg"/>
                </div>
            </div>
        </div>
    </div>
  
</template>

<script>
import {useAuthStore} from '@/stores/auth'
import {useDashboardStore} from '@/stores/dashboard'
import { onMounted } from 'vue'
export default {
    

    setup(){
        const authStore = useAuthStore()

        const dashboardStore  = useDashboardStore()
        
        

        onMounted(()=>{
            dashboardStore.getDashboard()
            //authStore.getUser()
        })

        return {authStore, dashboardStore}
        

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