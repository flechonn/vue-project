import express from "express";
import ViteExpress from "vite-express";
import cors from "cors"; 
import routerpost from "./routes/post.routes.js";
import routerdata from "./routes/data.routes.js";
import routerliked from "./routes/liked.routes.js";



async function startServer() {
    const app = express();
    const port = 4000;

    app.use(express.json())

    app.use(cors());

    app.use("/liked", routerliked);

    app.use("/data",routerdata);

    app.use("/post", routerpost);


    ViteExpress.listen(app, port, () => console.log("Server is listening on port " + port));
}

startServer();
