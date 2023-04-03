<template>
  <div class="flex p-1 m-1.5 bg-slate-200">
        <div class="">
          <img class="h-16" :src="candidate.image"  >
        </div>
                   
        <div>  {{ candidate.name }}</div>
   

    
  </div>
</template>

<script>
export default {
  props :['candidate']

}
</script>

<style>

</style>