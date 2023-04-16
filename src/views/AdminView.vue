<template>
  <div class="flex w-full h-full border mt-2">

    <div class="admin-sidenav w-1/4">
        <div class="flex flex-col">
            <div>
                <router-link :to="{name:'positions'}">positions</router-link>
            </div>

            

        </div>
        
    </div>
    <div class="admin-body">

        <router-view></router-view>
    </div>

  </div>
</template>

<script>
import PositionsView from "@/views/components/admin/PositionsView"
export default {
    components:{PositionsView},
    setup(){
        const sideNav = [
            {name:"Positions", }


        ]    
    }

}
</script>

<style>
.admin-sidenav{
    width: 20%;
}
</style>