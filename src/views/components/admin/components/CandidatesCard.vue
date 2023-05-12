<template>
  <div class="text-white flex text-sm font-bold p-2 pl-0">
    <div class="">Total Votes: </div>
    <div class="pl-2 ">{{ computedPosition.total_vote }}</div>
  </div>

  <div
    class="mb-2 flex items-center"
    v-for="candidate in computedPosition.data"
    :key="candidate.id"
  >
    <div class="w-7 h-7">
      <img class="w-7 h-7 rounded-full" :src="candidate.image" />
    </div>

    <div class="flex w-full items-center">
      <div class="result-line-default " :style="{'--color':candidate.color}"></div>
      <div class="result-line" :style="{'--percentage': candidate.percentage , '--color':candidate.color}"></div>
      <div class="text-white font-bold">{{ candidate.vote_count }}</div>
    </div>
  </div>
</template>

<script>
import { computed, ref } from "vue";


const  getRandomColor=()=> {
      const letters = '0123456789ABCDEF';
      let color = '#';
      for (let i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
      }
      return color;
    }

const computeTotalVote = (position) => {
  let totalVote = 0;

  position.candidates.forEach((element) => {
    totalVote += element.vote_count;
  });
  position.totalVote = totalVote;

  const result = position.candidates.map((candidate) => {
    const percentage = (candidate.vote_count / totalVote) * 100;
    const color = getRandomColor()
    return {
      name: candidate.name,
      vote_count: candidate.vote_count,
      percentage: percentage,
      image: candidate.image,
      color:color
    };
  });

  result.sort((a, b) => b.vote_count - a.vote_count);

  return {
    total_vote: totalVote,
    data: result,
  };
};

export default {
  props: ["position"],
  setup(props) {
    const computedPosition = ref(computeTotalVote(props.position));

   


 

    console.log(computedPosition);
    return { computedPosition,getRandomColor };
  },
};
</script>

<style scoped>


.result-line {

  --percentage: 0%; /* Define a custom property for percentage */
  --color: white;
  width: calc(var(--percentage) * 0.01 * 100%); /* Use the custom property to set width */
  

  margin-right: 2px;
  height: 5px;
  background-color:var(--color);
  border-top-right-radius: 5px;
  border-bottom-right-radius: 5px;
  
}
.result-line-default{
  --color: white;
  width: 2%;
  margin-left: 5px;
  
  height: 5px;
  background-color:var(--color);
  border-top-left-radius: 5px;
  border-bottom-left-radius: 5px;
  

}
</style>