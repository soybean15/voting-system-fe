import { defineStore } from 'pinia'
import axios from "axios"
import router from '@/router'

export const useElectionStore = defineStore('vote', {


    state: () => ({
        stateForm :null
    
    }),
    getters: {
        form: (state) => state.stateForm,

        
    },
    actions: {

        async handleSubmit(){

        }

    }

})