<template>
   
  <div class="reg-container bg-neutral-800 border m-2">
    <div class=" text-2xl mt-4 font-bold">Register</div>
    <form>

        <div class="p-2"> 

            <div  class="text-left pl-2"><label>Name</label></div>
            <input class="input-field" type="text" name="name">
            
        </div>

        <div class="p-2">
            <div  class="text-left pl-2"><label >Email</label></div>
            <input class="input-field" type="email" name="password">
            
        </div>

        <div class="p-2">
            <div  class="text-left pl-2"><label >Password</label></div>
            <input class="input-field" type="password" name="password">
            
        </div>
        <div class="p-2">
            <div  class="text-left pl-2"><label>Confirm Password</label></div>
            <input class="input-field" type="password" name="password">
            
        </div>

        <div class="p-2">
            <input  class="btn-submit bg-lime-600" type="submit" value="Sign up">
        </div>
    </form>
  </div>
</template>

<script>
import { ref } from "vue";
import { useAuthStore } from "@/stores/auth";
export default {
  setup() {
    return {};
  },
};
</script>

<style>
.reg-container{
    border-radius: 5px;
    color: white;
    opacity: .9;
}
</style>