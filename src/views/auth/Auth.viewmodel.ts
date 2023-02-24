import axios from "axios"
import { useAuthStore } from "@/stores/auth"

export class Auth {
    username: string = ""
    password: string = ""
}

export class Registration {
    first_name: string = ""
    last_name: string = ""
    username: string = ""
    password: string = ""
    created_at: Date = new Date
}

export class AuthViewModel {
    btnRegistDisable = true
    loading = false
    auth = new Auth
    regist = new Registration
    authStore = useAuthStore()

    async login(): Promise<any> {
        try {
            const data = this.authStore.login(this.auth.username, this.auth.password)
            return data
        } catch(error) {
            return "Something error"
        }
    }

    async logout(): Promise<void> {
        return this.authStore.logout()
    }

    async registration(): Promise<string> {
        try {
            this.btnRegistDisable = true
            const response = await axios.post("http://localhost:4500/create_account", this.regist)
            if(response.status !== 200) {
                this.btnRegistDisable = false
                throw new Error("Failed")
            }
            return "Success"
        } catch(error) {
            this.btnRegistDisable = false
            throw new Error("Something error")
        }
    }

    getUser(): any {
        let user = this.authStore.getUser()
        return user
    }
}