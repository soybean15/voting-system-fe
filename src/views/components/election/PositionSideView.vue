<template>
    <div class="font-bold p-1">Positions</div>

    <div class="overflow-auto h-96">

        <div class="flex-col bg-slate-200 m-2" v-for="position in positions" :key="position.id">
            <div class="m-2 p-2">{{ position.name }} {{  position.voted }}</div>
          
        
        </div>
  
        
    </div>


</template>

<script>
import { ref,watch } from 'vue'
export default {
    props:['positions'],
    setup(props){

    
    }

}
</script>

<style>

</style>