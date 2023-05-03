<template>
  <div class="modal-overlay-2 flex">
    <div
      class="admin-modal bg-onSurface flex-col justify-items-start font-color-primary"
    >
      <div @click="candidateStore.openCloseModal" class="relative w-full">
        <img
          class="h-7 absolute top-2 right-2 cursor-pointer"
          src="@/assets/img/icon/close-icon.svg"
        />
      </div>
      <div class="flex p-4 text-base font-bold">Add Candidate</div>
      <div class="p-2 pt-0">
        <form @submit.prevent="candidateStore.modalAction">
          <div class="flex-col">
            <div class="flex-col m-2">
              <div class="text-rose-500 text-xs" v-if="candidateStore.errors.name">{{ candidateStore.errors.name[0] }}</div>
              <input
                class="w-full rounded-md border-2 border-slate-600 p-1 text-black"
                placeholder="Candidate name"
                v-model="candidateStore.form.name"
                type="text"
              />
            </div>
            <div class="flex-col m-2">
              <div class="flex">
                <VDropDownVue
                  :items="candidateStore.partylist"
                  :store="candidateStore"
                  @onSelectedItem="onSelectedItem"
                />
              </div>
              <div class="flex mt-2">
                <input
                  ref="imageInput"
                  type="file"
                  name="photo"
                  @change="onFileChange"
                />
              </div>
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

    const onSelectedItem = (item) => {
      candidateStore.form.partylist_id = item.id;
      console.log(candidateStore.form);
    };

    return { candidateStore, onFileChange, onSelectedItem };
  },
};
</script>

<style scoped>
.admin-modal{

    height: 16em;
   

}
</style>