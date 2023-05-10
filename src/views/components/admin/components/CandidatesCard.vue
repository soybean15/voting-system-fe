<template>

  <div class="text-white">{{computedPosition.totalVote}}</div>
 
  <div
    class="mb-2 flex items-center"
    v-for="candidate in computedPosition.data"
    :key="candidate.id"
  >
    <img class="w-7 h-7 rounded-full" :src="candidate.image" />
    <div class="result-line"></div>
  </div>
</template>

<script>
import { computed, ref } from "vue";

const computeTotalVote = (position) => {
  let totalVote = 0;

  position.candidates.forEach((element) => {
    totalVote += element.vote_count;
  });
  position.totalVote = totalVote

  const result =   position.candidates.map((candidate) => {
    const percentage = (candidate.vote_count / totalVote) * 100;
    return {
      name: candidate.name,
      vote_count: candidate.vote_count,
      percentage: percentage,
      image:candidate.image
    };
  });

  return {
    total_vote: totalVote,
    data: result,
  }


 
};
export default {
  props: ["position"],
  setup(props) {

    const computedPosition = ref(computeTotalVote(props.position));

    console.log(computedPosition)
    return { computedPosition };
  },
};
</script>

<style scoped>
.result-line {
  height: 2px;
  background-color: white;
  width: 100%;
}
</style>