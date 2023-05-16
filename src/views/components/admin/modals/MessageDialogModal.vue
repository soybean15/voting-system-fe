<template>
  <div class="modal-overlay-2 flex">
    <div
      class="admin-modal w-96 bg-onSurface flex-col justify-items-start font-color-primary"
    >
      <div class="flex-col">
        <div class="text-white text-xl p-6 h-32">{{ alertDialog.prompt }}</div>
        <div class="flex justify-center">
          <button @click="onClose" class="btn btn-red mr-4 w-20">Cancel</button>
          <button @click="onProceed" class="btn btn-green ml-4 w-20">Ok</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ["alertDialog"],
  // emits: ["onCloseModal", "onProceed"],
  setup(props, { emit }) {
    console.log(props.alertDialog)

    const onClose = () => {
      props.alertDialog.onClose()
    //emit("onCloseModal");
    };

    const onProceed = () => {
      //emit("onProceed");
      props.alertDialog.onProceed()
    };

    return { onClose, onProceed };
  },
};
</script>

<style scoped>
</style>