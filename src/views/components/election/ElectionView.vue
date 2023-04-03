<template>
  <h1>Vote</h1>

  <div class="parent flex">
    <div class="w-2/6">

      <PositionSideView :positions="positions"/>


    </div>

    <div class="relative w-full">
      <div class="">
        <div
          class="item"
          v-for="(position, index) in positions"
          :key="position.id"
        >
          <div class="tab w-full" :class="{ active: activeTab == index }">
            <PositionView
              :position="{ ...position, index }"
              @next="next"
              @back="back"
            />
          </div>


          <div class="absolute right-0 bottom-0 w-full m-4">
            <div class="flex ">

              <button @click="back" class="rounded-lg bg-gray-400">Back</button>
              <div class="grow"></div>
              <button @click="next" class="rounded-lg bg-gray-400">Next</button>
            </div>

        </div>

        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref } from "vue";
import PositionView from "./PositionView.vue";
import PositionSideView from './PositionSideView.vue'
import getPositions from "@/data/getPositions";
import { onMounted, onUpdated } from "vue";

export default {
  components: { PositionView,PositionSideView },
  setup() {
    const positions = ref([]);
    const activeTab = ref(0);
    const len = ref(0);

    getPositions().then((response) => {
      positions.value = response.data;
      len.value = positions.value.length;
    });

    const next = () => {
      console.log(len);
      if (activeTab.value < len.value - 1) {
        activeTab.value++;
      }
    };

    const back = () => {
      if (activeTab.value > 0) {
        activeTab.value--;
      }
    };

    return { positions, activeTab, next, back };
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
.tab {
  display: absolute;
  top: 0;
  left: 0;
  display: none;
}
.tab.active {
  display: block;
}
</style>