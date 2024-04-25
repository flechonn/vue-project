import express from "express";
import ViteExpress from "vite-express";

async function startServer() {
    const app = express();

    const port=4000;

    app.get("", (_, res) => {
        // res.send("Hello from express!")
        res.setHeader('Content-Security-Policy', "default-src 'self' http://localhost:"+port+";");
        res.json({message:"Error"})
        console.log("here")
    });
    ViteExpress.listen(app, port, () => console.log("Server is listening..." +port));
}

startServer();
