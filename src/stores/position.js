import { defineStore } from 'pinia'
import axios from "axios"



export const usePositionStore = defineStore('position', {


    state: () => ({
        stateVoting: [],
        statePositions:null,
        stateCandidates:[],
        stateOpenModal: false,
        stateOpenAddCandidateModal:false,
        stateError: [],
        stateStatus: null,
        stateForm: {
            name: '',
            winnerCount: ''
        },
        stateSelectedPosition:null,
        stateSelectedCandidates:[]
    }),
    getters: {
        vote: (state) => state.stateVoting,
        onOpenModal: (state) => state.stateOpenModal,
        form: (state) => state.stateForm,
        errors: (state) => state.stateError,
        selectedPosition:(state)=>state.stateSelectedPosition,
        positions:(state)=>state.statePositions,
        candidates:(state)=>state.stateCandidates,
        openAddCandidateModal:(state)=>state.stateOpenAddCandidateModal
    },
    actions: {
        async getPositions() {
            const data = await axios.get('api/candidate')
            this.stateVoting = data.data
           
            this.statePositions = data.data.data.positions
            this.stateCandidates = data.data.data.candidates




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
        async handleInsertCandidates(){
            console.log(this.selectedPosition.id)

            const data = await axios.post('api/candidates/position/'+this.selectedPosition.id+'/insert',{
                candidates:this.stateSelectedCandidates
            })

        },



        openCloseModal() {
            this.stateOpenModal = !this.stateOpenModal
        },
        openCloseInsertCandidateModal(){
            this.stateOpenAddCandidateModal = !this.stateOpenAddCandidateModal
        },
        onSelectedItem(item){
            if(this.stateSelectedPosition!=null){
                this.stateSelectedPosition.selected =false
            }
            item.selected = true
            this.stateSelectedPosition  =item
            console.log(this.stateSelectedPosition)
        },
        onSelectedCandidate(candidate){
            if(candidate.isSelected == null || !candidate.isSelected ){
                candidate.isSelected =true
                this.stateSelectedCandidates.push(candidate.id)
            }else{
                candidate.isSelected= false

                this.stateSelectedCandidates = this.stateSelectedCandidates.filter(function(item) {
                    return item !== candidate.id
                })
            }
            console.log(this.stateSelectedCandidates)
        }

    }

});