import { defineStore } from 'pinia'
import axios from "axios"


export const useVoteStore = defineStore('vote', {

    state: () => ({
        statePositions: [],
        statePartyList: [],
        statePositionsSize: 0
        
        
    }),
    getters: {
        positions: (state) => state.statePositions,
        positionsSize:(state)=> state.statePositionsSize,
        
        partyList: (state) => state.statePartyList,
      
    },
    actions: {
        async getPartyList(){

            const data = await axios.get("/api/partylist")
            this.statePartyList = data.data
        },
        async getPositions(){

            const response = await axios.get("/api/candidate").then(
              (response) => {
                this.statePositions = response.data
                
          
                console.log(this.statePositions)
                this.statePositionsSize =  this.statePositions.data.length
          
                this.addAttribute(this.statePositions );
              });             
           
          //  console.log(this.statePositions)
        },
         addAttribute () {
            this.statePositions.data.forEach((position) => {
              position.voted = false;
            });
          },


    }


})