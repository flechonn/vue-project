import express from "express";
import ViteExpress from "vite-express";
import { fileURLToPath } from 'url';
import { dirname, join } from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const dataFilePath = join(__dirname, "data.json");

async function startServer() {
    const app = express();
    const port = 4000;

    // Servir les fichiers statiques depuis le répertoire "public"
    app.use(express.static("public"));

    app.get("/api/data", (req, res) => {
        res.sendFile(dataFilePath);
    });

    app.get("/api/test", (_, res) => {
        res.json({ message: "incroyable" });
    });

    ViteExpress.listen(app, port, () => console.log("Server is listening on port " + port));
}

startServer();
