<template>
  <div
  @click="onSelect"
    class="flex h-16 p-1 m-5 bg-slate-200 rounded-md drop-shadow-lg cursor-pointer overflow-visible content-center"
    :class="{onselected: candidate.isSelected}"
  >
    <div class="candidate-img">
      <img class="h-20 rounded-full" :src="candidate.image" />
    </div>

    <div>{{ candidate.name }} </div>
  </div>
</template>

<script>
import { ref } from "vue";
export default {
  props: ["candidate"],
  emits:['selectedCandidate'],
  setup(props,{emit}) {
    props.candidate.isSelected = false;


    const onSelect = ()=>{
     
      emit("selectedCandidate",props.candidate)
    
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
.onselected{
  background-color: rgb(148 163 184);
}
</style>