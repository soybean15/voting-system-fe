<template>
  <div class="modal-overlay-2 flex">
    <div
      class="admin-modal bg-onSurface flex-col justify-items-start font-color-primary"
    >
      <div class="relative w-full">
        <img
          class="h-7 absolute top-2 right-2 cursor-pointer"
          src="@/assets/img/icon/close-icon.svg"
        />
      </div>
      <div class="flex p-4 text-base font-bold">Add Candidate</div>
      <div class="p-2 pt-0">
        <form>
          <div class="flex-col">
            <div class="flex-col m-2">
              <div class="text-rose-500 text-xs"></div>
              <input
                class="w-full rounded-md border-2 border-slate-600 p-1 text-black"
                placeholder="Cadidate name"
                type="text"
              />
            </div>
            <div class="flex m-2">
              <div>

                <VDropDownVue :items="candidateStore.partylist"/>
              </div>

              <input
                ref="imageInput"
                type="file"
                name="photo"
                @change="onFileChange"
              />
            </div>
            <div class="flex flex-row-reverse">
              <input class="btn btn-green mr-2" type="submit" value="Save ->" />
            </div>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import { useCandidateStore } from "@/stores/candidate";
import VDropDownVue from "@/components/VDropDown.vue";

export default {
  components: { VDropDownVue },
  setup() {
    const candidateStore = useCandidateStore();



        const onFileChange = (event) => {
          candidateStore.form.image = event.target.files[0];
        };

    return { candidateStore,onFileChange };
  },
};
</script>

<style>
</style>