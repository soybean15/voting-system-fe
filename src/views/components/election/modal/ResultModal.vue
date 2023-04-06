<template>
  <div class="modal-overlay">
    <div class="modal">

      <div class="flex-col p-4 h-full">
        <div class="flex-none font-bold text-2xl">Your Voting Result</div>
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
import ResultModalPosition from './ResultModalPosition.vue';
export default {
  props:['positions'],
  emits:['closeResultModal'],
  components:{ResultModalPosition},
  setup(props,{emit}){

    const closeResult =()=>{
      emit("closeResultModal")
    }

    return {closeResult}
    
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
.modal-overlay {
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  display: flex;
  justify-content: center;
  background-color: #000000da;
}
.modal {
  text-align: center;
  background-color: white;
  height: 80%;
  width: 60%;
  margin-top: 5%;

  
  border-radius: 20px;
}
</style>