<template>
  <div class="relative h-full">
    <div class="flex-none font-bold p-2 text-xl text-white md:text-4xl">
      {{ position.name }}
    </div>
    <div class="text-left text-lg font-semibold text-white">Select : {{ count }}</div>

    <div class="absolute  w-full candidate-list overflow-auto">
      <div class="h-20" v-for="candidate in position.candidates" :key="candidate.id">
        <CandidateCard
          :candidate="candidate"
          @selectCandidate="selectCandidate"
        />
      </div>
    </div>
  </div>
</template>

<script>
import { ref } from "vue";
import CandidateCard from "./CandidateCard.vue";

export default {
  props: ["position"],

  components: { CandidateCard },
  setup(props) {
    const len = props.position.candidates.length;
    let c = 2;

    if (len > 6) {
      c = 1;
    } else if (len > 3) {
      c = len / 3;
    }
    let col = Math.ceil(c);

    const gridProperty = ref("repeat(" + col + ", minmax(0, 1fr))");

    const selected = ref(null);

    let count = ref(props.position.winner_count);

    //countSelected()

    props.position.candidates.forEach((candidate) => {
      if (candidate.isSelected) {
        if (props.position.winner_count == 1) {
          selected.value = candidate;
        }
        count.value--;
      }
    });

    const selectCandidate = (candidate) => {
      if (props.position.winner_count > 1) {
        if (count.value > 0 || candidate.isSelected) {
          candidate.isSelected = !candidate.isSelected;

          if (candidate.isSelected) {
            props.position.isSelected = true;
            count.value--;
          } else {
            props.position.isSelected = false;
            count.value++;
          }
        }

        //check if voted or not
        if (count.value == props.position.winner_count) {
          props.position.voted = false;
        } else {
          props.position.voted = true;
        }
      } else {
        onTwoSelection(candidate);
      }
    };

    const onTwoSelection = (candidate) => {
      if (selected.value != null) {
        selected.value.isSelected = false;
      }
      if (selected.value == candidate) {
        candidate.isSelected = false;
        selected.value = null;
        props.position.voted = false;
        count.value++;
      } else {
        candidate.isSelected = true;
        selected.value = candidate;
        props.position.voted = true;
        if (count.value == 1) {
          count.value--;
        }
      }
    };

    return { selectCandidate, gridProperty, count, col };
  },
};
</script>

<style>
.candidate-list {
  height: 70%;
 width: 97% !important;
  margin-left:5px;
  margin-right: 5px;
  border-radius: 10px;
  box-shadow:  rgba(0, 0, 0, 0.25) 0px 0.0625em 0.0625em, rgba(0, 0, 0, 0.25) 0px 0.125em 0.5em, rgba(255, 255, 255, 0.1) 0px 0px 0px 1px inset;
}

</style>