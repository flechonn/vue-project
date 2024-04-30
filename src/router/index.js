import {createRouter, createWebHistory} from "vue-router"
import HomeView from '../views/HomeView.vue'
import AccountView from '../views/AccountView.vue'
import MusiqueView from '../views/musicview/MusiqueView.vue'
import AlbumView from '../views/AlbumView.vue'
import SingleAlbumView from '../views/SingleAlbumView.vue'
import NotFoundView from '../views/NotFoundView.vue'
import addMusicView from '../views/musicview/addMusicView.vue'
import EditMusicView from '../views/musicview/EditMusicView.vue'
import PlaylistView from '../views/playlistview/PlaylistView.vue'
import EditPlaylistView from '../views/playlistview/EditPlaylistView.vue'
import AddPlaylistView from "../views/playlistview/AddPlaylistView.vue"




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
            path: "/account/:id",
            name: "Playlist",
            component: PlaylistView
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
            path:"/addMusic",
            name:"addMusic",
            component: addMusicView

        },
        {
            path:"/addPlaylist",
            name:"addPlaylist",
            component: AddPlaylistView

        },
        {
            path:"/edit-musique/:id",
            name:"edit-musique",
            component: EditMusicView
        },
        {
            path:"/edit-playlist/:id",
            name:"edit-playlist",
            component: EditPlaylistView
        },
        {
            path:"/:pathmatch(.*)*",
            name:"Nor Found",
            component: NotFoundView
        },

    ]
}) 

export default router