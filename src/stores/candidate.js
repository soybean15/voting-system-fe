import { defineStore } from 'pinia'
import axios from "axios"
import { usePositionStore } from './position';



export const useCandidateStore = defineStore('candidate', {


    state: () => ({
        stateCandidates:[],
        statePartylist:[],
        stateErrors:[],
        stateStatus:null,
        stateForm: {
            name:'',
            image:'',
            partylist_id:''

        },
        stateOpenModal:false,
        statePagination: {
            pages: [],
            lastPage: null,
            links: [],
            currentPage: 1
          }
 
    }),
    getters: {
        candidates:(state)=>state.stateCandidates,
        errors:(state)=>state.stateErrors,
        status:(state)=> state.stateStatus,
        partylist:(state)=>state.statePartylist,
        form:(state)=>state.stateForm,
        onOpenModal:(state)=>state.stateOpenModal
      
    },
    actions: {

         async getCandidates(){

            
            const positionStore = usePositionStore()
            await positionStore.getPositions()
            this.stateCandidates = positionStore.vote.data.candidates
            this.statePartylist = positionStore.vote.data.partylist
          
        },
        async handleAddCandidate(){
            this.stateErrors=[]
            this.stateStatus=null
            try{
                const data = await axios.post('api/candidate/add', {
                    name: this.stateForm.name,
                    image: this.stateForm.image,
                    party_list_id : this.partylist_id,
                    
                  },
                  {
                    headers: {
                      'Content-Type': 'multipart/form-data'
                    }
                  })
                this.stateStatus = data.data
                this.openCloseModal()
                this.getCandidates()

            }catch(error){
                if (error.response.status === 422) {
                    this.stateError = error.response.data.errors
                   
                }
            }
            
           
        },
        async handleDeleteCandidate(id){
            this.stateStatus=null

            try {
                const data = await axios.delete('api/candidate/' + id)
                this.stateStatus = data.data
        
                this.updatePagination(this.statePagination.currentPage)
                this.getPaginationPages()
               
        
        
        
              } catch (error) {
                if (error.response.status === 422) {
                  this.stateError = error.response.data.errors
                }
              }
        
        
        },



        openCloseModal() {
            this.stateOpenModal = !this.stateOpenModal
            console.log(this.stateOpenModal)
        },

    },


    // setup(){
    //     const positionStore = usePositionStore()
        

    //     console.log("from candidate")
    //     console.log(this.stateCandidates)

    //     return {positionStore}

    // }

});