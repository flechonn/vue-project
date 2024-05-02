import express from "express";
import { editPlaylist,getPlaylist,addPlaylist,delPlaylist,addTrackToPlaylist } from "../controllers/playlist.controler.js";

const routerPlaylist = express.Router();

routerPlaylist.get("/", getPlaylist);

routerPlaylist.post("/",addPlaylist);

routerPlaylist.delete('/:id',delPlaylist);

routerPlaylist.patch('/:id',editPlaylist)

routerPlaylist.patch('/add/:playlistId',addTrackToPlaylist)

export default routerPlaylist;
