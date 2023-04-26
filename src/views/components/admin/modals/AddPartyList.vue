<template>
  <div class="modal-overlay-2 flex ">
    {{ voteStore.errors.name }}
    <div class="admin-modal bg-onSurface flex-col justify-items-start font-color-primary" >
        <div class="relative w-full">
            <img @click="voteStore.closeAddEditModal" class="h-7 absolute top-2 right-2 cursor-pointer" src="@/assets/img/icon/close-icon.svg">

        </div>
        <div class="flex p-4 text-base font-bold">
            Add New PartyList
        </div>
        <div class="p-2 pt-0">

            <form  @submit.prevent="voteStore.modalAction">
            <div class="flex-col">
                <div class="flex-col m-2">
                    <!-- <div class="flex text-sm">PartyList Name:</div> -->
                    <div class="text-rose-500 text-xs" v-if="voteStore.errors.name">{{ voteStore.errors.name[0] }}</div>
                    <input class="w-full rounded-md border-2 border-slate-600 p-1 text-black" v-model="voteStore.form.name" placeholder="Partylist name" type="text">
                </div>
                <div class="flex m-2">
                    <div>

                    </div>
                  
                    <input ref="imageInput" type="file" name="photo" @change="onFileChange">
                </div>
                <div class="flex flex-row-reverse ">
                    <input @click="onSave()" class="btn btn-green mr-2" type="submit" value="Save ->">
                   
                </div>

                
              
            </div>
            
        </form>
        </div>
      

    </div>


  </div>
</template>

<script>
import { useVoteStore as usePartylistStore } from '@/stores/partylist';
import { onMounted, ref } from 'vue';
export default {
    emits:['onAddPartylist','onSavePartylist'],
    
    setup(props,{emit}){

        const onAdd =()=>{
            emit('onAddPartylist')
        }


        const voteStore = usePartylistStore()
 

 

        const onFileChange = (event) => {
            voteStore.form.image = event.target.files[0];
        };

        const onSave=()=>{
          
     
            emit('onSavePartylist')          
            
            
        }


        

        return {voteStore,onAdd,onFileChange,onSave}
    }

}
</script>

<style>
.admin-modal{
    width: 30%;
    margin-top: 10px;
    background: white;
    border-radius: 10px;
    height: 13em;
   

}

</style>