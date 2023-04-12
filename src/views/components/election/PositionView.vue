<template>

  <div class="relative h-full">
    <div class="flex-none font-bold p-2 text-xl md:text-4xl">
      {{ position.name }}
      
    </div>
    <div class="text-left text-lg font-semibold">Select : {{ count }}</div>

    <div class="candidate-list grid w-full grid-container">
      <div v-for="candidate in position.candidates" :key="candidate.id">
        <CandidateCard
          :candidate="candidate"
          @selectCandidate="selectCandidate"
        />
      </div>
    </div>
  </div>
</template>

<script>
import { ref } from "vue";
import CandidateCard from "./CandidateCard.vue";

export default {
  props: ["position"],

  components: { CandidateCard },
  setup(props) {


    const len = props.position.candidates.length;
    let c = 2;
    if (len > 3) {
      c = len / 3;
    }
    let col = Math.ceil(c)
   

    const gridProperty = ref("repeat("+col+", minmax(0, 1fr))")
    console.log("gridProperty "+gridProperty.value)
    const selected = ref(null);
    let count = ref(props.position.winner_count)

    const selectCandidate = (candidate) => {
      if(props.position.winner_count>1){

        
        if(count.value>0 || candidate.isSelected){
          candidate.isSelected =  !candidate.isSelected 


          if(candidate.isSelected){
          // props.position.selectedWinners.push(candidate)
            props.position.isSelected = true
            count.value--
          }else{
            //props.position.selectedWinners.filter(candidate => candidate !== candidate)
            props.position.isSelected = false
            count.value++
          }

        }

        console.log("count "+count.value+" "+props.position.winner_count)
        
      }else{

        onTwoSelection(candidate)
      }

    };

    const onTwoSelection = (candidate) => {
      if (selected.value != null) {
        selected.value.isSelected = false;
       
      }
      if (selected.value == candidate) {
        candidate.isSelected = false;
        selected.value = null;
        props.position.voted = false;
        count.value++
      } else {
        candidate.isSelected = true;
        selected.value = candidate;
        props.position.voted = true;
        if(count.value==1) {count.value--}
      }
    };

    return { selectCandidate, gridProperty ,count,col};
  },
};
</script>

<style>
.candidate-list {
  height:65%;
}

.grid-container {
  grid-template-columns: v-bind(gridProperty);
}
</style>