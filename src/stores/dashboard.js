import { defineStore } from 'pinia'
import axios from "axios"





export const useDashboardStore = defineStore('dashboard', {


    state: () => ({
        stateDashboard:{
            partylist_count: 0,
            candidate_count:0,
            positions_count:0,
            user_count:0,
            positions:null,
            voters:null,
            vote_logs:null
        },
        stateTurnoutPercentage:0,
        stateSettings:{
            show_result:null,
            date_open:null,
            date_close:null
        }

    }),
    getters: {
       dashboard:(state)=>state.stateDashboard  ,
       turnOutPercentage:(state)=>state.stateTurnoutPercentage

    },
    actions:{
        async getDashboard(){

            const data = await axios.get('api/dashboard')
           
            this.stateDashboard.partylist_count = data.data.partylist_count
            this.stateDashboard.candidate_count = data.data.candidate_count
            this.stateDashboard.positions_count = data.data.position_count
            this.stateDashboard.user_count = data.data.user_count
            this.stateDashboard.positions = data.data.positions
            this.stateDashboard.voters = data.data.voters
  
            this.stateDashboard.vote_logs = data.data.vote_logs

            this.computeTurnoutPercentage()
           

        },
         computeTurnoutPercentage(){
            let hasVoted = this.stateDashboard.voters.has_voted
            let totalVoters = hasVoted +  this.stateDashboard.voters.not_voted
            let percentage =  (hasVoted/totalVoters)*100
            this.stateTurnoutPercentage =  percentage.toFixed(2);
        },

        async getSettings(){
            const data = await axios('api/admin/settings')

            this.stateSettings.show_result= data.data.settings[0].show_result == 0?false :true

           

            
        }
    

    }
})