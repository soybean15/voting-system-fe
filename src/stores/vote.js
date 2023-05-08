import { defineStore } from 'pinia'
import axios from "axios"
import router from '@/router'

export const useElectionStore = defineStore('vote', {


    state: () => ({
        stateForm :{
            positions:null,
            user_id:null
        }
    
    }),
    getters: {
        form: (state) => state.stateForm,

        
    },
    actions: {

        async handleSubmit(){

            const data = await axios.post('api/voting',this.stateForm)

        }

    }

})