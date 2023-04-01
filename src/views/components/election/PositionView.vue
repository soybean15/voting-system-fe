<template>
    <div class="w-40">{{ position.name }}</div>
    <ul>
        <li v-for="candidate in position.candidates" :key="candidate.id">{{ candidate.name }}</li>
    </ul>
  
</template>

<script>
export default {
    props:['position']

}
</script>

<style>

</style>