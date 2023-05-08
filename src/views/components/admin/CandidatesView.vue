<template>
 

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
          @click="candidateStore.openAddEditModal(null)"
          class="btn-green-800 text-xs p-1 flex items-center rounded-sm"
        >
          <img width="20" src="@/assets/img/icon/add-icon.svg" />
          <div class="pl-1">Add Candidate</div>
        </button>

        <div class="grow">

          <div v-if="candidateStore.status">
          
            <div class="relative border border-lime-900 border-4 rounded-md ml-40 mr-40 bg-emerald-300 p-2"
            >
              {{ candidateStore.status.message }}
              <div
                @click="candidateStore.clearStatus"
                class="absolute right-2 top-2 cursor-pointer"
              >
                X
              </div>
            </div>
          </div>
        </div>
        
         
        <div class="mr-10" v-if="candidateStore.candidates.data" >
        
            <PaginationViewVue
              :perGroupPage="5"
              :links="candidateStore.candidates.links"
              :totalPages = "candidateStore.candidates.last_page"
              @onClickPage="onClickPage"
              :store="candidateStore"
            />
          </div>

    </div>

   
    <div class="m-6" >
        <div class="flex-col">
         
              
                <div class="flex w-full items-center border-t  border-b p-1 border-slate-800">
                  <div class="flex w-10 text-xl font-semibold text-white "></div>
                  <div class="flex w-1/4 text-xl font-semibold text-white  ml-4 ">Name</div>
                  <div class="flex w-1/4 text-xl font-semibold text-white">Partylist</div>
                  <div class="flex w-1/4 text-xl font-semibold text-white">Position</div>
                  <div class="flex w-1/4 text-xl font-semibold text-white">Actions</div>
                </div>
            <div class="flex pt-2 pb-2 border-b text-sm border-slate-800" v-for="candidate in candidateStore.candidates.data" :key="candidate.id">
         
              <img class="rounded-full w-10 h-10" :src="candidate.image"/>
           
                <div class="flex w-full items-center ml-4 ">
                  <div class="flex w-1/4 text-md font-semibold text-white">{{ candidate.name }}</div>
                  <div class="flex w-1/4 text-md font-thin text-white">{{ candidate.party_list_name }}</div>
                  <div class="flex w-1/4 text-md font-thin text-white">{{ candidate.position_name }}</div>
                  <div class="flex w-1/4 text-md font-thin text-white">
                    
                    <!--  -->
                    <button class="mr-8" @click="candidateStore.openAddEditModal(candidate.id, candidate.name, candidate.image,candidate.party_list)"><img width="20" src="@/assets/img/icon/edit-icon.svg" /></button>
                    <button @click="openCustomModal('deleteCandidate',candidate)"><img width="20" src="@/assets/img/icon/delete-icon.svg" /></button>

                  </div>
                </div>
            </div>

            
        </div>
       

    </div>

    </div>

    <div v-if="candidateStore.onOpenModal">
      <AddEditCandidate />
    </div>

   
  
    <div v-if="alertDialog.isOpen">
    <MessageDialogModal
      @onCloseModal = onClose
      @onProceed = onProceed
      :alertDialog= alertDialog

    />
  </div>

   
    
</template>

<script>
import { useCandidateStore } from '@/stores/candidate';
import AddEditCandidate from '@/views/components/admin/modals/AddEditCandidate'
import PaginationViewVue from '@/components/PaginationView.vue';
import MessageDialogModal from "@/views/components/admin/modals/MessageDialogModal";
import { ref } from 'vue';

export default {
    components:{AddEditCandidate,PaginationViewVue,MessageDialogModal},

    setup(){
        const candidateStore = useCandidateStore()
        candidateStore.getCandidates(null)
      
        const onClickPage = ( )=>{
        
        }


        






    const alertDialog = ref(
      {
        isOpen:false,
        prompt:'',
        action:null,
        id:null,
        onClose:null
      }
    );
    const onClose=()=>{
     
      alertDialog.value.isOpen = !alertDialog.value.isOpen
    }
    
    const openCustomModal =(action,item)=>{
   
      if(action == 'deleteCandidate' ){
        alertDialog.value.prompt = 'Are you sure you want to delete '+ item.name + '? '
      }
      alertDialog.value.isOpen = !alertDialog.value.isOpen
      alertDialog.value.action= action
      alertDialog.value.id =item.id
      alertDialog.value.onClose = onClose
     
    }

    
    
    const onProceed=()=>{
      if(alertDialog.value.action == 'deleteCandidate'){
        
        candidateStore.handleDeleteCandidate(alertDialog.value.id)
      }
      alertDialog.value.isOpen = !alertDialog.value.isOpen
    }

        
      
        return {
          candidateStore,
          onClickPage,
          alertDialog,
          onClose,
          onProceed,
          openCustomModal
        }

    }
}
</script>

<style>

</style>