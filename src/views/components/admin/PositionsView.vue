<template>
  {{positionStore.positions}}

  <AddEditPositionVue/>
</template>

<script>
import {usePositionStore} from '@/stores/position'
import { onMounted } from 'vue'
import AddEditPositionVue from '@/views/components/admin/modals/AddEditPosition.vue'
export default {
  components:{AddEditPositionVue},
  setup(){
   
    const positionStore = usePositionStore()
    onMounted(()=>{
      positionStore.getPositions()
    })

    return {positionStore}

  }

}
</script>

<style>

</style>