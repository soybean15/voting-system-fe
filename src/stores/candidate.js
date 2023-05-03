import { defineStore } from 'pinia'
import axios from "axios"





export const useCandidateStore = defineStore('candidate', {


    state: () => ({
        stateCandidates: [],
        statePartylist: [],
        stateErrors: [],
        stateStatus: null,
        stateForm: {
            name: '',
            image: '',
            partylist_id: '',
            party_list:null

        },
        stateOpenModal: false,
        statePagination: {
            pages: [],
            lastPage: null,
            links: [],
            currentPage: 1
        },
        stateOnAdd : true

    }),
    getters: {
        candidates: (state) => state.stateCandidates,
        errors: (state) => state.stateErrors,
        status: (state) => state.stateStatus,
        partylist: (state) => state.statePartylist,
        form: (state) => state.stateForm,
        onOpenModal: (state) => state.stateOpenModal,
        paginationPages: (state) => state.statePagination.pages,

    },
    actions: {

        async getCandidates(path) {

            this.stateErrors = []
            this.stateStatus = null

            if (!path) {
                path = '/api/candidates'

            }

            try {
                const data = await axios.get(path)

                this.stateCandidates = data.data.data.candidates
                this.statePartylist = data.data.data.partylist
                this.getPaginationPages()
                console.log(this.stateCandidates)


            } catch (error) {
                if (error.response.status === 422) {
                    this.stateErrors = error.response.data.errors

                }
            }



        },
        async handleAddCandidate() {
            this.stateErrors = []
            this.stateStatus = null
            try {
                const data = await axios.post('api/candidate/add', {
                    name: this.stateForm.name,
                    party_list_id: this.stateForm.partylist_id,
                    image: this.stateForm.image,


                },
                    {
                        headers: {
                            'Content-Type': 'multipart/form-data'
                        }
                    })
                this.stateStatus = data.data
                this.openCloseModal()
                this.getCandidates()

            } catch (error) {
                if (error.response.status === 422) {
                    this.stateErrors = error.response.data.errors


                }
            }


        },
        async handleDeleteCandidate(id) {
            this.stateStatus = null

            try {
                const data = await axios.delete('api/candidate/' + id)
                this.stateStatus = data.data

                this.updatePagination(this.statePagination.currentPage)
                this.getPaginationPages()




            } catch (error) {
                if (error.response.status === 422) {
                    this.stateErrors = error.response.data.errors

                }
            }


        },

        async handleEditCandidate() {
            this.stateError = []
            this.stateStatus = null
            try {

                const formData = new FormData();

                formData.append('name', this.stateForm.name);
                formData.append('image', this.stateForm.image);
                formData.append('party_list_id', this.stateForm.party_list.id);

                const data = await axios.post(
                    'api/candidate/' + this.stateForm.id + '?_method=PUT',
                    formData
                )



                this.stateStatus = data.data.status
                this.stateOnAdd = false


                this.updatePagination(this.statePagination.currentPage)
                this.getPaginationPages()
                this.closeAddEditModal()

            } catch (error) {
                if (error.response.status === 422) {
                    this.stateError = error.response.data.errors

                }
            }


        },


        openAddEditModal(id, name, image,party_list) {

            
            if (image == null) {

                this.stateOnAdd = true
            } else {
                this.stateForm = {
                    id: id,
                    name: name,
                    image: image,
                    party_list : party_list,
                    item_name: party_list.name
                }
    
                this.stateOnAdd = false
            }

            this.stateOpenModal = !this.stateOpenModal
        },




        openCloseModal() {
            this.stateOpenModal = !this.stateOpenModal
            console.log(this.stateOpenModal)
        },
        getPaginationPages() {


            this.statePagination.pages = []
            if (this.stateCandidates.data.length > 0) {
                for (let i = 1; i <= this.stateCandidates.last_page; i++) {
                    this.statePagination.pages.push(i);
                }
            }




            this.statePagination.links = this.stateCandidates.links
        },


        updatePagination(page) {
            let links = this.statePagination.links

            if (this.stateCandidates.last_page == 1) {
                page = 1
            }

            this.getCandidates(links[page].url)

            this.statePagination.currentPage = page


        },
        modalAction() {
            if (this.stateOnAdd) {
               this.handleAddCandidate()
            } else {
               this.handleEditCandidate()
            }
      
      
          },


    },





});