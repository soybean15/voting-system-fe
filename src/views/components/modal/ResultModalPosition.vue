<template>
    <div class="text-left">
        <div class="title font-bold">{{ position.name }}</div>
        <div class="" v-for="candidate in position.candidates " :key="candidate.id">
            <ul class="list-none">
                <li>  <div class="p-2 text-slate-600 text-sm" v-if="candidate.isSelected">{{ candidate.name }}</div>
                </li>

            </ul>
          
        
        </div>
       
    </div>

</template>

<script>
export default {
    props :['position']

}
</script>

<style>


</style>