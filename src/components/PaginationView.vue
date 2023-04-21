<template>
    <div>
      <ul>
        <li v-for="item in paginatedData" :key="item.id">
          {{ item }}
        </li>
      </ul>
  
      <button @click="previousPage" :disabled="isFirstPage">
        Previous
      </button>
  
      <button @click="nextPage" :disabled="isLastPage">
        Next
      </button>
    </div>
  </template>
  
  <script>
  import { ref, computed } from "vue";
  
  export default {
    setup() {
      const data = ref([1, 1, 3, 4, 5, 6, 7, 8, 9, 10]);
      const page = ref(1);
      const perPage = 3;
  
      const isFirstPage = computed(() => page.value === 1);
      const isLastPage = computed(() => page.value === totalPages.value);
  
      const totalPages = computed(() => {
        return Math.ceil(data.value.length / perPage);
      });
  
      const paginatedData = computed(() => {
        const start = (page.value - 1) * perPage;
        const end = start + perPage;
        return data.value.slice(start, end);
      });
  
      function nextPage() {
        page.value++;
      }
  
      function previousPage() {
        page.value--;
      }
  
      return {
        paginatedData,
        nextPage,
        previousPage,
        isFirstPage,
        isLastPage,
      };
    },
  };
  </script>
  