<template>
  <h1>Vote</h1>

  <div class="flex">
    <div class="" v-for="position in positions.data" :key="position.id">
      <PositionView :position="position" />
    </div>
  </div>
</template>

<script>
import { ref } from "vue";
import PositionView from "./PositionView.vue";

export default {
  components: { PositionView },
  setup() {
    const positions = ref([]);

    const fetchData = async () => {
      const error = ref(null);

      try {
        let data = await fetch("http://voting.test/candidate");
        if (!data.ok) {
          throw Error("no Data available");
        }
        positions.value = await data.json();
      } catch (err) {
        error.value = err.message;
      }
    };

    fetchData();
    console.log(positions);
    return { positions };
  },
};
</script>


<style>
</style>