import { defineStore } from 'pinia'
import axios from "axios"





export const useDashboardStore = defineStore('dashboard', {


    state: () => ({
        stateDashboard:{
            partylist_count: 0,
            candidate_count:0,
            positions_count:0,
            user_count:0,
            positions:null
        }
        

    }),
    getters: {
       dashboard:(state)=>state.stateDashboard  

    },
    actions:{
        async getDashboard(){

            const data = await axios.get('api/dashboard')
           
            this.stateDashboard.partylist_count = data.data.partylist_count
            this.stateDashboard.candidate_count = data.data.candidate_count
            this.stateDashboard.positions_count = data.data.position_count
            this.stateDashboard.user_count = data.data.user_count
            this.stateDashboard.positions = data.data.positions
            console.log(data.data.vote_logs)


        }

    }
})