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
            isOpen:null,
            date_open:null,
            date_close:null
        },
        stateLoading:false

    }),
    getters: {
       dashboard:(state)=>state.stateDashboard  ,
       turnOutPercentage:(state)=>state.stateTurnoutPercentage,
       settings:(state)=>state.stateSettings,
       loading:(state)=>state.stateLoading

    },
    actions:{
        async getDashboard(){

            const data = await axios.get('api/dashboard')
            await this.getResult()
            
           
            this.stateDashboard.partylist_count = data.data.partylist_count
            this.stateDashboard.candidate_count = data.data.candidate_count
            this.stateDashboard.positions_count = data.data.position_count
            this.stateDashboard.user_count = data.data.user_count
       
            this.stateDashboard.voters = data.data.voters
          

           
            this.stateDashboard.vote_logs = data.data.vote_logs

            this.computeTurnoutPercentage()
           

        },
        async getResult(){
            const result = await axios.get('api/admin/result')
            this.stateDashboard.positions = result.data.positions
  
        },
         computeTurnoutPercentage(){
            let hasVoted = this.stateDashboard.voters.has_voted
            let totalVoters = hasVoted +  this.stateDashboard.voters.not_voted
            let percentage =  (hasVoted/totalVoters)*100
            this.stateTurnoutPercentage =  percentage.toFixed(2);
        },

        async getSettings(){
            this.stateLoading = true
            const data = await axios('api/admin/settings')

            this.stateSettings.show_result= data.data.settings[0].show_result == 0?false :true
            this.stateSettings.isOpen = data.data.settings[0].time_open == null?false:true
            this.stateSettings.date_open = data.data.settings[0].time_open
            console.log(this.stateSettings)
            this.stateLoading=false
            
        },

        async handleShowResult(){
            const data = await axios.post('api/admin/settings/show-result')
            this.stateSettings.show_result= data.data.settings.show_result == 0?false :true

        },
        async handleOpenVoting(){
            const data = await axios.post('api/admin/settings/open-voting')

            this.stateSettings.isOpen = data.data.settings.time_open== null?false :true
            this.stateSettings.date_open = data.data.settings.time_open

        }
    

    }
})