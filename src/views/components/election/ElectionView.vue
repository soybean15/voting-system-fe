<template>
  <h1>Vote</h1>

  <div class="parent">
    <div class="item" v-for="(position, index) in positions" :key="position.id">
      <div class="tab" :class="{active:activeTab==index}">
        <PositionView  :position="{ ...position, index }" @next ="next" />
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
    const positions = ref(getPositions());
    const activeTab = ref(0)

    const next =()=>{
      activeTab.value++
    }

      

    
    return { positions,activeTab,next };
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