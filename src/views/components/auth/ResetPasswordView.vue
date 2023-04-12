<template>
  <div class="mt-4 w-full">
    <div class="border w-96  place-content-center m-auto rounded-md">
      <div class="text-2xl mt-4 font-bold">Reset Password</div>
      <form @submit.prevent="authStore.handleResetPassword(form)">
        <div class="p-2">
            <div class="text-xs text-left pl-4">New Password</div>
          <input class="border w-11/12 rounded-md" type="password" v-model="form.password" />
        </div>

        <div class="p-2">
            <div class="text-xs text-left pl-4">Confirm New Password</div>
          <input
            class="border w-11/12 rounded-md"
            type="password"
            v-model="form.password_confirmation"
          />
        </div>

        <div class="p-2">
          <input class="btn btn-blue " type="submit" value="Change Password" />
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import { useAuthStore } from "@/stores/auth";
import { ref } from "vue";
import { useRoute } from "vue-router";
export default {
  setup() {
    const route = useRoute();
    const authStore = useAuthStore();

    const form = ref({
      password: "",
      password_confirmation: "",
      email: route.query.email,
      token: route.params.token,
    });

    return { form, authStore };
  },
};
</script>

<style>
</style>