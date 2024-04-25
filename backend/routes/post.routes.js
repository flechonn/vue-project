import express from "express";
import { getPosts, setPosts } from "../controllers/post.controllers.js";

const router = express.Router();

router.get("/", getPosts);
router.post("/", setPosts);

router.put('/:id', (req, res) => {
    res.json({ messageId: req.params.id });
});

router.delete('/:id', (req, res) => {
    res.json({ message: "Post supprimé id: " + req.params.id });
});

router.patch('/post-like/:id', (req, res) => {
    res.json({ message: "Post liké : " + req.params.id });
});

export default router;
