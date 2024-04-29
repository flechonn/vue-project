import express from "express";
import { getLiked } from "../controllers/liked.controllers.js";

const routerliked = express.Router();

routerliked.get("/", getLiked);

routerliked.put('/:id', (req, res) => {
    console.log(req.body)
    res.json({ messageId: req.params.id });
});

routerliked.delete('/:id', (req, res) => {
    console.log(req.body)
    res.json({ message: "Post supprimé id: " + req.params.id });
});


export default routerliked;
