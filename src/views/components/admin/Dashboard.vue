<template>
  <div class="flex h-full">
    <div class="w-full flex flex-col grow">
      <span
        class="text-left pl-6 text-xl text-white font-bold pt-2"
        v-if="authStore.user"
        >Hello Admin {{ authStore.user.name }}</span
      >

      <div class="md:flex p-4 justify-start grid grid-cols-2">
        <div class="admin-card relative w-32 md:w-40 h-20 m-2">
          <div class="absolute top-1 left-1 text-sm text-white">
            Registered Voters
          </div>
          <div class="absolute bottom-4 left-5 text-3xl text-stone-300">
            {{ dashboardStore.dashboard.user_count }}
          </div>
          <div class="absolute bottom-0 right-0 text-3xl text-stone-300">
            <img
              class="w-16 opacity-40 h-16"
              src="@/assets/img/icon/user-icon.svg"
            />
          </div>
        </div>

        <div class="admin-card relative w-32 md:w-40 h-20 m-2">
          <div class="absolute top-1 left-1 text-sm text-white">Party List</div>
          <div class="absolute bottom-4 left-5 text-3xl text-stone-300">
            {{ dashboardStore.dashboard.partylist_count }}
          </div>
          <div class="absolute bottom-0 right-1 text-3xl text-stone-300">
            <img
              class="w-16 opacity-40 h-16"
              src="@/assets/img/icon/partylist-icon.svg"
            />
          </div>
        </div>
        <div class="admin-card relative w-32 md:w-40 h-20 m-2">
          <div class="absolute top-1 left-1 text-sm text-white">Positions</div>
          <div class="absolute bottom-4 left-5 text-3xl text-stone-300">
            {{ dashboardStore.dashboard.positions_count }}
          </div>
          <div class="absolute bottom-2 right-1 text-3xl text-stone-300">
            <img
              class="w-16 opacity-40 h-16"
              src="@/assets/img/icon/position-icon.svg"
            />
          </div>
        </div>
        <div class="admin-card relative w-32 md:w-40 h-20 m-2">
          <div class="absolute top-1 left-1 text-sm text-white">Candidates</div>
          <div class="absolute bottom-4 left-5 text-3xl text-stone-300">
            {{ dashboardStore.dashboard.candidate_count }}
          </div>
          <div class="absolute bottom-2 right-1 text-3xl text-stone-300">
            <img
              class="w-16 opacity-40 h-16"
              src="@/assets/img/icon/candidate-icon.svg"
            />
          </div>
        </div>
      </div>

      <div class="flex flex-col md:flex-row-reverse mr-6">
        <div class="flex shadow-lg  p-1 rounded-lg bg-gray-700">
          <div
            class="flex  mr-5 text-blue-400"
            v-if="dashboardStore.dashboard.voters"
          >
            Casted Vote: {{ dashboardStore.dashboard.voters.has_voted }}
          </div>
          <div class="flex text-emerald-400 items-center">
            <div>Turn out: {{ dashboardStore.turnOutPercentage }}%</div>
            <div class="flex w-24 bg-rose-400 h-1.5 ml-1 rounded-lg items-center"> 
              <div class="result-line  h-1 ml-0.5 rounded-lg bg-emerald-400 " :style="{'--percentage': dashboardStore.turnOutPercentage}" ></div>

            </div>
          </div>
        </div>
      </div>
      <div>
        <div class="flex ml-6 text-white font-bold">History</div>
        <div
          class="ml-6 bg-gray-700 drop-shadow-lg h-52 rounded-lg md:h-56 w-80 md:w-11/12"
        >
          <div
            class="text-white text-sm"
            v-for="log in dashboardStore.dashboard.vote_logs"
            :key="log.id"
          >
            <div class="flex p-1">
              <div class="flex w-1/2">
                <div class="flex pr-2">{{ log.id }}</div>

                <div class="flex">{{ log.user.name }}</div>
              </div>

              <div class="flex">{{ log.created_at }}</div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="grow mr-6 flex-col md:w-full h-5/6 md:h-96 w-full">
      <div class="text-white text-xl font-semibold flex p-2 pb-0 justify-between">
        <div class="">Result</div>

        <button  @click="dashboardStore.printResult" class="bg-green-300 px-2 rounded-md shadow-md">Print</button>
      </div>
      <div class="text-gray-400 text-sm flex p-2 pt-0">
        As of {{ currentTime }}
      </div>
      <div class="overflow-y-auto h-[700px] w-full">
        <div
          class="drop-shadow-lg rounded-lg bg-gray-700 m-2 p-2 pb-1"
          v-for="position in dashboardStore.dashboard.positions"
          :key="position.id"
        >
          <div>
            
            <CandidatesCard :position="position" :isOpen="dashboardStore.settings.isOpen"/>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { useAuthStore } from "@/stores/auth";
import { useDashboardStore } from "@/stores/dashboard";
import { computed, onMounted } from "vue";
import CandidatesCard from "./components/CandidatesCard.vue";
export default {
  components: { CandidatesCard },
  setup() {
    const authStore = useAuthStore();

    const dashboardStore = useDashboardStore();

    onMounted(() => {
      dashboardStore.getDashboard();
      //authStore.getUser()
    });

    const currentTime = new Date().toLocaleTimeString();

    return { authStore, dashboardStore, currentTime };
  },
};
</script>

<style scoped>
.admin-card {
  background-color: #452d72;
  border-radius: 10px;
  box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
  font-weight: bolder;
}

.result-line {

--percentage: 0%; /* Define a custom property for percentage */

width: calc(var(--percentage) * 0.01 * 100%); /* Use the custom property to set width */


margin-right: 2px;

@apply bg-gray-700;
border-top-right-radius: 5px;
border-bottom-right-radius: 5px;

}
</style>