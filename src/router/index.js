import {createRouter, createWebHistory} from "vue-router"
import HomeView from '../views/HomeView.vue'
import AccountView from '../views/AccountView.vue'
import MusiqueView from '../views/MusiqueView.vue'
import AlbumView from '../views/AlbumView.vue'
import SingleAlbumView from '../views/SingleAlbumView.vue'
import NotFoundView from '../views/NotFoundView.vue'
import DataView from '../views/DataView.vue'



const router = createRouter({
    history:createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path:"/",
            name:"home",
            component:HomeView
        },
        {
            path: "/account",
            name: "account",
            component: AccountView
        },
        {
            path: "/musiques/:id",
            name: "musiques",
            component: MusiqueView
        },
        {
            path:"/album",
            name:"album",
            component: AlbumView
        },
        {
            path:"/album/:album",
            name:"singleAlbum",
            component: SingleAlbumView
        },
        {
            path:"/data",
            name:"data",
            component: DataView

        },
        {
            path:"/:pathmatch(.*)*",
            name:"Nor Found",
            component: NotFoundView
        },

    ]
}) 

export default router