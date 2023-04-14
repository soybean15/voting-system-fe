<template>
  <div
  @click="onSelect"
  :class="{'on-selected': candidate.isSelected}"
    class="flex h-14 p-1 m-5 candidate-card rounded-md drop-shadow-lg cursor-pointer overflow-visible content-center"
   
  >
    <div class="candidate-img">
      <img class="h-20 w-20 rounded-full" :src="candidate.image" />
    </div>

    <div>
      <div>{{ candidate.name }}</div>
      {{  candidate.isSelected }}
      <div>{{ candidate.party_list_name }} </div>
    
    </div>
   
  </div>
</template>

<script>
import { ref } from "vue";
export default {
  props: ["candidate"],
  emits:['selectCandidate'],
  setup(props,{emit}) {
   // props.candidate.isSelected = false;


    const onSelect = ()=>{
     
      emit("selectCandidate",props.candidate)
    
    }
    
    return {onSelect}
  },
};
</script>

<style>
.candidate-img {
  display: flex;
  align-items: center;
  justify-content: center;
}
.candidate-card{
  @apply bg-slate-200;
}
.on-selected{
  @apply bg-slate-400;
}
</style>