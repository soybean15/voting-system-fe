<template>
  <div
  @click="onSelect"
  :class="{'on-selected': candidate.isSelected}"
    class="flex items-center h-24 p-1 m-5 candidate-card  rounded-md drop-shadow-lg cursor-pointer overflow-visible content-center"
   
  >
    <div class="candidate-img">
      <img class="h-20 w-20 rounded-full" :src="candidate.image" />
    </div>

    <div class="flex-col pl-4">
      <div class=" flex text-xl text-semibold">{{ candidate.name }}</div>
     
      <div class="flex items-center ">
        <img class=" flex w-6 h-6 " :src="candidate.party_list_image"/>
        <div class="pl-2 flex items-center h-6 text-sm pt-1">{{ candidate.party_list_name }} </div>
      </div>
    
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
  /* @apply bg-rose-200; */
  background-color: #1d222b;
  color: white;

}
.on-selected{
  /* @apply bg-rose-100; */
  background-color:white;
  color: #1d222b;;
}
</style>