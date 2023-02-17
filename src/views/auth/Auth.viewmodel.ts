import { RegistrationModel } from "@/models/RegistrationModel"
// import { defineStore } from "pinia"
import axios from "axios"

type Gender = "M" | "F"

export class Auth {
    first_name: string = ""
    last_name: string = ""
    username: string = ""
    password: string = ""
}

export class AuthViewModel {
    btnRegistDisable = false
    loading = false
    
    auth: Auth = {
        first_name: "",
        last_name: "",
        username: "",
        password: "",
    }

    async login() {
        try {
            const response = await axios.get("http://localhost:4500/sign_in", {
                params: {
                    username: this.auth.username,
                    password: this.auth.password
                }
            })
            return response.data
        } catch(error) {
            error = "Something error"
            return error
        }
        // defineStore("auth", {
        //     state: () => ({
        //         authUser: null,
        //     }),
        //     getters: {
        //         user: (state) => state.authUser,
        //     },
        //     actions: {
        //         async getUser() {
        //             const data = await axios.get("/sign_in")
        //         }
        //     }
        // })
    }

    async registration() {
        let message: string
        let data = {
            first_name: this.auth.first_name,
            last_name: this.auth.last_name,
            username: this.auth.username,
            password: this.auth.password,
            created_at: new Date
        }
        try {
            const response = await axios.post("http://localhost:4500/create_account", data)
            if(response.status == 200) {
                this.btnRegistDisable = true
                return message = "Success"
            }
        } catch(error) {
            return message = "Failed"
        }
    }
}