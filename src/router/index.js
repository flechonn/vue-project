import {createRouter, createWebHistory} from "vue-router"
import HomeView from '../views/HomeView.vue'
import AboutView from '../views/AboutView.vue'
import MusiqueView from '../views/MusiqueView.vue'

const router = createRouter({
    history:createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path:"/",
            name:"home",
            component:HomeView
        },
        {
            path: "/about",
            name: "about",
            component: AboutView
        },
        {
            path: "/musiques/:id",
            name: "musiques",
            component: MusiqueView
        }
    ]
}) 

export default router