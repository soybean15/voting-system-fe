<template>
  <div class="modal-overlay" :class="showResult">
    <div class="res-modal">
      {{ positions}}

      <div class="flex-col p-4 h-full">
        <div class="flex-none font-bold text-2xl">Your Voting Selection</div>
        <div class="h-4/5">
          <div class="" v-for="position in positions" :key="position.id">

            <ResultModalPosition :position="position"/>
          </div>

        </div>

        <div class="flex justify-center space-x-44">
            <button @click="closeResult" class="btn btn-blue">Back</button>
            <button class="btn btn-green">Submit</button>
        </div>
  

        
     
      </div>
     
   
    </div>
    <div class="close">
     
    </div>

  </div>
</template>

<script>
import { useAuthStore } from '@/stores/auth';
import ResultModalPosition from './ResultModalPosition.vue';
import { useElectionStore } from '@/stores/vote';
import { onMounted } from 'vue';
export default {
  props:['positions',"showResult"],
  emits:['closeResultModal'],
  components:{ResultModalPosition},
  setup(props,{emit}){

    const authStore = useAuthStore()
    const electionStore = useElectionStore() 

    onMounted(()=>{


    })

    const closeResult =()=>{
      emit("closeResultModal")
    }

    const onSubmit=()=>{

    }

    return {
      closeResult,
      onSubmit,
      authStore,
      electionStore
    
    }
    
  }

}
</script>

<style>
.result{
    width: 100%;
    height: 100%;
    background-color: rgb(15 23 42);
    opacity: 0.05;
    position: absolute;
  

}
.res-modal {
    text-align: center;
    background-color: white;
    height: 80%;
    width: 60%;
    margin-top: 5%;
    
  
    
    border-radius: 20px;
  }

</style>