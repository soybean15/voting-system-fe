<template>
    <div class="flex-col m-4 p-3 text-white overflow-auto h-5/6 " v-if="!electionStore.loading">
        

        <div class="" v-if="electionStore.settings.show_result">
            <div class="flex text-xl font-bold">Result</div>
            <div class="bg-onSurface p-2 m-2 rounded-lg shadow-lg" v-for="position in electionStore.result" :key="position.id">
                
                <CandidatesCard :position ="position" :isOpen="electionStore.settings.isOpen"/>
            </div>
        </div>
        <div v-else>
            <div class="flex text-2xl font-bold" >Result not posted yet</div>
            <div class="flex">The election results are currently being processed. We will update this page as soon as they become available.</div>
        </div>

    </div>
  
</template>

<script>
import { useDashboardStore } from '@/stores/dashboard';
import { onMounted } from 'vue';
import CandidatesCard from '@/views/components/admin/components/CandidatesCard.vue'
import {useElectionStore} from '@/stores/vote'
export default {
    components:{CandidatesCard},
    setup(){
        //const dashboardStore = useDashboardStore()
        const electionStore = useElectionStore()

        onMounted(()=>{
            electionStore.getSettings()
            electionStore.getResult()
            //dashboardStore.getResult()
        })
        
        return {electionStore}
    }

}
</script>

<style>

</style>