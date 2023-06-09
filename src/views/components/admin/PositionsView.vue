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
        @click="positionStore.openCloseModal(false)"
        class="btn-green-800 text-xs p-1 flex items-center rounded-sm"
      >
        <img width="20" src="@/assets/img/icon/add-icon.svg" />
        <div class="pl-1">Add Position</div>
      </button>
      <div class="grow">
        <div v-if="positionStore.status">
          <div
            class="relative border border-lime-900 border-4 rounded-md ml-40 mr-40 bg-emerald-300 p-2"
          >
            {{ positionStore.status.message }}
            <div
              @click="positionStore.clearStatus"
              class="absolute right-2 top-2 cursor-pointer"
            >
              X
            </div>
          </div>
        </div>
      </div>

      <div class="pr-10" v-if="positionStore.positions">
        <PaginationViewVue
          :perGroupPage="5"
          :links="positionStore.positions.links"
          :totalPages="positionStore.positions.last_page"
          @onClickPage="onClickPage"
          :store="positionStore"
        />
      </div>
    </div>

    <div class="p-6 flex w-full">
      <div class="w-5/12" v-if="positionStore.positions">
        <div
          @click="positionStore.onSelectedItem(position)"
          :class="{ active: position.selected }"
          class="flex-col position-item cursor-pointer"
          v-for="position in positionStore.positions.data"
          :key="position.id"
        >
          <div class="border-b text-sm border-slate-800 flex-col p-2">
            <div class="text-white flex font-bold text-xl">
              <div class="grow flex">{{ position.name }}</div>

              <div class="flex" v-if="position.selected">
                <div class="pr-2">
                  <img
                    @click="positionStore.openCloseModal(true)"
                    class="w-5 h-5 cursor-pointer"
                    src="@/assets/img/icon/edit-icon.svg"
                  />
                </div>
                <div>
                  <img
                    @click="openCustomModal('deletePosition',position)"
                    class="w-5 h-5 cursor-pointer"
                    src="@/assets/img/icon/delete-icon.svg"
                  />
                </div>
              </div>
            </div>
            <div class="text-slate-300 text-sm flex">
              Winner count: {{ position.winner_count }}
            </div>
            <div class="text-slate-300 text-sm flex">
              Candidates: {{ position.candidates.length }}
            </div>
          </div>
        </div>
      </div>
      <div class="relative w-full h-80 candidates-panel">
        <div
          class="overflow-y-scroll h-full"
          v-if="positionStore.selectedPosition"
        >
          <div
            class="m-2 grid grid-cols-2 md:grid-cols-3"
            v-if="positionStore.selectedPosition.candidates.length > 0"
          >
            <div
              class="flex m-1 overflow-hidden items-center h-20 drop-shadow-lg rounded-xl"
              v-for="candidate in positionStore.selectedPosition.candidates"
              :key="candidate.id"
            >
              <!-- <div :style="{  backgroundImage: 'url(' + candidate.party_list_image + ')'  }" class="absolute w-full h-full item-background"></div> -->
              <div class="relative w-full">
                <div
                  class="ml-4 absolute right-10 bg-onSurface w-full h-full z-0 drop-shadow-lg"
                ></div>
                <div class=" item-background w-full ">
                  <div class="grow"></div>
                  <img
                  :src="candidate.party_list_image"
                  class="w-20 h-20 opacity-80 rounded-full drop-shadow-lg"
                />

                </div>
              
                <div class="absolute item flex items-center pl-2">
                  <div class="mr-1">
                    <img
                      class="rounded-full w-16 h-16"
                      :src="candidate.image"
                    />
                  </div>
                  <div class="flex flex-col text-white text-sm font-bold">
                    <div class="flex">{{ candidate.name }}</div>
                    <div class="flex font-light">
                      {{ candidate.party_list_name }}
                    </div>
                  </div>
                </div>
                <div
                  class="absolute right-1 top-0 z-50 shadow-lg cursor-pointer"
                >
                <!-- @click="positionStore.handleRemoveCandidate(candidate.id)" -->
                  <img
                    @click="openCustomModal('removeCandidate',candidate)"
                    class="w-5 h-5"
                    src="@/assets/img/icon/remove-icon.svg"
                  />
                </div>
              </div>
            </div>
          </div>
          <div class="p-8 text-white text-lg" v-else>No Candidates yet </div>
        </div>
        <div v-else>
          <div>Candidates</div>
        </div>

        <div v-if="positionStore.selectedPosition">
          <div
            @click="positionStore.openCloseInsertCandidateModal"
            class="absolute bottom-5 right-5 shadow-lg rounded-xl w-10 h-10 bg-green-500 cursor-pointer"
          >
            <img src="@/assets/img/icon/add-icon.svg" />
          </div>
        </div>
      </div>
    </div>
  </div>

  <div v-if="positionStore.openAddCandidateModal">
    <AddCandidates />
  </div>

  <AddEditPositionVue :class="{ hidden: !positionStore.onOpenModal }" />

  <div v-if="alertDialog.isOpen">
    <MessageDialogModal
  
      :alertDialog= alertDialog

    />
  </div>
  
</template>

<script>
import { usePositionStore } from "@/stores/position";
import { onMounted,ref } from "vue";
import AddEditPositionVue from "@/views/components/admin/modals/AddEditPosition.vue";
import AddCandidates from "@/views/components/admin/modals/AddCandidates.vue";
import PaginationViewVue from "@/components/PaginationView.vue";
import MessageDialogModal from "@/views/components/admin/modals/MessageDialogModal";

export default {
  components: {
    AddEditPositionVue,
    AddCandidates,
    PaginationViewVue,
    MessageDialogModal,
  },
  setup() {
    const positionStore = usePositionStore();

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
    const onProceed=()=>{
      if(alertDialog.value.action == 'removeCandidate'){
        positionStore.handleRemoveCandidate(alertDialog.value.id)
      }else if(alertDialog.value.action== 'deletePosition'){
        
        positionStore.handleDeletePosition()
      }
      alertDialog.value.isOpen = !alertDialog.value.isOpen
    }

    const openCustomModal =(action,item)=>{
   
      if(action == 'removeCandidate' ){
        alertDialog.value.prompt = 'Are you sure you want to remove '+ item.name + '? '
      }else if(action == 'deletePosition'){
        alertDialog.value.prompt = 'Are you sure you want to Delete '+ item.name + '? '
      }

      alertDialog.value.isOpen = !alertDialog.value.isOpen
      alertDialog.value.action= action
      alertDialog.value.id =item.id
      alertDialog.value.onClose = onClose
      alertDialog.value.onProceed = onProceed
    }




    onMounted(() => {
      positionStore.getPositions(null);
    
    });

    const onClickPage = () => {};
    const onClick = () => {
      console.log("hello");
    };

    return { 
      positionStore,
       onClickPage,
        onClick,
         alertDialog,
         onClose ,
         openCustomModal,
        onProceed};
  },
};
</script>

<style scoped>
.position-item.active {
  background-color: #101318;
}
.candidates-panel {
  background-color: #101318;
}
.filler {
  background-color: #101318;
  z-index: 1;
}

.item-background {
  /* background-size: cover;
  background-repeat: no-repeat;
  background-position: center center;
  width: 100%;
  height: 100%;
 
  */
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1;
}
.item {
  z-index: 2;
}
</style>