import express from "express";
import { getPosts, setPosts } from "../controllers/post.controllers.js";

const routerpost = express.Router();

routerpost.get("/", getPosts);
routerpost.post("/", setPosts);

routerpost.put('/:id', (req, res) => {
    console.log(req.body)
    res.json({ messageId: req.params.id });
});

routerpost.delete('/:id', (req, res) => {
    console.log(req.body)
    res.json({ message: "Post supprimé id: " + req.params.id });
});

routerpost.patch('/post-like/:id', (req, res) => {
    res.json({ message: "Post liké : " + req.params.id });
});

export default routerpost;
