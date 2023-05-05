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
      <div class="flex p-4 pb-0 text-base font-bold">Add New Position</div>
      <div class="flex items-center">
      
        <div class="relative w-full">
        <div
          class="absolute inset-y-0 left-0 top-1 flex items-center pl-7 pointer-events-none"
        >
          <svg
            aria-hidden="true"
            class="w-4 h-4 text-gray-500 dark:text-gray-400"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            ></path>
          </svg>
        </div>
        <div class="text-left pl-6 pr-7 text-white pt-2">
          <input
            v-model="searchValue"
            class="bg-gray-600 h-6 w-full pl-10 text-sm rounded-xl"
           placeholder="Search"
            type="text"
           
          />
        </div>
      </div>

      </div>

      <div class="overflow-y-scroll h-52">
        <div class="grid p-4 grid-cols-4 ">
        <div
            
            @click="positionStore.onSelectedCandidate(candidate)"
          class="flex-col w-16 h-28 place-content-center center cursor-pointer"
          v-for="candidate in computedCandidates"
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
import { computed, ref } from 'vue';
export default {
  setup() {
    const positionStore = usePositionStore();

    const searchValue = ref('')

    const computedCandidates = computed(()=>{
      const lowercaseSearchValue = searchValue.value.toLowerCase();
      return positionStore.candidates.filter(item =>item.name.toLowerCase().includes(lowercaseSearchValue));
    })
    

    return { positionStore,searchValue,computedCandidates };
  },
};
</script>

<style scoped>
.admin-modal {
  height: 21em;
}
</style>