import { useAuthStore } from "@/stores/auth"
import { useCardStore } from "@/stores/card"
import axios from "axios"

export class Card {
    id: number = 0
    name: string = ""
    card_number: number = 0
    service_type: string = ""
    card_type: string = ""
    payment_system: string = ""
    balance: number = 0
    from: string = ""
    via: string = ""
    to: string = ""
    created_at: Date = new Date
}

export class TopUp {
    amount: string = ""
}

export class CardViewModel {
    card = new Card
    topUp = new TopUp
    btnTopUpDisabled = false
    authStore = useAuthStore()
    cardStore = useCardStore()

    getUser(): any {
        let user = this.authStore.getUser()
        return user
    }

    async getCardById(id: number): Promise<any> {
        const card = await this.cardStore.getById(id)
        this.card = card[0]
        return this.card
    }

    async addTopUp(): Promise<string> {
        this.btnTopUpDisabled = true
        let data = {
            id_card: this.card.id,
            account_number: this.card.card_number,
            reciver: this.authStore.getUser().data.first_name + " " + this.authStore.getUser().data.last_name,
            payment: parseInt(this.topUp.amount),
            transaction_type: "top up",
            created_at: new Date
        }
        let dataUpdate = {
            balance: parseInt(this.topUp.amount) + this.card.balance,
            updated_at: new Date
        }
        try {
            const res = await axios.post("http://localhost:4500/send", data)
            if(res.status !== 200) {
                this.btnTopUpDisabled = false
                return "Failed"
            }
            try {
                const res = await axios.put(`http://localhost:4500/edit_card/${this.card.id}`, dataUpdate)
                return "Success"
            } catch(error) {
                this.btnTopUpDisabled = false
                return "Something Error"
            }
            return "Success"
        } catch(error) {
            this.btnTopUpDisabled = false
            return "Something Error"
        }

    }
}