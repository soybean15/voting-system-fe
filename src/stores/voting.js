import { defineStore } from 'pinia'
import axios from "axios"


export const useVoteStore = defineStore('vote', {

  state: () => ({
    statePositions: [],
    statePartyList: [],
    len: 0,
    stateActiveTab: 0,
    backStr: "Back",
    nextStr: "Next",

    onLast: false,
    onFirst: true,

    showResult: false,

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
    // async getPositions() {

    //   await axios.get("/api/candidate").then(
    //     (response) => {
    //       this.statePositions = response.data


    //       console.log(this.statePositions)
    //       this.len = this.statePositions.data.length

    //       this.addAttribute(this.statePositions);
    //     });


    // },
    addAttribute() {
      this.statePositions.data.forEach((position) => {
        position.voted = false;
      });
    },

    next() {
      if (this.activeTab < this.len - 1) {
        this.activeTab++;
      }
      if (this.onLast) {
        this.showResult = true
      }
    },

    back() {
      if (this.activeTab > 0) {
        this.nextStr = "Next";

        this.activeTab--;
      }
    },

    closeResultModal() {
      this.showResult = false
    },

    onClickTab(index) {
      this.activeTab = index;
    }


  }


})