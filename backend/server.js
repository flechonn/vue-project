import express from "express";
import router from "./routes/post.routes.js";
const app=express();
const port=4000;

//midleware qui traite les données de la requeste
app.use(express.json());
// app.use(express.urlencoded()); // Setting extended option to true
// app.use(cors());


app.use("/post",router);

//lance le server 
app.listen(port,()=> console.log("le server à démarré au port " + port));