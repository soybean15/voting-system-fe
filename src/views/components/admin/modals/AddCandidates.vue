<template>
  <div class="modal-overlay-2 flex">
    <div
      class="admin-modal bg-onSurface flex-col justify-items-start font-color-primary"
    >
      <div  class="relative w-full">
        <img
            @click="positionStore.openCloseInsertCandidateModal"
          class="h-7 absolute top-2 right-2 cursor-pointer"
          src="@/assets/img/icon/close-icon.svg"
        />
      </div>
      <div class="flex p-4 text-base font-bold">Add New Position</div>

      <div class="overflow-y-scroll h-52">
        <div class="grid p-4 grid-cols-4 ">
        <div
            
            @click="positionStore.onSelectedCandidate(candidate)"
          class="flex-col w-16 h-28 place-content-center center cursor-pointer"
          v-for="candidate in positionStore.candidates"
          :key="candidate.id"
        >
          <div :class="{'bg-sky-600':candidate.isSelected}" class=" h-16 rounded-full">
            <img class="w-full p-1 h-16 rounded-full" :src="candidate.image" />

          </div>  
          
          <div class="text-xs">{{ candidate.name }}</div>
        </div>
      </div>

      </div>

      
      <button @click="positionStore.handleInsertCandidates" class="btn btn-green">Submit</button>
    </div>
  </div>
</template>

<script>
import { usePositionStore } from "@/stores/position";
export default {
  setup() {
    const positionStore = usePositionStore();

    return { positionStore };
  },
};
</script>

<style scoped>
.admin-modal {
  height: 20em;
}
</style>