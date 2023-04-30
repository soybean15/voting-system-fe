import { defineStore } from 'pinia'
import axios from "axios"



export const usePositionStore = defineStore('position', {


    state: () => ({
        stateVoting: [],
        stateCandidates:[],
        stateOpenModal: false,
        stateError: [],
        stateStatus: null,
        stateForm: {
            name: '',
            winnerCount: ''
        },
        stateSelectedPosition:null
    }),
    getters: {
        vote: (state) => state.stateVoting,
        onOpenModal: (state) => state.stateOpenModal,
        form: (state) => state.stateForm,
        errors: (state) => state.stateError,
        selectedPosition:(state)=>state.stateSelectedPosition
    },
    actions: {
        async getPositions() {
            const data = await axios.get('api/candidate')
            this.stateVoting = data.data
           

            // const updatedPosition = this.statePositions.data.positions.map(position => {
            //     return { ...position, selected:false };
            // });

            //  this.statePositions = { ...data.data, data: updatedPosition };
           
        },

        async handleAddPosition() {
            this.stateError = []
            this.stateStatus = null
            try {
                const data = await axios.post('/api/candidate', {
                    name: this.stateForm.name,
                    winnerCount: this.stateForm.winnerCount
                })
                this.stateStatus = data.data
                this.stateOpenModal = !this.stateOpenModal

            } catch (error) {
                if (error.response.status === 422) {
                    this.stateError = error.response.data.errors

                }
            }

        },



        openCloseModal() {
            this.stateOpenModal = !this.stateOpenModal
        },
        onSelectedItem(item){
            if(this.stateSelectedPosition!=null){
                this.stateSelectedPosition.selected =false
            }
            item.selected = true
            this.stateSelectedPosition  =item
        }

    }

});