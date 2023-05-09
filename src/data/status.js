import { computed, ref } from 'vue'

const state = ref({
    status: {
        title: '',
        message: ''
    }
})

function setStatus(status) {
    state.value.status = status
}
const getStatus = computed(() => state.value.status)


export {
    setStatus,
    getStatus
}
