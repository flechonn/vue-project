import express from "express";
import ViteExpress from "vite-express";
import routerpost from "./routes/post.routes.js";
import routerdata from "./routes/data.routes.js";


async function startServer() {
    const app = express();
    const port = 4000;

    app.get("/test", (_, res) => {
        res.json({ message: "incroyable" });
    });

    app.use("/data",routerdata);

    app.use("/post", routerpost);


    ViteExpress.listen(app, port, () => console.log("Server is listening on port " + port));
}

startServer();
