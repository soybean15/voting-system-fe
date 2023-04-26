<template>
  {{ voteStore.isAdd }}
  <div class="w-full flex flex-col">
    <div class="flex space-between">
      <span class="text-left pl-6 text-xl text-white font-bold pt-2"
        >Party List</span
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
    <div class="pl-6 mt-2">
      <div class="flex mb-2">
        <button
          @click="voteStore.openAddEditModal(null)"
          class="btn-green-800 text-xs p-1 flex items-center rounded-sm"
        >
          <img width="20" src="@/assets/img/icon/add-icon.svg" />
          <div class="pl-1">Add Partylist</div>
        </button>
        <div class="grow">
          <div v-if="voteStore.status">
            <div class="relative border border-lime-900 border-4 rounded-md ml-40 mr-40 bg-emerald-300 p-2"
            >
              {{ voteStore.status.message }}
              <div
                @click="voteStore.clearStatus"
                class="absolute right-2 top-2 cursor-pointer"
              >
                X
              </div>
            </div>
          </div>
         
        </div>

        <div>
          <div class="mr-10" v-if="voteStore.partyList.data">
            <PaginationViewVue
              :perGroupPage="5"
              :links="voteStore.partyList.data.links"
              :totalPages = 'itemLen'
              @onClickPage="onClickPage"
              :store="voteStore"
            />
          </div>
        </div>
      </div>

      <div
        class="border-b border-t border-slate-800 font-semibold text-sm flex mr-6 p-2"
      >
        <div class="w-12"></div>
        <div class="flex grow items-center pl-4 text-white w-32">
          PartyList Name
        </div>
        <div
          class="flex grow items-center text-white w-20 place-content-center"
        >
          Number of Members
        </div>
        <div
          class="flex grow items-center pl-4 text-white w-20 place-content-center"
        >
          Actions
        </div>
      </div>

      <div v-if="voteStore.partyList.data && !voteStore.loading">
        <div
          class="flex-col"
          v-for="partyList in voteStore.partyList.data.data"
          :key="partyList.id"
        >
          <div class="border-b text-sm border-slate-800 flex mr-6 p-2">
            <img class="w-12 rounded-full" :src="partyList.image" />
            <div class="flex grow items-center pl-4 text-white w-32">
              {{ partyList.name }}
            </div>
            <div
              class="flex grow items-center text-white w-20 place-content-center"
            >
              {{ partyList.candidates.length }}
            </div>
            <div
              class="flex grow items-center pl-4 text-white w-20 place-content-center"
            >
              <button @click="voteStore.openAddEditModal(partyList.id,partyList.name, partyList.image)" class="m-2">Edit</button>
              <button
                class="m-2"
                @click="voteStore.handleDeletePartyList(partyList.id)"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      </div>
      <div v-else>Loading..</div>
    </div>

    <div v-if="voteStore.onAdd">
      <AddPartyList
        
        @onSavePartylist="onSavePartylist"
      />
    </div>
  </div>
</template>

<script>
import { useVoteStore as usePartylistStore } from "@/stores/partylist";
import {
  computed,
  onMounted,

  ref,
} from "vue";
import AddPartyList from "@/views/components/admin/modals/AddPartyList.vue";
import PaginationViewVue from "@/components/PaginationView.vue";

export default {
  components: { AddPartyList, PaginationViewVue },
  setup() {
    const voteStore = usePartylistStore();

    
    onMounted(() => {
      voteStore.getPartyList(null);
    });



    const len = ref();
    const onSavePartylist = () => {
      voteStore.getPartyList(null);
    };

    const itemLen =
      computed(() => {
        if (len.value == null) {
          return voteStore.partyList.data.last_page;
        } else {
          return len.value;
        }
      })
    ;

    const onClickPage = (path) => {
      voteStore.getPartyList(path);
      
    };

    return { voteStore, onClickPage, onSavePartylist,  itemLen };
  },
};
</script>

<style>

</style>