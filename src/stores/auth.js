import { defineStore } from 'pinia'
import axios from "axios"
import router from '@/router'
import { getStatus, setStatus } from '@/data/status'

export const useAuthStore = defineStore('auth', {


    state: () => ({
        authUser: null,
        authErrors: [],
        authStatus: null,
        authIsAdmin : null,
        authLoading:false,
        authVerified: true,
    
    }),
    getters: {
        user: (state) => state.authUser,
        errors: (state) => state.authErrors,
        status:(state)=> state.authStatus,
        isAdmin:(state)=>state.authIsAdmin,
        loading:(state)=>state.authLoading,
        verified :(state)=>state.authVerified
        
    },
    actions: {
        resetErrors() {
            this.authErrors = []
        },
        async getToken() {
            await axios.get('/sanctum/csrf-cookie')
        },
        async getUser() {
            this.authLoading = true
            await this.getToken()
            this.authVerified =true


            try {
                const data = await axios.get("/api/user")
               
                this.authUser = data.data
                this.checkRole()
                this.authLoading = false


                // setTimeout(async () => {
                //     const data = await axios.get("/api/user")
                //     this.authUser = data.data
                //     this.checkRole()
                //     this.authLoading = false
                //   }, 3000)
            } catch (e) {
                 this.authLoading = false

                if(e.response.status ===409){
                    this.authVerified =false

                   
                    const status = {
                        title:'Your Account is not verified',
                        message: "Please Check you email for verification",
                        notVerified:true
                    }
                    setStatus(status)
                   
                    this.router.push('/status')
                   
                }


            }

        },

        async resendVerification(){
            const data = await axios.post('/email/verification-notification')

            const status = {
                title:'Verification sent',
                message: "Please Check you email for verification",
                
            }
            setStatus(status)
            this.router.push('/status')
        },
        async checkRole() {
            //await this.getToken()
            this.authIsAdmin = null
            try {
                const data = await axios.get("/api/admin")
               
                this.authIsAdmin = data.data.status == 1
              
                if(!this.authIsAdmin ){
                    router.push('/')
                }
            } catch (e) {
                router.push('/')
                // if(e.response.status ===401){
                //     router.push('/login')
                // }


            }

        },



        async onLogin(data) {
            this.authErrors = []
            await this.getToken()
            


            try {
                await axios.post("/login", {
                    email: data.email,
                    password: data.password
                })
                localStorage.setItem('positions', null);
                this.router.push('/')

            } catch (e) {
                if (e.response.status === 422) {
                    this.authErrors = e.response.data.errors
                }
               

            }



        }
        ,
        async handleRegister(data) {
            this.authErrors = []
            this.authStatus = null
            await this.getToken()
            try {
             await axios.post('/register', {
                    name: data.name,
                    email: data.email,
                    password: data.password,
                    password_confirmation: data.password_confirmation
                })


                // this.authStatus ={
                //     title: 'Welcome to Voting.com',
                //     status :"We've sent a verification email to the address you provided during registration, so please check your inbox (and possibly your spam folder) to confirm your account."

                // } 
                const status = {
                    title:'Welcome to Voting.com',
                    message: "We've sent a verification email to the address you provided during registration, so please check your inbox (and possibly your spam folder) to confirm your account."
                }
                setStatus(status)
                this.router.push('/status')
                this.handleLogout()

            } catch (e) {
                if (e.response.status === 422) {
                    this.authErrors = e.response.data.errors
                }


            }

        },
        async handleForgotPassword(email) {
            this.authErrors = []
            this.authStatus = null
          
            // await this.getToken()

            try{
                
                const data = await axios.post('/forgot-password', {
                    email: email
                })
                const status = {
                    title:'Forgot Password',
                    message:data.data.status
                }
                setStatus(status)
                this.router.push('/status')
                // this.authStatus ={
                //     title: 'Forgot Password',
                //     status :data.data.status

                // } 

              
               

            }catch(e){
                if (e.response.status === 422) {
                    this.authErrors = e.response.data.errors
                }

            }
            

        },
        async handleLogout() {
            await axios.post('/logout')
            this.authUser = null
            this.authStatus =null
            this.authIsAdmin = null
            this.router.push('/')
        },
        onCloseAuthModal() {

            this.router.go(-1)
        },
        routeToRegister() {

            this.router.push('/register')
        },
        routeToForgotPassword() {

            this.router.push('/forgot-password')
        },
        async handleResetPassword(resetData) {
            this.authErrors = []
            try {
                await axios.post('/reset-password', resetData)
                this.router.push('/')

            } catch (e) {
                if (e.response.status === 422) {
                    this.authErrors = e.response.data.errors
                }
            }
        },

        handleStart(){
            if(!this.authLoading){
                if(this.authUser){
                    this.router.push('/vote')
                }else{
                    this.router.push('/login')
                }

            }
         
        }



    }
    
})

