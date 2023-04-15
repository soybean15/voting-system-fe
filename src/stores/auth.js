import { defineStore } from 'pinia'
import axios from "axios"
import router from '@/router'

export const useAuthStore = defineStore('auth', {


    state: () => ({
        authUser: null,
        authErrors: [],
        authStatus: null
    }),
    getters: {
        user: (state) => state.authUser,
        errors: (state) => state.authErrors,
        status:(state)=> state.authStatus
    },
    actions: {
        resetErrors() {
            this.authErrors = []
        },
        async getToken() {
            await axios.get('/sanctum/csrf-cookie')
        },
        async getUser() {
            await this.getToken()
            try {
                const data = await axios.get("/api/user")
                this.authUser = data.data
            } catch (e) {
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


                this.authStatus ={
                    title: 'Welcome to Voting.com',
                    status :"We've sent a verification email to the address you provided during registration, so please check your inbox (and possibly your spam folder) to confirm your account."

                } 
                this.router.push('/status')

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
                this.router.push('/status')
                this.authStatus ={
                    title: 'Forgot Password',
                    status :data.data.status

                } 
                
               

            }catch(e){
                if (e.response.status === 422) {
                    this.authErrors = e.response.data.errors
                }

            }
            

        },
        async handleLogout() {
            await axios.post('/logout')
            this.authUser = null
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
        }

    }
})