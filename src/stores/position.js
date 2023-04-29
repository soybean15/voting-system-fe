import { defineStore } from 'pinia'
import axios from "axios"



export const usePositionStore = defineStore('position', {


    state: () => ({
        statePositions:[],
        stateOpenModal:false,
        stateError:null ,
        stateStatus:null,
        stateForm: {
            name: '',
            voteCount: ''
          }
    }),
    getters: {
        positions: (state) => state.statePositions, 
        onOpenModal: (state)=> state.stateOpenModal,
        form :(state)=>state.stateForm 
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