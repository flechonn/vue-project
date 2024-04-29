import express from "express";
import { getData} from "../controllers/data.controllers.js";

const routerdata = express.Router();

routerdata.get("/", getData);

routerdata.put('/:id', (req, res) => {
    console.log(req.body)
    res.json({ messageId: req.params.id });
});

routerdata.delete('/:id', (req, res) => {
    console.log(req.body)
    res.json({ message: "Post supprimé id: " + req.params.id });
});

routerdata.patch('/post-like/:id', (req, res) => {
    res.json({ message: "Post liké : " + req.params.id });
});

export default routerdata;
