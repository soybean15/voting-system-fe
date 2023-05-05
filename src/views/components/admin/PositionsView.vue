<template>
  <div class="w-full flex flex-col">
    <div class="flex space-between">
      <span class="text-left pl-6 text-xl text-white font-bold pt-2"
        >Positions</span
      >
      <span class="grow"></span>
      <div class="relative">
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
            class="bg-gray-600 h-6 w-full pl-10 text-sm rounded-xl"
            placeholder="Search"
            type="text"
          />
        </div>
      </div>
    </div>

    <div class="flex pl-6 mt-2">
      <button
          @click="positionStore.openCloseModal"
          class="btn-green-800 text-xs p-1 flex items-center rounded-sm"
        >
          <img width="20" src="@/assets/img/icon/add-icon.svg" />
          <div class="pl-1">Add Position</div>
        </button>
    </div>

    <div class="p-6 flex w-full">


      
      <div class="w-5/12" v-if="positionStore.positions">
     
        <div @click="positionStore.onSelectedItem(position)" :class="{'active':position.selected}" class="flex-col position-item   cursor-pointer" v-for="position in positionStore.positions.data" :key="position.id">
           
            <div class="border-b text-sm border-slate-800 flex-col  p-2">
              <div class="text-white flex font-bold text-xl">{{ position.name }} {{position.selected  }}</div>
              <div class="text-slate-300 text-sm flex">Winner count: {{ position.winner_count }}</div>
              <div class="text-slate-300 text-sm flex">Candidates: {{ position.cadidates }}</div>
            </div>
        </div>
      </div>
      <div class="relative w-full h-80 candidates-panel ">

        <div class="overflow-y-scroll h-full" v-if="positionStore.selectedPosition">
          
          <div class=" grid grid-cols-2 md:grid-cols-3" v-if="positionStore.selectedPosition.candidates.length > 0">

         
            <div class="p-2 flex items-center " :style="{ backgroundImage: 'url(' + candidate.party_list_image + ')' }" v-for="candidate in positionStore.selectedPosition.candidates" :key="candidate.id">
              
              <div class="mr-2" ><img class="rounded-full w-14 h-14" :src="candidate.image"></div>
              <div class="flex text-white ">{{ candidate.name }}</div>
            </div>

          </div>
          <div v-else>
            No Candidates
          </div>
          
   
        </div>
        <div v-else>
          <div >Candidates</div>

        </div>

        <div v-if="positionStore.selectedPosition">
          <div @click="positionStore.openCloseInsertCandidateModal" class=" absolute bottom-5 right-5 shadow-lg rounded-xl w-10 h-10 bg-green-500 cursor-pointer">
          <img src="@/assets/img/icon/add-icon.svg" />
        </div>
        
        </div>



      </div>

    </div>

  
    


  </div>

  <div v-if="positionStore.openAddCandidateModal">
    <AddCandidates/>
  </div>


  <AddEditPositionVue  :class="{'hidden':!positionStore.onOpenModal}" />
</template>

<script>
import { usePositionStore } from "@/stores/position";
import { onMounted } from "vue";
import AddEditPositionVue from "@/views/components/admin/modals/AddEditPosition.vue";
import AddCandidates from "@/views/components/admin/modals/AddCandidates.vue"
export default {
  components: { AddEditPositionVue, AddCandidates },
  setup() {
    const positionStore = usePositionStore();

    onMounted(() => {
      positionStore.getPositions();
    });


    return { positionStore };
  },
};
</script>

<style>
.position-item.active{
  background-color: #101318;
}
.candidates-panel{
  background-color: #101318;
}
  
</style>