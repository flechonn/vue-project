import express from "express";
import { getData,setData,delData } from "../controllers/data.controllers.js";

const routerdata = express.Router();

routerdata.get("/", getData);

routerdata.post("/",setData);

routerdata.delete('/:id', delData);


routerdata.put('/:id', (req, res) => {
    console.log(req.body)
    res.json({ messageId: req.params.id });
});


routerdata.patch('/post-like/:id', (req, res) => {
    res.json({ message: "Post liké : " + req.params.id });
});

export default routerdata;
