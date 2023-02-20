import { defineStore } from "pinia"
import axios from "axios"

export class User {
    username: string = ""
    password: string = ""
}

export const useAuthStore = defineStore("auth", {
    state: () => ({
        authUser: null as User | null,
        isLogIn: false
    }),
    getters: {
        user: (state) => state.authUser
    },
    actions: {
        async login(username: string, password: string): Promise<any> {
            if(username != "" || password != "") {
                let user: object
                const data = await axios.get("http://localhost:4500/sign_in", {
                    params: {
                        username: username,
                        password: password
                    }
                })
                this.isLogIn = true
                this.authUser = data.data[0]
                user = {
                    "data": this.authUser,
                    "isLogin": this.isLogIn
                }
                localStorage.setItem("user", JSON.stringify(user))
                return this.authUser
            } else {
                throw new Error("Username or Password is empty!")
            }
        },
        async logout(): Promise<void> {
            let user: object
            this.isLogIn = true
            user = {
                "data": this.authUser,
                "isLogin": false
            }
            localStorage.setItem("user", JSON.stringify(user))
        }
    }
})