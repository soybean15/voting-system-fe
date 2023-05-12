<template>
  <div class="flex flex-col p-6 text-white">
    <div class="flex p-2 font-bold text-xl border-b border-slate-800">
      Settings
    </div>
    <div class="flex p-2 text-sm border-b border-slate-800">
      <div>Show Result {{ dashboardStore.settings.show_result }}</div>
      <div class="grow"></div>

      <label class="relative inline-flex items-center cursor-pointer">
        <input type="checkbox" value="" class="sr-only peer" v-model="dashboardStore.settings.show_result" @change="dashboardStore.handleShowResult"/>
        <div
          class="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"
        ></div>
      </label>
    </div>

    <div class="flex p-2 text-sm border-b border-slate-800">
        <div>{{openCloseVoting}}</div>
      <div class="grow"></div>

      <label class="relative inline-flex items-center cursor-pointer">
        <input type="checkbox" value="" v-model="dashboardStore.settings.isOpen" @change="dashboardStore.handleOpenVoting" class="sr-only peer" />
        <div
          class="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"
        ></div>
      </label>
    </div>
  </div>
</template>

<script>
import { useDashboardStore } from "@/stores/dashboard";
import { onMounted,ref,computed } from 'vue';
export default {
    setup(){
        const dashboardStore = useDashboardStore()
        //const showResult = ref()

        onMounted(()=>{
            dashboardStore.getSettings()
        
        })

        const openCloseVoting = computed(()=>{
          return dashboardStore.settings.date_open ? "Election(Open)" : "Election(Close)"
        })
        return {dashboardStore ,openCloseVoting}
    }
};
</script>

<style>
</style>