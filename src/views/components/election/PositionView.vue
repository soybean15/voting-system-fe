<template>
  <div class="relative h-full">
    <div class="flex-none font-bold p-2 text-xl md:text-4xl">
      {{ position.name }}
      
    </div>
    <div class="text-left text-lg font-semibold">Select : {{ count }}</div>

    <!-- candidate-list absolute grow overflow-auto  w-full -->
    <div class="grid w-full" :class="gridProperty">
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

   // props.position.selectedWinners = []
    const len = props.position.candidates.length;
    let col = 1;
    if (len > 3) {
      col = len / 3;
    }
    console.log("WInner count "+props.position.winner_count)
    const gridProperty = ref("grid-cols-" + col);

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

        console.log("count "+count+" "+props.position.winner_count)
        
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
      } else {
        candidate.isSelected = true;
        selected.value = candidate;
        props.position.voted = true;
      }
    };

    return { selectCandidate, gridProperty ,count};
  },
};
</script>

<style>
.candidate-list {
  height: 70%;
}

.grid-container {
  grid-template-columns: v-bind(gridProperty);
}
</style>