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
        }
    
    }),
    getters: {
        form: (state) => state.stateForm,
        status:(state)=>state.stateStatus

        
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

        }

    }

})