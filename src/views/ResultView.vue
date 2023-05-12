<template>
    <div class="flex-col m-14 p-3 text-white overflow-auto h-5/6 md:h-4/6" v-if="!dashboardStore.loading">
        <div class="flex text-xl font-bold">Result</div>

        <div class="" v-if="dashboardStore.settings.show_result">
            <div class="bg-onSurface p-2 m-2 rounded-lg shadow-lg" v-for="position in dashboardStore.dashboard.positions" :key="position.id">
                <CandidatesCard :position ="position"/>
            </div>
        </div>
        <div v-else>
            <div>The election results are currently being processed. We will update this page as soon as they become available.</div>
        </div>

    </div>
  
</template>

<script>
import { useDashboardStore } from '@/stores/dashboard';
import { onMounted } from 'vue';
import CandidatesCard from '@/views/components/admin/components/CandidatesCard.vue'
export default {
    components:{CandidatesCard},
    setup(){
        const dashboardStore = useDashboardStore()

        onMounted(()=>{
            dashboardStore.getSettings()
            dashboardStore.getResult()
        })
        
        return {dashboardStore}
    }

}
</script>

<style>

</style>