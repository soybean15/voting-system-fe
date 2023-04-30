import { defineStore } from 'pinia'
import axios from "axios"
import { usePositionStore } from './position';



export const useCandidateStore = defineStore('candidate', {


    state: () => ({
        stateCandidates:[],
        stateErrors:[],
        stateStatus:null,
 
    }),
    getters: {
        candidates:(state)=>state.stateCandidates,
        errors:(state)=>state.stateErrors,
        status:(state)=> state.stateStatus
      
    },
    actions: {

         async getCandidates(){

            
            const positionStore = usePositionStore()
            await positionStore.getPositions()
            this.stateCandidates = positionStore.positions.data.candidates
          
        },
        async addCandidate(){
            this.stateErrors=[]
            this.stateStatus=null
            try{
                const data = await axios.post('api/candidate/add')
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