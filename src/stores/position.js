import { defineStore } from 'pinia'
import axios from "axios"



export const usePositionStore = defineStore('position', {


    state: () => ({
        statePositions:[],
        stateOpenModal:false 
    }),
    getters: {
        positions: (state) => state.statePositions, 
        openModal: (state)=> state.stateOpenModal   
    },
    actions: {
        async getPositions(){
            const data = await axios.get('api/candidate')
            this.statePositions = data.data
        },




        openCloseModal(){
            this.stateOpenModal = !this.stateOpenModal
        }

    }

});