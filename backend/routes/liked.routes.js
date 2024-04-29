import express from "express";
import { getLiked,addLiked,delLiked } from "../controllers/liked.controllers.js";

const routerliked = express.Router();

routerliked.get("/", getLiked);

routerliked.post('/:id',addLiked);

routerliked.delete('/:id',delLiked);


export default routerliked;
