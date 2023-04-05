<template>
  <div class="relative h-full">
    <div class="flex-none font-bold p-2 text-xl md:text-4xl">{{ position.name }}</div>

    <div class="candidate-list absolute grow overflow-auto  w-full">
      <div v-for="candidate in position.candidates" :key="candidate.id">
      <CandidateCard
        :candidate="candidate"
        @selectedCandidate="selectedCandidate"
      />
    </div>

    </div>

 
  </div>
</template>

<script>
import { ref,} from "vue";
import CandidateCard from "./CandidateCard.vue";

export default {
  props: ["position"],
    
  components: { CandidateCard },
  setup(props,{emit}) {
    //const voted = ref(props.position.voted)
    const selected = ref(null);

    const selectedCandidate = (candidate)=>{
        if(selected.value!=null ){

            selected.value.isSelected=false
         
        }
        if(selected.value == candidate){
            candidate.isSelected = false
            selected.value = null
            props.position.voted = false
           //voted.value = false
        }else{
            candidate.isSelected=true
            selected.value = candidate
         props.position.voted = true
          // voted.value = true
        }
       //  props.position.voted = voted.value
    
        console.log( props.position.voted)


    }
    

    return { selectedCandidate };
  },
};
</script>

<style>
.candidate-list{
height: 70%;
}
</style>