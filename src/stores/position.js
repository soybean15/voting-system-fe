import { defineStore } from 'pinia'
import axios from "axios"



export const useAuthStore = defineStore('auth', {


    state: () => ({
        statePositions:[]    
    }),
    getters: {
        positions: (state) => state.statePositions,    
    },
    actions: {
        async getPositions(){
            const data = await axios.get('api/candidate')
            this.statePositions = data.data
        }

    }

});