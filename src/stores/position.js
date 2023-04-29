import { defineStore } from 'pinia'
import axios from "axios"



export const usePositionStore = defineStore('position', {


    state: () => ({
        statePositions:[],
        stateOpenModal:false,
        stateError:[] ,
        stateStatus:null,
        stateForm: {
            name: '',
            voteCount: ''
          }
    }),
    getters: {
        positions: (state) => state.statePositions, 
        onOpenModal: (state)=> state.stateOpenModal,
        form :(state)=>state.stateForm ,
        errors:(state)=>state.stateError
    },
    actions: {
        async getPositions(){
            const data = await axios.get('api/candidate')
            this.statePositions = data.data
        },

        async handleAddPosition(){
            this.stateError =[]
            this.stateStatus = null
            try{
                const data = await axios.post('/api/candidate',{
                    name:this.stateForm.name,
                    voteCount: this.stateForm.voteCount
                })
                this.stateStatus = data.data
                this.stateOpenModal = !this.stateOpenModal

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