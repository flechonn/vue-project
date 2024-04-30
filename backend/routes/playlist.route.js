import express from "express";
import { editPlaylist,getPlaylist,addPlaylist,delPlaylist, } from "../controllers/playlist.controler.js";

const routerPlaylist = express.Router();

routerPlaylist.get("/", getPlaylist);

routerPlaylist.post("/",addPlaylist);

routerPlaylist.delete('/:id',delPlaylist);

routerPlaylist.patch('/:id',editPlaylist)

export default routerPlaylist;
