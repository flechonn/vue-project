import express from "express";
import ViteExpress from "vite-express";

async function startServer() {
    const app = express();

    const port=4000;

    app.get("/message", (_, res) => res.send("Hello from express!"));
    ViteExpress.listen(app, port, () => console.log("Server is listening..." +port));
}

startServer();
