import { defineStore } from 'pinia'
import axios from "axios"
import { ref } from 'vue'


export const useVoteStore = defineStore('vote', {

  state: () => ({
    statePositions: [],
    statePartyList: [],
    stateStatus: null,
    stateError: [],
    voteDashboard: null,
    stateOnAdd: false,
    stateLoading: false




  }),
  getters: {
    dashboard: (state) => state.voteDashboard,
    partyList: (state) => state.statePartyList,
    status: (state) => state.stateStatus,
    errors: (state) => state.stateError,
    onAdd: (state) => state.stateOnAdd,
    loading: (state) => state.stateLoading

  },
  actions: {
    async getPartyList(path) {

      this.stateLoading = true

      if (!path) {
        path = '/api/partylist'

      }

      const data = await axios.get(path)

      this.statePartyList = data.data
      this.clearStatus()
      this.stateLoading = false




    },

    async handleAddPartyList(partyList) {
      this.stateError = []

      this.stateLoading = true


      try {
        const data = await axios.post('api/partylist', {
          name: partyList.name,
          image: partyList.image
        },
          {
            headers: {
              'Content-Type': 'multipart/form-data'
            }
          }

        )
        this.stateLoading = false

        this.stateStatus = data.data
        this.stateOnAdd = false

        partyList = []

      } catch (error) {
        if (error.response.status === 422) {
          this.stateError = error.response.data.errors
        }
      }



    },
    async handleDeletePartyList(partyListId) {
      this.stateError = []
      const index = this.statePartyList.data.data.findIndex(partylist => partylist.id === partyListId);

      if (index !== -1) {
        try {
          const data = await axios.delete('api/partylist/' + partyListId)
          this.stateStatus = data.data
          this.statePartyList.data.data.splice(index, 1);


        } catch (error) {
          if (error.response.status === 422) {
            this.stateError = error.response.data.errors
          }
        }
      }

    }
    ,

    clearStatus() {

      this.stateStatus = []
    },


    async getDashboard() {

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


    setOnAdd() {
      this.stateOnAdd = !this.stateOnAdd
    }
  }


})