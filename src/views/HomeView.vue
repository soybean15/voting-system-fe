<template>
  <div class="home w-5/6 h-full m-auto">

    {{ user }}
   <!-- // <ElectionView /> -->
  </div>
</template>

<script>
// @ is an alias to /src
import HelloWorld from "@/components/HelloWorld.vue";
import ElectionView from "./components/election/ElectionView";
import { ref ,onMounted} from 'vue';
import axios from 'axios';

export default {
  name: "HomeView",
  components: {
    HelloWorld,
    ElectionView
  },
  setup(){
    const user = ref()

    onMounted( async()=>{
      const _user = await axios.get("http://localhost:8000/api/user")
      user.value = _user
    })

    return {user}

  }
 
};
</script>
