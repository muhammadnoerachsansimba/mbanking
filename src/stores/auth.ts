import { defineStore } from "pinia"
import axios from "axios"

export const useAuthStore = defineStore("auth", {
    state: () => ({
        authUser: null,
        fisrt_name: "",
        last_name: "",
        username: "",
        password: "",
        message: "",
        isLogIn: false
    }),
    getters: {
        user: (state) => state.authUser
    },
    actions: {
        async login() {
            if(this.username != "" || this.password != "") {
                const data = await axios.get("http://localhost:4500/sign_in", {
                    params: {
                        username: this.username,
                        password: this.password
                    }
                })
                this.isLogIn = true
                this.authUser = data.data[0]
                return data.data
            } else {
                return this.message = "Username or password cannot be empty!"
            }
        }
    }
})