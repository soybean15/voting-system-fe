<template>
    <div class="side font-bold p-1">Positions</div>

    <div class="overflow-auto h-96">

        <div 
        @click="onClickTab(index)"
        class="flex-col bg-slate-200 m-2 cursor-pointer" 
        :class="{voted:position.voted,sideActive: index==activeTab}" 
        v-for="(position,index) in positions" :key="position.id">
            <div class="m-2 p-2">{{ position.name }}</div>
            {{ }}
          
        
        </div>
  
        
    </div>


</template>

<script>
import { ref,watch } from 'vue'
export default {
    props:['positions','activeTab'],
    emits:['onClickTab'],
    setup(props,{emit}){
        
        const onClickTab = (index)=>{
            console.log(index)
            emit('onClickTab',index)
        }
    //    const isActive = props.positions.id 
        return {onClickTab}
    }

}
</script>

<style>
.voted{
    background-color: rgb(74 222 128);
}
.sideActive{
    background-color: rgb(212 212 216);
}

</style>