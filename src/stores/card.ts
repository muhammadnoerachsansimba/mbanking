import { defineStore } from "pinia"
import axios from "axios"

export class Card {
    id_account: number = 0
    name: string = ""
    card_number: string = ""
    service_type: string = ""
    card_type: string = ""
    payment_system: string = ""
    balance: number = 0
    from: string = ""
    via: string = ""
    to: string = ""
    created_at: Date = new Date
}

export const useCardStore = defineStore("card", {
    state: () => ({
        card: null as Card | null
    }),
    getters: {
        c: (state) => state.card
    },
    actions: {
        async getCard(id: number): Promise<any> {
            try {
                const res = await axios.get(`http://localhost:4500/get_card/${id}`)
                if(res.status !== 200) {
                    return "Failed"
                }
                return res.data
            } catch(error) {
                return "Something error"
            }
        },
        async getById(id: number): Promise<any> {
            try {
                const res = await axios.get(`http://localhost:4500/get_card_id/${id}`)
                if(res.status !== 200) {
                    return "Failed"
                }
                return res.data
            } catch(error) {
                return "Something error"
            }
        }
    }
})