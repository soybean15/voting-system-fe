<template>
  <div class="flex flex-col h-full md:flex-row bg-red-500">
    <div class="p-2 m-2">
      <img class="w-24 h-24 object-cover rounded-full" src="@/assets/img/vote-logo.jpeg"/>
    </div>
    <div class="flex-grow">items</div>
    <div>signin</div>
  </div>
</template>

<script>
import { useAuthStore } from "@/stores/auth";
export default {
  setup() {
    const authStore = useAuthStore();
    return { authStore };
  },
};
</script>

<style>
</style>