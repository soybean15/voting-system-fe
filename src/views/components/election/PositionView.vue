<template>
    <div class="w-40">{{position.index}} {{ position.name }} - {{ position.isActive }} </div>
    <ul>
        <li v-for="candidate in position.candidates" :key="candidate.id">{{ candidate.name }}</li>
    </ul>
    <button @click="handleNext" class="rounded-lg bg-gray-400">Next</button>
  
</template>

<script>
export default {
    props:['position','next'],
    setup(props,{emit}){
        props.position.isActive = false
        const handleNext = () => {
            emit('next')
        }

        return {handleNext}
    }

}
</script>

<style>

</style>