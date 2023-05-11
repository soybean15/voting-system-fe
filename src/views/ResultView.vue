<template>
    <div class="flex-col m-14 p-3 ">
        <div class="flex text-xl font-bold">Result</div>

    </div>
  
</template>

<script>
import { useDashboardStore } from '@/stores/dashboard';
export default {
    setup(){
        const dashboardStore = useDashboardStore()
        return {dashboardStore}
    }

}
</script>

<style>

</style>