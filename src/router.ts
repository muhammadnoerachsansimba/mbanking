import { createRouter, createWebHistory } from "vue-router"
import Auth from "@/views/auth/read/Auth.vue"
import Registration from "@/views/registration/read/Registration.vue"
import Home from "@/views/home/read/Home.vue"

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