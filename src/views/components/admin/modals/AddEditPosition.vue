<template>
  <div class="modal-overlay-2 flex">
    <div
      class="admin-modal bg-onSurface flex-col justify-items-start font-color-primary"
    >
      <div class="relative w-full">
        <img
          @click="positionStore.openCloseModal(false)"
          class="h-7 absolute top-2 right-2 cursor-pointer"
          src="@/assets/img/icon/close-icon.svg"
        />
      </div>
      <div class="flex p-4 text-base font-bold">Add New Position</div>

      <form @submit.prevent="positionStore.handleAddPosition">
        <div class="flex-col">
          <div class="flex-col m-2">
            <!-- <div class="flex text-sm">PartyList Name:</div> -->
            <div class="text-rose-500 text-xs"></div>
            <div class="text-rose-500 text-xs" v-if="positionStore.errors.name">
              {{ positionStore.errors.name[0] }}
            </div>
            <input
              class="w-full rounded-md border-2 border-slate-600 p-1 text-black"
              v-model="positionStore.form.name"
              placeholder="Position name"
              type="text"
            />
          </div>

          <div class="flex-col m-2 place-content-start">
            <!-- <div class="flex text-sm">PartyList Name:</div> -->
            <div class="text-rose-500 text-xs"></div>

            <div class="flex">
              <div
                class="text-rose-500 text-xs"
                v-if="positionStore.errors.winner_count"
              >
                {{ positionStore.errors.winner_count[0] }}
              </div>
              <input
                class="w-40 rounded-md border-2 border-slate-600 p-1 text-black"
                v-model="positionStore.form.winner_count"
                placeholder="Winner Count"
                min="1"
                type="number"
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
</template>

<script>
import { usePositionStore } from "@/stores/position";

export default {
  setup() {
    const positionStore = usePositionStore();

    return { positionStore };
  },
};
</script>

<style>
</style>