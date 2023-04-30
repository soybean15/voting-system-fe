<template>
  
</template>

<script>
import { useCandidateStore } from '@/stores/candidate';

export default {

    setup(){
        const candidateStore = useCandidateStore()
        candidateStore.getCandidates()
        console.log('from candidate vue')

        console.log(candidateStore.candidates)

    }
}
</script>

<style>

</style>