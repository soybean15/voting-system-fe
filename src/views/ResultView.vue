<template>
  <div class="flex-col md:m-4 md:p-3 text-white" v-if="!electionStore.loading">
    <div v-if="electionStore.settings.show_result">
      <div class="flex text-xl items-center font-bold justify-center mt-4">
        <div>Result</div>
        <div class="text-gray-400 text-sm font-thin flex p-2">
          as of {{ currentTime }}
          <div class="text-cyan-400" v-if="electionStore.settings.isOpen">
            (unofficial)
          </div>
          <div class="text-rose-400" v-else>(Final)</div>
        </div>
      </div>
      <div class="flex-col overflow-auto result-container">
        <div
          class="bg-onSurface p-2 m-2 rounded-lg shadow-lg"
          v-for="position in electionStore.result"
          :key="position.id"
        >
          <CandidatesCard
            :position="position"
            :isOpen="electionStore.settings.isOpen"
          />
        </div>
      </div>
    </div>
    <div class="pt-10" v-else>
      <div class="text-2xl font-bold p-5">Result not posted yet</div>
      <div class="flex p-5">
        The election results are currently being processed. We will update this
        page as soon as they become available.
      </div>
    </div>
  </div>
</template>

<script>
import { useDashboardStore } from "@/stores/dashboard";
import { onMounted, onUnmounted } from "vue";
import CandidatesCard from "@/views/components/admin/components/CandidatesCard.vue";
import { useElectionStore } from "@/stores/vote";
import { useAuthStore } from "@/stores/auth";
export default {
  components: { CandidatesCard },
  setup() {
    //const dashboardStore = useDashboardStore()
    const electionStore = useElectionStore();
    const authStore = useAuthStore();
    authStore.getUser();
    onMounted(() => {
      electionStore.getSettings();
      electionStore.getResult();

      //dashboardStore.getResult()
    });

    onUnmounted(() => {});
    const currentTime = new Date().toLocaleTimeString();

    return { electionStore, currentTime };
  },
};
</script>

<style scoped>
.result-container {
  height: 40em;
}
</style>