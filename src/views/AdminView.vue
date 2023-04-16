<template>
  <div class="flex flex-col h-full ">
    <div class="text-white mt-4 w-full flex justify-end">
        <div></div>
        <div class="flex p-2 w-64 rounded-tl-lg drop-shadow-lg  rounded-bl-lg text-left bg-onSurface tracking-widest font-thin font-sans" >
            <span class="pr-2 "><img width="20"  src="@/assets/img/icon/admin.svg" /></span>
            Admin
        </div>
    </div>
    <div class="flex rounded-tl-lg  rounded-bl-lg drop-shadow-lg  w-full h-full bg-onSurface m-4 ">
      <div class="admin-sidenav w-52">
        <div class="flex flex-col  text-sm font-light" >
          <div class="text-white border-b  border-slate-800  p-2 tracking-widest admin-side-tab" v-for="nav in sideNav" :key="nav.name">
            <router-link :to="{ name: nav.route }">{{nav.name}}</router-link>
          </div>
        </div>
      </div>
      <div class="admin-body">
        <router-view></router-view>
      </div>
    </div>
  </div>
</template>

<script>
import PositionsView from "@/views/components/admin/PositionsView";
export default {
  components: { PositionsView },
  setup() {
    const sideNav = [
        { name: "Dashboard", route: 'dashboard' },
        { name: "Positions", route: 'positions' },
        { name: "Partylist", route: 'partylist' },
        { name: "Canditates", route: 'candidates' },
    ];

    return {sideNav}
  },
};
</script>

<style>
.admin-sidenav {
  width: 20%;
}
.admin-side-tab:hover{
    background-color: #101318;
}

</style>