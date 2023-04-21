<template>
  <div class="flex">
    <div v-for="page in totalPages" :key="page">
        <button :class="{'active-page': currentPage==page}" @click="handleClickPage(page)" class="btn btn-blue text-xs"  >{{ page }}</button>
    </div>
  </div>
  {{ currentPage }}
</template>

<script>
import { ref } from 'vue';
export default {
  props: ["totalPages"],
  emits: ['onClickPage','onNext','onPrevious'],
  setup(props,{emit}) {

    let currentPage = ref()
    if(props.totalPages>0){
        currentPage.value=1
    }

    const totalPages = ref([]);
    const createArrayFromOneToN =(n)=> {
      
      for (let i = 1; i <= n; i++) {
        totalPages.value.push(i);
      }
    }
    createArrayFromOneToN(props.totalPages)

   

    const handleClickPage=(page)=>{
        emit('onClickPage')
        currentPage.value =page
    }

    return {totalPages,handleClickPage,currentPage}

  },
};
</script>

<style scoped>
.active-page{
    background-color: red;
}

</style>