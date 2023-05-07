<template>
 

  <div class="modal-overlay-2 flex">
    <div
      class="admin-modal bg-onSurface flex-col justify-items-start font-color-primary"
    >
    <div class="text-white">{{alertDialog.prompt}}</div>
    <div class="flex">
        <button @click="onClose" class="btn btn-red">Cancel</button>
        <button @click="onProceed" class="btn btn-green">Ok</button>
    </div>
</div>


  </div>
</template>

<script>
export default {
 
    props:['alertDialog'],
    emits:['onCloseModal','onProceed'],
  setup(props,{emit}) {
    const onClose=()=>{
      emit('onCloseModal')
    }
    const onProceed =()=>{
        emit('onProceed')
    }


     

    return { onClose,onProceed};
  },
};
</script>

<style>
</style>