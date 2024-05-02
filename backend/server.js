import ViteExpress from "vite-express";
import app from "./app.js";


async function startServer() {
    const port = 4000;
    ViteExpress.listen(app, port, () => console.log("Server is listening on port " + port));
}

startServer();

export default app;