import express from "express";
import { readFileSync } from "fs";

const routerdata = express.Router();

const dataFilePath = new URL("../data.json", import.meta.url).pathname;
const data = JSON.parse(readFileSync(dataFilePath, "utf-8"));
routerdata.get("/", (req, res) => {
    // res.sendFile(data);
    res.json(data)
});

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
