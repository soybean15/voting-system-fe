<template>
  <div class="p-4">
    <div class="text-white flex flex-col text-sm font-bold p-2 pl-0 pt-0">
      <div class="flex text-white text-lg font-semibold font-sans">
        {{ computedPosition.name }}
      </div>
      <div class="flex font-thin font-sans">
        Total Votes:{{ computedPosition.total_vote }}
      </div>
    </div>

    <div
      class="mb-2 relative flex items-center"
      v-for="candidate in computedPosition.result"
      :key="candidate.id"
    >
      <div
        class="w-16 h-16 result-line-image flex items-center rounded-full"
        :style="{ '--color': candidate.color }"
      >
        <img class="w-16 h-16 p-1 rounded-full" :src="candidate.image" />
      </div>
      <div class="absolute top-0 left-16">
{{candidate.name}}
      </div>

      <div class="flex w-full items-center">
        <div
          class="result-line-default"
          :style="{ '--color': candidate.color }"
        ></div>
        <div
          class="result-line"
          :style="{
            '--percentage': candidate.percentage,
            '--color': candidate.color,
          }"
        ></div>
        <div class="text-white font-bold">{{ candidate.vote_count }}</div>
        <div v-if="!isOpen">
          <div class="text-green-400 ml-2" v-if="candidate.label">
            {{ candidate.label }}
          </div>
        </div>
      </div>

      <div></div>
    </div>
  </div>
</template>

<script>
import { computed, ref } from "vue";

const getRandomColor = () => {
  const letters = "0123456789ABCDEF";
  let color = "#";
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
};

// const computeTotalVote = (position) => {
//   let totalVote = 0;

//   position.candidates.forEach((element) => {
//     totalVote += element.vote_count;
//   });
//   position.totalVote = totalVote;

//   const result = position.candidates.map((candidate) => {
//     const percentage = (candidate.vote_count / totalVote) * 100;
//     const color = getRandomColor();
//     return {
//       name: candidate.name,
//       vote_count: candidate.vote_count,
//       percentage: percentage,
//       image: candidate.image,
//       color: color,
//     };
//   });

//   // Sort the `result` array by `vote_count` in descending order
//   result.sort((a, b) => b.vote_count - a.vote_count);

//   // Determine the winner of the first `winner_count` positions
//   const winners = result.slice(0, position.winner_count);

//   // Add the `isWinner` property to the candidate object
//   const updatedResult = result.map((candidate) => {

//     if (
//        winners.length > 1 &&
//       candidate.vote_count === winners[winners.length - 1].vote_count
//     ) {

//         candidate.label = "Draw";

//     } else if (winners.some((winner) => winner.name === candidate.name)) {
//       candidate.label = "Winner";
//     }
//     return candidate;
//   });

//   return {
//     result: updatedResult,
//     winners: winners,
//     totalVote: totalVote,
//   };
// };

const computeTotalVote = (position) => {
  let totalVote = 0;

  position.candidates.forEach((element) => {
    totalVote += element.vote_count;
  });
  position.totalVote = totalVote;

  const result = position.candidates.map((candidate) => {
    const percentage = (candidate.vote_count / totalVote) * 100;
    const color = getRandomColor();
    return {
      name: candidate.name,
      vote_count: candidate.vote_count,
      percentage: percentage,
      image: candidate.image,
      color: color,
    };
  });

  // Sort the `result` array by `vote_count` in descending order
  result.sort((a, b) => b.vote_count - a.vote_count);

  // Determine the winner of the first `winner_count` positions
  const winners = result.slice(0, position.winner_count);

  // Label the candidates with the highest vote count as "Winner"
  const updatedResult = result.map((candidate) => {
    if (winners.some((winner) => winner.name === candidate.name)) {
      candidate.label = "Winner";
    }
    return candidate;
  });

  // Label the remaining candidates with the same vote count as the last "Winner" as "Draw"
  if (winners.length > 0) {
    const lastWinner = winners[winners.length - 1];
    let i = winners.length;
    while (
      i < updatedResult.length &&
      updatedResult[i].vote_count === lastWinner.vote_count
    ) {
      updatedResult[i].label = "Draw";
      updatedResult[i - 1].label = "Draw";
      i++;
    }
  }

  return {
    total_vote: totalVote,
    result: updatedResult,
    winners: winners,
    name: position.name,
  };
};

// const computeTotalVote = (position) => {
//   let totalVote = 0;

//   console.log(position)

//   position.candidates.forEach((element) => {
//     totalVote += element.vote_count;
//   });
//   position.totalVote = totalVote;

//   const result = position.candidates.map((candidate) => {
//     const percentage = (candidate.vote_count / totalVote) * 100;
//     const color = getRandomColor()
//     return {
//       name: candidate.name,
//       vote_count: candidate.vote_count,
//       percentage: percentage,
//       image: candidate.image,
//       color:color
//     };
//   });

//   result.sort((a, b) => b.vote_count - a.vote_count);

//   return {
//     total_vote: totalVote,
//     data: result,
//   };
// };

export default {
  props: ["position", "isOpen"],
  setup(props) {
    const computedPosition = ref(computeTotalVote(props.position));

    return { computedPosition, getRandomColor };
  },
};
</script>

<style scoped>
.result-line {
  --percentage: 0%; /* Define a custom property for percentage */
  --color: white;
  width: calc(
    var(--percentage) * 0.01 * 100%
  ); /* Use the custom property to set width */

  margin-right: 2px;
  height: 15px;
  background-color: var(--color);
  border-top-right-radius: 5px;
  border-bottom-right-radius: 5px;
}
.result-line-default {
  --color: white;
  width: 2%;

  height: 15px;
  background-color: var(--color);
}
.result-line-image {
  --color: white;

  background-color: var(--color);
}
</style>