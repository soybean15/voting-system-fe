<template>
  <div class="relative h-full ">

    <div class="text-4xl font-bold p-2">{{ position.name }} </div>

    <div v-for="candidate in position.candidates" :key="candidate.id">
        <CandidateCard :candidate="candidate"/>
        
    </div>


  </div>
</template>

<script>
import CandidateCard from './CandidateCard.vue'

export default {
    props:['position'],
    emits:['next','back'],
    components:{CandidateCard},
    setup(props,{emit}){
        props.position.isActive = false
        const handleNext = () => {
            emit('next')
        }
        const handleBack = () => {
            emit('back')
        }


        return {handleNext,handleBack}
    }

}
</script>

<style>
</style>