import { defineStore } from 'pinia'
import axios from "axios"
import router from '@/router'
import { setStatus } from '@/data/status'
import {useAuthStore} from '@/stores/auth'
export const useElectionStore = defineStore('vote', {


    state: () => ({
        stateForm :{
            positions:null,
            user_id:null
        },
        stateStatus: {
            title: '404',
            message: 'Page not found'
        },
        stateResult:null,
        stateSettings:{
            show_result:null,
            isOpen:null,
            date_open:null,
            date_close:null
        },
        stateLoading:false,
        
    
    }),
    getters: {
        form: (state) => state.stateForm,
        status:(state)=>state.stateStatus,
        result:(state)=>state.stateResult,
        settings:(state)=>state.stateSettings,
        loading:(state)=>state.stateLoading

        
    },
    actions: {

        async getElection(){

            return await axios.get('api/voting')
            // const data = await axios.get('api/voting/check')
            // console.log(data.data)
            // this.stateStatus = data.data
            // if(!data.data.status){

            //  this.redirect() 
            // // }
            // return new Promise(async (resolve, reject) => {
            //     try {
            //       const data = await axios.get('api/voting/check');
            //       console.log(data.data);
            //       this.stateStatus = data.data;
            //       if (!data.data.status) {
            //         this.redirect();
            //       }
            //       resolve();
            //     } catch (error) {
            //       reject(error);
            //     }
            //   });

        },
        
        redirect(){

            const status = {
                title: this.stateStatus.title,
                message: this.stateStatus.message
            }
            setStatus(status)
            router.push('/status')
            

        },



        async handleSubmit(){

            const data = await axios.post('api/voting',this.stateForm)
            
            localStorage.setItem('positions', null);
          

            const status = {
                title: data.data.title,
                message: data.data.message
            }
            setStatus(status)
            router.push('/status')

        },

        async getResult(){
            const result = await axios.get('api/voting/result')
            
            this.stateResult = result.data.positions
            console.log(result)
            //test
  
        },
        async getSettings(){
            this.stateLoading = true
            const data = await axios('api/voting/settings')
            console.log(data.data)

            this.stateSettings.show_result= data.data.settings[0].show_result == 0?false :true
            this.stateSettings.isOpen = data.data.settings[0].time_open == null?false:true
            this.stateSettings.date_open = data.data.settings[0].time_open

            this.stateLoading=false
            
        },

    }

})