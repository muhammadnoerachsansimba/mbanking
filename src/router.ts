import { createRouter, createWebHistory } from "vue-router"
import Auth from "@/views/auth/Auth.vue"
import Registration from "@/views/registration/Registration.vue"
import Home from "@/views/home/Home.vue"
<<<<<<< Updated upstream
=======
import AddCard from "@/views/add_card/AddCard.vue"
import Account from "@/views/account/Account.vue"
import Send from "@/views/send/Send.vue"
import Card from "@/views/card/Card.vue"
>>>>>>> Stashed changes

const routes = [
    {
        path: "/",
        name: "Auth",
        component: Auth
    },
    {
        path: "/registration",
        name: "Registration",
        component: Registration
    },
    {
        path: "/home",
        name: "Home",
        component: Home
<<<<<<< Updated upstream
=======
    },
    {
        path: "/add_card",
        name: "AddCard",
        component: AddCard
    },
    {
        path: "/send",
        name: "Send",
        component: Send
    },
    {
        path: "/account",
        name: "Acoount",
        component: Account
    },
    {
        path: "/card/:id",
        name: "Card",
        component: Card
>>>>>>> Stashed changes
    }
]

const router = createRouter({
    linkActiveClass: "active",
    history: createWebHistory(),
    routes
})

export default router