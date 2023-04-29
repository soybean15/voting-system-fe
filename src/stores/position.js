import { defineStore } from 'pinia'
import axios from "axios"



export const usePositionStore = defineStore('position', {


    state: () => ({
        statePositions:null,
        stateOpenModal:false,
        stateError:null ,
        stateStatus:null,
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

        async handleAddPosition(){
            this.stateError =null
            this.stateStatus = null
            try{
                const data = await axios.post('/api/candidate')

            }catch(error){
                if (error.response.status === 422) {
                    this.stateError = error.response.data.errors
                   
                  }
            }

        },




        openCloseModal(){
            this.stateOpenModal = !this.stateOpenModal
        }

    }

});