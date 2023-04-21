<template>
  <div class="modal-overlay-2 flex ">
    
    <div class="admin-modal bg-onSurface flex-col justify-items-start font-color-primary" >
        <div class="relative w-full">
            <img @click="onAdd" class="h-7 absolute top-2 right-2 cursor-pointer" src="@/assets/img/icon/close-icon.svg">

        </div>
        <div class="flex p-4 text-base font-bold">
            Add New PartyList
        </div>
        <div class="p-2 pt-0">

            <form  @submit.prevent="voteStore.handleAddPartyList(form)">
            <div class="flex-col">
                <div class="flex-col m-2">
                    <!-- <div class="flex text-sm">PartyList Name:</div> -->
                    <div class="text-rose-900" v-if="voteStore.errors.name">{{ voteStore.errors.name[0] }}</div>
                    <input class="w-full rounded-md border-2 border-slate-600 p-1 text-black" v-model="form.name" placeholder="Partylist name" type="text">
                </div>
                <div class="flex m-2">
                    <div>

                    </div>
                  
                    <input ref="form.image" type="file" name="photo">
                </div>
                <div class="flex flex-row-reverse ">
                    <input class="btn btn-green mr-2" type="submit" value="Save ->">
                   
                </div>

                
              
            </div>
            
        </form>
        </div>
      

    </div>


  </div>
</template>

<script>
import { useVoteStore } from '@/stores/vote';
export default {
    emits:['onAddPartylist'],
    
    setup(props,{emit}){

        const onAdd =()=>{
            emit('onAddPartylist')
        }


        const voteStore = useVoteStore()
        const form = {
            name: "",
            image: null
        }

        return {form ,voteStore,onAdd}
    }

}
</script>

<style>
.admin-modal{
    width: 30%;
    margin-top: 10px;
    background: white;
    border-radius: 10px;
    height: 30%;
   

}

</style>