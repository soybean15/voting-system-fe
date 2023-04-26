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
    stateOpenModal: false,
    stateLoading: false,
    stateForm: {
      name: '',
      image: null
    },
    stateOnAdd:true,
    statePagination:{
      pages:[],
      lastPage:null,
      links:[],
      currentPage:1
    }

    




  }),
  getters: {
    dashboard: (state) => state.voteDashboard,
    partyList: (state) => state.statePartyList,
    status: (state) => state.stateStatus,
    errors: (state) => state.stateError,
    onAdd: (state) => state.stateOpenModal,
    loading: (state) => state.stateLoading,
    form: (state) => state.stateForm,
    paginationPages:(state)=>state.statePagination.pages

  },
  actions: {
    async getPartyList(path) {

      this.stateLoading = true

      if (!path) {
        path = '/api/partylist'

      }

      const data = await axios.get(path)

      this.statePartyList = data.data
      
      this.stateLoading = false

      this.statePagination.lastPage = this.statePartyList.data.last_page

      //console.log(this.statePartyList)
     

    },

    async handleAddPartyList() {
      this.stateError = []

      this.stateLoading = true


      try {
        const data = await axios.post('api/partylist', {
          name: this.stateForm.name,
          image: this.stateForm.image
        },
          {
            headers: {
              'Content-Type': 'multipart/form-data'
            }
          }

        )
        this.stateLoading = false
        this.stateStatus = data.data.status      
        this.statePartyList = data.data

        this.getPaginationPages()

      } catch (error) {
        if (error.response.status === 422) {
          this.stateError = error.response.data.errors
        }
      }



    },
    async handleDeletePartyList(partyListId) {
      this.stateError = []

    
        try {
          const data = await axios.delete('api/partylist/' + partyListId)
          this.stateStatus = data.data
         
          await this.getPartyList(null)
          this. getPaginationPages()
          console.log(this.stateStatus)

         

        } catch (error) {
          if (error.response.status === 422) {
            this.stateError = error.response.data.errors
          }
        }
      

    }
    ,

    async handleEditPartyList() {
      this.stateError = []
     
      const formData = new FormData();

      formData.append('name', this.stateForm.name);
      formData.append('image', this.stateForm.image);
    
      const data = await axios.post(
        'api/partylist/'+this.stateForm.id+'?_method=PUT', 
        formData
      )

      this.stateLoading = false

      this.stateStatus = data.data.status
      this.stateOnAdd = false


      this.updatePagination(this.statePagination.currentPage)
      this.getPaginationPages()

    },

    clearStatus() {

      this.stateStatus = null
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


    openAddEditModal(id, name, image) {

      this.stateForm = {
        id:id,
        name: name,
        image: image
      }
      console.log(image)

      if(image==null){
        this.stateOnAdd =true
      }else{
        this.stateOnAdd =false
      }
      
      this.stateOpenModal = !this.stateOpenModal
    },

    closeAddEditModal() {

      this.stateOpenModal = !this.stateOpenModal
    },

    modalAction( ){
      if(this.stateOnAdd){
        this.handleAddPartyList()
      }else{
        this.handleEditPartyList()
      }

      this.stateOpenModal = false
    },
    
    getPaginationPages(){
      this.statePagination.pages=[]
      for (let i = 1; i <=this.statePartyList.data.last_page; i++) {
        this.statePagination.pages.push(i);
      }
    
      this.statePagination.links =  this.statePartyList.data.links
    },



    updatePagination(page) {
      let links =this.statePagination.links 

       if(this.statePartyList.data.last_page==1){
        page = 1
      }
  
      this.getPartyList(links[page].url)

      this.statePagination.currentPage=page
     
     
    }





  }




})