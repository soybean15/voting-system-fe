<template>


  <div class="relative inline-block text-left">
  <button @click="isOpen = !isOpen" type="button" class="inline-flex justify-center w-ful rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500" id="options-menu" aria-expanded="false" aria-haspopup="true">
    {{selectedName}}
    <!-- Heroicon name: solid/chevron-down -->
    <svg class="-mr-1 ml-2 h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
      <path fill-rule="evenodd" d="M5.293 7.707a1 1 0 011.414 0L10 11.586l3.293-3.293a1 1 0 011.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clip-rule="evenodd" />
    </svg>
  </button>

  <div :class="{hidden:!isOpen}" class="origin-top-right absolute right-0 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5" role="menu" aria-orientation="vertical" aria-labelledby="options-menu">
    <div class="py-1 hover:bg-gray-200" role="none" v-for="item in items" :key="item.id">

        <div @click="onSelectedItem(item)" class="flex cursor-pointer ">
            <img class="rounded-full" width="20" height="20" :src="item.image"/>
            <div class="text-black">{{ item.name }}</div>
        </div>
      
    </div>
  </div>
</div>

</template>

<script>
import { onMounted, ref } from 'vue'
export default {

    props:['items','store'],
    emits:['onSelectedItem'],
    setup(props,{emit}){
        const isOpen = ref(false)


        const selectedName = ref(props.store.form.item_name)

        const onSelectedItem=(item)=>{
            emit('onSelectedItem',item)
            selectedName.value = item.name
           
            isOpen.value = false
        }

        return {isOpen,onSelectedItem,selectedName}
    }

}
</script>

<style>

</style>