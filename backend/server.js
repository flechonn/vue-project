const express=require("express");
const cors = require('cors');
const app=express();
const port=5000;

//midleware qui traite les données de la requeste
app.use(express.json());
app.use(express.urlencoded());//extended=false ? 
app.use(cors());


app.use("/post",require("./routes/post.routes"));

//lance le server 
app.listen(port,()=> console.log("le server à démarré au port " + port));