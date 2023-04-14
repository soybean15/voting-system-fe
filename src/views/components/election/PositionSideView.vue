<template>
    <div class="side font-bold p-1">Positions</div>

    <div class="overflow-auto h-96">

        <div 
        @click="onClickTab(index)"
        class="flex-col side-tab m-2 cursor-pointer" 
    :class="{sideActive: index==activeTab}" 
        v-for="(position,index) in positions" :key="position.id">
            <div class="m-2 p-2">{{ position.name }} <span class="check text-2xl text-lime-700 font-bold" :class="{hidden:!position.voted}">✓</span></div>
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
.side-tab{
    @apply bg-slate-200
}

.sideActive{
    background-color: rgb(212 212 216);
}

</style>