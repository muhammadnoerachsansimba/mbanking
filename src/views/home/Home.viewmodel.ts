import axios from 'axios'
import { useAuthStore } from "@/stores/auth"
import { useCardStore } from "@/stores/card"

export class Card {
    id: number = 0
}

export class HomeViewModel {
    card = new Card
    authStore = useAuthStore()
    cardStore = useCardStore()

    async getCard(): Promise<any> {
        try {
            const res = await this.cardStore.getCard(this.getUser().data.id)
            if(res === undefined) {
                return "Data is empty"
            }
            return res
        } catch(error) {
            return "Something error"
        }
    }

    getUser(): any {
        let user = this.authStore.getUser()
        return user
    }

    async getTransaction(): Promise<any> {
        try {
            const res = await axios.get(`http://localhost:4500/getall_transaction/${this.card.id}`)
            if(res.status !== 200) {
                return "Failed"
            }
            return res.data
        } catch(error) {
            return "Something error"
        }
        
    }
}