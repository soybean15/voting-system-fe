<template>
  <h1>Vote</h1>

  <div class="parent flex">
    <div class="w-2/6">
      <PositionSideView
        :positions="positions"
        :activeTab="activeTab"
        @onClickTab="onClickTab"
      />
    </div>

    <div class="relative w-full overflow-hidden">
      <div class="flex-col h-full ">
        <div
          class=" w-full item "
          v-for="(position, index) in positions"
          :key="position.id"
        >
       
          <div
            class="absolute   tab w-full h-full"
            :class="{ active: activeTab == index }"
          >
        
            <PositionView :position="position" @next="next" @back="back" />
          </div>
       

          <div class="absolute right-0 bottom-0 w-full pl-4 m-1">
            <div class="flex">
              <button @click="back" class="btn btn-blue" :class="{hidden:onFirst}">
                {{ backStr }}
              </button>
              <div class="grow"></div>
              <button @click="next"   class="btn btn-blue">
                {{ nextStr }}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  <ResultModal :positions="positions" :class="{hidden:!showResult}" @closeResultModal="closeResultModal"/>
</template>

<script>
import { ref, watchEffect } from "vue";
import PositionView from "./PositionView.vue";
import PositionSideView from "./PositionSideView.vue";
import ResultModal from "@/views/components/modal/ResultModal.vue"
import getPositions from "@/data/getPositions";

import { onMounted, onUpdated } from "vue";

export default {
  components: { PositionView, PositionSideView,ResultModal },
  setup() {
    const positions = ref([]);
    const activeTab = ref(0);
    const len = ref(0);

    const backStr = ref("Back");
    const nextStr = ref("Next");

    let onLast = false;
    let onFirst = ref(true);

    let showResult = ref(false)

    getPositions().then((response) => {
      positions.value = response.data;
      len.value = positions.value.length;

      addAttribute(positions);
    });

    const addAttribute = (positions) => {
      positions.value.forEach((position) => {
        position.voted = ref(false);
      });
    };

    const next = () => {
      if (activeTab.value < len.value - 1) {
        activeTab.value++;
      }
      if(onLast){
        showResult.value = true
      }
    };

    const back = () => {
      if (activeTab.value > 0) {
        nextStr.value = "Next";

        activeTab.value--;
      }
    };

    const closeResultModal=()=>{
      showResult.value = false
    }



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
        onFirst.value =true
        
      } else {
        onFirst.value =false
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
      onFirst ,
      closeResultModal,
      showResult
    };
  },
};
</script>


<style>
.parent {
  background-color: #ffffff;
  margin: auto;

  width: 70%;
  height: 80%;
  min-width: 300px;
  border: 1px solid gray;
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
  transition: all .5s ease-in-out;
}

.tab.active {
  opacity: 1;
 
  transform: translateX(0%);
}
.activeButton {
  background-color: rgb(127 29 29);
}
.hidden{
  display: none;
 

}


</style>