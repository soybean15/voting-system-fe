import { defineStore } from 'pinia'
import axios from "axios"



export const usePositionStore = defineStore('position', {


    state: () => ({
        stateVoting: [],
        statePositions: null,
        stateCandidates: [],
        stateOpenModal: false,
        stateOpenAddCandidateModal: false,
        stateError: [],
        stateStatus: null,
        stateForm: {
            name: '',
            winner_count: ''
        },
        stateSelectedPosition: null,
        stateSelectedCandidates: [],
        statePagination: {
            pages: [],
            lastPage: null,
            links: [],
            currentPage: 1
        },
        stateOnEdit:false
    }),
    getters: {
        vote: (state) => state.stateVoting,
        onOpenModal: (state) => state.stateOpenModal,
        form: (state) => state.stateForm,
        errors: (state) => state.stateError,
        selectedPosition: (state) => state.stateSelectedPosition,
        positions: (state) => state.statePositions,
        candidates: (state) => state.stateCandidates,
        openAddCandidateModal: (state) => state.stateOpenAddCandidateModal,
        paginationPages: (state) => state.statePagination.pages,
        status:(state)=>state.stateStatus
    },
    actions: {
        async getPositions(path) {

            if (!path) {
                path = '/api/candidate'

            }
            const data = await axios.get(path)
            this.stateVoting = data.data

            this.statePositions = data.data.data.positions
            this.stateCandidates = data.data.data.candidates



            this.getPaginationPages()
            this.stateForm= {
                name: '',
                winner_count: ''
            }



        },

        async handleAddPosition() {
            this.stateError = []
            this.stateStatus = null
            try {
                const data = await axios.post('/api/candidate', {
                    name: this.stateForm.name,
                    winner_count: this.stateForm.winner_count
                })
                this.stateStatus = data.data
                this.stateOpenModal = !this.stateOpenModal
                this.getPositions()

              
            } catch (error) {
                if (error.response.status === 422) {
                    this.stateError = error.response.data.errors

                }
            }

        },
        async handleEditPosition() {
            this.stateError = []
            this.stateStatus = null
            console.log('this is edit position')
            try {
                const data = await axios.post('api/candidate/position/'+this.stateSelectedPosition.id, {
                    name: this.stateForm.name,
                    winner_count: this.stateForm.winner_count
                })
                this.stateStatus = data.data
                this.stateOpenModal = !this.stateOpenModal
                this.stateSelectedPosition = data.data.position
                
                this.statePositions.data.forEach(element => {
                  
                   if(element.id == this.selectedPosition.id){
                    //element =data.data.position
                    Object.assign( element,data.data.position);
                   }
                   
                 
                    
                });
                this.stateForm= {
                    name: '',
                    winner_count: ''
                }
    
             

              
            } catch (error) {
                if (error.response.status === 422) {
                    this.stateError = error.response.data.errors

                }
            }

        },
        async handleInsertCandidates() {
            

            const data = await axios.post('api/candidates/position/' + this.selectedPosition.id + '/insert', {
                candidates: this.stateSelectedCandidates
            })
            this.stateSelectedCandidates =[]
            this.openCloseInsertCandidateModal()
           
           
            this.stateSelectedPosition.candidates = data.data.candidates
            this.stateCandidates = data.data.vacant_candidates
         
          
            
        },
        async handleDeletePosition() {
            this.stateStatus = null
             
            try {
                const data = await axios.delete('api/candidate/position/' + this.selectedPosition.id)

                this.stateStatus =data.data
                this.getPositions()
                this.stateSelectedPosition = null
               
            } catch (error) {
                if (error.response.status === 422) {
                    this.stateErrors = error.response.data.errors

                }
            }

            
        },
        async handleRemoveCandidate(id) {
            this.stateStatus = null
            
            try {
                const data = await axios.delete('api/candidate/position/' + id+'/remove')

                this.stateStatus =data.data
                this.stateSelectedPosition.candidates = data.data.candidates
                this.stateCandidates = data.data.vacant_candidates
               
            } catch (error) {
                if (error.response.status === 422) {
                    this.stateErrors = error.response.data.errors

                }
            }

            
        },



        openCloseModal(onEdit) {
            this.clearStatus()
            if(onEdit){
                this.stateForm.name = this.stateSelectedPosition.name
                this.stateForm.winner_count = this.stateSelectedPosition.winner_count
            }
            this.stateOnEdit = onEdit
            this.stateOpenModal = !this.stateOpenModal
        },
        openCloseInsertCandidateModal() {
            this.clearStatus()
            this.stateOpenAddCandidateModal = !this.stateOpenAddCandidateModal
        },
        onSelectedItem(item) {
            this.clearStatus()
            if (this.stateSelectedPosition != null) {
                this.stateSelectedPosition.selected = false
            }
            item.selected = true
            this.stateSelectedPosition = item
            
        },
        onSelectedCandidate(candidate) {
            this.clearStatus()
            if (candidate.isSelected == null || !candidate.isSelected) {
                candidate.isSelected = true
                this.stateSelectedCandidates.push(candidate.id)
            } else {
                candidate.isSelected = false

                this.stateSelectedCandidates = this.stateSelectedCandidates.filter(function (item) {
                    return item !== candidate.id
                })
            }
            
        },
        getPaginationPages() {


            this.statePagination.pages = []
            if (this.statePositions.data.length > 0) {
                for (let i = 1; i <= this.statePositions.last_page; i++) {
                    this.statePagination.pages.push(i);
                }
            }
          



            this.statePagination.links = this.statePositions.links
        },


        updatePagination(page) {
            let links = this.statePagination.links

            if (this.statePositions.last_page == 1) {
                page = 1
            }

            this.getPositions(links[page].url)

            this.statePagination.currentPage = page


        },
        modalAction(){
           
            if(this.stateOnEdit){
                console.log('onEdit '+this.stateOnEdit)
                this.handleEditPosition()
            }else{
                this.handleAddPosition()
            }
        },
        clearStatus() {

            this.stateStatus = null
          }

    }

});