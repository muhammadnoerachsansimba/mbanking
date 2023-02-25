type Gender = "M" | "F"

export interface IRegistration {
    first_name: string,
    last_name: string,
    birthplace: string,
    birth_date: Date,
    gender: Gender,
    phone: string,
    email: string,
    username: string,
    password: string,
}

export class RegistrationModel implements IRegistration {

    first_name: string
    last_name: string
    birthplace: string
    birth_date: Date
    gender: Gender
    phone: string
    email: string
    username: string
    password: string

    constructor(model: IRegistration) {
        this.first_name = model.first_name
        this.last_name = model.last_name
        this.birthplace = model.birthplace
        this.birth_date = model.birth_date
        this.gender = model.gender
        this.phone = model.phone
        this.email = model.email
        this.username = model.username
        this.password = model.password
    }

    static empty(): RegistrationModel {
        return new RegistrationModel({
            first_name: "",
            last_name: "",
            birthplace: "",
            birth_date: new Date(),
            gender: "M",
            phone: "",
            email: "",
            username: "",
            password: ""
        })
    }

    async registration() {
        return {
            first_name: "",
            last_name: "",
            birthplace: "",
            birth_date: new Date(),
            gender: "M",
            phone: "",
            email: "",
            username: "",
            password: ""
        }
    }

}