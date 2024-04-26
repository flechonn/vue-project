import express from "express";
import ViteExpress from "vite-express";
import { readFileSync } from "fs";


const dataFilePath = new URL("./data.json", import.meta.url).pathname;

async function startServer() {
    const app = express();

    const port=4000;

    app.get("api/data", (req, res) => {
        res.sendFile(dataFilePath);
        });

    app.get("api/test", (_, res) => {
        // res.send("Hello from express!")
        // res.send("incroyable")
        res.json({message:"incroyable"})
        console.log("here")
    });

    ViteExpress.listen(app, port, () => console.log("Server is listening..." +port));
}

startServer();
