<template>
  <div class="parent flex mt-10 rounded-none md:rounded-sm drop-shadow-none md:drop-shadow-lg">
    <div class="w-24 md:w-2/6">
      <PositionSideView
        :positions="positions"
        :activeTab="activeTab"
        @onClickTab="onClickTab"
      />
    </div>

    <div class="relative w-full overflow-hidden">
      <div class="flex-col h-full">
        <div
          class="w-full item"
          v-for="(position, index) in positions"
          :key="position.id"
        >
          <div
            class="absolute tab w-full h-full"
            :class="{ active: activeTab == index }"
          >
            <PositionView :position="position" />
          </div>

          <div class="absolute right-0 bottom-0 w-full pl-4 m-1">
            <div class="flex">
              <button
                @click="back"
                class="btn btn-blue"
                :class="{ hidden: onFirst }"
              >
                {{ backStr }}
              </button>
              <div class="grow"></div>
              <button @click="next" class="btn btn-blue">
                {{ nextStr }}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>

  <ResultModal
    :positions="positions"
    :showResult="showResult"
    @closeResultModal="closeResultModal"
  />
</template>

<script>
import { computed, ref, watchEffect } from "vue";
import PositionView from "./PositionView.vue";
import PositionSideView from "./PositionSideView.vue";
import ResultModal from "@/views/components/modal/ResultModal.vue";
import { useElectionStore } from "@/stores/vote";


import { onMounted,  onUnmounted } from "vue";

export default {
  components: { PositionView, PositionSideView, ResultModal },
  setup() {
    const electionStore = useElectionStore();
  
    //electionStore.welcome();

    const positions = ref();

    let item = localStorage.getItem("positions")

    onMounted(() => {
     

      item = localStorage.getItem("positions")
      electionStore.getSettings()
     
      electionStore.getElection()
        .then((response) => {
         
          if(!response.data.status ){
            electionStore.status.title = response.data.title
            electionStore.status.message = response.data.message
            electionStore.redirect()
          }else if( !electionStore.settings.isOpen){
            electionStore.status.title = "Election is Close"
            electionStore.status.message = "We're sorry, the voting period for this election has already ended. Thank you to all who participated in the election. Please stay tuned for the results, which will be announced shortly."
            electionStore.redirect()
          }
          
        })
      
 
    });

    const activeTab = ref(0);
    const len = ref(0);

    const backStr = ref("Back");
    const nextStr = ref("Next");

    let onLast = false;
    let onFirst = ref(true);

    let showResult = ref("hidden");

    onUnmounted(() => {
    

      const serializedObject = JSON.stringify(positions.value);

      // Save the string in local storage using localStorage.setItem()
      localStorage.setItem("positions", serializedObject);

      
    });

    if (!item || item == "null") {
      electionStore.getElection()
        .then((response) => {
         
          console.log(response.data)
          positions.value = response.data.data;
          len.value = positions.value.length;
          

          addAttribute(positions);
        })
      
    } else {
    
     
      try{
        positions.value = JSON.parse(item);
        len.value = positions.value.length;
      }catch(e){
        //electionStore.redirect()

      }
     
     
    }

    const addAttribute = (positions) => {
      positions.value.forEach((position) => {
        position.voted = ref(false);
        position.candidates.forEach((candidate) => {
          candidate.isSelected = false;
        });
      });
    };

    const next = () => {
      if (activeTab.value < len.value - 1) {
        activeTab.value++;
      }
      if (onLast) {
        showResult.value = "flex";
      }
    };

    const back = () => {
      if (activeTab.value > 0) {
        nextStr.value = "Next";

        activeTab.value--;
      }
    };

    const closeResultModal = () => {
      showResult.value = "hidden";
    };

    const onClickTab = (index) => {
      activeTab.value = index;
    };

    watchEffect(() => {
      if (activeTab.value == len.value - 1) {
        nextStr.value = "Finished";
        onLast = true;
      } else {
        onLast = false;
        nextStr.value = "Next";
      }

      if (activeTab.value == 0) {
        onFirst.value = true;
      } else {
        onFirst.value = false;
      }
    });

    return {
      positions,
      activeTab,
      next,
      back,
      onClickTab,
      nextStr,
      backStr,
      onFirst,
      closeResultModal,
      showResult,
    };
  },
};
</script>


<style>
.parent {
  /* background-color: #ffffff; */
  margin: auto;

  width: 100%;
  height: 90%;
  min-width: 300px;

  /* border-radius: 10px;
  box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px; */
}
.item {
  display: absolute;

  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}
/* .tab {
  display: absolute;
  top: 0;
  left: 0;
  display: none;
  transition: all 2s ease-in-out;
  transform: translateX(-100%);
 
}
.tab.active {
  display: block;
  transform: translateX(0);

} */

.tab {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  opacity: 0;
  transform: translateX(-100%);
  transition: all 0.5s ease-in-out;
}

.tab.active {
  opacity: 1;

  transform: translateX(0%);
}
.activeButton {
  background-color: rgb(127 29 29);
}
.hidden {
  display: none;
}
</style>