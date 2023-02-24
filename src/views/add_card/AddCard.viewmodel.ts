import axios from "axios"
import { useAuthStore } from "@/stores/auth"

type Cardtype = "Credit" | "Debit"

export class card {
    card_name: string = ""
    card_number: string = ""
    service_type: string = "Standard"
    card_type: Cardtype = "Credit"
    payment_system: string = ""
    balance: number = 0
    color: any = {
        "from": "from-[#F3D5A3]",
        "via": "via-[#D5A3F3]",
        "to": "to-[#D5A3F3]"
    }
}

export class AddCardViewModel {
    authStore = useAuthStore()
    btnAddCardDisable = false
    Card = new card

    convertColor(id: number): void {
        if(id == 3) {
            this.Card.service_type = "Standard"
            this.Card.color.from = "from-[#F3D5A3]"
            this.Card.color.via = "via-[#D5A3F3]"
            this.Card.color.to = "to-[#D5A3F3]"
        } else if(id == 2) {
            this.Card.service_type = "Gold"
            this.Card.color.from = "from-emerald-900"
            this.Card.color.via = "via-emerald-700"
            this.Card.color.to = "to-emerald-500"
        } else {
            this.Card.service_type = "Premium"
            this.Card.color.from = "from-[#3D3D3D]"
            this.Card.color.via = "via-[#555555]"
            this.Card.color.to = "to-[#9E9E9E]"
        }
    }

    async createCard(): Promise<string> {
        const user = await this.authStore.getUser()
        let data = {
            id_account: user.data.id,
            name: this.Card.card_name,
            card_number: await this.getNumber(),
            service_type: this.Card.service_type,
            card_type: this.Card.card_type,
            payment_system: this.Card.payment_system,
            balance: 0,
            from: this.Card.color.from,
            via: this.Card.color.via,
            to: this.Card.color.to,
            created_at: new Date
        }

        if(this.Card.card_name === "" && this.Card.payment_system === "") {
            return "Data can't be empty!"
        }
        try {
            this.btnAddCardDisable = true
            const response = await axios.post("http://localhost:4500/add_card", data)
            if(response.status != 200) {
                this.btnAddCardDisable = false
                return "Failed"
            }
            return "Success"
        } catch(error) {
            this.btnAddCardDisable = false
            return "Something error"
        }
    }

    getNumber(): number {
        let number = Math.floor((Math.random() * 99999999) + 1);
        return number
    }
}