<template>
    <div class="side font-bold p-1 text-white">Positions</div>

    <div class="overflow-auto h-96 flex-col items-center">

        <div 
        @click="onClickTab(index)"
        class="flex items-center side-tab m-2 cursor-pointer h-10 rounded-md justify-center" 
    :class="{sideActive: index==activeTab,'text-lime-700': position.voted}" 
        v-for="(position,index) in positions" :key="position.id">
            <div class="m-2  text-sm">{{ position.name }} 
                <!-- <span class="check text-2xl text-lime-700 font-bold" :class="{hidden:!position.voted}">✓</span> -->
            </div>
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