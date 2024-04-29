import express from "express";
import { getData,setData,delData,patchData } from "../controllers/data.controllers.js";

const routerdata = express.Router();

routerdata.get("/", getData);

routerdata.post("/",setData);

routerdata.delete('/:id', delData);

routerdata.patch('/:id',patchData);


routerdata.put('/:id', (req, res) => {
    console.log(req.body)
    res.json({ messageId: req.params.id });
});



export default routerdata;
