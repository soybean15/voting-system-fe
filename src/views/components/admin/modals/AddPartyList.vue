<template>
  <div class="modal-overlay-2 flex ">
    
    <div class="modal flex-col justify-items-start" >
        <div class="flex">
            Add New PartyList
        </div>
        <form  @submit.prevent="voteStore.handleAddPartyList(form)">
            <div class="flex-col">
                <div class="flex">
                    <input v-model="form.name" type="text">
                </div>
                <div>
                    <input ref="form.image" type="file" name="photo">
                </div>
                <div class="">
                    <input type="submit" value="Save">
                </div>

                <div class="">
                   <button @click="onAdd">CLose</button>
                </div>
              
            </div>
            
        </form>

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
.modal{
    width: 40%;
    margin-top: 10px;
    background: white;
}

</style>