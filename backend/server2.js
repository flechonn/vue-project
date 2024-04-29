import express from "express";
import routerpost from "./routes/post.routes.js";
import { readFileSync } from "fs";

// Récupérer le chemin absolu du fichier data.json
const dataFilePath = new URL("./data.json", import.meta.url).pathname;

// Charger les données JSON de manière synchrone
const data = JSON.parse(readFileSync(dataFilePath, "utf-8"));

const app = express();
const port = 4000;

app.use(express.json({ extended: true }));
app.use(express.urlencoded({ extended: true }));
// Route pour envoyer les données
app.get("/data", (req, res) => {
    res.json(data);
});

app.use("/post", routerpost);

app.listen(port, () => console.log("Le serveur a démarré au port " + port));
