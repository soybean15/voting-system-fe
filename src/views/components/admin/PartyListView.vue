<template>
  partyList
</template>

<script>
import { useVoteStore } from '@/stores/vote';
import { onUnmounted } from 'vue';
export default {
    setup(){
        const voteStore = useVoteStore()
        voteStore.getPartyList()
        
    }


}
</script>

<style>

</style>