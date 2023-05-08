<template>

  <div class="parent flex mt-4 ">
    <div class="w-2/6">
      <PositionSideView
        :positions="positions"
        :activeTab="activeTab"
        @onClickTab="onClickTab"
      />
    </div>

    <div class="relative w-full overflow-hidden">
      <div class="flex-col h-full ">
        <div
          class=" w-full item "
          v-for="(position, index) in positions"
          :key="position.id"
        >
       
          <div
            class="absolute   tab w-full h-full"
            :class="{ active: activeTab == index }"
          >
        
            <PositionView :position="position" />
          </div>
       

          <div class="absolute right-0 bottom-0 w-full pl-4 m-1">
            <div class="flex">
              <button @click="back" class="btn btn-blue" :class="{hidden:onFirst}">
               {{ backStr }}
              </button>
              <div class="grow"></div>
              <button @click="next"   class="btn btn-blue">
                {{ nextStr }}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
    
  </div>

  <ResultModal :positions="positions"  :showResult="showResult"  @closeResultModal="closeResultModal"/>
</template>

<script>
import { computed, ref, watchEffect } from "vue";
import PositionView from "./PositionView.vue";
import PositionSideView from "./PositionSideView.vue";
import ResultModal from "@/views/components/modal/ResultModal.vue"
import getPositions from "@/data/getPositions";


import { onMounted, onUpdated ,onUnmounted} from "vue";

export default {
  components: { PositionView, PositionSideView,ResultModal },
  setup() {


    
   
    const positions = ref()

    let item = localStorage.getItem('positions');

    onMounted(()=>{
      console.log('mounted')
     
      item = localStorage.getItem('positions');
    })



    
    const activeTab = ref(0);
    const len = ref(0);

    const backStr = ref("Back");
    const nextStr = ref("Next");

    let onLast = false;
    let onFirst = ref(true);

    let showResult = ref("hidden")

    onUnmounted(()=>{
      console.log('unmounted')
     

      const serializedObject = JSON.stringify(positions.value);

      // Save the string in local storage using localStorage.setItem()
      localStorage.setItem('positions', serializedObject);
     
    })


    if(!item || item == 'null'){   
     
      
      getPositions().then((response) => {
          positions.value = response.data;
          len.value = positions.value.length;
          console.log(positions.value)

          addAttribute(positions);
        });
      
    }else{
      
      positions.value = JSON.parse(item);
      len.value = positions.value.length;
    }


    const addAttribute = (positions) => {
      positions.value.forEach((position) => {
        position.voted = ref(false);
        position.candidates.forEach((candidate)=>{
          candidate.isSelected = false
        })
      });
    };

    const next = () => {
      if (activeTab.value < len.value - 1) {
        activeTab.value++;
      }
      if(onLast ){
        showResult.value = 'flex'
      }
    };

    const back = () => {
      if (activeTab.value > 0) {
        nextStr.value = "Next";

        activeTab.value--;
      }
    };

    const closeResultModal=()=>{
      showResult.value = 'hidden'
      
    }



    const onClickTab = (index) => {
      activeTab.value = index;
    };

    watchEffect(() => {


      if (activeTab.value== len.value - 1) {
        nextStr.value = "Finished";
        onLast = true;
      } else {
        onLast = false;
        nextStr.value= "Next";
      }

      if (activeTab.value == 0) {
        onFirst.value =true

      } else {
        onFirst.value =false
      }
    });

    return { 
      positions, 
      activeTab,
      next,
      back, 
      onClickTab, 
      nextStr, 
      backStr,
      onFirst ,
      closeResultModal,
      showResult
      

    };
  },
};
</script>


<style>
.parent {
  background-color: #ffffff;
  margin: auto;

  width: 80%;
  height: 90%;
  min-width: 300px;
 
  border-radius: 10px;
  box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
}
.item {
  display: absolute;
  
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}
/* .tab {
  display: absolute;
  top: 0;
  left: 0;
  display: none;
  transition: all 2s ease-in-out;
  transform: translateX(-100%);
 
}
.tab.active {
  display: block;
  transform: translateX(0);

} */


.tab {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  opacity: 0;
  transform: translateX(-100%);
  transition: all .5s ease-in-out;
}

.tab.active {
  opacity: 1;
 
  transform: translateX(0%);
}
.activeButton {
  background-color: rgb(127 29 29);
}
.hidden{
 display: none;
}


</style>