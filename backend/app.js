import express from "express";
import ViteExpress from "vite-express";
import cors from "cors"; 
import routerpost from "./routes/post.routes.js";
import routerdata from "./routes/data.routes.js";
import routerliked from "./routes/liked.routes.js";
import routerPlaylist from "./routes/playlist.route.js";


const app = express();
//middleware
app.use(express.json())
app.use(cors());
app.use("/liked", routerliked);
app.use("/data",routerdata);
app.use("/post", routerpost);
app.use("/playlist", routerPlaylist);


export default app;