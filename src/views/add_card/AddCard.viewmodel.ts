export class card {
    card_name: string = ""
    card_number: string = ""
    service_type: string = "Standard"
    card_type: string = ""
    payment_system: string = ""
    balance: number = 0
    color: any = {
        "from": "from-[#F3D5A3]",
        "via": "via-[#D5A3F3]",
        "to": "to-[#D5A3F3]"
    }
}

export class AddCardViewModel {
    data = []
    Card = new card



    async convertColor(id: number) {
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
}