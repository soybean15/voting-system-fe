import { computed, ref } from 'vue'

const state = ref({
    status: {
        title: '404',
        message: 'Page not found'
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
