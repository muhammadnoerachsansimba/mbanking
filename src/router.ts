import { createRouter, createWebHistory } from "vue-router"
import Auth from "@/views/auth/Auth.vue"
import Registration from "@/views/registration/Registration.vue"
import Home from "@/views/home/Home.vue"

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
    }
]

const router = createRouter({
    linkActiveClass: "active",
    history: createWebHistory(),
    routes
})

export default router