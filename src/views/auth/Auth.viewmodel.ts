import axios from "axios"
import { useAuthStore } from "@/stores/auth"

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
    
    auth = new Auth
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
        let data = {
            first_name: this.auth.first_name,
            last_name: this.auth.last_name,
            username: this.auth.username,
            password: this.auth.password,
            created_at: new Date
        }
        try {
            this.btnRegistDisable = true
            const response = await axios.post("http://localhost:4500/create_account", data)
            if(response.status != 200) {
                return "Failed"
                this.btnRegistDisable = false
            }
            return "Success"
        } catch(error) {
            return "Something error"
            this.btnRegistDisable = false
        }
    }
}