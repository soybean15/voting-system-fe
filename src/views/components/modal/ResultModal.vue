<template>
  <div class="modal-overlay" :class="showResult">
    <div class="res-modal">


      <div class="flex-col p-4 h-full">
        <div class="flex-none font-bold text-2xl">Your Voting Selection</div>
        <div class="h-4/5">
          <div class="" v-for="position in positions" :key="position.id">

            <ResultModalPosition :position="position"/>
          </div>

        </div>

        <div class="flex justify-center space-x-44">
            <button @click="closeResult" class="btn btn-blue">Back</button>
            <button @click="openCustomModal('submitVote',authStore.user)" class="btn btn-green">Submit</button>
        </div>
  

        
     
      </div>
     
   
    </div>
    <div class="close">
     
    </div>

  </div>

  <div v-if="alertDialog.isOpen">
    <MessageDialogModal
    
      :alertDialog= alertDialog

    />
  </div>
</template>

<script>
import { useAuthStore } from '@/stores/auth';
import ResultModalPosition from './ResultModalPosition.vue';
import { useElectionStore } from '@/stores/vote';
import { onMounted,ref } from 'vue';
import MessageDialogModal from '../admin/modals/MessageDialogModal.vue';

export default {
  props:['positions',"showResult"],
  emits:['closeResultModal'],
  components:{ResultModalPosition,MessageDialogModal},
  setup(props,{emit}){

    const authStore = useAuthStore()
    const electionStore = useElectionStore() 

    onMounted(()=>{


    })

    const closeResult =()=>{
      emit("closeResultModal")
    }

    const onSubmit=(id)=>{
      electionStore.form.positions = props.positions
      electionStore.form.user_id = id

      electionStore.handleSubmit()
      emit("closeResultModal")

    }







    const alertDialog = ref(
      {
        isOpen:false,
        prompt:'',
        action:null,
        id:null,
        onClose:null,
        onProceed:null
      }
    );


    const onClose=()=>{
      alertDialog.value.isOpen = !alertDialog.value.isOpen
    }
    const onProceed=()=>{
      if(alertDialog.value.action == 'submitVote'){
        electionStore.form.positions = props.positions
        electionStore.form.user_id = alertDialog.value.id

        electionStore.handleSubmit()
        emit("closeResultModal")
        
       
      }
      alertDialog.value.isOpen = !alertDialog.value.isOpen
    }



    const openCustomModal =(action,item)=>{
      
   
      if(action == 'submitVote' ){
        alertDialog.value.prompt = 'Are you sure you want to submit your selections? '
      }
      alertDialog.value.isOpen = !alertDialog.value.isOpen
      alertDialog.value.action= action
      alertDialog.value.id =item.id
      alertDialog.value.onClose = onClose
      alertDialog.value.onProceed = onProceed
    }

    return {
      closeResult,
      onSubmit,
      authStore,
      electionStore,
      alertDialog,
      openCustomModal
    
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