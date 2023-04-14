import { defineStore } from 'pinia'
import axios from "axios"


export const useVoteStore = defineStore('vote', {

  state: () => ({
    statePositions: [],
    statePartyList: [],

  }),
  getters: {
    positions: (state) => state.statePositions,
    partyList: (state) => state.statePartyList,

  },
  actions: {
    async getPartyList() {
      const data = await axios.get("/api/partylist")
      this.statePartyList = data.data
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