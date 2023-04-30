<template>

    <AddEditCandidate />
  
</template>

<script>
import { useCandidateStore } from '@/stores/candidate';
import AddEditCandidate from '@/views/components/admin/modals/AddEditCandidate'

export default {
    components:{AddEditCandidate},

    setup(){
        const candidateStore = useCandidateStore()
        candidateStore.getCandidates()
        console.log('from candidate vue')

        console.log(candidateStore.partylist)

    }
}
</script>

<style>

</style>