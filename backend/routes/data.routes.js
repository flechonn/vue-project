import express from "express";
import { getData,setData,delData,editData } from "../controllers/data.controllers.js";

const routerdata = express.Router();

routerdata.get("/", getData);

routerdata.post("/",setData);

routerdata.patch('/:id',editData);


routerdata.put('/:id', (req, res) => {
    console.log(req.body)
    res.json({ messageId: req.params.id });
});



export default routerdata;
