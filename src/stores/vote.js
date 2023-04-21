import { defineStore } from 'pinia'
import axios from "axios"


export const useVoteStore = defineStore('vote', {

  state: () => ({
    statePositions: [],
    statePartyList: [],
    voteStatus:null,
    voteError:[],
    voteDashboard :null



  }),
  getters: {
    dashboard :(state)=> state.voteDashboard,
    positions: (state) => state.statePositions,
    partyList: (state) => state.statePartyList,
    status: (state)=> state.voteStatus,
    errors: (state)=>state.voteError

  },
  actions: {
    async getPartyList() {
      const data = await axios.get("/api/partylist")
      this.statePartyList = data.data
      
     
    },

    async handleAddPartyList(partyList){
      this.voteError = []
      try{
        const data = await axios.post('api/partylist',{
          name:partyList.name,
          image:partyList.image
        })
        this.voteStatus = data.data
        partyList =[]

      }catch(error){
        if (error.response.status === 422) {
          this.voteError = error.response.data.errors
        }
      }


    },


    async getDashboard(){

       const data = await axios.get('api/dashboard')
       this.voteDashboard = data.data
       console.log(this.voteDashboard)

    },
    


    async getPositions() {

      await axios.get("/api/candidate").then(
        (response) => {
          this.statePositions = response.data


          console.log(this.statePositions)
          this.len = this.statePositions.data.length

          this.addAttribute(this.statePositions);
        });


    },
    addAttribute() {
      this.statePositions.data.forEach((position) => {
        position.voted = false;
      });
    },
  }


})