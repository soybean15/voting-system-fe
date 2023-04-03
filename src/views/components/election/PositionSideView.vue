<template>
    <div class="font-bold p-1">Positions</div>

    <div class="overflow-auto h-96">

        <div class="flex-col bg-slate-200 m-2" v-for="position in positions" :key="position.id">
            <div class="m-2 p-2">{{ position.name }}</div>
          
        
        </div>
  
        
    </div>


</template>

<script>
export default {
    props:['positions']

}
</script>

<style>

</style>