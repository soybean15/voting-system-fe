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
  </div>

  <!-- <AddEditPositionVue /> -->
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