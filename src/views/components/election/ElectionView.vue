<template>
  <h1>Vote</h1>

  <div class="flex">
    <div class="" v-for="position in positions" :key="position.id">
      <PositionView :position="position" />
    </div>
  </div>
</template>

<script>
import { ref } from "vue";
import PositionView from "./PositionView.vue"
import getPositions from '@/data/getPositions'

export default {
  components: { PositionView },
  setup() {
    const positions = ref(getPositions());

    return { positions };
  },
};
</script>


<style>
</style>