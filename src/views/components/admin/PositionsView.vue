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

    <div class="p-6">

      
      
      <div v-if="positionStore.positions.data">
        <div class="flex-col" v-for="position in positionStore.positions.data.data" :key="position.id">
           
            <div class="border-b text-sm border-slate-800 flex-col mr-6 p-2">
              <div class="text-white flex font-bold text-xl">{{ position.name }}</div>
              <div class="text-slate-300 text-sm flex">Winner count: {{ position.winner_count }}</div>
              <div class="text-slate-300 text-sm flex">Candidates: {{ position.cadidates }}</div>
            </div>
        </div>
      </div>

    </div>

  
    


  </div>

  <AddEditPositionVue  :class="{'hidden':!positionStore.onOpenModal}" />
</template>

<script>
import { usePositionStore } from "@/stores/position";
import { onMounted } from "vue";
import AddEditPositionVue from "@/views/components/admin/modals/AddEditPosition.vue";
export default {
  components: { AddEditPositionVue },
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
</style>