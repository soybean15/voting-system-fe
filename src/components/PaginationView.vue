<template>
  <div class="flex" v-if="currentPage">
    <button @click="handlePrevious" class="page-button text-xs">
      Previous
    </button>
    <div v-for="page in showedPage" :key="page">
      <button
        @click="handleClickPage(page)"
        class="page-button text-xs"
        :class="{ 'page-active': currentPage == page }"
      >
        {{ page }}
      </button>
    </div>
    <button @click="handleNext" class="page-button text-xs">Next</button>
  </div>
  {{ currentPage }}
  {{ pages }}
</template>

<script>
import { computed, ref } from "vue";
export default {
  props: ["totalPages"],
  emits: ["onClickPage", "onNext", "onPrevious"],
  setup(props, { emit }) {
    let totalPages = props.totalPages;
    let currentPage = ref();
    let perPage = 5;
    let first = ref(0);
    let last = ref(first.value + perPage);

    if (totalPages > 0) {
      currentPage.value = 1;
    }

    const pages = ref([]);
    const createArrayFromOneToN = (n) => {
      for (let i = 1; i <= n; i++) {
        pages.value.push(i);
      }
    };

    createArrayFromOneToN(totalPages);

    const handleClickPage = (page) => {
      emit("onClickPage");
      currentPage.value = page;
    };

    const handleNext = () => {
      if (currentPage.value < totalPages) {
        currentPage.value++;

        if (currentPage.value > last.value) {
          first.value += perPage;
          last.value = first.value + perPage;
        }
      }
    };
    const handlePrevious = () => {
      if (currentPage.value > 1) {
        currentPage.value--;

        if (currentPage.value <= first.value) {
          first.value -= perPage;
          last.value = first.value + perPage;
        }
      }
    };

    const showedPage = computed(() => {
      const start = first.value;
      const end = start + perPage;
      console.log("start " + start);
      const pageToShow = pages.value.slice(start, end);

      return pageToShow;
    });

    return {
      showedPage,
      handleClickPage,
      currentPage,
      handleNext,
      handlePrevious,
      pages,
    };
  },
};
</script>

<style scoped>
.page-button {
  background-color: rgba(0, 0, 0, 0.041);
  padding: 0.5em;
  margin: 2px;
  color: rgb(119, 119, 119);
  border: 1px solid;
  border-radius: 5px;
}
.page-active {
  background-color: rgba(54, 54, 54, 0.281);
}
</style> 