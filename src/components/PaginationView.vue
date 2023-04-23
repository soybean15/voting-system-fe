<template>
  <div class="flex" v-if="currentPage">
    <div v-if="!onFirst">
      <button @click="handlePrevious" class="page-button text-xs">
      Previous
    </button>

    </div>

    <div v-for="page in showedPage" :key="page">
      <button
        @click="handleClickPage(page)"
        class="page-button text-xs"
        :class="{ 'page-active': currentPage == page }"
      >
        {{ page }}
      </button>
    </div>

  <div v-if="!onLast">
      <button @click="handleNext" class="page-button text-xs">Next</button>
    </div>
    
  </div>


</template>

<script>
import { computed, onMounted, onUpdated, ref,watch,watchEffect } from "vue";
export default {
  props: ["totalPages","perGroupPage","links"],
  emits: ["onClickPage", "onNext", "onPrevious", ],
  setup(props, { emit }) {
    let totalPages = props.totalPages;
    let currentPage = ref();
    let perGroupPage = props.perGroupPage;
    let first = ref(0);
    let last = ref(first.value + perGroupPage);

    let remaining = totalPages%perGroupPage
    let lastPage = (totalPages-remaining)+1
    console.log('lastPage '+lastPage)

    const onFirst=ref(true)
    const onLast = ref(false)

    if (totalPages > 0) {
      currentPage.value = 1;
    }

   onMounted(()=>{
    pages.value=[]
    createArrayFromOneToN(totalPages);
    console.log("hello")
   })




    const links = ref(props.links)

  
    const pages = ref([]);
    const createArrayFromOneToN = (n) => {
      for (let i = 1; i <= n; i++) {
        pages.value.push(i);
      }
    };

    createArrayFromOneToN(totalPages);

    const handleClickPage = (page) => {
      emit("onClickPage",links.value[page].url);
      console.log("from pageination"+links.value[page].url)
      currentPage.value = page;
    };





    const handleNext = () => {
      
      if (currentPage.value < totalPages) {
        currentPage.value++;

        if (currentPage.value > last.value) {
          first.value += perPage;
          last.value = first.value + perGroupPage;
        }

      }
    };

    const handlePrevious = () => {


      if (currentPage.value > 1) {
        currentPage.value--;

        if (currentPage.value <= first.value) {
          first.value -= perPage;
          last.value = first.value + perGroupPage;
        }

      
      }
    };

    const showedPage = computed(() => {
      const start = first.value;
      const end = start + perGroupPage;
      console.log("start " + start);
      const pageToShow = pages.value.slice(start, end);

      return pageToShow;
    });




    const forceRender = ref()

    watchEffect(()=>{
      totalPages = props.totalPages
    
     
      if(currentPage.value >perGroupPage){
          onFirst.value =false
        }else{
          onFirst.value =true
        }


        if(currentPage.value >=lastPage){
          onLast.value =true
        }else{
          onLast.value =false
        }

        

    })

   
    watch(forceRender,()=>{
      console.log("from watch ")
      pages.value=[]
       createArrayFromOneToN(totalPages);

    })
    
   
    return {
      showedPage,
      handleClickPage,
      currentPage,
      handleNext,
      handlePrevious,
      pages,
      onFirst,
      onLast,
      
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