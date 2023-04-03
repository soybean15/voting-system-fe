<template>
  <div class="relative h-full  ">

    <div class="text-4xl font-bold p-2 ">{{ position.name }} </div>

    <div v-for="candidate in position.candidates" :key="candidate.id">
        <CandidateCard :candidate="candidate" @selectedCandidate="selectedCandidate"/>
        
    </div>


  </div>
</template>

<script>
import { ref } from 'vue'
import CandidateCard from './CandidateCard.vue'

export default {
    props:['position'],
    components:{CandidateCard},
    setup(props){
        props.position.isActive = false
        const selected = ref(null)

        const selectedCandidate = (candidate)=>{
            if(selected.value!=null){
                candidate.isSelected = true
                selected.value.isSelected=false
            }
            selected.value = candidate
            console.log(candidate)



        }
       


        return {selectedCandidate}
    }

}
</script>

<style>
</style>