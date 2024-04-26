import express from "express";
import ViteExpress from "vite-express";
import { readFileSync } from "fs";


async function startServer() {
    const app = express();
    const port = 4000;

    const dataFilePath = new URL("./data.json", import.meta.url).pathname;

    const data = JSON.parse(readFileSync(dataFilePath, "utf-8"));

    app.get("/data", (req, res) => {
        // res.sendFile(data);
        res.json(data)
    });
    

    app.get("/api/test", (_, res) => {
        res.json({ message: "incroyable" });
    });

    ViteExpress.listen(app, port, () => console.log("Server is listening on port " + port));
}

startServer();
