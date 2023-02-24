import axios from "axios"
import { useAuthStore } from "@/stores/auth"
import { useCardStore } from "@/stores/card"

export class Send {
    id_card: number = 0
    account_number: string = ""
    reciver: string = ""
    payment: string = ""
    description: string = ""
    transaction_type: string = "transfer"
}

export class SendViewModel {
    btnSendDisable = false
    authStore = useAuthStore()
    cardStore = useCardStore()
    dataSend = new Send

    getUser(): any {
        let user = this.authStore.getUser()
        return user
    }

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

    async send(): Promise<any> {
        this.btnSendDisable = true
        try {
            const card = await this.cardStore.getById(this.dataSend.id_card)
            let data = {
                id_card: this.dataSend.id_card,
                account_number: this.dataSend.account_number,
                reciver: this.dataSend.reciver,
                payment: parseInt(this.dataSend.payment),
                description: this.dataSend.description,
                transaction_type: this.dataSend.transaction_type,
                created_at: new Date
            }
            let dataUpdate = {
                balance: card[0].balance - parseInt(this.dataSend.payment),
                updated_at: new Date
            }
            try {
                const res = await axios.post("http://localhost:4500/send", data)
                if(res.status !== 200) {
                    this.btnSendDisable = false
                    return "Failed"
                }
                try {
                    const res = await axios.put(`http://localhost:4500/edit_card/${this.dataSend.id_card}`, dataUpdate)
                    return "Success"
                } catch(error) {
                    this.btnSendDisable = false
                    return "Something Error"
                }
                return "Success"
            } catch(error) {
                return "Something error"
            }
        } catch(error) {
            return "Something error"
        }
    }
}