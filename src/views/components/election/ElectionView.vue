<template>
  <h1>Vote</h1>

  <div class="parent">
    <div class="item" v-for="(position, index) in positions" :key="position.id">
      <div class="tab" :class="{active:activeTab==index}">
        <PositionView  :position="{ ...position, index }" @next ="next" @back="back"/>
      </div>
    
    </div>
  </div>
</template>

<script>
import { ref } from "vue";
import PositionView from "./PositionView.vue"
import getPositions from '@/data/getPositions'
import { onMounted , onUpdated} from 'vue'

export default {
  components: { PositionView },
  setup() {
    const positions = ref([]);
    const activeTab = ref(0)
    const len = ref(0)

    getPositions().then(response =>{
      positions.value = response.data
      len.value = positions.value.length
    })

    const next =()=>{
      console.log(len)
      if(activeTab.value<len.value-1){
        activeTab.value++
      }
     
    }

    const back =()=>{
      if(activeTab.value>0){
        activeTab.value--
      }
      
    }

      

    
    return { positions,activeTab,next,back };
  },

};
</script>


<style>
.parent{
  background-color: #ffffff;
  margin: 100px auto;
  padding: 40px;
  width: 70%;
  min-width: 300px;
}
.item{
  width:100%;
  height: 100%;
}
.tab{
  display: none;
}
.tab.active{
  display: block;
}
</style>