<template>
  <div class="home w-5/6 m-auto">

    <ElectionView />
  </div>
</template>

<script>
// @ is an alias to /src
import HelloWorld from "@/components/HelloWorld.vue";
import ElectionView from "./components/election/ElectionView";

export default {
  name: "HomeView",
  components: {
    HelloWorld,
    ElectionView
  },
 
};
</script>
