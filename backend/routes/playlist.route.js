import express from "express";
import { getPlaylist,addPlaylist,delPlaylist, } from "../controllers/playlist.controler.js";

const routerPlaylist = express.Router();

routerPlaylist.get("/", getPlaylist);

routerPlaylist.post("/",addPlaylist);

routerPlaylist.delete('/:id',delPlaylist);


export default routerPlaylist;
