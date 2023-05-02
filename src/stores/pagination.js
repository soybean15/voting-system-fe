import { defineStore } from 'pinia'
import axios from "axios"



export const useCandidateStore = defineStore('pagination', {
    state: () => ({

        statePagination: {
            pages: [],
            lastPage: null,
            links: [],
            currentPage: 1
          },
       
    }),
    getters: {

    },
    actions: {

    getPaginationPages(lastPage, links) {
        this.statePagination.pages = []
        for (let i = 1; i <=lastPage; i++) {
          this.statePagination.pages.push(i);
        }
  
        this.statePagination.links = links
      },
  
  
  
      updatePagination(action, page) {
        let links = this.statePagination.links
  
        if (this.statePartyList.data.last_page == 1) {
          page = 1
        }
  
        action(links[page].url)
  
        this.statePagination.currentPage = page
  
  
      }

    }
});
