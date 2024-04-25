import express from "express";
import ViteExpress from "vite-express";

const express = require("express");
const { setPosts, getPosts } = require("../controllers/post.controllers");
const router = express.Router()

router.get("/",getPosts);

router.post("/",setPosts);

router.put('/:id',(req,res)=>{
    res.json({messageId:req.params.id});
});

router.delete('/:id',(req,res)=>{
    res.json({message: "Post suprimé id :"+req.params.id});
});

router.patch('/post-like/:id',(req,res)=>{
    res.json({message:"post liké :" +req.params.id});
});

module.exports =router;