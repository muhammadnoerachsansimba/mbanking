import { defineStore } from "pinia"
import axios from "axios"

export const useAuthStore = defineStore("auth", {
    state: () => ({
        authUser: null,
        isLogIn: false
    }),
    getters: {
        user: (state) => state.authUser
    },
    actions: {
        async login(username: string, password: string): Promise<string> {
            if(username === "" || password === "") {
                throw new Error("Username or Password is empty!")
            }

            try {
                const data = await axios.get("http://localhost:4500/sign_in", {
                    params: {
                        username: username,
                        password: password
                    }
                })
                this.isLogIn = true
                this.authUser = data.data[0]
                let user = {
                    "data": this.authUser,
                    "isLogin": this.isLogIn
                }
                localStorage.setItem("user", JSON.stringify(user))
                return data.data[0]
            } catch (e) {
                throw new Error("Username or password is wrong!")
            }
        },
        logout(): void {
            let user: object
            this.isLogIn = true
            user = {
                "data": this.authUser,
                "isLogin": false
            }
            localStorage.setItem("user", JSON.stringify(user))
        },
        getUser(): any {
            if(this.authUser === undefined) {
                return "You must be login!"
            }
            this.authUser = JSON.parse(localStorage.getItem("user") || "{}")
            return this.authUser
        }
    }
})