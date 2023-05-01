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

        }
 
    }),
    getters: {
        candidates:(state)=>state.stateCandidates,
        errors:(state)=>state.stateErrors,
        status:(state)=> state.stateStatus,
        partylist:(state)=>state.statePartylist,
        form:(state)=>state.stateForm
      
    },
    actions: {

         async getCandidates(){

            
            const positionStore = usePositionStore()
            await positionStore.getPositions()
            this.stateCandidates = positionStore.vote.data.candidates
            this.statePartylist = positionStore.vote.data.partylist
          
        },
        async addCandidate(){
            this.stateErrors=[]
            this.stateStatus=null
            try{
                const data = await axios.post('api/candidate/add', {
                    name: this.stateForm.name,
                    image: this.stateForm.image
                  })
                this.stateStatus = data.data

            }catch(error){
                if (error.response.status === 422) {
                    this.stateError = error.response.data.errors
                   
                }
            }
            
           
        }


    },
    // setup(){
    //     const positionStore = usePositionStore()
        

    //     console.log("from candidate")
    //     console.log(this.stateCandidates)

    //     return {positionStore}

    // }

});