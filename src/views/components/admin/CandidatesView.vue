<template>
  {{ candidateStore.onOpenModal }}

     <div class="w-full flex flex-col">
    <div class="flex space-between">
      <span class="text-left pl-6 text-xl text-white font-bold pt-2"
        >Candidates</span
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
          @click="candidateStore.openCloseModal"
          class="btn-green-800 text-xs p-1 flex items-center rounded-sm"
        >
          <img width="20" src="@/assets/img/icon/add-icon.svg" />
          <div class="pl-1">Add Candidate</div>
        </button>
    </div>


    <div class="m-6">
        <div class="flex-col">
            <div class="flex items-center border-b text-sm border-slate-800" v-for="candidate in candidateStore.candidates.data" :key="candidate.id">
                <img class="rounded-full w-20 h-20" :src="candidate.image"/>

                <div class="text-white">{{ candidate.name }}</div>
            </div>

            
        </div>
       

    </div>

    </div>

    <AddEditCandidate :class="{'hidden':!candidateStore.onOpenModal}"/>
  

   
    
</template>

<script>
import { useCandidateStore } from '@/stores/candidate';
import AddEditCandidate from '@/views/components/admin/modals/AddEditCandidate'

export default {
    components:{AddEditCandidate},

    setup(){
        const candidateStore = useCandidateStore()
        candidateStore.getCandidates()
      
        return {candidateStore}

    }
}
</script>

<style>

</style>